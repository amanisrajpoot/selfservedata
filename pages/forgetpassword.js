import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import Divider from '@mui/material/Divider';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ScreenLockPortraitOutlinedIcon from '@mui/icons-material/ScreenLockPortraitOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import {signIn} from "../function/checkAuth";
import mixpanel from 'mixpanel-browser';
import {recieveForgotOTP, forgotPasswordSubmit} from '../function/checkAuth'
import OtpInput from 'react-otp-input';

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

const ForgetPassword =() => {

    const signingLoading = () => {
		if (email !== '' && password !== '') {
			setisLoading(true);
			signIn();
		}
	};

  const CustomCheckBox = withStyles({
		root: {
			color: '#0DB1A1',
			'&$checked': {
				color: '#0DB1A1',
			},
		},
		checked: {},
	})((props) => (
		<Checkbox
			color='default'
			{...props}
			style={{
				background: 'white',
				width: '30px',
				height: '30px',
				margin: '0px',
				display: 'flex',
				justifyContent: 'center',
				marginTop: '6px',
			}}
		/>
	));

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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [mode, setMode] = useState(0);
    const [top, setTop] = useState('15em');

    async function signInF(){
        const err = await signIn({email, password});
        setisLoading(false);
        if (err && err.code==="UserNotConfirmedException"){
            await router.push("/reconfirm");
        } else if (err){
            setError(err.message);
        } else {
            setError("");
            await router.push("/dashboard");
        }
    }

    async function resetPassword(){
        if(email !== undefined && email !== null){
            const erro = await recieveForgotOTP({email})
            if (error !== null) {
                setError(erro)
            } else{
                setMode(1);
            }
        }
    }

  return (

    <div style={{ display:'flex',minWidth:'100%', maxWidth:'100%',
      height: '100vh', font:'roboto', justifyContent:'center'  }}>
        {/* <div style={{minWidth:'50%', maxWidth:'50%', height:'110%', backgroundColor:'#0DB1A1', display:'flex', 
          flexDirection:'column', justifyContent:'center', alignItems:'center',
            backgroundImage: 'url(/logon-photo03.jpg)',
            // backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            // backgroundPosition: 'left',
            
          }}>
        </div> */}
        <div  style={{display:'flex', minWidth:'50%', maxWidth:'50%',
                         flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <div style={{display:'flex',paddingTop:'3em',
                            minWidth:'55%', maxWidth:'55%', height:'90%',
                            flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 

            {mode===1?()=>setTop(4):null}
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

              {mode===0?<div style={{display:'flex',flexDirection:'column', alignItems:'start',width:'100%', }}>
                <div style={{}}>
                    <div style={{fontSize:30}}>Forgot Password?</div>
                    <div style={{fontSize:14}}>Enter your email to send a link to reset your password</div>
                </div>
            </div>
                  :mode===1?<>

                  <div style={{color:"#5A00E2", alignSelf:'center',marginBottom:35}}>
                      <MarkEmailReadIcon sx={{transform: "scale(4)"}} />
                  </div>

                  <div style={{display:'flex',flexDirection:'column', alignItems:'start',width:'100%', }}>
                          <div style={{}}>
                              <div style={{fontSize:30}}>Check Your Email</div>
                              <div style={{fontSize:14}}>We've sent a reset OTP to your email address: <b>{email}</b>
                              </div>
                          </div>
                      </div>
                  </>
                      :null}
            <Box component="form" noValidate onSubmit={handleSubmit}
                 sx={{ pt: 1, display:'flex', flexDirection:'column', alignItems:'center',
                    width:'100%'}}>

                {mode===0?<TextField
                    margin="normal"
                    required
                    sx={{width:"100%"}}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                        placeholder:"Your Email"
                    }}
                  />

                    :null}

                {mode===0?<>
                    <p>{error}</p>
                        <Button
                type="submit"
                variant="contained"
                sx={{  mb: 2, borderRadius:2,py:2,width:"100%",backgroundColor:"#5A00E2" }}
                onClick={resetPassword}
                // href="/dashboard"
              >
                Reset Password
              </Button></>
                    :mode===1?
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, borderRadius:2,py:2,width:"100%",backgroundColor:"#5A00E2" }}
                            onClick={()=>router.push({
                                pathname:"/resetpassword",
                                query:{useremail:email}
                            })}
                            // href="/dashboard"
                        >
                            Continue with Reset
                        </Button>
                        :null}

                {mode===0?<div style={{paddingTop:12,width:'100%',display:'flex',justifyContent:'start'}}>
                    <Link  href="/login" variant="body2" >
                        <a style={{display:'flex', alignItems:'center',
                            justifyContent:'center', }}>
                        <div style={{color:"#5A00E2", marginTop:4}}>{<ArrowBackIosNewIcon fontSize=''small/>}</div>
                        <div style={{color:"#5A00E2", }}>Back to Log In</div>
                        </a>
                    </Link>
                </div>
                    :mode===1?

                <div style={{paddingTop:12,width:'100%',display:'flex',justifyContent:'center'}}>

                        <div style={{display:'flex', alignItems:'center',
                            justifyContent:'center', cursor:'pointer'}}>

                            {"Didn't receive an email? "}
                            <div style={{color:"#5A00E2",  }}
                            onClick={()=>setMode(0)}>Resend</div>
                        </div>
                </div>:null}


                <Divider variant="middle" />

                {mode===0?<><div style={{width:'100%',display:'flex', paddingTop:'13.5em', fontSize:14,
                    justifyContent:'space-around', }}>
                    <div>Terms of Service </div>
                    <div>Terms of Use </div>
                    <div>Privacy Policy </div>

                </div>
                <Copyright sx={{ pt: 1 }} /></>
                    :mode===1?<>
                    <div style={{width:'100%',display:'flex', paddingTop:'13.5em', fontSize:14,
                    justifyContent:'space-around', }}>
                    <div>Terms of Service </div>
                    <div>Terms of Use </div>
                    <div>Privacy Policy </div>

                    </div>
                    <Copyright sx={{ pt: 1 }} /></>
                    :null}
            </Box>
          </Box>

        </div>
        </div>
      </div>
  );
}

export default ForgetPassword;