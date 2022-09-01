import {useState,} from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Grid } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import AddBoxIcon from '@mui/icons-material/AddBox';

import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

export default function Templates(props) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [industry, setIndustry] = React.useState('');
    const [analysis, setAnalysis] = React.useState('');
    const [open, setOpen] = React.useState(false);
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
  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    return(
        <Box sx={{ display: 'flex', flexDirection:'row', py: 2, 
            bgcolor: 'gray-900', justifyContent:'space-between'}}>

                <Modal
                  open={props.open2}
                  onClose={props.handleOpen2}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                      <Grid sx={{display:'flex', flexDirection:'column', width:'100%' }}>
                        <Box sx={{display:'flex', flexDirection:"row", fontSize:20, fontWeight:600,
                            justifyContent:'space-between'}}>
                            <Box>
                                CHOOSE A DATASET TYPE
                            </Box>
                            <Box>
                                X
                            </Box>
                        </Box>

                        <div style={{display:"flex", flexDirection:'row', maxHeight:'375px', width:"100%",
                          justifyContent:'center',backgroundColor:'#fff', marginBottom:16 }}>
                               
                                <Link href="/createsignalfirst">
                                <Box sx={{border:2, borderColor:"#000000", 
                                    mx:4,my:4,py:2,px:4, textAlign:'center'}}>
                                  <AddBoxIcon style={{fontSize:125}}/>
                                  <p><b>From Scratch</b><br></br>
                                     Create a new Custom<br></br>
                                     Dataset combining the<br></br>
                                     data sources you want.</p>
                                </Box>
                                </Link>
                                

                                <Divider variant="middle" orientation="vertical" />
                              
                                <Link href="/createsignalsecond">
                                  <Box sx={{border:2, borderColor:"#000", 
                                    mx:4,my:4,py:2,px:4,textAlign:'center'}}>
                                  <ContentCopyOutlinedIcon style={{fontSize:125}}/>
                                  <p><b>From Template</b><br></br>
                                     Create a new Custom<br></br>
                                     Dateset based on<br></br>
                                     predefined models.</p>
                                </Box>
                                <Templates/>
                                </Link>
                                
                      </div>
                      </Grid>
                  </Box>
                </Modal>

          </Box>
    )
}