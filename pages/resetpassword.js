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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ScreenLockPortraitOutlinedIcon from '@mui/icons-material/ScreenLockPortraitOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import {signIn} from "../function/checkAuth";
import mixpanel from 'mixpanel-browser';
import PasswordStrengthBar from 'react-password-strength-bar';
import OtpInput from "react-otp-input";
import {forgotPasswordSubmit} from "../function/checkAuth"
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
                {'String Ventures © '}
            </Link>{' '}

            {/*{new Date().getFullYear()}*/}

        </Typography>
    );
}


const theme = createTheme();

const ResetPassword =(props) => {

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
        otp: data.get('otp'),
      password: data.get('password'),
    });
  };

    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("")
    const [error, setError] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [mode, setMode] = useState(0);
    const [top, setTop] = useState("10rem");
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
            await router.push("/dashboard");
        }
    }

    useEffect(()=>{
        setEmail(router.query.useremail)
        console.log("email", email)
    },[email])

    async function resetPassword(){
        if(mode===0){
            if(otp.length <6){
                setError("OTP is not valid")
            } else {
                setError("")
                setMode(1);
                setTop("12rem");
            }
        } else if(mode===1){
            const erro = await forgotPasswordSubmit({email, otp, password})
            if(erro === null) {
                setMode(2);
                setTop(36)
            }else{
                setError(erro)
            }

        }

    }

  return (<>
    <div style={{ display:'flex',minWidth:'100%', maxWidth:'100%',
      height: '100vh', font:'roboto', justifyContent:'center', }}>

          <div
            style={{
              
              display: 'flex',
              justifyContent:'center',
              flexDirection: 'column',
              // justifyContent: 'center',
                width:'47%',
                height:'100%'

            }}
          >

              {mode===0?<div style={{display:'flex',flexDirection:'column', alignItems:'start',width:'100%',  }}>
                      <div style={{marginLeft:125}}>
                          <div style={{fontSize:30}}>Enter the Password Reset OTP</div>
                          <div style={{fontSize:14}}>The OTP will be of at-least 6 digits.</div>

                      </div>
                  </div>
                  :mode===1?<div style={{display:'flex',flexDirection:'column', alignItems:'start',width:'100%', paddingTop:"14rem"}}>
                <div style={{marginLeft:125, }}>
                    <div style={{fontSize:30}}>Set New Password?</div>
                    <div style={{fontSize:14}}>Your Password Must have</div>
                    <div style={{fontSize:14, display:'flex'}}><CheckCircleIcon
                        sx={{transform: "scale(0.8)", }} />At least 8 characters</div>
                    <div style={{fontSize:14, display:'flex'}}><CheckCircleIcon
                        sx={{transform: "scale(0.8)"}}/>One capital letter</div>
                    <div style={{fontSize:14, display:'flex'}}><CheckCircleIcon
                        sx={{transform: "scale(0.8)"}}/>One number or special character</div>
                </div>
            </div>
                  :mode===2?<>

                  <div style={{color:"#5A00E2", alignSelf:'center',marginBottom:35,paddingTop:"14rem" }}>
                      <LockIcon sx={{transform: "scale(4)"}} />
                  </div>

                  <div style={{display:'flex',flexDirection:'column', alignItems:'center',width:'100%',textAlign:'center' }}>
                          <div style={{marginLeft:10}}>
                              <div style={{fontSize:30}}>Password Changed</div>
                              <div style={{fontSize:14}}>Your password has been reset.
                              </div>
                          </div>
                      </div>
                  </>
                      :null}
            <Box component="form" noValidate onSubmit={handleSubmit}
                 sx={{ pt: 1, display:'flex', flexDirection:'column', alignItems:'center',
                    width:'100%'}}>

                {mode===0?<><div style={{
                        width: '100%',
                        paddingLeft: 125,
                        paddingRight: 100,
                        paddingTop: 12
                    }}>
                        <OtpInput
                            inputStyle={{
                                alignSelf: 'center', display: 'flex',
                                width: '60%', height: '7vh'
                            }}
                            value={otp}
                            onChange={(otp) => {
                                setOtp(otp)
                                console.log("otp",otp)
                            }}
                            numInputs={6}
                            separator={<span></span>}
                        />
                    </div>
                    {error? <>{error}</>:null}</>
                    :mode===1?<>
                <TextField
                    margin="normal"
                    required
                    sx={{width:"65%"}}
                    id="password"
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="password"
                    autoFocus
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
                        <PasswordStrengthBar style={{width:"65%"}} password={password} minLength={6} />

                    <TextField
                        margin="normal"
                        required
                        sx={{width:"65%"}}
                        id="confirmPassword"
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        autoComplete="confirmPassword"
                        autoFocus
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                            placeholder:"Confirm Password"
                        }}
                    />
                        {error? <>{error}</>:null}
                    </>
                    :null}

                {mode===0?<Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, borderRadius:2,py:2,width:"65%",backgroundColor:"#5A00E2" }}
                        onClick={resetPassword}
                        // href="/dashboard"
                    >
                        Continue
                    </Button>
                    :mode===1?<Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius:2,py:2,width:"65%",backgroundColor:"#5A00E2" }}
                onClick={resetPassword}
                // href="/dashboard"
              >
                Reset Password
              </Button>
                    :mode===2?
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, borderRadius:2,py:2,width:"65%",backgroundColor:"#5A00E2" }}
                            onClick={()=>router.push("/login")}
                            // href="/dashboard"
                        >
                            Go to login
                        </Button>
                        :null}

                {mode===1?<div style={{paddingRight:76,width:'100%',display:'flex',justifyContent:'start'}}>
                    <Link  href="/login" variant="body2" >
                        <a style={{display:'flex', alignItems:'center',
                            justifyContent:'center', paddingLeft:128}}>
                        <div style={{color:"#5A00E2", marginTop:4}}>{<ArrowBackIosNewIcon fontSize=''small/>}</div>
                        <div style={{color:"#5A00E2", paddingLeft:4 }}>Back to Log In</div>
                        </a>
                    </Link>
                </div>
                    :mode===2?

                null:null}


                <Divider variant="middle" />

                {mode===1?<><div style={{width:'100%',display:'flex', paddingTop:95, fontSize:14,
                    justifyContent:'space-around', paddingLeft:125, paddingRight:125}}>
                    <div>Terms of Service </div>
                    <div>Terms of Use </div>
                    <div>Privacy Policy </div>

                </div>
                <Copyright sx={{ pt: 1 }} /></>
                    :mode===2?<>
                    <div style={{width:'100%',display:'flex', paddingTop:235, fontSize:14,
                    justifyContent:'space-around', paddingLeft:125, paddingRight:125}}>
                    <div>Terms of Service </div>
                    <div>Terms of Use </div>
                    <div>Privacy Policy </div>

                    </div>
                    <Copyright sx={{ pt: 1 }} /></>
                    :null}
            </Box>
          </div>
        </div>
    </>
  );

}

export default ResetPassword;