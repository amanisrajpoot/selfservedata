import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
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
import {confirmSignUp, signIn, signUp, recieveOTP} from "../function/checkAuth";
import {saveDataSourceInfo} from "../function/users"
import {getUser, createUser} from "../function/users";
import OtpInput from 'react-otp-input';
import mixpanel from 'mixpanel-browser';
import OTPForm from "../components/OtpScreen";
import {EMAIL_VALIDATOR} from "../function/constants";
import { Auth } from 'aws-amplify';
import {useEffect} from "react";
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import S3 from 'react-aws-s3';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


// installed using npm install buffer --save
//window.Buffer = window.Buffer || require("buffer").Buffer;

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true});  

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

const SubmitFile =({token, setToken, name, setName, email, setEmail, company, setCompany,user, setuser,}) => {

    useEffect(()=>{
        console.log("signup page token for the confirm user function", token)
    },[token])

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

    useEffect(async () => {
        if(token !== 0 && token && token !== null && token !== undefined &&
            user !== {} && user !== null && user !== undefined){
            console.log('get users called from dashboard', token);
            const userP = await getUser(token);
            if(userP === null || userP === undefined ){
                setuser({})
            } else{
                setuser(userP)
            }
            console.log('userP', userP);
        }
    }, [token]);

    const router = useRouter()
    const [dataSourceName, setDataSourceName] = useState("")
    const [dataSourceDescription, setDataSourceDescription] = useState("")
    const [dataSourceTopic, setDataSourceTopic] = useState("");
    const [dataSourceFileLink, setDataSourceFileLink] = useState("");
    const [dataSourceS3FileURL, setDataSourceS3FileURL] = useState("");
    const [dataSourceFileFormat,setDataSourceFileFormat] = useState("");
    const [dataSourceFileSource, setDataSourceFileSource] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [topPadding, setTopPadding] = useState(6)
    const [bottomTopPadding, setBottomTopPadding] = useState('5em')
    const [mode, setMode] = useState(0)
    const [otp, setOtp] = useState(0)
    const [nameError, setNameError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [companyError, setCompanyError] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [passwordType, setPasswordType] = useState('password');
    const [files, setFiles] = React.useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUploadWait, setFileUploadWait] = useState(true);

    const [dataSourceBarebone, setDataSourceBareBone] = useState(
        {
            "requestParameter": {
              "id": 0,
              "created_at": null,
              "updated_at": null,
              "deleted_at": null,
              "user_email": "",
              "title": "",
              "description": "",
              "topic": "",
              "refresh_rate": "",
              "row_count": 0,
              "data_points": 0,
              "features": "",
              "data_sources": 0,
              "status": "",
              "range": "",
              "template": 0,
              "refreshed_at": null,
              "public_list": null,
              "ss_user_id": 1,
              "dataset_file_name": "",
              "dataset_file_desc": "",
              "dataset_uploaded_file_name": "",
              "dataset_upload_file_path": "",
              "dataset_is_processed": 0,
              "dataset_process_date": null,
              "dataset_process_error": "",
              "further_analysis_required": 0,
              "source_description": "",
              "source_url": "test source url",
              "source_dataset_url": "test source dataset URL",
              "time_horizon": "",
              "source_subscription_type": "",
              "source_data_format": "excel"
            }
          }
    )

    // the configuration information is fetched from the .env file
    const config = {
        bucketName: "s3-fileupload-test02",
        region: "us-east-2",
        accessKeyId: "AKIAQOU6ADFZ3BYAKTON",
        secretAccessKey: "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",
    }

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        const ReactS3Client = new S3(config);
        // the name of the file uploaded is used to upload it to S3
        ReactS3Client
        .uploadFile(e.target.files[0], e.target.files[0].name)
        .then(data => {
            console.log(data.location)
            setDataSourceS3FileURL(data.location)
            setFileUploadWait(false)
            console.log(dataSourceS3FileURL)
        })
        .catch(err => console.error(err))
    }

    // const uploadFile = async (file) => {
    //     const ReactS3Client = new S3(config);
    //     // the name of the file uploaded is used to upload it to S3
    //     ReactS3Client
    //     .uploadFile(file, file.name)
    //     .then(data => console.log(data.location))
    //     .catch(err => console.error(err))
    // }

    async function signInFK(){
        setMode(1);
        setTopPadding(28)
        setBottomTopPadding(202)

    }

    async function signUpF() {
        if(fileUploadWait === true){
            alert("File is still getting uploaded, please wait before submitting.")
        } else {
            console.log("uploading datasource to the database")
            await sleep(1000);
            const erro = await saveDataSourceInfo({
                "requestParameter": {
                    "title":dataSourceName,
                    "description":dataSourceDescription,
                    "topic":dataSourceTopic,
                    "source_description":dataSourceFileSource,
                    "source_url":dataSourceFileLink,
                    "dataset_uploaded_file_name":selectedFile.name,
                    "dataset_upload_file_path":dataSourceS3FileURL,
                    "source_data_format":dataSourceFileFormat,
                    "user_email": user.email,
                    "refresh_rate": "",
                    "row_count": 0,
                    "data_points": 0,
                    "features": "",
                    "data_sources": 0,
                    "status": "",
                    "range": "",
                    "template": 0,
                    "ss_user_id": user.ID,
                    "dataset_file_name": "",
                    "dataset_file_desc": "",
                    "dataset_is_processed": 0,
                    "dataset_process_error": "",
                    "further_analysis_required": 0,
                    "source_dataset_url": "",
                    "time_horizon": "",
                    "source_subscription_type": "",

                }
            });
            await sleep(1000);
            if (erro.responseData.resultValue === 1) {
                //setError(erro);
                await router.push('/browsecatalogue')
                // setMode(1)
                
            } else {
                //setError(erro);
                console.log('server error', erro)
                setMode(0);
            }
        }
    }

    async function resendOTP() {
        console.log("resending OTP")
        const erro = await recieveOTP({
            email,
        });
        if (erro.responseData.resultValue === 1) {
            setError(erro);
            await router.push('/browsecatalogue')
            //setMode(1)
            // setTopPadding("12em")
            // setBottomTopPadding('12em')
        }else{
            setError(erro);
            console.log('server error', erro)
            //setMode(0);
        }
    }

    async function confirmSignUpF() {
            const erro = await confirmSignUp({ email,otp,token, setToken  });
            console.log("signup confirmation response",erro)
            // await sleep(2000);
            if (erro === null) {
                //await router.push('/accountcreated')
                //await sleep(2000);
                console.log("confirmSignup after confirming from amplify:",erro)
                await signIn({email, password, token, setToken});

                await sleep(2000);
                console.log('token in the confirm signup function page 12', token)
                //await router.push('/accountcreated');
                router.push({
                    pathname: `/dashboard/`,
                    query:{
                        currentRouteTitle:"signup",
                    }
                })
                // }
                // await signIn({ email, password, token, setToken: createDoctor });
            } else {
                console.log('confirmation of user failed with the error', erro)
                setError(erro);
                
            }
    }

    function filterEmail(){
        const corporates = ["gmail.com", "yahoo.com", "aol.com", "hotmail.co.uk", "hotmail.fr", "msn.com", "yahoo.fr", 
        "wanadoo.fr", "orange.fr", "comcast.net", "yahoo.co.uk", "yahoo.com.br", "yahoo.co.in", "live.com", "rediffmail.com", 
        "free.fr", "gmx.de", "web.de", "yandex.ru", "ymail.com", "libero.it", "outlook.com", "uol.com.br", "bol.com.br", 
        "mail.ru", "cox.net", "hotmail.it", "sbcglobal.net", "sfr.fr", "live.fr", "verizon.net", "live.co.uk", "googlemail.com", 
        "yahoo.es", "ig.com.br", "live.nl", "bigpond.com", "terra.com.br", "yahoo.it", "neuf.fr", "yahoo.de", "alice.it", 
        "rocketmail.com", "att.net", "laposte.net", "facebook.com", "bellsouth.net", "yahoo.in", "hotmail.es", "charter.net", 
        "yahoo.ca", "yahoo.com.au", "rambler.ru", "hotmail.de", "tiscali.it", "shaw.ca", "yahoo.co.jp", "sky.com", "earthlink.net", 
        "optonline.net", "freenet.de", "t-online.de", "aliceadsl.fr", "virgilio.it", "home.nl", "qq.com", "telenet.be", "me.com", 
        "yahoo.com.ar", "tiscali.co.uk", "yahoo.com.mx", "voila.fr", "gmx.net", "mail.com", "planet.nl", "tin.it", "live.it", 
        "ntlworld.com", "arcor.de", "yahoo.co.id", "frontiernet.net", "hetnet.nl", "live.com.au", "yahoo.com.sg", "zonnet.nl", 
        "club-internet.fr", "juno.com", "optusnet.com.au", "blueyonder.co.uk", "bluewin.ch", "skynet.be", "sympatico.ca", "windstream.net", 
        "mac.com", "centurytel.net", "chello.nl", "live.ca", "aim.com", "bigpond.net.au",]
            
        const emailCheck = corporates.filter(corporate=>corporate === email.split("@")[1])
        if(emailCheck.length > 0){
            return false
        } else if(emailCheck.length == 0){
            return true
        }
      }

    function checkFields() {
        if (name.length < 3) {
            setError('Name should be atleast 3 letter long');
            setNameError(true)
            setCompanyError(false)
            setUsernameError(false)
            setPasswordError(false)
            setConfirmPasswordError(false)
        } else if (company.length < 3) {
            setError('Company Name should be atleast 3 letter long');
            setCompanyError(true)
            setNameError(false)
            setUsernameError(false)
            setPasswordError(false)
            setConfirmPasswordError(false)
        } else if (!EMAIL_VALIDATOR.test(email)) {
            setError('Invalid Email ID');
            setUsernameError(true)
            setNameError(false)
            setCompanyError(false)
            setPasswordError(false)
            setConfirmPasswordError(false)
            console.log("email issue",email.split("@")[1])
        } else if (!filterEmail()) {
            setError('Public Email Not Allowed');
            setUsernameError(true)
            setNameError(false)
            setCompanyError(false)
            setPasswordError(false)
            setConfirmPasswordError(false)
        } else if (password.length < 8) {
            setError('Invalid password, must be atleast 8 letter long');
            setPasswordError(true)
            setNameError(false)
            setCompanyError(false)
            setUsernameError(false)
            setConfirmPasswordError(false)
        } else if (password !== confirmPassword) {
            setError("Passwords don't match.");
            setConfirmPasswordError(true)
            setNameError(false)
            setCompanyError(false)
            setUsernameError(false)
            setPasswordError(false)
        } else {
            setError(null);
            setConfirmPasswordError(false)
            setNameError(false)
            setCompanyError(false)
            setUsernameError(false)
            setPasswordError(false)
            signUpF();
        }
    }
    function checkFields2() {
        if (otp.length < 6) {
            setError('Invalid OTP');
        } else {
            // setError('DONE');
            confirmSignUpF();

        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        console.log("wrong OTP", error)

        if(mode===0){
            checkFields()
        } else if(mode===1){
            checkFields2()
        }
    };

        return (
            <>
            <div className= "signup" style={{ display:'flex',minWidth:'100%', maxWidth:'100%',
            height: '100vh', font:'roboto', justifyContent:'center' }}>
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
                    <div  style={{display:'flex', minWidth:'70%', maxWidth:'70%',
                         flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <div style={{display:'flex',paddingTop:'3em',
                            minWidth:'55%', maxWidth:'55%', height:'90%',
                            flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 
                               {/*<div style={{
                                paddingTop: '1em',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'end'
                            }}>
                                <Link sx={{alignSelf: 'end'}} href="/login" variant="body2">
                                    {"Already have an account? "}
                                    <div style={{color: "#5A00E2", display: "inline"}}>Log In</div>
                                </Link>
                            </div>*/}

                            {mode === 0 ?<Button  size="medium" sx={{display:'flex', width:'100%',paddingRight:2,
                                    justifyContent: 'end'}} startIcon={<ArrowBackIcon />} onClick={()=>router.back()}>
                                    {"Back"}</Button> : mode === 1 ? null : null}  
                            
                            <Box
                                sx={{
                                    pt: topPadding,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    // justifyContent: 'center',
                                    width: '100%',
                                    height: '100%'

                                }}
                            >
                                {/*<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>*/}
                                {/*  <ScreenLockPortraitOutlinedIcon />*/}
                                {/*</Avatar>*/}
                                {mode === 0 ? <div
                                    style={{display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%',}}>
                                    <div style={{}}>
                                        <div style={{fontSize: 30}}>Add a Datasource</div>
                                        <div style={{fontSize: 14}}>Welcome, to the Datasource adding interface!</div>
                                    </div>
                                </div> : mode === 1 ? <>
                                    <div style={{color: "#5A00E2", alignSelf: 'center', marginBottom: 35}}>
                                        <LockIcon sx={{transform: "scale(4)"}}/>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'start',
                                        width: '100%',
                                    }}>
                                        <div style={{}}>
                                            <div style={{fontSize: 30}}>Verification Code</div>
                                            <div style={{fontSize: 14}}>We've sent a verification code to your email
                                                address: <b>{email}</b>
                                            </div>
                                        </div>
                                    </div>
                                </> : null}

                                <Box  onSubmit={handleSubmit}
                                    sx={{
                                        pt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                                        width: '100%'
                                    }}>

                                    {mode === 0 ? <>{nameError ? <TextField
                                            error
                                            margin="normal"
                                            required
                                            sx={{width: "100%"}}
                                            id="name"
                                            label="Datasource Name"
                                            name="name"
                                            autoComplete="name"
                                            helperText="Incorrect Datasource Name"
                                            autoFocus
                                            onChange={(e) => setDataSourceName(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccountCircleIcon/>
                                                    </InputAdornment>
                                                ),
                                                placeholder: "Datasource Name"
                                            }}
                                        /> : <TextField
                                                margin="normal"
                                                required
                                                sx={{width: "100%"}}
                                                id="name"
                                                label="Datasource Name"
                                                name="name"
                                                autoComplete="name"
                                                autoFocus
                                                onChange={(e) => setDataSourceName(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AccountCircleIcon/>
                                                        </InputAdornment>
                                                    ),
                                                    placeholder: "Datasource Name"
                                                }}
                                            /> }

                                            {companyError ? <TextField
                                                error
                                                margin="normal"
                                                required
                                                sx={{width: "100%"}}
                                                id="description"
                                                label="Datasource Description"
                                                name="description"
                                                autoComplete="Description"
                                                rows={4}
                                                multiline
                                                helperText="Incorrect Datasource Description"
                                                autoFocus
                                                onChange={(e) => setDataSourceDescription(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <BusinessIcon/>
                                                        </InputAdornment>
                                                    ),
                                                    placeholder: "Datasource Description"
                                                }}
                                            /> : <TextField
                                                margin="normal"
                                                required
                                                sx={{width: "100%"}}
                                                id="description"
                                                label="Datasource Description"
                                                name="description"
                                                autoComplete="Description"
                                                rows={2}
                                                multiline
                                                autoFocus
                                                onChange={(e) => setDataSourceDescription(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <BusinessIcon/>
                                                        </InputAdornment>
                                                    ),
                                                    placeholder: "Datasource Description"
                                                }}
                                            />}

                                            {companyError ? <TextField
                                                error
                                                margin="normal"
                                                required
                                                sx={{width: "100%"}}
                                                id="topic"
                                                label="Domain Entity Associated (Topic)"
                                                name="topic"
                                                autoComplete="Topic"
                                                helperText="Incorrect Domain Entity Associated (Topic)"
                                                autoFocus
                                                onChange={(e) => setDataSourceTopic(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <BusinessIcon/>
                                                        </InputAdornment>
                                                    ),
                                                    placeholder: "Domain Entity Associated (Topic)"
                                                }}
                                            /> : <TextField
                                                margin="normal"
                                                required
                                                sx={{width: "100%"}}
                                                id="topic"
                                                label="Domain Entity Associated (Topic)"
                                                name="topic"
                                                autoComplete="Topic"
                                                autoFocus
                                                onChange={(e) => setDataSourceTopic(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <BusinessIcon/>
                                                        </InputAdornment>
                                                    ),
                                                    placeholder: "Domain Entity Associated (Topic)"
                                                }}
                                            />}

                                            {companyError ? <TextField
                                                error
                                                margin="normal"
                                                required
                                                sx={{width: "100%"}}
                                                id="fileSource"
                                                label="Datasource URL"
                                                name="fileSource"
                                                autoComplete="File Source"
                                                helperText="Incorrect Datasource File Source"
                                                autoFocus
                                                onChange={(e) => setDataSourceFileSource(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <BusinessIcon/>
                                                        </InputAdornment>
                                                    ),
                                                    placeholder: "Datasource File Source"
                                                }}
                                            /> : <TextField
                                                margin="normal"
                                                required
                                                sx={{width: "100%"}}
                                                id="fileSource"
                                                label="Datasource File Source"
                                                name="fileSource"
                                                autoComplete="File Source"
                                                autoFocus
                                                onChange={(e) => setDataSourceFileSource(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <BusinessIcon/>
                                                        </InputAdornment>
                                                    ),
                                                    placeholder: "Datasource File Source"
                                                }}
                                            />}

                                            {usernameError ? <TextField
                                                error
                                                margin="normal"
                                                required
                                                sx={{width: "100%"}}
                                                id="fileSourceLink"
                                                label="Datasource File Source Link"
                                                name="fileSourceLink"
                                                autoComplete="File Source Link"
                                                autoFocus
                                                helperText="Invalid Datasource File Format"
                                                onChange={(e) => setDataSourceFileLink(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <InsertDriveFileIcon/>
                                                        </InputAdornment>
                                                    ),
                                                    placeholder: "File Source Link"
                                                }}
                                            /> : <TextField
                                                margin="normal"
                                                required
                                                sx={{width: "100%"}}
                                                id="fileSourceLink"
                                                label="Datasource File Source Link"
                                                name="fileSourceLink"
                                                autoComplete="File Source Link"
                                                autoFocus
                                                onChange={(e) => setDataSourceFileLink(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <InsertDriveFileIcon/>
                                                        </InputAdornment>
                                                    ),
                                                    placeholder: "File Source Link"
                                                }}
                                            />}

                                            {/* {usernameError ? <Dropzone onChange={updateFiles} value={files}>
                                                {files.map((file) => (
                                                    <FileItem {...file} preview />
                                                ))}
                                                </Dropzone>
                                             : <Dropzone 
                                                    onChange={updateFiles} 
                                                    value={files}
                                                    style={{ maxHeight: "10vh" }}>
                                                    {files.map((file) => (
                                                 <FileItem {...file} preview />
                                             ))}
                                             </Dropzone>} */}

                                           {<div style={{display:'flex', justifyContent:'space-between',width:'100%', }}>
                                                
                                                <Button variant="contained" component="label" style={{width:'30%',padding:'1rem',backgroundColor: "#5A00E2"}}>
                                                    Browse
                                                    <input hidden type="file" onChange={handleFileInput} />
                                                </Button>
                                                <div  style={{minHeight:'100%',  paddingTop:'0.75rem', paddingBottom:'0.75rem',paddingLeft:"0.5rem"}}
                                                    > {selectedFile && selectedFile.name}</div>
                                            </div>}
                                            
                                            {usernameError ? <TextField
                                                error
                                                margin="normal"
                                                required
                                                sx={{width: "100%"}}
                                                id="fileFormat"
                                                label="Datasource File Format"
                                                name="fileFormat"
                                                autoComplete="File Format"
                                                autoFocus
                                                helperText="Invalid Datasource File Format"
                                                onChange={(e) => setDataSourceFileFormat(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <EmailIcon/>
                                                        </InputAdornment>
                                                    ),
                                                    placeholder: "Datasource File Format"
                                                }}
                                            /> : <TextField
                                                margin="normal"
                                                required
                                                sx={{width: "100%"}}
                                                id="fileFormat"
                                                label="Datasource File Format"
                                                name="fileFormat"
                                                autoComplete="File Format"
                                                autoFocus
                                                onChange={(e) => setDataSourceFileFormat(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <EmailIcon/>
                                                        </InputAdornment>
                                                    ),
                                                    placeholder: "Datasource File Format"
                                                }}
                                            />}

                                        <div style={{color:'red'}}>{error? <>{error}</>:null}</div>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{
                                                    mt: 3,
                                                    mb: 2,
                                                    borderRadius: 2,
                                                    py: 2,
                                                    width: "100%",
                                                    backgroundColor: "#5A00E2"
                                                }}
                                                onClick={signUpF}
                                                // href="/dashboard"
                                            >
                                                Submit Datasource
                                            </Button>
                                        </>
                                        : mode === 1 ?
                                        <>
                                            <div style={{
                                                width: '100%',
                                                paddingTop: 12
                                            }}>
                                                <OtpInput
                                                    inputStyle={{
                                                        alignItems:'center', display: 'flex',
                                                        width: '70%', height: '7vh', justifyContent:'center'
                                                    }}
                                                    value={otp}
                                                    onChange={(otp) => setOtp(otp)}
                                                    numInputs={6}
                                                    separator={<span></span>}
                                                />
                                            </div>
                                            {error? <>{error}</>:null}
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{
                                                    mt: 3,
                                                    mb: 2,
                                                    borderRadius: 2,
                                                    py: 2,
                                                    width: "100%",
                                                    backgroundColor: "#5A00E2"
                                                }}
                                                onClick={checkFields2}
                                                // onClick={() => {
                                                //     setMode(0)
                                                //     setTopPadding(6)
                                                //     setBottomTopPadding(45)
                                                //
                                                // }}
                                                // href="/dashboard"
                                            >
                                                Continue
                                            </Button>
                                        </> : null}

                                    {mode === 0 ? ''
                                    //<BrandName sx={{pt: 1}}/>
                                        : mode === 1 ? <div style={{
                                                paddingTop: 4,  minWidth: '100%', display: 'flex',
                                                justifyContent: 'center', flexDirection:'column',alignItems:'center',
                                            }}>
                                                    <div style={{ display:'flex'}}>{"Didn't receive code? "}
                                                    <div style={{color: "#5A00E2", display: "inline", cursor:"pointer", display: "block"}}
                                                    onClick={()=>{
                                                        // setMode(0)
                                                        // setTopPadding(6)
                                                        // setBottomTopPadding(45)
                                                        resendOTP()
                                                    }}>&nbsp;Resend</div>
                                                    </div>
                                                
                                                    <div style={{display: "block",}}>
                                                        {" Already have an account? "}
                                                        <Link sx={{alignSelf: 'end'}} href="/login" variant="body2">
                                                        <div style={{color: "#5A00E2", display: "inline"}}>Log In</div>
                                                    </Link>
                                                    </div>

                                            </div>
                                            : null}

                                    <Divider variant="middle"/>

                                    {/* <div style={{
                                        width: '100%', display: 'flex', paddingTop: bottomTopPadding, fontSize: 14,
                                        justifyContent: 'space-around', 
                                    }}>
                                        <div>Terms of Service</div>
                                        <div>Terms of Use</div>
                                        <div>Privacy Policy</div>
                                    </div>
                                    <Copyright sx={{pt: 1}}/> */}

                                </Box>
                            </Box>

                        </div>
                    </div>
                </div>
            </>    
        );

}

export default SubmitFile;