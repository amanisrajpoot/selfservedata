import React, {useEffect, useState} from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import SettingsIcon from '@mui/icons-material/Settings';
import mixpanel from 'mixpanel-browser';
import {getUser} from "../function/users";
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Tooltip2 from '@mui/material/Tooltip';

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true}); 

export default function DatasetCard(props){
    const [show, setShow] = React.useState(false);
    const router = useRouter();
    const[added, setAdded] = React.useState(false);
    const [topicCount, setTopicCount] = React.useState(0);    

    useEffect(() => {
        if(props.data.topic){
            setTopicCount(props.data.topic.split(',').length);
        }
    }, [props.data]);

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

    console.log("fetched dataset",props.data);
    return (
        <div style={{display:"flex", flexDirection:'column',maxWidth:"100%", minWidth:"100%", borderRadius:9,
             backgroundColor:"#FAFAFB",font:'roboto', fontSize:'0.9em',overflow: 'hidden',display:"flex", flexDirection:'row',
              minHeight:'8rem',maxHeight:'8rem',
             justifyContent:'space-around', alignItems:'center' ,backgroundColor:'#fff',borderRadius:9, margin:6,
             textOverflow:'clip', paddingTop:"2vh", paddingBottom:'2vh'
              }}>

                  <div style={{width:"4%",
                      flexDirection:'column',display:'flex',justifyContent:'center', maxHeight:'6px'}}>

                      <Button sx={{borderRadius:2,minWidth:'36px',minHeight:'36px',backgroundColor:"#5A00E2", color:"#fff"}}
                              variant="outlined">{parseInt(props.pagesVisited+props.index + 1)}</Button>
                  </div>

                  <div style={{ width:"45%", overflow:'hidden',
                        flexDirection:'column',display:'flex',justifyContent:'center', }}>
                      <div style={{textOverflow:'clip', overflow:'hidden',paddingBottom:8}}><b>{props.data.title?props.data.title.substring(0,51): "Sample Dataset"+props.data.ID}</b><br></br>
                            </div>
                        <div style={{color:'gray'}}>{props.data.description?props.data.description.substring(0,129)+"..": "Dataset Description"}</div>
                        <div style={{fontSize:'0.9em',display:'flex', alignItems:'center', }}><div style={{paddingRight:4, paddingTop:4}}><b>{"Topics:  "}</b></div>
                            {props.data.topic && props.data.topic.split(',').map((topic, index)=>index < 3 ? <Tooltip2 title={<h2>{topic}</h2>} arrow>
                              <Button sx={{
                              borderRadius:4, border:1, fontSize:"0.9em", mr:1,
                              color:'#24BBFF', marginTop:1,textTransform:'capitalize',letterSpacing:'0.1em',
                                    marginRight:1, margin:"1 2 3 4", color:'#24BBFF'}} size="small"
                                 onClick={()=>router.push({
                                    pathname: `/topic/${topic}`,
                                    query:{
                                        currentRouteTitle:router.pathname.includes('/datasets')?"Browsing My Datasets":
                                            router.pathname.includes('/catalog')?data.title:
                                                router.query.tid
                                    }
                                    })}>{topic.substring(0,14) + ".."}</Button></Tooltip2>
                                    
                                    :null)}

                                    {props.data.topic.split(',').length >3 && <Tooltip2 title={<h2>{props.data.topic.split(',').map((topic, index)=>index > 2 && 
                                      <div>{topic}</div>)}</h2>} arrow>
                                        <Button sx={{borderRadius:4, border:1, fontSize:"0.9em", mr:1,
                                        color:'#24BBFF', marginTop:1,textTransform:'capitalize',letterSpacing:'0.1em',
                                        marginRight:1, margin:"1 2 3 4", color:'#24BBFF'}} size="small">{topicCount-3 + " more"}</Button>
                                      </Tooltip2>}


                          </div>
                    </div>
                    {/*<div style={{fontSize:14, width:"18%", wordWrap: "break-word", whiteSpace: "pre-wrap", wordBreak: "break-word",*/}
                    {/*    flexDirection:'column',display:'flex',justifyContent:'center', }}>*/}
                    {/*<p><b>&nbsp;{props.data.description?props.data.description.substring(0,99): "Dataset Description"}</b><br></br>*/}
                    {/*      */}
                    {/*    </p>*/}
                    {/*</div>*/}

                     <Divider orientation="vertical" flexItem variant="middle"/>

                    <div style={{width:"7%",flexDirection:'column',display:'flex',justifyContent:'center', }}>
                      <div style={{color:'#939EAA', paddingBottom:8}}>Row Count:</div>
                        <div style={{fontWeight:700, fontSize:"1.1250em", color:'#030D55'}}>{props.data.row_count?props.data.row_count.toLocaleString(): "0"}</div>
                    </div>

                      <Divider orientation="vertical" flexItem variant="middle"/>

                      <div style={{width:"8%",flexDirection:'column',display:'flex',justifyContent:'center',}}>
                          <div style={{color:'#939EAA', paddingBottom:8}} >Data Points:</div>
                          <div style={{fontWeight:700, fontSize:"1.1250em", color:'#030D55'}}>{props.data.data_points?props.data.data_points.toLocaleString(): "0"}</div>
                      </div>

                    <Divider orientation="vertical" flexItem variant="middle"/>

                    <div style={{width:"7%",flexDirection:'column',display:'flex',justifyContent:'center', }}>
                        <div style={{color:'#939EAA', paddingBottom:8}}>Datasources:</div>
                        <div style={{ffontWeight:700, fontSize:"1.1250em", color:'#030D55'}}>{props.data.data_sources?props.data.data_sources: "0"}</div>
                    </div>

                    <Divider orientation="vertical" flexItem variant="middle"/>

                    <div style={{width:"4%",flexDirection:'column',display:'flex',justifyContent:'center', paddingRight:18, }}>
                        <div style={{color:'#939EAA', paddingBottom:8,}}>Topics:&nbsp;</div>
                        <div style={{fontWeight:700, fontSize:"1.1250em", color:'#030D55'}}>{props.data.topic?props.data.topic.split(",").length: "0"}</div>
                    </div>

                    <Divider orientation="vertical" flexItem variant="middle"/>
                    {/* <div style={{fontSize:14, cursor:'pointer',width:"12%"}} 
                        onClick={()=>props.handleOpenDetails(props.data)}>
                      <p><b>{props.geo?"View Details": "View Details"}</b></p>
                    </div> */}
                    {router.pathname.includes('/searchresult')?"":
                        router.pathname.includes('/createsignalsecond')?
                        <div style={{ cursor:'pointer'}} 
                        onClick={()=>handleRemove()}>
                          <p><ClearIcon /></p>
                        </div>:
                    <div style={{display:'flex',justifyContent:'center', paddingRight:12,
                         cursor:'pointer', width:"5%", }}
                        onClick={()=>{
                          router.push('/dataset/'+props.data.ID)

                          props.user !== null && props.user !== undefined &&  mixpanel.track('Dataset Card Operations', {
                            'source': "Data Platform Dashboard",
                            'action': "clicked on operations icon",
                            'dataset': props.data.ID,
                              'email': props.user.email
                          });
                          }
                        }>
                        <Button sx={{borderRadius:2, borderColor:'#5A00E2', color:'#5A00E2', textTransform:'capitalize'}} variant="outlined">View</Button>
                    </div>}
              </div>
    )

}