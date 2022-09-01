import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import {signIn} from "../function/checkAuth";
import {getUser} from "../function/users";
import {createUser} from "../function/users";
import mixpanel from 'mixpanel-browser';
import {useEffect} from 'react';
import { Auth } from 'aws-amplify';

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true});  

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Data Platform
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function BrandName(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Product by '}
            <Link color="inherit" href="/">
                {'Data Platform © '}
            </Link>{' '}

            {/*{new Date().getFullYear()}*/}

        </Typography>
    );
}


const theme = createTheme();

const AccountCreated =({name, setName, email, setEmail, company, setCompany, token, setToken}) => {

  useEffect(()=>{
    console.log("token for the account created page", token)
  },[token])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

    const router = useRouter()
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [mode, setMode] = useState(0);
    const [top, setTop] = useState(36);
    const [user, setuser] = useState({});

    useEffect(async ()=> {
      console.log("account created page reached")
      if(token !== 0 && token && token !== null && token !== undefined){
        console.log('token in the accountcreated page', token)
        console.log('craeting user in the backend')
        const erro = await createUser({
            email:Auth.user.attributes.email?Auth.user.attributes.email:email,
            //phone: '+1' + phone,
            name:Auth.user.attributes.name?Auth.user.attributes.name:name,
            company:Auth.user.attributes.company?Auth.user.attributes.company:company,
            token

        });

        console.log('user created response', user)
        console.log('error while creating user using api call', erro)
        await sleep(2000);
        if(erro !== null){
            router.push("/dashboard")
          }
      }

      //setMode(0);
  },[]);
  
  return (
    <ThemeProvider theme={theme}>

      <Grid container component="main" sx={{ height: '100vh', font:'roboto' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            //backgroundImage: 'url(/login-background.jpg)',
            // backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            // backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square sx={{display:'flex',
            flexDirection:'column', justifyContent:'space-between', alignItems:'space-between'}}>

          <Box
            sx={{
              pt: top,
              display: 'flex',
              flexDirection: 'column',
              // justifyContent: 'center',
                width:'100%',
                height:'100%'

            }}
          >

                  <div style={{color:"#5A00E2", alignSelf:'center',marginBottom:35}}>
                      <VerifiedUserOutlinedIcon sx={{transform: "scale(4)"}} />
                  </div>

                  <div style={{display:'flex',flexDirection:'column', alignItems:'center',width:'100%',textAlign:'center' }}>
                          <div style={{marginLeft:25}}>
                              <div style={{fontSize:30}}>Account Created</div>
                              <div style={{fontSize:14}}>Your Account has been created sucessfully.
                              </div>
                          </div>
                      </div>

            <Box component="form" noValidate onSubmit={handleSubmit}
                 sx={{ pt: 1, display:'flex', flexDirection:'column', alignItems:'center',
                    width:'100%'}}>

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, borderRadius:2,py:2,width:"65%",backgroundColor:"#5A00E2" }}
                            onClick={()=>router.push("/login")}
                            // href="/dashboard"
                        >
                            Go to login
                        </Button>

                <Divider variant="middle" />

                    <div style={{width:'100%',display:'flex', paddingTop:235, fontSize:14,
                    justifyContent:'space-around', paddingLeft:125, paddingRight:125}}>
                    <div>Terms of Service </div>
                    <div>Terms of Use </div>
                    <div>Privacy Policy </div>

                    </div>
                    <Copyright sx={{ pt: 1 }} />

            </Box>
          </Box>



        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default AccountCreated;