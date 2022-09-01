import {useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import { confirmSignUp, signIn, signOut } from '../function/checkAuth';
import DataSourcesDetails from './datasourcesdetails';
import {useRouter} from 'next/router';
import {getPublicDatasets, getDatasets, getUser} from '../function/users';
import LeftNav from "./LeftNav";
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
import router from 'next/router'
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

export default function MyActivity({
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
                                      categoryName,
                                      catalogCount

                                  }) 

{
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today  = new Date();
    const post2 = new Date(2018, 0, 1, 10, 33);
    const router = useRouter()

    return (
        <div style={{height:'20ch', minWidth:'25%', maxWidth:'25%', backgroundColor:'#FFF',paddingBottom:'2rem',
                                display:'flex', flexDirection:'column',marginBottom:8,marginRight:14,
                                justifyContent:"space-around", flex:'end',borderRadius:9,}}>
                                
                                <div style={{cursor:'pointer', display:'flex', flexDirection:'column',
                                    lineHeight:"22px", justifyContent:'center',   alignItems:'center', 

                                }}
                                onClick={()=>router.push({
                                    pathname: `/datasets/`,
                                    query:{
                                        currentRouteTitle:router.pathname.includes('/browsecatalogue')?"Browsing Catalogs":
                                            router.pathname.includes('/topic')?"Topics":
                                            router.pathname.includes('/datasets')?"Browsing Your Datasets":
                                            router.pathname.includes('/catalog')?"Browsing Catalog":
                                            router.pathname.includes('/searchresult')?"Search Results":
                                            router.pathname.includes('/dashboard')?"Dashboard":
                                            router.pathname.includes('/dataset')?props.data.title:
                                            router.query.tid,
                                            datasetRecentType:"dashboard"
                                    }})}
                                >
                                    <div style={{
                                                    fontStyle: 'normal',
                                                    fontWeight: '700',
                                                    fontSize: '36px',
                                                    lineHeight: '33px',
                                                    paddingBottom:'2rem',
                                                    /* identical to box height */
                                                    letterSpacing: '0.01em',
                                                    paddingTop:'1rem',

                                                    /* Primary/Primary_Purple */
                                                    color: '#474F5A',
                                                    /* Inside auto layout */
                                                    }}>
                                        {categoryName ? categoryName: "Category"}
                                        
                                    </div>
                                    <div style={{display:'flex', flexDirection:'row', justifyContent:'center',
                                        alignItems:'center', }}
                                    >
                                        {categoryName === "Catalogs" ?
                                            <svg width="42" height="42" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.3702 5.55906L13.5102 2.94906C12.6502 2.56906 11.3502 2.56906 10.4902 2.94906L4.63018 5.55906C3.15018 6.21906 2.93018 7.11906 2.93018 7.59906C2.93018 8.07906 3.15018 8.97906 4.63018 9.63906L10.4902 12.2491C10.9202 12.4391 11.4602 12.5391 12.0002 12.5391C12.5402 12.5391 13.0802 12.4391 13.5102 12.2491L19.3702 9.63906C20.8502 8.97906 21.0702 8.07906 21.0702 7.59906C21.0702 7.11906 20.8602 6.21906 19.3702 5.55906Z" fill={router.pathname.includes('/browsecatalogue')? '#5A00E2':'#474F5A'}/>
                                            <path opacity="0.4" d="M11.9998 17.708C11.6198 17.708 11.2398 17.628 10.8898 17.478L4.14982 14.478C3.11982 14.018 2.31982 12.788 2.31982 11.658C2.31982 11.248 2.64982 10.918 3.05982 10.918C3.46982 10.918 3.79982 11.248 3.79982 11.658C3.79982 12.198 4.24982 12.898 4.74982 13.118L11.4898 16.118C11.8098 16.258 12.1798 16.258 12.4998 16.118L19.2398 13.118C19.7398 12.898 20.1898 12.208 20.1898 11.658C20.1898 11.248 20.5198 10.918 20.9298 10.918C21.3398 10.918 21.6698 11.248 21.6698 11.658C21.6698 12.778 20.8698 14.018 19.8398 14.478L13.0998 17.478C12.7598 17.628 12.3798 17.708 11.9998 17.708Z" fill={router.pathname.includes('/browsecatalogue')? '#5A00E2':'#474F5A'}/>
                                            <path opacity="0.4" d="M11.9998 22.6689C11.6198 22.6689 11.2398 22.5889 10.8898 22.4389L4.14982 19.4389C3.03982 18.9489 2.31982 17.8389 2.31982 16.6189C2.31982 16.2089 2.64982 15.8789 3.05982 15.8789C3.46982 15.8789 3.79982 16.2089 3.79982 16.6189C3.79982 17.2489 4.16982 17.8189 4.74982 18.0789L11.4898 21.0789C11.8098 21.2189 12.1798 21.2189 12.4998 21.0789L19.2398 18.0789C19.8098 17.8289 20.1898 17.2489 20.1898 16.6189C20.1898 16.2089 20.5198 15.8789 20.9298 15.8789C21.3398 15.8789 21.6698 16.2089 21.6698 16.6189C21.6698 17.8389 20.9498 18.9389 19.8398 19.4389L13.0998 22.4389C12.7598 22.5889 12.3798 22.6689 11.9998 22.6689Z" fill={router.pathname.includes('/browsecatalogue')? '#5A00E2':'#474F5A'}/>
                                            </svg>
                                            : categoryName === 'Datasets'?
                                            <svg width="64" height="46" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.75 12.666C21.75 13.6325 20.9665 14.416 20 14.416C19.0335 14.416 18.25 13.6325 18.25 12.666C18.25 11.6995 19.0335 10.916 20 10.916C20.9665 10.916 21.75 11.6995 21.75 12.666Z" 
                                            fill={router.pathname.includes('/datasets')?"#5A00E2":'#474F5A'} stroke="#5A00E2"/>
                                            <path d="M21.75 4.66602C21.75 5.63251 20.9665 6.41602 20 6.41602C19.0335 6.41602 18.25 5.63251 18.25 4.66602C18.25 3.69952 19.0335 2.91602 20 2.91602C20.9665 2.91602 21.75 3.69952 21.75 4.66602Z" 
                                            fill={router.pathname.includes('/datasets')?"#5A00E2":'#474F5A'} stroke="#5A00E2"/>
                                            <path d="M20 22.916C21.2426 22.916 22.25 21.9087 22.25 20.666C22.25 19.4234 21.2426 18.416 20 18.416C18.7574 18.416 17.75 19.4234 17.75 20.666C17.75 21.9087 18.7574 22.916 20 22.916Z" 
                                            fill={router.pathname.includes('/datasets')?"#5A00E2":'#474F5A'}/>
                                            <path d="M4 14.916C5.24264 14.916 6.25 13.9087 6.25 12.666C6.25 11.4234 5.24264 10.416 4 10.416C2.75736 10.416 1.75 11.4234 1.75 12.666C1.75 13.9087 2.75736 14.916 4 14.916Z" 
                                            fill={router.pathname.includes('/datasets')?"#5A00E2":'#474F5A'}/>
                                            <path opacity="0.4" d="M19 13.416C19.41 13.416 19.75 13.076 19.75 12.666C19.75 12.256 19.41 11.916 19 11.916H11.75V7.66602C11.75 6.08602 12.42 5.41602 14 5.41602H19C19.41 5.41602 19.75 5.07602 19.75 4.66602C19.75 4.25602 19.41 3.91602 19 3.91602H14C11.58 3.91602 10.25 5.24602 10.25 7.66602V11.916H5C4.59 11.916 4.25 12.256 4.25 12.666C4.25 13.076 4.59 13.416 5 13.416H10.25V17.666C10.25 20.086 11.58 21.416 14 21.416H19C19.41 21.416 19.75 21.076 19.75 20.666C19.75 20.256 19.41 19.916 19 19.916H14C12.42 19.916 11.75 19.246 11.75 17.666V13.416H19Z" 
                                            fill={router.pathname.includes('/datasets')?"#5A00E2":'#474F5A'}/>
                                        </svg>
                                            : categoryName === 'Activity'?
                                            <svg width="53" height="54" viewBox="0 0 53 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.2346 53.2348C40.7235 53.2348 52.4691 41.4891 52.4691 27.0002C52.4691 12.5112 40.7235 0.765625 26.2346 0.765625C11.7456 0.765625 0 12.5112 0 27.0002C0 41.4891 11.7456 53.2348 26.2346 53.2348Z" fill="#24BBFF"/>
                                                <path d="M18.0761 18.2105C17.8458 18.2105 17.625 18.119 17.4623 17.9563C17.2995 17.7935 17.208 17.5727 17.208 17.3424V15.6063C17.208 15.3761 17.2995 15.1553 17.4623 14.9925C17.625 14.8297 17.8458 14.7383 18.0761 14.7383C18.3063 14.7383 18.5271 14.8297 18.6899 14.9925C18.8527 15.1553 18.9441 15.3761 18.9441 15.6063V17.3424C18.9441 17.5727 18.8527 17.7935 18.6899 17.9563C18.5271 18.119 18.3063 18.2105 18.0761 18.2105Z" fill="white"/>
                                                <path d="M23.2846 18.2105C23.0543 18.2105 22.8335 18.119 22.6708 17.9563C22.508 17.7935 22.4165 17.5727 22.4165 17.3424V15.6063C22.4165 15.3761 22.508 15.1553 22.6708 14.9925C22.8335 14.8297 23.0543 14.7383 23.2846 14.7383C23.5148 14.7383 23.7356 14.8297 23.8984 14.9925C24.0612 15.1553 24.1526 15.3761 24.1526 15.6063V17.3424C24.1526 17.5727 24.0612 17.7935 23.8984 17.9563C23.7356 18.119 23.5148 18.2105 23.2846 18.2105Z" fill="white"/>
                                                <path d="M20.6803 30.3634C18.8392 30.3613 17.074 29.629 15.7722 28.3271C14.4703 27.0252 13.738 25.2601 13.7358 23.419V18.6981C13.7352 18.1171 13.9291 17.5526 14.2866 17.0947C14.6441 16.6368 15.1447 16.3118 15.7085 16.1715L17.8654 15.6325C17.9766 15.603 18.0925 15.5959 18.2065 15.6117C18.3204 15.6274 18.4301 15.6656 18.5292 15.724C18.6282 15.7825 18.7147 15.8601 18.7835 15.9522C18.8523 16.0444 18.9021 16.1493 18.93 16.2609C18.9579 16.3725 18.9634 16.4885 18.9461 16.6022C18.9288 16.7159 18.8891 16.825 18.8292 16.9232C18.7694 17.0215 18.6906 17.1068 18.5975 17.1743C18.5044 17.2419 18.3988 17.2902 18.2868 17.3165L16.1298 17.8557C15.9417 17.9023 15.7748 18.0107 15.6555 18.1634C15.5363 18.3161 15.4716 18.5043 15.472 18.6981V23.419C15.472 24.8003 16.0207 26.1251 16.9974 27.1018C17.9742 28.0786 19.299 28.6273 20.6803 28.6273C22.0616 28.6273 23.3864 28.0786 24.3631 27.1018C25.3399 26.1251 25.8886 24.8003 25.8886 23.419V18.6981C25.8888 18.5044 25.8242 18.3162 25.7049 18.1636C25.5857 18.011 25.4188 17.9027 25.2308 17.856L23.0738 17.3165C22.8533 17.2581 22.6647 17.1152 22.5487 16.9187C22.4328 16.7223 22.3988 16.4881 22.4542 16.2668C22.5095 16.0455 22.6498 15.8549 22.8446 15.7362C23.0394 15.6175 23.2731 15.5803 23.4951 15.6325L25.6521 16.1717C26.2158 16.3119 26.7164 16.6369 27.0739 17.0948C27.4314 17.5527 27.6254 18.1171 27.6247 18.6981V23.419C27.6226 25.2601 26.8903 27.0252 25.5884 28.3271C24.2865 29.629 22.5214 30.3613 20.6803 30.3634Z" fill="white"/>
                                                <path d="M31.0967 39.0445H24.1523C23.0016 39.0431 21.8984 38.5854 21.0847 37.7718C20.2711 36.9581 19.8134 35.8549 19.812 34.7042V29.4959C19.812 29.2657 19.9035 29.0449 20.0663 28.8821C20.2291 28.7193 20.4498 28.6278 20.6801 28.6278C20.9103 28.6278 21.1311 28.7193 21.2939 28.8821C21.4567 29.0449 21.5481 29.2657 21.5481 29.4959V34.7042C21.5489 35.3946 21.8235 36.0566 22.3117 36.5448C22.7999 37.033 23.4619 37.3076 24.1523 37.3084H31.0967C31.7872 37.3076 32.4491 37.033 32.9373 36.5448C33.4255 36.0566 33.7001 35.3946 33.7009 34.7042V28.6278C33.7009 28.3976 33.7924 28.1768 33.9551 28.014C34.1179 27.8512 34.3387 27.7598 34.569 27.7598C34.7992 27.7598 35.02 27.8512 35.1828 28.014C35.3456 28.1768 35.437 28.3976 35.437 28.6278V34.7042C35.4357 35.8549 34.9779 36.9581 34.1643 37.7718C33.3506 38.5854 32.2474 39.0431 31.0967 39.0445Z" fill="white"/>
                                                <path d="M34.5694 29.4952C33.8827 29.4952 33.2113 29.2916 32.6403 28.9101C32.0693 28.5285 31.6243 27.9862 31.3615 27.3518C31.0987 26.7173 31.0299 26.0192 31.1639 25.3456C31.2979 24.6721 31.6286 24.0534 32.1142 23.5678C32.5998 23.0822 33.2185 22.7515 33.892 22.6175C34.5655 22.4835 35.2637 22.5523 35.8982 22.8151C36.5326 23.0779 37.0749 23.5229 37.4564 24.0939C37.838 24.6649 38.0416 25.3363 38.0416 26.023C38.0406 26.9436 37.6744 27.8262 37.0235 28.4771C36.3725 29.128 35.49 29.4942 34.5694 29.4952ZM34.5694 24.2869C34.226 24.2869 33.8904 24.3887 33.6049 24.5795C33.3194 24.7702 33.0968 25.0414 32.9654 25.3586C32.834 25.6759 32.7997 26.0249 32.8666 26.3617C32.9336 26.6985 33.099 27.0078 33.3418 27.2506C33.5846 27.4934 33.8939 27.6588 34.2307 27.7258C34.5675 27.7927 34.9165 27.7584 35.2338 27.627C35.551 27.4956 35.8222 27.273 36.0129 26.9875C36.2037 26.702 36.3055 26.3664 36.3055 26.023C36.305 25.5627 36.122 25.1214 35.7965 24.7959C35.471 24.4704 35.0297 24.2874 34.5694 24.2869Z" fill="white"/>
                                                <path d="M20.6804 26.8902C18.179 26.7735 15.8036 25.7585 13.9903 24.0317C13.8321 23.8679 13.7446 23.6487 13.7466 23.4211C13.7486 23.1935 13.8399 22.9757 14.0008 22.8148C14.1618 22.6538 14.3795 22.5626 14.6071 22.5606C14.8347 22.5586 15.054 22.6461 15.2177 22.8042C16.7095 24.1995 18.6414 25.0305 20.6804 25.154C22.7207 25.0367 24.6547 24.2048 26.143 22.8042C26.3067 22.6461 26.526 22.5586 26.7536 22.5606C26.9812 22.5626 27.1989 22.6538 27.3599 22.8148C27.5208 22.9757 27.6121 23.1935 27.6141 23.4211C27.6161 23.6487 27.5286 23.8679 27.3705 24.0317C25.5571 25.7585 23.1817 26.7735 20.6804 26.8902Z" fill="white"/>
                                                </svg>
                                            : null}


                                        <div style={{width: '66px',
                                                    height: '33px',
                                                    fontStyle: 'normal',
                                                    fontWeight: '700',
                                                    fontSize: '60px',
                                                    lineHeight: '33px',
                                                    /* identical to box height */
                                                    letterSpacing: '0.01em',

                                                    /* Primary/Primary_Purple */
                                                    color: '#5A00E2',
                                                    /* Inside auto layout */
                                                    flex: 'none',
                                                    order: '1',
                                                    flexGrow: 0,
                                                    paddingLeft:'1rem'}}
                                            >{categoryName === "Catalogs" ? catalogCount && catalogCount !== null && catalogCount.length: 
                                                categoryName === "Datasets" ?  userdatasets && userdatasets !== null && userdatasets.length:
                                                categoryName === "Activity" ?  userdatasets && userdatasets !== null && userdatasets.length:null}</div>
                                    </div>
                                    
                                </div>
                            </div>

                                  )}