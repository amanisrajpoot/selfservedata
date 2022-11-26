import * as React from 'react';
import styles from "../styles/submitFile.module.css";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
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
import { useState, CSSProperties } from 'react';
import { useRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import {confirmSignUp, signIn, signUp, recieveOTP} from "../function/checkAuth";
import {saveDataSourceInfo} from "../function/users"
import {getUser, createUser} from "../function/users";
import OtpInput from 'react-otp-input';
import mixpanel from 'mixpanel-browser';
import {useEffect, useCallback} from "react";
import LoadingOverlay from 'react-loading-overlay';
import SyncLoader from 'react-spinners/SyncLoader';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import S3 from 'react-aws-s3';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useDropzone} from 'react-dropzone'
import RootRef from '@material-ui/core/RootRef'
import validator from 'validator'
//import validator from 'validator-js';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PropagateLoader from "react-spinners/PropagateLoader";

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

const override = {...CSSProperties,
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

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
    const [isActive, setIsActive] = React.useState(false);
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
    const [descriptionError, setDescriptionError] = useState(false)
    const [topicError, setTopicError] = useState(false)
    const [fileSourceError, setFileSourceError] = useState(false)
    const [sourceFileLinkError, setSourceFileLinkError] = useState(false)
    const [sourceS3FileURLError, setSourceS3FileURLError] = useState(false)
    const [fileError, setFileError] = useState(false)
    const [fileFormatError, setFileFormatError] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [passwordType, setPasswordType] = useState('password');
    const [files, setFiles] = React.useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUploadWait, setFileUploadWait] = useState(true);
    const [fileFormat, setFileFormat] = React.useState('');
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#ffffff");
    const [fileFormatOptions, setFileFormatOptions] = useState(['.CSV','.DOC','.DOCX','.ODT','.XLS','.XLSX','.ODS','.TXT',])

    const handleFileFormatChange = (event) => {
        setFileFormat(event.target.value);
    };

    // the configuration information is fetched from the .env file
    const config = {
        bucketName: "s3-fileupload-test02",
        region: "us-east-2",
        accessKeyId: "AKIAQOU6ADFZ3BYAKTON",
        secretAccessKey: "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",
    }

    const handleFileInput = (e) => {
        const ReactS3Client = new S3(config);
        console.log("acccepted file",acceptedFiles[0].name)
        setSelectedFile(acceptedFiles[0])
        setError("Uploading File")
        setLoading(true)
        //the name of the file uploaded is used to upload it to S3
        ReactS3Client
        .uploadFile(acceptedFiles[0], acceptedFiles[0].name)
        .then(data => {
            console.log(data.location)
            setDataSourceS3FileURL(data.location)
            setFileUploadWait(false)
            setError("You can now submit the datasource")
            console.log(dataSourceS3FileURL)
            setError(null)
            setLoading(false)
        })
        .catch(err => console.error(err))

    }

    const onDrop = useCallback(acceptedFiles => {
        const ReactS3Client = new S3(config);
        console.log("acccepted file",acceptedFiles[0].name)
        setError("Uploading File")
        setLoading(true)
        sleep(2000)
        setError(null)
        //the name of the file uploaded is used to upload it to S3
        ReactS3Client
        .uploadFile(acceptedFiles[0], acceptedFiles[0].name)
        .then(data => {
            console.log(data.location)
            setDataSourceS3FileURL(data.location)
            setFileUploadWait(false)
            setError("You can now submit the datasource")
            console.log(dataSourceS3FileURL)
            sleep(2000)
            setError(null)
        })
        .catch(err => console.error(err))
      }, [])

    const {getRootProps, getInputProps, isDragActive, open, acceptedFiles} = useDropzone({maxFiles:1, accept: {
        'text/*': ['.DOC','.DOCX','.CSV','.ODT','.XLS','.XLSX','.ODS','.TXT','.ZIP']
      }, })
    const file = acceptedFiles.map(file => (
        
        <div key={file.path} style={{paddingBottom:'1.5rem', minWidth:"100%"}}>
          {file.path} - {(file.size)/1024} KB
            <div style={{display:'flex', justifyContent:'space-between',minWidth:"100%"}}>
                {fileUploadWait && <Button type="submit" variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 2, py: 2,px:8,
                    width: "40%",backgroundColor: "#5A00E2"}}
                    onClick={handleFileInput}>Upload File</Button>}

                <Button type="submit" variant="contained"
                    sx={{ mt: 3, mb: 2, borderRadius: 2, px:8,
                        width: "40%",backgroundColor: "#5A00E2"}}
                        onClick={()=>{open();
                        setFileUploadWait(true);
                        }}>Change File</Button>
            </div>
        </div>

        
      ));

    async function signInFK(){
        setMode(1);
        setTopPadding(28)
        setBottomTopPadding(202)

    }

    async function submitDatasource() {
        if(fileUploadWait === true){
            alert("File is still getting uploaded, please wait before submitting.")
        } else {
            console.log("uploading datasource to the database")
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
                    "status": "Active",
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

    async function submitDatasourceDraft() {
        if(fileUploadWait === true){
            alert("File is still getting uploaded, please wait before submitting.")
        } else {
            console.log("uploading datasource to the database")
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
                    "status": "draft",
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
        if (dataSourceName.length < 3) {
            setError('Datasource Name should be atleast 3 letter long');
            setNameError(true)
            setDescriptionError(false)
            setTopicError(false)
            setFileSourceError(false)
            setSourceFileLinkError(false)
            setSourceS3FileURLError(false)
            setFileFormatError(false)
        } else if (dataSourceDescription.length < 49) {
            setError('Datasource description should be atleast 29 letter long');
            setNameError(false)
            setDescriptionError(true)
            setTopicError(false)
            setFileSourceError(false)
            setSourceFileLinkError(false)
            setSourceS3FileURLError(false)
            setFileFormatError(false)
        } else if (dataSourceTopic.length < 1) {
            setError('Invalid Topic(s)');
            setNameError(false)
            setDescriptionError(false)
            setTopicError(true)
            setFileSourceError(false)
            setSourceFileLinkError(false)
            setSourceS3FileURLError(false)
            setFileFormatError(false)
            console.log("email issue",email.split("@")[1])
        } else if (dataSourceFileSource.length < 2) {
            setError('Provide a valid Datasource origin');
            setNameError(false)
            setDescriptionError(false)
            setTopicError(false)
            setFileSourceError(true)
            setSourceFileLinkError(false)
            setSourceS3FileURLError(false)
            setFileFormatError(false)
        } else if (!validator.isURL(dataSourceFileLink)) {
            setError('Provide a valid URL');
            setNameError(false)
            setDescriptionError(false)
            setTopicError(false)
            setFileSourceError(false)
            setSourceFileLinkError(true)
            setSourceS3FileURLError(false)
            setFileFormatError(false)
        } else if (dataSourceS3FileURL.length < 1) {
            setError('File not uploaded yet, please upload the file before submitting.');
            setNameError(false)
            setDescriptionError(false)
            setTopicError(false)
            setFileSourceError(false)
            setSourceFileLinkError(false)
            setSourceS3FileURLError(false)
            setFileFormatError(false)
        } else if (fileFormat.length < 1) {
            setError('File format not selected, please select a proper file format.');
            setNameError(false)
            setDescriptionError(false)
            setTopicError(false)
            setFileSourceError(false)
            setSourceFileLinkError(false)
            setSourceS3FileURLError(false)
            setFileFormatError(true)
        } else {
            setError(null);
            setNameError(false)
            setDescriptionError(false)
            setTopicError(false)
            setFileSourceError(false)
            setSourceFileLinkError(false)
            setSourceS3FileURLError(false)
            setFileFormatError(false)
            submitDatasource();
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
                    <div  style={{display:'flex', minWidth:'70%', maxWidth:'70%',
                         flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <div style={{display:'flex',paddingTop:'3em',
                            minWidth:'55%', maxWidth:'55%', height:'90%',
                            flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 

                            {mode === 0 ?<Button  size="medium" sx={{display:'flex', width:'100%',paddingRight:2,
                                    justifyContent: 'start'}} startIcon={<ArrowBackIcon />} onClick={()=>router.back()}>
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

                                <LoadingOverlay
                                    active={isActive}
                                    spinner={<SyncLoader />}
                                    // text='Loading your content...'
                                    > <Box  onSubmit={handleSubmit}
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

                                            {descriptionError ? <TextField
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

                                            {topicError ? <TextField
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

                                            {fileSourceError ? <TextField
                                                error
                                                margin="normal"
                                                required
                                                sx={{width: "100%"}}
                                                id="fileSource"
                                                label="Datasource URL"
                                                name="fileSource"
                                                autoComplete="File Source"
                                                helperText="Incorrect Datasource Provider/Origin"
                                                autoFocus
                                                onChange={(e) => setDataSourceFileSource(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <BusinessIcon/>
                                                        </InputAdornment>
                                                    ),
                                                    placeholder: "Datasource Provider/Origin"
                                                }}
                                            /> : <TextField
                                                margin="normal"
                                                required
                                                sx={{width: "100%"}}
                                                id="fileSource"
                                                label="Datasource Provider/Origin"
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
                                                    placeholder: "Datasource Provider/Origin"
                                                }}
                                            />}

                                            {sourceFileLinkError ? <TextField
                                                error
                                                margin="normal"
                                                required
                                                sx={{width: "100%"}}
                                                id="fileSourceLink"
                                                label="Datasource File Source Link"
                                                name="fileSourceLink"
                                                autoComplete="File Source Link"
                                                autoFocus
                                                helperText="Invalid Datasource File Link"
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

                                           { fileError ? <Dropzone>
                                                            {({getRootProps, getInputProps}) => (
                                                                <div {...getRootProps()}>
                                                                <input {...getInputProps()} />
                                                                <p>Drag 'n' drop some files here, or click to select files</p>
                                                                </div>
                                                            )}
                                                            </Dropzone>

                                           : 
                                           <div  style={{border:'0.5px solid #bfbfbf', minWidth:'100%', display:'flex', borderRadius:'0.3rem',
                                                justifyContent:'center', marginBottom:'1.5rem', marginTop:'1rem'}}>
                                                {loading ? <div style={{display:'flex',flexDirection:'column',paddingBottom:'0.25rem', minWidth:'100%', maxWidth:'100%', 
                                                                        paddingTop:'1rem', justifyContent:'center', alignItems:'center'}}>
                                                            <p style={{paddingBottom:'0.50rem', marginRight:'1.25rem',marginTop:'2rem',
                                                                        }}><PropagateLoader color="#36d7b7" /></p>

                                                                <em style={{display: "block"}}>(Uploading File...)</em>
                                                                        
                                                                        {/* <Button sx={{  mb: 2, borderRadius: 2, py: 2,px:4, minWidth:'50%', maxWidth:'50%', 
                                                                            backgroundColor: "#5A00E2", color:'#fff'}}
                                                                            type="button"
                                                                            variant="contained" onClick={()=>setLoading(false)}>
                                                                            Cancel
                                                                            </Button> */}
                                                                            </div>:
                                                
                                                <section>
                                                    <div  style={{minWidth:"100%"}}{...getRootProps({className: 'dropzone'})}>
                                                        <input {...getInputProps()} />
                                                        {file.length <= 0 ? <div style={{paddingBottom:'0.25rem', minWidth:"100%"}}><p>Drag 'n' drop some files here, or click to select files</p> 
                                                                            <em style={{display: "block"}}>(You can drop only one file here)</em>
                                                                            <Button sx={{ mt: 3, mb: 2, borderRadius: 2, py: 2,
                                                                                width: "40%",backgroundColor: "#5A00E2", color:'#fff'}}
                                                                                type="button"
                                                                                variant="contained" onClick={open}>
                                                                                Select File
                                                                                </Button></div>
                                                                            : <p>Selected File</p>
                                                                            
                                                                            }

                                                    </div>
                                                    <aside>
                                                        {/*<h4>File</h4>*/}
                                                        <div>{file}</div>
                                                    </aside>
                                                </section>
                                            }
                                            </div>
                                            }
                                            
                                            {fileFormatError ? 
                                                // <TextField
                                                // error
                                                // margin="normal"
                                                // required
                                                // sx={{width: "100%"}}
                                                // id="fileFormat"
                                                // label="Datasource File Format"
                                                // name="fileFormat"
                                                // autoComplete="File Format"
                                                // autoFocus
                                                // helperText="Invalid Datasource File Format"
                                                // onChange={(e) => setDataSourceFileFormat(e.target.value)}
                                                // InputProps={{
                                                //     startAdornment: (
                                                //         <InputAdornment position="start">
                                                //             <EmailIcon/>
                                                //         </InputAdornment>
                                                //     ),
                                                //     placeholder: "Datasource File Format"
                                                // }}
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">File Format</InputLabel>
                                                    <Select
                                                    error
                                                    required
                                                    margin="normal"
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={fileFormat}
                                                    label="FileFormat"
                                                    name="fileFormat"
                                                    helperText="Invalid Datasource File Format"
                                                    autoFocus
                                                    autoComplete="File Format"
                                                    onChange={handleFileFormatChange}
                                                    >
                                                    {fileFormatOptions.map(formats=> <MenuItem value={formats}>{formats}</MenuItem>)}
                                                    
                                                    </Select>
                                                </FormControl>

                                             : 
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">File Format</InputLabel>
                                                    <Select
                                                    required
                                                    margin="normal"
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={fileFormat}
                                                    label="FileFormat"
                                                    name="fileFormat"
                                                    helperText="Invalid Datasource File Format"
                                                    autoFocus
                                                    autoComplete="File Format"
                                                    onChange={handleFileFormatChange}
                                                    >
                                                    {fileFormatOptions.map(formats=> <MenuItem value={formats}>{formats}</MenuItem>)}
                                                    
                                                    </Select>
                                                </FormControl>
                                            }

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
                                                onClick={checkFields}
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
                                </LoadingOverlay> 
                            </Box>

                        </div>
                    </div>
                </div>
              
            </> 
        );

}

export default SubmitFile;