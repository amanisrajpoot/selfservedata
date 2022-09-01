import React from 'react';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { TextField } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function SelectFeatures(props){
  const [checked, setChecked] = React.useState([true, false]);
  const [industry, setIndustry] = React.useState('');
  const [analysis, setAnalysis] = React.useState('');


  const handleChangeIndustry = (event) => {
    setIndustry(event.target.value);
  };

  const handleChangeAnalysis = (event) => {
    setAnalysis(event.target.value);
  };

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <div style={{width:"100%",display:"flex", 
            flexDirection:'column',color:'#fff'}}>
          {/*<div style={{display:"flex", width:'100%' }}>
             <div style={{width:"19%"}}>
              <p style={{paddingLeft:54, }}>SIGNAL OVERVIEW</p>
            </div>
          
            <div style={{display:"flex", flexDirection:'column', 
                width:'80%'}}>
              <div style={{display:'flex',flexDirection:'column',width:'100%' }}>

                <FormGroup sx={{width:'100%',paddingLeft:2}}>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Diseases" />
                </FormGroup>
                
                <div style={{display:"flex", flexDirection:'row', maxHeight:'30vh', 
                    width:'100%', justifyContent:'space-around', }}>
                  
                  <div style={{display:'flex', flexWrap:'wrap', 
                      justifyContent:'start',width:'100%',paddingLeft:36}}>
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox defaultChecked />} label="Diabetes" />
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox />} label="Hyper Tension" />
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox />} label="Disabled" />
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox />} label="Cancer" />
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox />} label="Aids" />
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox />} label="Cancer" />
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox />} label="Aids" />
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox />} label="Aids" />
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox />} label="Aids" />
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox />} label="Aids" />
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox />} label="Aids" />
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox />} label="Aids" />
                  </div>
                
                </div>
              </div>

              <Divider variant="middle" sx={{bgColor:"#bcbcbc"}}/>

              <div style={{display:'flex',flexDirection:'column',width:'100%' }}>

                <FormGroup sx={{width:'100%',paddingLeft:2}}>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Diseases" />
                </FormGroup>
                
                <div style={{display:"flex", flexDirection:'row', maxHeight:'30vh', 
                    width:'100%', justifyContent:'space-around', }}>
                  
                  <div style={{display:'flex', flexWrap:'wrap', 
                      justifyContent:'start',width:'100%',paddingLeft:36}}>
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox defaultChecked />} label="Diabetes" />
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox />} label="Hyper Tension" />
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox />} label="Disabled" />
                    
                  </div>
                
                </div>
              </div>

              <Divider variant="middle" sx={{bgColor:"#bcbcbc"}}/>

              <div style={{display:'flex',flexDirection:'column',width:'100%' }}>

                <FormGroup sx={{width:'100%',paddingLeft:2}}>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Diseases" />
                </FormGroup>
                
                <div style={{display:"flex", flexDirection:'row', maxHeight:'30vh', 
                    width:'100%', justifyContent:'space-around', }}>
                  
                  <div style={{display:'flex', flexWrap:'wrap', 
                      justifyContent:'start',width:'100%',paddingLeft:36}}>
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox defaultChecked />} label="Diabetes" />
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox />} label="Hyper Tension" />
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox />} label="Disabled" />
                    <FormControlLabel sx={{width:'18%'}} control={<Checkbox defaultChecked />} label="Label" />
                    
                  </div>
                
                </div>
              </div>

              <Divider variant="middle" sx={{bgColor:"#bcbcbc"}}/>

              <div style={{display:'flex',flexDirection:'column', }}>

                <FormGroup sx={{width:'21%',paddingLeft:2}}>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="COVID-19" />
                </FormGroup>
              </div>

            </div>
          </div> */}

          <div style={{display:"flex",pt:4, flexDirection:"row", 
              width:"100%", paddingTop:4}}>
            <div style={{width:"30%"}}>
              <p style={{paddingLeft:54, }}>RECOMMEND BASED ON</p>
            </div>
          
              <div style={{display:"flex", flexDirection:'row', width:'80%',paddingBottom:18}}>
                {/*<div style={{ minWidth: '38%',paddingLeft:4, paddingRight:8}}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-filled-label">Topic</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled-label"
                        value={industry}
                        label="Industry"
                        onChange={handleChangeIndustry}
                        sx={{ bgcolor: '#ffffff'}}
                      >
                      <MenuItem value={10}>---Select Industry---</MenuItem>
                      <MenuItem value={20}>Drugs</MenuItem>
                      <MenuItem value={30}>Physician Practices</MenuItem>
                      <MenuItem value={40}>Healthcare</MenuItem>
                      <MenuItem value={50}>Insurance</MenuItem>
                      <MenuItem value={60}>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                   <div style={{  minWidth: "25%", paddingLeft:4, paddingRight:8}}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-filled-label" >Analysis</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled-label"
                        value={analysis}
                        label="Analysis"
                        onChange={handleChangeAnalysis}
                        sx={{ bgcolor: '#ffffff'}}
                      >
                        <MenuItem value={"Select Analysis"}>---Select Analysis---</MenuItem>
                        <MenuItem value={'Cassification'}>Cassification</MenuItem>
                        <MenuItem value={'Forecasting'}>Forecasting</MenuItem>
                        <MenuItem value={'Impact Analysis'}>Impact Analysis</MenuItem>
                        <MenuItem value={'Scoring'}>Scoring</MenuItem>
                        <MenuItem value={'Others'}>Others</MenuItem>

                      </Select>
                    </FormControl>
                  </div> */}
                </div>

          </div>


          <div style={{display:"flex",paddingTop:4, paddingLeft:4, 
              width:'100%',paddingRight:8 }}>
            <div style={{width:"20%"}}>
              <p style={{paddingLeft:54, }}>KEYWORD SEARCH</p>
            </div>
          
            <div style={{display:'flex', flexDirection:'column', width:'80%'}}>
              <div style={{display:"flex", flexDirection:'row', width:'100%',
                  paddingBottom:18}}>
                  <div component="main" style={{  minWidth: '38%', paddingLeft:4, 
                      paddingRight:8}}>
                      <TextField fullWidth id="outlined-basic" variant="outlined" label="Enter Keyword" 
                      sx={{ bgcolor: '#ffffff'}}/>
                  </div>

                  {/* <div style={{ display:'flex', minWidth: "100%", paddingLeft:4, 
                      paddingRight:8}}> 
                        <FormControlLabel control={<Checkbox {...label} icon={<CircleOutlinedIcon />} 
                            checkedIcon={<CheckCircleIcon />} />} label="Sort Favorites First" />
                        <FormControlLabel control={<Checkbox {...label} icon={<CircleOutlinedIcon />} 
                            checkedIcon={<CheckCircleIcon />} />} label="Sort User-Generated First" />
                  </div> */}
                </div>

              </div>
          </div>

      </div>

    )

}