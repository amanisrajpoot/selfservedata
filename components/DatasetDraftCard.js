import React, {useEffect, useState} from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import SettingsIcon from '@mui/icons-material/Settings';
import mixpanel from 'mixpanel-browser';
import {deleteUserDataset, getUser} from "../function/users";
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true});

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

export default function DatasetDraftCard(props){
    const [show, setShow] = React.useState(false);
    const router = useRouter();
    const[added, setAdded] = React.useState(false);
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);
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

    async function deleteF(dataF){
        console.log(dataF)
        const data = await deleteUserDataset({token:props.token, data:dataF});
        if(data){
            router.reload()
        }
    }

    return (
        <div style={{display:"flex", flexDirection:'column', marginRight:8,
                borderRadius:8, height:'100%', minWidth:'44ch', maxWidth:'44ch',
        border:router.pathname.includes("/dataset/")?"1px solid #5A00E2":null}}>
          <div style={{display:"flex", flexDirection:'column',  minheight:'29vh', borderRadius:9,
              justifyContent:'space-around', alignItems:'center' ,backgroundColor:'#fff', paddingLeft:12,minWidth:"42ch",
              textOverflow:'clip',
              minHeight:router.pathname.includes("/dataset/")?'20vh':'34vh',}}>

                    <div style={{fontSize:15, width:"100%", overflow:'hidden',
                        flexDirection:'column',display:'flex',justifyContent:'center', }}>
                      <div style={{textOverflow:'clip', overflow:'hidden',}}><b>{props.data.title?props.data.title: "Sample Dataset"+props.data.ID}</b><br></br>
                            </div>
                        <div>{props.data.description?props.data.description.substring(0,99): "Dataset Description"}</div>

                    </div>
                    {/*<div style={{fontSize:14, width:"18%", wordWrap: "break-word", whiteSpace: "pre-wrap", wordBreak: "break-word",*/}
                    {/*    flexDirection:'column',display:'flex',justifyContent:'center', }}>*/}
                    {/*<p><b>&nbsp;{props.data.description?props.data.description.substring(0,99): "Dataset Description"}</b><br></br>*/}
                    {/*      */}
                    {/*    </p>*/}
                    {/*</div>*/}

              {router.pathname.includes("/dataset/")?null:<Divider  flexItem variant="middle"/>}

              <div style={{display:'flex', flexDirection:"row", width:'100%'}}>
                    <div style={{fontSize:12,width:"26%",flexDirection:'column',display:'flex',justifyContent:'center', }}>
                      <div >Row Count</div>
                        <div style={{fontWeight:'bold', fontSize:15, color:"#5A00E2"}}>{props.data.row_count?props.data.row_count.toLocaleString(): "123"}</div>
                    </div>

                      <div style={{fontSize:12,width:"26%",flexDirection:'column',display:'flex',justifyContent:'center',}}>
                          <div >Data Points</div>
                          <div style={{fontWeight:'bold', fontSize:15, color:"#5A00E2"}}>{props.data.data_points?props.data.data_points.toLocaleString(): "567"}</div>
                      </div>

                      <div style={{fontSize:12,width:"28%",flexDirection:'column',display:'flex',justifyContent:'center',}}>
                          <div >Data Source</div>
                          <div style={{fontWeight:'bold', fontSize:15, color:"#5A00E2"}}>{props.data.data_sources?props.data.data_sources.toLocaleString(): "123"}</div>
                      </div>

                      <div style={{fontSize:12,width:"20%",flexDirection:'column',display:'flex',justifyContent:'center', }}>
                          <div >Topics</div>
                          <div style={{fontWeight:'bold', fontSize:15, color:"#5A00E2"}}>{props.data.topic?props.data.topic.split(",").length.toLocaleString(): "6"}</div>
                      </div>
              </div>

              {router.pathname.includes("/dataset/")?null:<Divider  flexItem variant="middle"/>}

              {router.pathname.includes("/dataset/")?null:<Box sx={{ width: '100%',color:"#24BBFF" }}>
                  <LinearProgressWithLabel color='inherit' value={70} sx={{ color:"#24BBFF"}} />
              </Box>}
                    {/* <div style={{fontSize:14, cursor:'pointer',width:"12%"}} 
                        onClick={()=>props.handleOpenDetails(props.data)}>
                      <p><b>{props.geo?"View Details": "View Details"}</b></p>
                    </div> */}
                    {router.pathname.includes('/searchresult')?"":
                        router.pathname.includes('/createsignalsecond')?
                        <div style={{fontSize:14, cursor:'pointer'}} 
                        onClick={()=>handleRemove()}>
                          <p><ClearIcon /></p>
                        </div>:
                    <div style={{display:'flex',alignItems:'space-between', justifyContent:'space-between',
                        fontSize:14, cursor:'pointer', width:'96%', paddingRight:9 }}
                        >
                        {router.pathname.includes("/dataset/")?null:<>
                            <div><Button sx={{borderRadius:2, color:'#FF6262',paddingTop:1,borderColor:"#FF6262", }}
                                         variant="outlined"
                                         onClick={()=>deleteF(props.data)}><DeleteIcon /></Button></div>
                            <div><Button sx={{borderRadius:2, color:'#667280', borderColor:'#667280', textTransform: "capitalize"}} variant="outlined"
                                         onClick={()=>{router.push('/dataset/'+props.data.ID)}}>Edit Details</Button></div></>}
                    </div>}

              </div>
            {router.pathname.includes("/dataset/")?<div style={{width:"100%", backgroundColor:"#5A00E2", color:'white',height:'7vh', textAlign:'center',
                display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer'}}
                                                       onClick={()=>{
                                                           router.push('/dataset/'+props.data.ID)}}>View More Details
            </div>:null}

          </div>
    )

}