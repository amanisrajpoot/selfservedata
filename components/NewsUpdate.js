import {useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import { confirmSignUp, signIn, signOut } from '../function/checkAuth';
import DataSourcesDetails from '../components/datasourcesdetails';
import {useRouter} from 'next/router';
import {getPublicDatasets, getDatasets, getUser} from '../function/users';
import LeftNav from "../components/LeftNav";
import mixpanel from 'mixpanel-browser';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import { RWebShare } from "react-web-share";
import styles from '../styles/dashboard.module.css';
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Auth } from 'aws-amplify';
import {createUser} from "../function/users";
mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true});
import {
    CartesianGrid,
    XAxis,
    YAxis,
    BarChart,
    ResponsiveContainer,
    Bar, 
    Tooltip,
    Legend,
  } from "recharts";
import { Description } from '@mui/icons-material';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function NewsUpdate({
                                      token,
                                      setToken,
                                      dataset,
                                      userdatasets,
                                      setUserdatasets,
                                      dataSources,
                                      setDataSources,
                                      user,
                                      name,
                                      email, 
                                      company,
                                      setuser,
                                      title,
                                      description,
                                      url,

                                  }) 

{
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today  = new Date();
    const post2 = new Date(2018, 0, 1, 10, 33);

    return (
        <div style={{height:'22ch', minWidth:'32.5%', maxWidth:'32.5%', backgroundColor:'#FFF',
                                marginRight:14, display:'flex', flexDirection:'column',marginBotoom:8,
                                justifyContent:"space-around", flex:'end',borderRadius:9,}}>
                                <div style={{marginLeft:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'column',
                                    lineHeight:"22px", justifyContent:'space-between',  paddingTop:18, marginRight:18,
                                }}
                                >
                                    <div onClick={()=>{
                                        mixpanel.track('Redirected to 2nd Industry Wide Trends URL', {
                                            'source': "Dashboard Page",
                                            'action': "2nd Industry Wide Trends Clicked",
                                            "url": "https://medcitynews.com/2020/02/from-data-to-ai-how-these-4-tech-trends-are-reshaping-healthcare/",
                                            'email': user.email !== null && user.email !== undefined && user.email,
                                        });
                                        router.push('https://medcitynews.com/2020/02/from-data-to-ai-how-these-4-tech-trends-are-reshaping-healthcare/')
                                    }}>
                                        <div style={{color:'black', fontSize:18, fontWeight:'500'}}
                                        >{title}</div>
                                        <div style={{paddingTop:12,color:'#667280'}}>{description}</div>
                                    </div>
                                    <div style={{paddingTop:18,color:'gray', display:'flex',paddingBottom:24,
                                        justifyContent:'space-between', alignItems:'center'}}>
                                        <div style={{color:'gray',fontSize:14}}>{post2.toLocaleDateString("en-US", options)}</div>
                                        <RWebShare
                                            data={{
                                                text: {description},
                                                url: "https://medcitynews.com/2020/02/from-data-to-ai-how-these-4-tech-trends-are-reshaping-healthcare/",
                                                title: {title},
                                            }}
                                            // onClick={() => {
                                            //     mixpanel.track('Shared 2nd Industry Wide Trends URL', {
                                            //         'source': "Dashboard Page",
                                            //         'action': "Clicked on Share button of 2nd Industry Wide Trends",
                                            //         "url": "https://medcitynews.com/2020/02/from-data-to-ai-how-these-4-tech-trends-are-reshaping-healthcare/",
                                            //         'email': user.email !== null && user.email !== undefined && user.email,
                                            //     });
                                            //     console.log("shared successfully!")
                                            // }}
                                        >
                                            <Button
                                                variant="outlined"
                                                sx={{ borderRadius:2, borderColor:'#667280', color:'#667280',
                                                    textTransform:'capitalize'}}
                                            >Share</Button>
                                        </RWebShare>
                                    </div>
                                </div>
                            </div>

                                  )}