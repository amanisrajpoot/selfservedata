import {useState, } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomepageCards from '../components/HomepageCards';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import mixpanel from 'mixpanel-browser';

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true}); 


export default function ApiTester() {
  const [data, setData] = useState({})

  async function getDataSourceInfoByID({token, data}){
    const req = {
        method:"POST",
        // headers: {
        //     'Content-Type': 'application/json',
        //     //'authorization': token
        // },
        body: JSON.stringify(data)
    };
    const res = await fetch("https://heruko-nocors.herokuapp.com/https://5hns54u9o3.execute-api.us-east-1.amazonaws.com/Prod/api/HomeAPI/GetDataSourceInfoByID", req)
    return res.json()
}
  
  return (
    <Button onClick={getDataSourceInfoByID()}>
          Click
    </Button>
  );
}

