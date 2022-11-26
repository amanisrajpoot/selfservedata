import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteUserDataset, getPublicDatasets, updateUserDataset} from "../function/users"
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Tooltip2 from '@mui/material/Tooltip';
import ArticleIcon from '@mui/icons-material/Article';


export default function CatalogCardOut({token, data, datasetMode, setDatasetMode,localTitle,setLocalTitle,localDescription,
    setLocalDescription, localTopic, setLocalTopic, localDataset, setLocalDataset, userdatasets, setUserDatasets,
    deleteF, updateF, dataSources, setDataSources, currentTopic, setCurrentTopic, setLocalSource, setLocalSourceURL,
    localSource, localSourceURL
}){

    useEffect(() => {
        setLocalTitle(data.title);
        setLocalDescription(data.description);
        setLocalTopic(data.topic);
        setLocalSource(data.source_description)
        setLocalSourceURL(data.source_url)
        setLocalDataset(userdatasets)
    }, [userdatasets])

    const router = useRouter();

    useEffect(() => {
        setLocalDataset({...userdatasets, title:localTitle, description:localDescription,topic:localTopic,
        source_description:localSource, source_url:localSourceURL, });
    }, [localTitle, localDescription, localTopic, localSource, localSourceURL]);

    useEffect(() => {console.log("DATATATA",data)})

    // useEffect(() => {
    //     if(data !== null && data !== undefined){
    //     setCurrentTopic(data.topic)
    //     console.log("current Topic", currentTopic)
    //     }
        
    // }, [data.topic]);

    return (
        <div style={{width:"100%",display:"flex", flexDirection:'column',backgroundColor:'#fff',borderRadius:16,minHeight:'34vh', fontSize:'1em'}}>
          <div style={{display:"flex", flexDirection:'row', height:'100%', maxHeight:'100%',
            justifyContent:'space-between', paddingRight:76 ,paddingLeft: '1.5ch'}}>
              
              {datasetMode === 0? <div style={{display:'flex', flexDirection:'column', width:"100%", paddingTop:16,minHeight:'34vh',
                  wordWrap: "break-word", whiteSpace: "pre-wrap", wordBreak: "break-word", justifyContent:'space-around',
                  alignItems:'space-around'}}>
   
                    <div><b>{data.title?data.title:""}</b></div>
                    <div>{data.description?data.description:""} </div>
                      <div style={{display:'flex', alignItems:'center'}}><b>{"Topics:  "}</b>
                          {data.topic?data.topic.split(',').map((topic, index)=>index < 6 && <Tooltip2 title={<h2>{topic}</h2>} arrow><Button sx={{borderRadius:4, 
                            border:1, fontSize:"0.75em", mr:1,textTransform:'capitalize',letterSpacing:'0.1em',
                                    color:'#24BBFF'}} size="small"
                                  onClick={()=>router.push({
                                  pathname: `/topic/${topic}`,
                                  query:{
                                      currentRouteTitle:router.pathname.includes('/browsecatalogue')?"Browsing Catalogs":
                                          router.pathname.includes('/catalog')?data.title:
                                              router.query.tid
                                  }
                                  })}>{topic.substring(0,17) +".."}</Button></Tooltip2 >)
                              : "6"}</div>
                      {/* <div style={{display:'flex',width:'100%', }}>
                          <div style={{display:'flex',wordWrap: "break-word",width:'25%',
                              whiteSpace: "pre-wrap", wordBreak: "break-word",  }}>
                              <b>Datasources: </b> {data.data_sources?data.data_sources:"0"}
                          </div>
                          <div style={{display:'flex' }}>
                              <b>No. of Rows: </b>{data.row_count?data.row_count.toLocaleString():"0"}
                          </div>
                      </div>

                      <div style={{display:'flex',width:'100%', alignItems:'center' }}>
                          <div style={{display:'flex',wordWrap: "break-word", width:'25%',
                              whiteSpace: "pre-wrap", wordBreak: "break-word", }}>
                              <b>Data Points: </b> {data.data_points?data.data_points.toLocaleString():""}
                          </div>
                          <div style={{display:'flex', alignItems:'center', }}><div style={{paddingRight:4,}}><b>Key Features:</b></div>
                              {data.features?data.features.split(',').map((feature, index)=>index < 6 && <Button sx={{borderRadius:4, 
                                border:1, fontSize:"0.75em", mr:1,color:'#24BBFF', textTransform:'capitalize',letterSpacing:'0.1em',}} 
                                size="small">{feature.substring(0.16)}</Button>)
                                  : "6"}</div>
                      </div> */}
                      <div><b>{"Source: "}</b>{data.source_description?data.source_description:""}</div>
                    <div><b>{"Source URL: "}</b>{data.source_url?data.source_url:""} </div>
                    <div><ArticleIcon onClick={() => window.open(data.dataset_upload_file_path, "_self")}
                        style={{cursor:"pointer", fontSize:'4rem'}}/> 
                        <div>{data.dataset_uploaded_file_name?data.dataset_uploaded_file_name:""} </div>
                        </div>
              </div>
              : null}

              {datasetMode === 1? <div style={{display:'flex', minWidth:'100%', justifyContent:'space-between'}}>
                <div style={{display:'flex', alignItems:'center', 
                  justifyContent:'space-between', width:"45%",
                  wordWrap: "break-word", whiteSpace: "pre-wrap", wordBreak: "break-word"}}>
   
                  <FormControl fullWidth sx={{minWidth:'100%' }}>
                    <TextField value={localTitle} size="small" onChange={(e)=>{setLocalTitle(e.target.value)}}
                    label="Title" variant="outlined" sx={{minWidth:"100%", paddingBottom:'1rem'}}/>
                    
                    <TextField value={localDescription} size="small" multiline maxRows={5}
                        onChange={(e)=>{setLocalDescription(e.target.value)}}
                        label="Description" variant="outlined"sx={{minWidth:"100%",paddingBottom:'1rem'}}/>
                    
                    <TextField value={localTopic} size="small" multiline maxRows={4}
                        onChange={(e)=>{setLocalTopic(e.target.value)}}
                        label="Topic" variant="outlined" sx={{minWidth:"100%",paddingBottom:'1rem'}}/>

                    </FormControl>

              </div>

                <div style={{display:'flex', alignItems:'center', 
                justifyContent:'space-between', width:"45%",
                wordWrap: "break-word", whiteSpace: "pre-wrap", wordBreak: "break-word"}}>

                <FormControl fullWidth sx={{minWidth:'100%' }}>
                
                <TextField value={localSource} size="small" multiline maxRows={4}
                    onChange={(e)=>{setLocalSource(e.target.value)}}
                    label="Source" variant="outlined" sx={{minWidth:"100%",paddingBottom:'1rem'}}/>
                
                <TextField value={localSourceURL} size="small" multiline maxRows={4}
                    onChange={(e)=>{setLocalSourceURL(e.target.value)}}
                    label="Source URL" variant="outlined" sx={{minWidth:"100%",paddingBottom:'1rem'}}/>


                </FormControl>
                

                </div>
            </div>
              : null}

                {datasetMode === 2?
                <>
                <div style={{display:'flex',width:'25%',wordWrap: "break-word", 
                    whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                <p><b>Datasources:</b> {data.catalog?data.catalog.length:"0"}<br></br><br></br><br></br>
                    <b>No. of Rows:</b>{data.row_count?data.row_count:"0"}<br></br><br></br><br></br>
                        <b>Data Points:</b> {data.data_points?data.data_points:""}</p>
                
                </div>
                </>
                : null} 

            </div>

        </div>
   
    )

}