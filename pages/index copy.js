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

const drawerWidth = 256;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeIndustry = (event) => {
    setIndustry(event.target.value);
  };

  const handleChangeAnalysis = (event) => {
    setAnalysis(event.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  return (
    
    <Box sx={{width:'100%'}}>
        <Navbar />
        <Box sx={{ display: 'flex', flexDirection:'column', 
              py: 6, px: 14, height:'88vh', bgcolor: '#94bbe9', 
              alignItems:'center', justifyContent:'center', color:'#eeeeee',
              backgroundSize: "140% 130%", backgroundPosition: "bottom",
              backgroundImage: `url(${'/home-background04.jpg'/*'https://www.readysignal.com/wp-content/uploads/2021/01/homepage-banner.jpg'*/})`,
              }} >
        
            <Box sx={{pt:8,pb: 6}}>
                <Typography color="inherit" variant="h2" component="h2" 
                    sx={{display:'flex', flexDirection:'column', maxWidth: '800px',
                        textAlign:'center',py:0, my:0, color:'#fff'}}>
                    {"Harness the Most Powerful Open Source Data in Minutes"}  
                </Typography>
            </Box>

            <Box sx={{pb: 6}}>
                <Typography color="inherit" variant="h4" component="h1" 
                sx={{display:'flex',color:'#fff'}}>
                {"Delivered in the Platform of Your Choice"}    
                </Typography>
            </Box>

            <Box sx={{pb:1}}>
                <Button variant="contained" size="large" href="/signup" color="primary"
                sx={{fontSize:24, color:'#eeeeee',
                backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}>
            {"Sign up Free"}</Button>
            </Box>

            <Box sx={{pb: 6}}>
                <Typography color="inherit" variant="h6" component="h1" 
                sx={{display:'flex',color:'#fff' }}>
                {"NO CREDIT CARD NEEDED"}      
                </Typography>
            </Box>

            {/* <Box>
              <img src='https://giphy.com/embed/vkCZgsnix2JcjL3ZF6' />

            </Box> */}
      
        </Box>

            <Footer />
    </Box>
  );
}

