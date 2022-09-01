import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import mixpanel from "mixpanel-browser";
import Tooltip2 from '@mui/material/Tooltip';

export default function AddedFeatureCard(props){
    const [show, setShow] = React.useState(false);
    const router = useRouter();
    const[added, setAdded] = React.useState(false);
    const handleAdd = () => {
        if(added === false){
          props.addDatasetcatalog(props.data);
          setAdded(true);
        } else {
            props.removeDatasetcatalog(props.data);
            setAdded(false);
        }
    }

    const handleRemove = () => {
          props.removeDatasetcatalog(props.data);
  }

    return (

        <div style={{display:"flex", flexDirection:'row', minHeight:'8rem',maxHeight:'8rem', minWidth:"100%",maxWidth:"100%",
               alignItems:'center' ,backgroundColor:'#fff', marginBottom:14, flex:'start', borderRadius:16,
              textOverflow:'clip', font:'roboto', fontSize:'0.9em',
              overflow: 'hidden',
          border:router.pathname.includes("/searchresult")?'1px solid #E2E2EA':'',}}>

              <div style={{flexDirection:'column',display:'flex',justifyContent:'center', maxHeight:'6px', minWidth:'7%',
                  paddingLeft:18, paddingRight:64,}}>

                  <Button sx={{borderRadius:2,minWidth:'48px',maxWidth:'48px',minHeight:'36px',backgroundColor:"#5A00E2", color:"#fff"}}
                          variant="outlined">{parseInt(props.index+1)}</Button>
              </div>

              <div style={{fontSize:"1em", minWidth:"55%", overflow:'hidden', display:'flex', flexDirection:'column',flex:'start'}}>
                        <div style={{textOverflow:'clip', overflow:'hidden',paddingBottom:8, paddingRight:'2ch'}}><b>{props.data.title?props.data.title.substring(0,89): "FDA Approved Drugs"}</b></div>
                        <div style={{paddingBottom:8, color:'#939EAA',paddingRight:'4ch'}}>{props.data.description?(router.pathname.includes("/searchresult")?props.data.description.substring(0,119):props.data.description.substring(0,149))+
                            "..":"FDA has been very responsible in controlling drug flow"}</div>
                        <div style={{display:'flex', alignItems:'center', fontSize:"0.9em"}}><div style={{paddingRight:4,paddingBottom:4}}><b>{"Topics:  "}</b></div>
                            {props.data.topic?props.data.topic.split(',').map((topic, index)=>index < 3 && <Tooltip2 title={<h2>{topic}</h2>} arrow><Button sx={{
                                    borderRadius:4, border:1, fontSize:"0.9em", mr:1, textTransform:'capitalize',letterSpacing:'0.1em',
                                    color:'#24BBFF'}}
                                    size="small"
                                    onClick={()=>router.push({
                                        pathname: `/topic/${topic}`,
                                        query:{
                                            currentRouteTitle:router.pathname.includes('/browsecatalogue')?"Browsing Catalogs":
                                                router.pathname.includes('/datasets')?"Browsing Your Datasets":
                                                router.pathname.includes('/catalog')?"Browsing Catalog":
                                                router.pathname.includes('/dataset')?props.data.title:
                                                router.query.tid
                                        }
                                    })
                                    }>{topic.substring(0,17)+'..'}</Button></Tooltip2>)
                                : "6"}</div>
                    </div>

                

                    <div style={{minWidth:'35%', minHeight:'16vh',maxHeight:'16vh',display:'flex', 
                        flex:'end',justifyContent:'space-between', alignItems:'center', paddingTop:"2vh", paddingBottom:'2vh' }}>
                        <Divider orientation="vertical" flexItem variant="middle"/>
                        <div style={{}}>
                            <div>{router.pathname.includes("/searchresult")?"Features":"Key Features"}<br></br>
                            </div>
                            <div><b>{props.data.features?props.data.features.split(",").length.toLocaleString(): "0"}</b></div>
                        </div>

                        <Divider orientation="vertical" variant="middle" flexItem/>
                        <div style={{}}>
                            <div>{router.pathname.includes("/searchresult")?"Rows":"No. of Rows"}<br></br>
                            </div>
                            <div><b>{props.data.row_count?props.data.row_count.toLocaleString(): "0"}</b></div>
                        </div>
                        <Divider orientation="vertical" variant="middle" flexItem/>

                        <div style={{display:'flex', cursor:'pointer',alignItems:'center'}}>
                            <div style={{display:'flex', cursor:'pointer',width:"100%", justifyContent:'center',
                            maxHeight:36, alignItems:'center'}}>
                                <Button variant="outlined" fontSize="small" sx={{borderRadius:2, color:'#5A00E2', borderColor:'#5A00E2'}}
                                onClick={()=>{
                                // props.handleOpenDetails(props.data)
                                    router.pathname.includes('/dataset')? router.push({
                                            pathname:`/catalog/${props.data.ID}`,
                                            query:{
                                                currentRouteTitle:props.currentRouteTitle ?props.currentRouteTitle:"",
                                                catalogID:props.data.ID,
                                                mainTopic:props.data.topic.split(",")[0],
                                            }
                                        }):
                                    router.pathname.includes('/catalog')? router.push({
                                                pathname:`/catalog/${props.data.ID}`,
                                                query:{
                                                    currentRouteTitle:props.currentRouteTitle?props.currentRouteTitle:'',
                                                    catalogID:props.data.ID,
                                                    mainTopic:props.data.topic.split(",")[0],
                                                }
                                            }):
                                    router.pathname.includes('/browsecatalogue')? router.push({
                                            pathname:`/catalog/${props.data.ID}`,
                                            query:{
                                                currentRouteTitle:"Catalogs",
                                                catalogID:props.data.ID,
                                                mainTopic:props.data.topic.split(",")[0],
                                            }
                                        }):
                                    router.pathname.includes('/topic')? router.push({
                                            pathname:`/catalog/${props.data.ID}`,
                                            query:{
                                                currentRouteTitle:"Topic Browser",
                                                catalogID:props.data.ID,
                                                mainTopic:props.data.topic.split(",")[0],
                                            }
                                        }):null

                                mixpanel.track('Catalog Card View Details', {
                                    'source': router.pathname,
                                    'action': "clicked on view details on catalog card",
                                    'catalog': props.data.ID,
                                    'email': props.user.email
                                })
                                }
                                }>
                            <div style={{textTransform:'capitalize'}}>View</div>
                            </Button>
                        </div>
                    </div>

                    {router.pathname.includes('/dashboard')?"":
                        router.pathname.includes('/createsignalsecond')?
                        <div style={{fontSize:14, cursor:'pointer'}} 
                        onClick={()=>handleRemove()}>
                          <p><ClearIcon /></p>
                        </div>:
                    <div style={{fontSize:14, cursor:'pointer', paddingRight:"1em"}} 
                        onClick={()=>handleRemove()}>
                      <p>{added?<DoneIcon /> :<ClearIcon />}</p>
                    </div>}
                </div>
          </div>
    )

}