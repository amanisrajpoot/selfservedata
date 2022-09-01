import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import Divider from '@mui/material/Divider';
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
import {EMAIL_VALIDATOR} from "../function/constants";
import { MailRounded } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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

const Login =({token, setToken}) => {
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
  };

    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [passwordType, setPasswordType] = useState('password');

    async function signInF(){
        const err = await signIn({email, password});
        setisLoading(false);
        if (err && err.code==="UserNotConfirmedException"){
            await router.push("/reconfirm");
        } else if (err){
            setError(err.message);
        } else {
            setError("");
            mixpanel.track('Logged In', {
                'source': "Data Platform Login Page",
                'signed in': true,
                'email':user.email
            });
            await router.push("/dashboard");
        }
    }

    function checkFields() {
      if (!EMAIL_VALIDATOR.test(email)) {
          setError('Invalid Email ID');
          setUsernameError(true)
          setPasswordError(false)
          console.log("email issue",email.split("@")[1])
      } else if (password.length < 8) {
          setError('Invalid password, must be atleast 8 letter long');
          setPasswordError(true)
          setUsernameError(false)
      } else {
          setError(null);
          setPasswordError(false)
          setUsernameError(false)
          signInF();
      }
  }

  return (
      <div className= "login" style={{ display:'flex',minWidth:'100%', maxWidth:'100%',
        height: '100%', font:'roboto' }}>
        {/* <div style={{ height:'100%', minWidth:'50%', maxWidth:'50%',backgroundColor:'#0DB1A1', display:'flex', 
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
            <div style={{ width:'100%',display:'flex',justifyContent:'end', paddingTop:'3em'}}>
                <Link sx={{alignSelf:'end'}} href="/signup" variant="body2">
                    {"Don't have an account?"} <div style={{color:"#5A00E2", display:"inline"}}>Sign Up</div>
                </Link>
            </div>
          <div
            style={{
              paddingTop: '5em',
              display: 'flex',
              flexDirection: 'column',
              // justifyContent: 'center',
                width:'100%',
                height:'100%'

            }}
          >
            {/*<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>*/}
            {/*  <ScreenLockPortraitOutlinedIcon />*/}
            {/*</Avatar>*/}
            <div style={{display:'flex',flexDirection:'column', alignItems:'start',width:'100%', }}>
                <div style={{}}>
                    <div style={{fontSize:30}}>Log In</div>
                    <div style={{fontSize:14}}>Welcome back, you’ve been missed!</div>
                </div>
            </div>
            <Box component="form" noValidate onSubmit={handleSubmit}
                 sx={{ pt: 1, display:'flex', flexDirection:'column', alignItems:'center',
                    minWidth:'100%'}}>

                {usernameError ? <TextField
                    error
                    margin="normal"
                    required
                    sx={{width:"100%"}}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    helperText="Incorrect Username"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                        placeholder:"Email Address"
                    }}
                  /> : <TextField
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
                      placeholder:"Email Address"
                  }}
                />}
                  {passwordError ? <TextField
                    error
                    margin="normal"
                    required
                    sx={{width:"100%"}}
                    name="password"
                    label="Enter Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    helperText="Incorrect Password"
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                        placeholder:"Enter Password"
                    }}
                  />:
                    <TextField
                      margin="normal"
                      required
                      sx={{width:"100%"}}
                      name="password"
                      label="Enter Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                  <LockIcon />
                              </InputAdornment>
                          ),
                          placeholder:"Enter Password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                              </IconButton>
                            </InputAdornment>
                          )
                      }}
                    />
                  }
                <div style={{display:'flex', width:'100%',justifyContent:'space-between'}}>
                        <div>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            sx={{alignSelf:'start', }}
                        />
                        </div>

                        <div style={{paddingLeft:73, }}>
                            <Link href="/forgetpassword" variant="body2">
                                <a>Forgot password?</a>
                            </Link>
                        </div>
                </div>
                {/* {error && <div style={{color:"red"}}>{error}</div>} */}
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius:2,py:2,width:"100%",backgroundColor:"#5A00E2" }}
                onClick={()=>checkFields()}
                // href="/dashboard"
              >
                Log In
              </Button>

                {/* <BrandName sx={{ pt: 1 }} /> */}

                <div style={{width:'100%',display:'flex', paddingTop:'9em', fontSize:14,
                    justifyContent:'space-around', }}>
                    <div>Terms of Service </div>
                    <div>Terms of Use </div>
                    <div>Privacy Policy </div>
                </div>
                <Copyright sx={{ pt: 1 }} />
            </Box>
          </div>

        </div>

        </div>
      </div>
    
  );
}

export default Login;