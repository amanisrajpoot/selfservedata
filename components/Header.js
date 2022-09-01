import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from 'next/link';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from '../function/checkAuth';
import { getUser } from '../function/users';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

const lightColor = 'rgba(255, 255, 255, 0.7)';

function Header({token,setToken,onDrawerToggle}) {
  
  const router = useRouter();

  const [user, setuser] = useState(null);
	useEffect(async () => {
    console.log('user call token', token);
		const userP = await getUser(token);
		setuser(userP);
		console.log('userP', userP);
	}, [token]);

  return (
    <React.Fragment>
      
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0, minHeight: '12vh', display: 'flex', pl:11,
            flexDirection:'row' , justifyContent: 'space-between',
            backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)',}}
      >
        <Toolbar sx={{width:'50%'}}>
            <Grid item xs>
            <Button
                sx={{ borderColor: lightColor, fontSize:20}}
                color="inherit"
                size="large"
                href="/"
              >
                Data Platform
              </Button>
            </Grid>
        </Toolbar>

        <Toolbar component="nav" variant="dense" className="flex-row"
          sx={{justifyContent:'space-between', width:'30%'}}>
            <Grid item sx={{display:'flex', justifyContent: 'space-around' , width:'80%'}}>
              {/* <Button
                sx={{ borderColor: lightColor }}
                color="inherit"
                size="large"
                href="/dashboard"
              >
                MY DATASETS
              </Button>
              
                <div style={{fontSize:24, paddingTop:8}}>|
                </div> */}
            
            
             <div style={{display:"flex",flexDirection:'row', 
                alignItems: 'center',cursor: 'pointer', fontSize:'1.25em'}}>
                     <Link href='/login'>
                      <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <PersonIcon />
                        &nbsp;&nbsp;
                        <p>{user && user.firstname ? user.firstname : 'Log In'} </p> 
                        &nbsp;&nbsp;
                      </div>
                    </Link>
                      
                      {/* <div onClick={()=>signOut({path:router.pathname})}>
                        <LogoutIcon />
                      </div> */}
              </div>

            </Grid>
        </Toolbar>
      </AppBar>
      
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
