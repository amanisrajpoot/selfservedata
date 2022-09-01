import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export default function HomepageCardsLeft(props){
    return(
        // <Box sx={{ borderColor:'white', py:12, px:12}}>
        <div>
                <Box sx={{display:"flex", flexDirection:'row', justifyContent:'space-between', alignItems:'center', 
                    py:6, pt:2}}>
                    <Box sx={{ flexDirection:'column', width:'50%', py:6,}}>
                     
                    <p>{props.description}STEP 1</p>
                    <h2>{props.title}Start from absolute scratch</h2>
                    <p>{props.description} You can customize datasets anyway you need by choosing:</p>
                    
                    <ol>
                        <li>We source controlled Healthcare Catalogs;</li>
                        <li>We organize and curate the data sources by adjusting the time and geographic granularity;</li>
                        <li>We simplify data ingestion through automated processes.</li>
                    </ol>
                    </Box>

                    <Box sx={{display:"flex", flexDirection:'column', width:'45%', boxShadow:1}}>
                        <img src={"/Onboarding-Image.jpg"} />
                    </Box>

                    
                </Box>

                {/* <Box sx={{display:"flex", flexDirection:'row', justifyContent:'space-between', alignItems:'center',
                    py:6, flexWrap:'wrap'}}>
                    <Box sx={{display:"flex", flexDirection:'column', width:'45%',py:6, flexWrap:'wrap',boxShadow:1}}>

                    <img src={"https://www.readysignal.com/wp-content/uploads/2021/04/slide-3.png"} />
                    </Box>
                    
                    <Box sx={{ flexDirection:'column', width:'50%',py:6}}>
                    
                    <p>{props.description}STEP 2</p>
                    <h2>{props.title}Creating or Customizing a Signal</h2>
                    <p>{props.description} Our Features or datasets are variety of Healthcare COVID-19.</p>
                    <p>{props.description} You can also use our search to explore the Features.</p>

                    </Box>

                </Box> */}

                {/* <Box sx={{display:"flex", flexDirection:'row', justifyContent:'space-between',alignItems:'center',
                    py:6}}>
                    
                    <Box sx={{display:"flex", flexDirection:'column', width:'45%', py:6, boxShadow:1}}>

                        <img src={"https://www.readysignal.com/wp-content/uploads/2021/04/slide-4.png"} />
                    </Box>

                    <Box sx={{ flexDirection:'column', width:'50%', py:6,}}>
                     
                    <p>{props.description}STEP 2</p>
                    <h2>{props.title}Data Science Treatments</h2>
                    <p>{props.description} In order to make the Features more beneficial to you, we include 15 data science treatments in the Platform including:</p>
                    
                    <ul>
                        <li>Differencing;</li>
                        <li>Lead, Lag;</li>
                        <li>Seasonal differencing;</li>
                        <li>Boxcox; and</li>
                        <li>Yeo-Johnson to name a few.</li>

                    </ul>

                    <p>{props.description} Our Knowledge Base provides explanation of these treatments.</p>

                    </Box>
                    
                </Box> */}

                <Box sx={{display:"flex", flexDirection:'row', justifyContent:'space-between',alignItems:'center',
                    py:6}}>
                    
                    <Box sx={{display:"flex", flexDirection:'column', width:'45%',py:6,boxShadow:1}}>

                    <img src={"https://www.readysignal.com/wp-content/uploads/2021/04/slide-5-Copy.jpg"} />
                    </Box>
                    
                    <Box sx={{ flexDirection:'column', width:'50%',py:6}}>
                    
                    <p>{props.description}STEP 2</p>
                    <h2>{props.title}Data Output</h2>
                    <p>{props.description} As mentioned, we simplify the data ingestion process delivering your data to you using a variety of manual and automated delivery connectors.</p>
                    <p>{props.description} Manually download to Excel or CSV.</p>
                    {/* <p>{props.description} Automatically connect to APIs and the Domo Data Connector.</p>
                    <p>{props.description} Other data connectors are being built.</p> */}
                    

                    <Button variant="contained" size="large" href="/signup"
                            sx={{fontSize:20, color:'#eeeeee', width:'35%',backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}>
                        Sign up Now</Button>
                    </Box>

                    

                 </Box>
                
                                     
                   

            </div>
        // </Box>
    )
}
