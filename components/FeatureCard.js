import React, {useEffect, useState} from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import mixpanel from 'mixpanel-browser';
import {getUser} from "../function/users";
import Divider from '@mui/material/Divider';
import Button from "@mui/material/Button";
import Tooltip2 from '@mui/material/Tooltip';

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true}); 

function searchInArray(array, search) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].ID === search) {
      return true
    }
  }
  return false;
}

export default function FeatureCard(props){
    const [show, setShow] = React.useState(false);
    const router = useRouter();
    const[added, setAdded] = React.useState(false);
    const handleAdd = () => {
        if(!searchInArray(props.dataset, props.data.ID)){
          props.addDatasetcatalog(props.data);
          mixpanel.track('Catalog Added to the Dataset', {
            'source': "Create Dataset Page",
            'action': "catalog added",
            'catalog': props.data.ID,
              'email': props.user.email
          })
        } else {
            props.removeDatasetcatalog(props.data);
            mixpanel.track('Catalog Removed from the Dataset', {
              'source': "Create Dataset Page",
              'action': "catalog removed",
              'catalog': props.data.ID,
                'email': props.user.email
            })
        }
    }

    const handleRemove = () => {
          props.removeDatasetcatalog(props.data);
  }

    const [changingIcon, setChangingIcon] = React.useState(<AddIcon />);

    return (

        <div style={{display:"flex", flexDirection:'row', minHeight:'8rem',maxHeight:'8rem', minWidth:"100%",maxWidth:"100%",
               alignItems:'center' ,backgroundColor:'#fff', marginBottom:14, flex:'start', borderRadius:16,
              textOverflow:'clip', font:'roboto', fontSize:'0.9em',
              overflow: 'hidden',
          border:router.pathname.includes("/searchresult")?'1px solid #E2E2EA':'',}}>

              <div style={{flexDirection:'column',display:'flex',justifyContent:'center', maxHeight:'6px', minWidth:'7%',
                  paddingLeft:18, paddingRight:64,}}>

                  <Button sx={{borderRadius:2,minWidth:'48px',maxWidth:'48px',minHeight:'36px',backgroundColor:"#5A00E2", color:"#fff"}}
                          variant="outlined">{router.pathname.includes("/browsecatalogue")?parseInt(props.pagesVisited+props.index + 1):
                                              router.pathname.includes("/topic")?parseInt(props.pagesVisited+props.index + 1):
                                                parseInt(props.index + 1)}</Button>
              </div>

              <div style={{fontSize:"1em", minWidth:"57%", overflow:'hidden', display:'flex', flexDirection:'column',flex:'start'}}>
                        <div style={{textOverflow:'clip', overflow:'hidden',paddingBottom:8, paddingRight:'2ch'}}><b>{props.data.title && props.data.title.length > 84 ?
                            props.data.title.substring(0,81) + "..": props.data.title}</b></div>
                        <div style={{paddingBottom:8, color:'#939EAA',paddingRight:'4ch'}}>{props.data.description?(router.pathname.includes("/searchresult")?props.data.description.substring(0,119):props.data.description.substring(0,149))+
                            "..":"FDA has been very responsible in controlling drug flow"}</div>
                        <div style={{display:'flex', alignItems:'center', fontSize:"0.9em"}}><div style={{paddingRight:4,paddingBottom:4}}><b>{"Topics:  "}</b></div>
                            {props.data.topic?props.data.topic.split(',').map((topic, index)=>index < 3 && <Tooltip2 title={<h2>{topic}</h2>} arrow>
                                <Button sx={{
                                    borderRadius:4, border:1, fontSize:"0.9em", mr:1, textTransform:'capitalize',letterSpacing:'0.1em',
                                    color:'#24BBFF'}}
                                    size="small"
                                    onClick={()=>router.push({
                                        pathname: `/topic/${topic}`,
                                        query:{
                                            currentRouteTitle:router.pathname.includes('/browsecatalogue')?"Browsing Catalogs":
                                                router.pathname.includes('/topic')?"Topics":
                                                router.pathname.includes('/datasets')?"Browsing Your Datasets":
                                                router.pathname.includes('/catalog')?"Browsing Catalog":
                                                router.pathname.includes('/searchresult')?"Search Results":
                                                router.pathname.includes('/dashboard')?"Dashboard":
                                                router.pathname.includes('/dataset')?props.data.title:
                                                router.query.tid
                                        }
                                    })
                                    }>{topic.substring(0,17) + ".."}</Button></Tooltip2>)
                                : "6"}</div>
                    </div>

                    <div style={{minWidth:'35%', minHeight:'16vh',maxHeight:'16vh',display:'flex', 
                        flex:'end',justifyContent:'space-between', alignItems:'center', paddingTop:"2vh", paddingBottom:'2vh' }}>
                        <Divider orientation="vertical" flexItem variant="middle"/>
                        <div style={{ }}>
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

                        <div style={{display:'flex', cursor:'pointer',alignItems:'center', 
                            paddingRight:router.pathname.includes("/searchresult")?0:"1em"}}>
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
                        router.pathname.includes('/browsecatalogue')?"":
                            router.pathname.includes('/catalog')?"":
                                router.pathname.includes('/topic')?"":
                    router.pathname.includes('/dataset') && props.datasetMode === 0 ?"":
                    router.pathname.includes('/dataset') && props.datasetMode === 1 ?"":
                    <div style={{ cursor:'pointer', alignItems:'center', paddingRight:"1em"}}
                        onClick={()=>handleAdd()}>
                      <p>{searchInArray(props.dataset, props.data.ID)? <DoneIcon />: <AddIcon />}</p>
                    </div>}

                    </div>
            </div>
        
    )

}