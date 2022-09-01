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

      <Box sx={{ display: 'flex', flexDirection:'column', 
              py: 6, px: 14, height:'40vh', bgcolor: '#eaeff1', 
               justifyContent:'center', color:'#000', 
              backgroundImage:'../components/homepage-banner.jpeg'
              }}>
        
            <Box sx={{pt:8,pb: 2}}>
                <Typography color="inherit" variant="h4" component="h1" 
                    sx={{display:'flex', flexDirection:'column', maxWidth: '800px',py:0, my:0, 
                        borderBottom:'1px #d2202f solid'}}>
                    {"Welcome to Data Platform"}  
                </Typography>
            </Box>

            <Box sx={{}}>
                <Typography color="inherit" variant="h5" component="h1" sx={{display:'flex' }}>
                {"Here is what we do for you:"}       
                </Typography>
            </Box>

            <Box sx={{pb:1, fontSize:20}}>
                <ol>
                  <li>We source controlled Healthcare data sets;</li>
                  <li>We organize and curate the data by adjusting for time and geographic granularity;</li>
                  <li>We simplify data ingestion through automated processes.</li>
                </ol>
            </Box>
      </Box>

      <Box sx={{ height:'90%', my:1, px:16, py:4,bgcolor: '#ffffff', display:'flex', flexDirection:'row',
                    alignItems:'center', justifyContent:'space-between', alignSelf:'center', width:'100%' }}>
             <HomepageCards />
             
      </Box>

      <Box sx={{ display: 'flex', flexDirection:'column', 
               px: 14, height:'40vh', bgcolor: '#fff', 
               justifyContent:'center', color:'#000', 
              backgroundImage:'../components/homepage-banner.jpeg'
              }}>
        
            <p>DATA TYPES</p>
            <Box sx={{pb: 2}}>
                <Typography color="inherit" variant="h4" component="h1" 
                    sx={{display:'flex', flexDirection:'column', maxWidth: '800px',py:0, my:0, 
                        borderBottom:'1px #d2202f solid' }}>
                    Take Into Account External Factors Impacting the Accuracy of Your Predictive Models
                </Typography>
            </Box>

            <Box sx={{}}>
                <Typography color="inherit" variant="h6" component="h1" sx={{display:'flex'}}>
                Data Continually Updated as New Information is Released and Delivered in Several Ways.    
                </Typography>
            </Box>
      </Box>

      <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-around', px:7, pb:4}}>
        {/* <Box sx={{display:'flex', flexDirection:'column', width:'10%'}}>
            <h2>Economic</h2>
            <img src='https://www.readysignal.com/wp-content/uploads/2021/01/Economic.svg' />
        </Box>

        <Box sx={{display:'flex', flexDirection:'column', width:'10%'}}>
            <h2>Weather</h2>
            <img src='https://www.readysignal.com/wp-content/uploads/2021/01/Weather.svg' />
        </Box> */}

        <Box sx={{display:'flex', flexDirection:'column', width:'10%'}}>
            <h2>Demographic</h2>
            <img src='https://www.readysignal.com/wp-content/uploads/2021/01/Demographic.svg' />
        </Box>

        <Box sx={{display:'flex', flexDirection:'column', width:'10%'}}>
            <h2>Diseases</h2>
            <img src='https://www.readysignal.com/wp-content/uploads/2021/01/COVID.svg' />
        </Box>

        <Box sx={{display:'flex', flexDirection:'column', width:'10%'}}>
            <h2>Drugs</h2>
            <img src='https://www.readysignal.com/wp-content/uploads/2021/01/Population.svg' />
        </Box>

      </Box>

      <Box sx={{ display: 'flex', flexDirection:'column', 
               pt:8, px: 14, bgcolor: '#fff', 
               justifyContent:'center', color:'#000', 
              backgroundImage:'../components/homepage-banner.jpeg'
              }}>
        
            <p>HOW TO GET OUR DATA</p>
            <Box sx={{pb: 2}}>
                <Typography color="inherit" variant="h4" component="h1" 
                    sx={{display:'flex', flexDirection:'column', maxWidth: '800px',py:0, my:0, 
                        borderBottom:'1px #d2202f solid'}}>
                    Download or Integrate All Our Data Sets Through Excel, CSV, FTP, RESTful API, or Pre-built Connectors, Including Domo.
                </Typography>
            </Box> 
      </Box>

      <Box sx={{ display: 'flex', flexDirection:'column', 
               py:0, px: 14,bgcolor: '#fff', 
               justifyContent:'center', color:'#000', 
              backgroundImage:'../components/homepage-banner.jpeg'
              }}>
              <Box sx={{backgroundColor:'#fff'}}>
                {/* <img style={{width:'120ch',}} 
                src="../components/homepage-banner.jpeg" />
                {// src='https://www.readysignal.com/wp-content/uploads/2021/01/Ready-Signal-Diagram.svg'}
                } */}
              </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection:'column', 
               pt:6,px: 14, bgcolor: '#fff', 
               justifyContent:'center', color:'#000', 
              backgroundImage:'../components/homepage-banner.jpeg'
              }}>
        
            <p>WHO IT’S FOR</p>
            <Box sx={{pb: 2}}>
                <Typography color="inherit" variant="h4" component="h1" 
                    sx={{display:'flex', flexDirection:'column', maxWidth: '800px',py:0, my:0, 
                        borderBottom:'1px #d2202f solid' }}>
                    Data-Driven Decision Makers
                </Typography>
            </Box> 
      </Box>

      <Box sx={{py:4,px:10, display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
        <Box sx={{width:"45%", bgcolor:'#eaeff1',p:4}}>
          <img style={{width:"15%"}} src="https://www.readysignal.com/wp-content/uploads/2021/01/Individual.svg"/>
          <h2 style={{borderBottom:'1px #d2202f solid' }}>Individual</h2>
          <p>Test new features fast. Change geographic aggregation instantly. Features are updated automatically.</p>
          <p>As an analyst, researcher, or data enthusiast, you will save time, 
            effort and energy by leveraging the power of the Healthcare Data platform. 
            The software allows you to aggregate thousands of data sets, 
            standardize the data based on your desired time and 
            geographic granularities and apply automated data science treatments all with the few clicks.</p>
        </Box>

        <Box sx={{width:"45%", bgcolor:'#eaeff1',p:4}}>
          <img style={{width:"27%"}} src="https://www.readysignal.com/wp-content/uploads/2021/01/Team.svg"/>
          <h2 style={{borderBottom:'1px #d2202f solid' }}>Team</h2>
          <p>Instantly share features across your team. Automate data science workflows.</p>
          <p>For teams of analysts building predictive models, 
            the shared Data platform allows for collaboration, 
            more robust Dataset characteristics including adding many more features simultaneously. 
            Full automation including data updates and application of data science treatments 
            included directly in enterprise data science work flows through R, Python, Domo, or API.</p>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection:'column', 
               pt:6,px: 14, bgcolor: '#fff', 
               justifyContent:'center', color:'#000', 
              backgroundImage:'../components/homepage-banner.jpeg'
              }}>
        
            <Box sx={{pb: 2}}>
                <Typography color="inherit" variant="h4" component="h1" 
                    sx={{display:'flex', flexDirection:'column', py:0, my:0, 
                        borderBottom:'1px #d2202f solid', }}
                    style={{textAlign:'center'}}>
                    {"DESIGNED FOR TODAY’S ANALYSTS & DATA SCIENTISTS"}
                </Typography>
            </Box> 
      </Box>

      <Box sx={{px:10,my:2, display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
        <Box sx={{width:"30%", bgcolor:'#eaeff1',p:4,}}>
          <img style={{width:"55%"}} src="https://www.readysignal.com/wp-content/uploads/2021/01/Deliver-Better-Results.svg"/>
          <h2 style={{borderBottom:'1px #d2202f solid' }}>Deliver Better Results</h2>
          <p>Deliver higher value insights and make a bigger impact with stakeholders by 
            including more and better control data in your predictive analytics.</p>
        </Box>

        <Box sx={{width:"30%", bgcolor:'#eaeff1',p:4}}>
          <img style={{width:"80%"}} src="https://www.readysignal.com/wp-content/uploads/2021/01/Get-More-Done.svg"/>
          <h2 style={{borderBottom:'1px #d2202f solid' }}>Get More Done</h2>
          <p>Execute more data science initiatives and focus on more challenging projects by 
            simplifying the process of finding and using control data in your models.</p>
        </Box>

        <Box sx={{width:"30%", bgcolor:'#eaeff1',p:4}}>
          <img style={{width:"50%"}} src="https://www.readysignal.com/wp-content/uploads/2021/01/Scale-Team-Skills.svg"/>
          <h2 style={{borderBottom:'1px #d2202f solid' }}>Scale Team Skills</h2>
          <p>Leverage recommendations and training to make better decisions and learn new skills. 
            Allow new team members to grow faster and be more impactful sooner.</p>
        </Box>
      </Box>
      
      {/* <Box sx={{py:4,px:14, display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
        <Box sx={{width:"30%",py:4,}}>
          <FormatQuoteIcon style={{fontSize:128}}/>
          
          <p>Deliver higher value insights and make a bigger impact with stakeholders by 
            including more and better control data in your predictive analytics.</p>
          <h2 style={{}}>Vinod Goyal</h2>
          <p style={{fontSize:28}}>Principal Data Scientist</p>
          <img src="https://www.readysignal.com/wp-content/uploads/2021/01/Domo.png" />
        </Box>

        <Box sx={{width:"1%",}}>
          <svg height='90%' width="">
            <line x1="0" y1="50" x2="0" y2="1080" style={{stroke:'black',strokeWidth:1}} />
          </svg>
        </Box>

        <Box sx={{width:"30%",py:4,}}>
          <FormatQuoteIcon style={{fontSize:128}}/>
          
          <p>Deliver higher value insights and make a bigger impact with stakeholders by 
            including more and better control data in your predictive analytics.</p>
          <h2 style={{}}>Mahendra Goyal</h2>
          <p style={{fontSize:28}}>Municipal Data Scientist</p>
          <img src="https://www.readysignal.com/wp-content/uploads/2021/01/Domo.png" />
        </Box>
      </Box> */}

      <Box sx={{ display: 'flex', flexDirection:'column', 
              py: 6, px: 14, height:'35vh', bgcolor: '#3e3e33', 
              alignItems:'center', justifyContent:'center', color:'#eeeeee', backgroundPosition:'top right',
              backgroundImage: `url(${'/home-background02.jpg'})`,
              }} >

            <Box sx={{pb:1}}>
                <Button variant="contained" size="large" href="/signup"
                sx={{fontSize:24, color:'#eeeeee',
                backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'
                }}>
            Sign up Free</Button>
            </Box>

            <Box sx={{pb: 6,}}>
                <Typography color="inherit" variant="h6" component="h1" sx={{display:'flex', }}>
                NO CREDIT CARD NEEDED      
                </Typography>
            </Box>
      
        </Box>
    
      <Footer />
    </Box>
  );
}

