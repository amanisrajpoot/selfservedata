import React from 'react';
import Divider from '@mui/material/Divider';
import { Button } from 'react-bootstrap';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SignalCard(props){
    return (
        <div style={{width:"100%",display:"flex", flexDirection:'column',backgroundColor:'#fff',}}>
          <p style={{paddingLeft:54}}>DATASET OVERVIEW</p>
          <div style={{display:"flex", flexDirection:'row', maxHeight:'30vh', 
            justifyContent:'space-around', paddingRight:84 }}>
              
              
              <div style={{display:'flex', alignItems:'center', 
                  justifyContent:'space-between', width:"25%"}}>
                  
                  <p><b>Name:</b> Covid Cases Forecasting<br></br><br></br>
                  <b>Description:</b> Automotive Forecasting Dataset based on state / monthly data since 1/1/2019 with no end date and updated when new data is available. For those features with data science treatments, both the raw and treated data is included in the Dataset output.</p>
              </div>
              <div style={{display:'flex', }}>
                <p>{props.description}<b>Status:</b> <Button variant="contained" size="large" sx={{mx:2, py:4}}
                                       startIcon={<EditOutlinedIcon />} >
                                      {"Processing"}</Button><br></br>
                    <b>Dataset:</b> 417</p>
              </div>
              <div>
                <p>{props.description}<b>Rows:</b> 1,768<br></br>
                    <b>Data Points:</b> 26,520</p>
              </div>
              <div style={{display:"flex",flexDirection:'column',}}>
                  <div><EditOutlinedIcon />&nbsp;Edit</div>
                  <div><DeleteIcon />&nbsp;Delete</div><br></br>
                   
              </div>
            </div>

            <Divider variant="middle" />

            <div style={{display:"flex", flexDirection:'row', maxHeight:'125px'
            ,backgroundColor:'#fff', marginBottom:16, paddingLeft:8, paddingRight:48 }}>
              <div style={{display:'flex', alignItems:'center',justifyContent:'center', 
              marginRight: 60, width:"30%"}}>
              
                <p>{props.description}<b>ANALYSIS</b><br></br><br></br>
                    Tags: Healthcare, Virus, Injection<br></br><br></br>
                    Topic Type: Forecasting</p>
              </div>

              {/* <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
              
                <p>{props.description}<b>OUTPUT GRAIN</b><br></br><br></br>
                    Geo Grain: State<br></br><br></br>
                    Time Grain: Month</p>
              </div>

              <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
              
                <p>{props.description}<b>TIME FRAME</b><br></br><br></br>
                    Start Date: 01/01/2019<br></br><br></br>
                    End Date: -</p>
              </div> */}

              <div style={{display:'flex', alignItems:'center',
                paddingLeft:24,justifyContent:'center', width:"30%"}}>
              
                <p>{props.description}<b>DATA REFRESH</b><br></br><br></br>
                    Frequency: When New Data Available<br></br><br></br>
                    Last Refresh: -</p>
              </div>
            </div>
        </div>


    //   <Box sx={{ bgcolor:"#ffffff"}}>
    //       <Box sx={{py:2, px:4,bgcolor:"#ffffff"}}>
    //         <h3 style={{}}>SIGNAL OVERVIEW</h3>
    //       <Box sx={{ width: '100%', 
    //                 minheight:275, my:1, bgcolor: '#ffffff', display:'flex', flexDirection:'row',
    //                 alignItems:'center', justifyContent:'space-between', alignItems:'center', }}>
                
    //                 <Box
    //                     sx={{ display: 'inline-block',display:'flex', 
    //                     flexDirection:'column', maxWidth:"25%"}}>            
    //                     <Box>
    //                       <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} color="text.secondary" gutterBottom>
    //                         Name: Automotive Forecasting
    //                         </Typography>
    //                         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //                         Description: Automotive Forecasting Signal based on state / monthly data since 1/1/2019 with no end date and updated when new data is available. For those features with data science treatments, both the raw and treated data is included in the Signal output.
    //                         </Typography>
    //                     </Box>  

    //                 </Box>

    //                 <Box
    //                     sx={{ display: 'inline-block',display:'flex', flexDirection:'column',
    //                         justifyContent:'start',
    //                         alignItems:'start', maxWidth:"25%"}}> 
    //                     <Box>
    //                       <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} color="text.secondary" gutterBottom>
    //                       Status: <Button variant="contained" size="large" sx={{mx:2, py:4}}
    //                                   startIcon={<EditOutlinedIcon />} >
    //                                   {"Processing"}</Button>
    //                         </Typography>
    //                         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //                         Signal: 417
    //                         </Typography>
    //                     </Box>  

    //                 </Box>

    //                 <Box
    //                     sx={{ display: 'inline-block',display:'flex', 
    //                     flexDirection:'column', maxWidth:"25%"}}> 
    //                     <Box>
    //                       <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} color="text.secondary" gutterBottom>
    //                         Rows: 1,768
    //                         </Typography>
    //                         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //                         Data Points: 26,520
    //                         </Typography>
    //                     </Box>  

    //                 </Box>

    //                 <Box
    //                     sx={{ display: 'inline-block',display:'flex', 
    //                     flexDirection:'column', maxWidth:"25%"}}> 
    //                     <Box>
    //                       <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} 
    //                           gutterBottom>
    //                           <EditOutlinedIcon />&nbsp;
    //                           Edit 
    //                         </Typography>
    //                         <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} 
    //                           gutterBottom>
    //                         <DeleteIcon />&nbsp;
    //                           Delete
    //                         </Typography>
    //                     </Box> 

    //                 </Box>
                    
                    
    //              </Box>
    //           </Box>
        
    //       <Box sx={{ width: '100%', my:1, px:4,  bgColor:"#fff",display:'flex', flexDirection:'row', 
    //                  alignItems:'center', justifyContent:'space-between', alignItems:'center', }}>    
    //           <Divider variant="middle" />
    //       </Box>
    //           <Box sx={{ width: '100%', 
    //                 minheight:275, my:1, px:4, pb:2,bgcolor: '#ffffff', display:'flex', flexDirection:'row',
    //                 alignItems:'center', justifyContent:'space-between', alignItems:'center', }}>
                
    //                 <Box
    //                     sx={{ display: 'inline-block',display:'flex', 
    //                     flexDirection:'column', maxWidth:"30%"}}> 
      
    //                     <h3>Analysis</h3>
    //                     <Box>
    //                       <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} color="text.secondary" gutterBottom>
    //                         Industry: Automotive
    //                         </Typography>
    //                         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //                         Model Type: Forecasting
    //                         </Typography>
    //                     </Box>  

    //                 </Box>
                    
    //                 <Box
    //                     sx={{ display: 'inline-block',display:'flex', 
    //                     flexDirection:'column', maxWidth:"30%"}}> 
      
    //                     <h3>OUTPUT GRAIN</h3>
    //                     <Box>
    //                       <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} color="text.secondary" gutterBottom>
    //                         Geo Grain: State
    //                         </Typography>
    //                         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //                         Time Grain: Month
    //                         </Typography>
    //                     </Box>  

    //                 </Box>

    //                 <Box
    //                     sx={{ display: 'inline-block',display:'flex', 
    //                     flexDirection:'column', maxWidth:"30%"}}> 
      
    //                     <h3>TIME FRAME</h3>
    //                     <Box>
    //                       <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} color="text.secondary" gutterBottom>
    //                         Start Date: 01/01/2019s
    //                         </Typography>
    //                         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //                         End Date: -
    //                         </Typography>
    //                     </Box>  

    //                 </Box>

    //                 <Box
    //                     sx={{ display: 'inline-block',display:'flex', 
    //                     flexDirection:'column', maxWidth:"30%"}}> 
      
    //                     <h3>DATA REFRESH</h3>
    //                     <Box>
    //                       <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} color="text.secondary" gutterBottom>
    //                         Frequency: When New Data Available
    //                         </Typography>
    //                         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //                         Last Refresh: -
    //                         </Typography>
    //                     </Box>  

    //                 </Box>

    //              </Box>
          
    //   </Box>
    
    )

}