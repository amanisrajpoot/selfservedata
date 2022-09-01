import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import DataSourcesDetails from '../components/datasourcesdetails';
import {getPublicDatasets, createUserDataset, getUser, updateUserDetails} from '../function/users';
import TopicsCard from '../components/topicsCard';
import FormControl from '@mui/material/FormControl';
import {useRouter} from 'next/router';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import mixpanel from 'mixpanel-browser';
import LeftNav from "../components/LeftNav";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import Avatar from '@mui/material/Avatar';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockIcon from '@mui/icons-material/Lock';
import Switch from '@mui/material/Switch';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import EmailIcon from "@mui/icons-material/Email";
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import {EMAIL_VALIDATOR} from "../function/constants";
import { getDatasets, } from '../function/users';
import { Auth } from 'aws-amplify';
import {createUser} from "../function/users";

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, minWidth:'100%' }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Settings({
  token, 
  setToken, 
  dataset, 
  dataSources,
  setDataSources,
  setDataset,
  setUserdatasets, 
  title, setTitle, description, setDescription,
  userdatasets,
  addDatasetcatalog,
  removeDatasetcatalog,
  user,
  setuser,
  name,
  email,
  company
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [localDataset, setLocalDataset] = useState('');
  const [search, setSearch] = useState(false);
  const [searching4, setSearching4] = useState([]);
  // const [title, setTitle] = React.useState('');
  // const [description, setDescription] = React.useState('');
  const [topic, setTopic] = React.useState('');
  const [keywords, setKeywords] = React.useState('');
  const [localdataset, setLocaldataset] = React.useState({title: '', description: '', topic: '', keywords: ''});
  const router = useRouter()
    const [value, setValue] = React.useState(0);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const openUser = Boolean(anchorElUser);
    const open2 = Boolean();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickUser = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl(null);
    };

    const handleCloseUser = () => {
        setAnchorElUser(null);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClickChange = (newValue) => {
        setValue(newValue);
    };

  useEffect(() => {
    setSearching4(dataset.catalog);
    console.log("fetched dataset",searching4);
  }, [dataset]);

    useEffect(async () => {
        if(token !== 0 && token && token !== null && token !== undefined &&
            user !== {} && user !== null && user !== undefined){
            console.log('get users called from settings', token);
            const userP = await getUser(token);
            if(userP === null || userP === undefined ){
                setuser({})
            } else{
                setuser(userP)
            }
            console.log('userP', userP);
        }
    }, []);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    useEffect(async ()=> {
        if(token !== 0 && token !== null && token !== undefined &&
            (user === {} || user === null || user.error)){
            console.log("settings page reached for account creation")

          console.log('token in the dashboard page', token)
          console.log('creating user in the backend')
          const erro = await createUser({
              email: email?email:Auth.user.attributes.email,
              //phone: '+1' + phone,
              name:name?name:Auth.user.attributes.name,
              company:company?company:Auth.user.attributes['custom:company'],
              token
            
          });
  
          console.log('user created response', user)
          console.log('error while creating user using api call', erro)
           await sleep(2000);
           if("ID" in erro){
               router.reload()
             }
        }
    },[]);

    useEffect(async () => {
        if(token !== 0 && token && token !== null && token !== undefined &&
            (userdatasets === [] || userdatasets !== null || userdatasets !== undefined)){
            console.log('get users called from settings', token);
            const data = await getDatasets(
                token
            );
            setUserdatasets(data);
            console.log("fetched datasets",data);
        }
    }, [token]);

    const [openDetails, setOpenDetails] = useState(false);
    const [dsDetails, setDSDetails] = useState([]);
    const [editMode, setEditMode] = useState(0)
    const [localFirstName, setLocalFirstName] = useState("")
    const [localLastName, setLocalLastName] = useState("")
    const [localCompany, setLocalCompany] = useState("")
    const [localUser, setLocalUser] = useState({})
    const [error, setError] = useState("")

    function checkFields() {
        if(editMode === 1 && (localFirstName.length < 3 || localLastName.length < 3)) {
            setError('Name should be atleast 3 letter long');
        } else if(editMode === 2 && localCompany.length < 3 ) {
            setError('Invalid Company Name');
        } else{
            setError(null);
            handleUpdateData();
        }
    }

    const handleUpdateData = async () => {
        if(token!==null){
            const data = await updateUserDetails({
                token,
                user: localUser
            });
            setLocalUser(data);
            setuser(data);
            mixpanel.track('Clicked on Update User Details', {
                'source': "Create Dataset Page",
                'scrolled first': true,
                'email':user.email,
            })
            console.log("updated user details",data);
            editMode=== 1?setEditMode(0):
            editMode=== 2?setEditMode(0):null

        }
    };

    useEffect( () => {
        if(editMode === 1 && localFirstName !== "" && localLastName !== "") {
            setLocalUser({...user, firstname: localFirstName, lastname: localLastName});
            setuser({...user,...localUser})
        } else if(editMode === 2 && localCompany !== "") {
            setLocalUser({...user, company: localCompany});
            setuser({...user,...localUser})
        }
        console.log("added details",dataset);
    }, [localFirstName, localLastName, localCompany]);

    const handleOpenDetails = (data) => {
      setOpenDetails(true);
      setDSDetails(data);
    };
    const handleCloseDetails = () => {
      setOpenDetails(false);
    };

  const handleSendData = async () => {
      if(token!==null){
        const data = await createUserDataset({
          token,
          dataset
        });
        setUserdatasets(data);
        mixpanel.track('Clicked on Create', {
          'source': "Create Dataset Page",
          'scrolled first': true,
            'email':user.email,
        })
        console.log("created dataset",data);
        router.push('/dataset/'+data.ID);
      }
  };

  useEffect( () => {
    setLocaldataset({title, description,});
    setDataset({...dataset,...localdataset});
    console.log("added details",dataset);
  }, [title, description, topic, keywords]);

  useEffect( () => {
    console.log("added details",dataset);
  }, [dataset]);

    const getImages = (base64Image, fileImage) => {
        // Do something with the selected image)
        console.log(base64Image);
        console.log(fileImage);
    };

  return (
    <div style={{display:'flex', flexDirection:'row', maxWidth:'100%',minWidth:"100%", height:'100%'}}>
        {/* <Box sx={{width:"18%", display:'flex', flexDirection:'column'}}>
            <LeftNav token={token} userdatasets={userdatasets} setUserdatasets={setUserdatasets}/>
        </Box> */}

        <div style={{ backgroundColor: '#f7f7f7', display:'flex', flexDirection:'column', maxWidth:'100%',minWidth:"100%",}}>

            <div style={{ display: 'flex', flexDirection:'row', paddingTop:'6rem', paddingLeft:'1rem',paddingRight:16,
                paddingBottom:'1rem', backgroundColor: '#f7f7f7', 
                justifyContent:'space-between', maxWidth:'100%',minWidth:"100%",}}>

                <div style={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18, width:"40%",
                    color:'gray-700', alignItems:'center'}}>
                    <Button  size="medium" sx={{display:'flex', alignItems:'center',paddingRight:2,
                            justifyContent:'center'}} startIcon={<ArrowBackIcon />}
                             onClick={editMode=== 0?()=>router.back():
                                      editMode=== 1?()=>setEditMode(0):
                                      editMode=== 2?()=>setEditMode(0):
                                      editMode=== 3?()=>setEditMode(0):
                                      editMode=== 4?()=>setEditMode(0):null}>
                            {"Back"}</Button>
                    <Divider variant="middle" orientation="vertical" />
                    <div style={{paddingLeft:8,paddingRight:2,fontSize:24}}>Settings</div>

                </div>
            </div>

            <Box
                sx={{ flexGrow: 1, bgcolor: "background.paper", display: 'flex' , minHeight:'88vh',mx:2, pt:2}}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider', textAlign: 'left', }}
                >
                    <Tab sx={{ textAlign: 'left', textTransform:'capitalize'}} label={"User Profile "} {...a11yProps(0)} />
                    <Tab disabled sx={{ textAlign: 'left', textTransform:'capitalize'}} label={"Notification (Enterprise Version)"}
                         {...a11yProps(1)} />
                    <Tab disabled sx={{ textAlign: 'left', active: {color:'#5A00E2' }, textTransform:'capitalize'}} label="API Configurations (Enterprise Version)" {...a11yProps(2)} />

                </Tabs>
                <TabPanel value={value} index={0} sx={{width:'100%',}}>
                    <Box sx={{display:'flex',flexDirection:'column', alignItems:'space-between', width:'100%'}}>
                        {editMode=== 0? <Box >
                            <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto',
                             fontSize:20,pb:2, minWidth:'100%', mr:70, }}>
                                <div>My Account &nbsp;</div>
                                <Avatar alt={Auth.user?Auth.user.attributes.name.split(" ")[0].toUpperCase():'U'} sx={{height:175, width:175, marginTop:2}} 
                                    src="url(/user_logo.jpg)" />
                             </Box>

                            <Box sx={{display:'flex', flexDirection:'column',width:"100%", bgColor:'#fff',color:'#fff', paddingBottom:28}}>
                                <FormControl fullWidth sx={{width:'100%' }}>
                                    {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>*/}

                                    <div style={{fontSize:12, paddingTop:4, color:'#939EAA',textTransform:'uppercase'}}>Full Name</div>
                                    <div style={{display:'flex', alignItems:'center', paddingTop:12, justifyContent:'space-between', width:'60%'}}>
                                        <div style={{width:'100%', display:'flex'}}>
                                            <AccountCircleOutlinedIcon sx={{fontSize:28, color:'black'}}/>
                                            <div style={{fontSize:20, paddingLeft:8, color:'#030D55',}}>
                                            {user!== null && user !== undefined && user.firstname? user.firstname+" "+user.lastname: "loading.."}</div>
                                        </div>
                                        {/* <ModeEditOutlineRoundedIcon sx={{fontSize:20, color:'black',cursor:'pointer'}}
                                            onClick={()=>setEditMode(1)}/> */}
                                    </div>

                                    <div style={{fontSize:12, paddingTop:24, color:'#939EAA',textTransform:'uppercase'}}>Company</div>
                                    <div style={{display:'flex', alignItems:'center', paddingTop:12, justifyContent:'space-between', width:'60%'}}>
                                        <div style={{width:'100%', display:'flex'}}>
                                            <BusinessRoundedIcon sx={{fontSize:28, color:'black'}}/>
                                            <div style={{fontSize:20, paddingLeft:8, color:'#030D55',}}>
                                                {user!== null && user !== undefined && user.company?user.company: "loading.."}</div>
                                        </div>
                                        {/* <ModeEditOutlineRoundedIcon sx={{fontSize:20, color:'black',cursor:'pointer'}}
                                                                    onClick={()=>setEditMode(2)}/> */}
                                    </div>

                                    <div style={{fontSize:12, paddingTop:24, color:'#939EAA',textTransform:'uppercase'}}>Email Address</div>
                                    <div style={{display:'flex', alignItems:'center', paddingTop:12, justifyContent:'space-between', width:'60%'}}>
                                        <div style={{width:'100%', display:'flex'}}>
                                            <AccountCircleOutlinedIcon sx={{fontSize:28, color:'black'}}/>
                                            <div style={{fontSize:20, paddingLeft:8, color:'#030D55',}}>
                                                {user!== null && user !== undefined && user.email?user.email: "loading.."}</div>
                                        </div>
                                        {/*<ModeEditOutlineRoundedIcon sx={{fontSize:20, color:'black',cursor:'pointer'}}*/}
                                        {/*    onClick={()=>setEditMode(3)}/>*/}
                                    </div>

                                    {/*<div style={{fontSize:12, paddingTop:24, color:'#939EAA',textTransform:'uppercase'}}>Password</div>*/}
                                    {/*<div style={{display:'flex', alignItems:'center', paddingTop:12, width:'60%'}}>*/}
                                    {/*    <div style={{width:'100%', display:'flex'}}>*/}
                                    {/*        <LockIcon sx={{fontSize:28, color:'black'}}/>*/}
                                    {/*        <div style={{fontSize:20, paddingLeft:8, color:'#030D55',*/}
                                    {/*            }} type="password">{"**********"}</div>*/}
                                    {/*    </div>*/}
                                    {/*    /!*<ModeEditOutlineRoundedIcon sx={{fontSize:20, color:'black',cursor:'pointer'}}*!/*/}
                                    {/*    /!*    onClick={()=>setEditMode(4)}/>*!/*/}
                                    {/*</div>*/}

                                </FormControl>
                            </Box>
                        </Box>:
                            editMode === 1?<Box>
                                <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto',
                                    fontSize:20,pb:2, minWidth:'100%', mr:45, }}>
                                    <div>Edit Name &nbsp;</div>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto',
                                    fontSize:20,pb:2, minWidth:'100%', mr:45, }}>
                                    <TextField
                                        variant="outlined"
                                        value={localFirstName}
                                        onChange={(event)=>setLocalFirstName(event.target.value)}
                                        sx={{color:'#fff', bgColor:'#fff',pb:2}}
                                        //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        label="First Name"
                                    />

                                    <TextField
                                        variant="outlined"
                                        value={localLastName}
                                        onChange={(event)=>setLocalLastName(event.target.value)}
                                        sx={{color:'#fff', bgColor:'#fff',pb:2}}
                                        //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        label="Last Name"
                                    />
                                </Box>

                                    {error && <>{error}</>}
                                    <Button variant="contained" size="small" sx={{px:5, py:1.5,pt:2,borderRadius:2,
                                        backgroundColor:"#5A00E2"}}
                                            onClick={()=>checkFields()}>
                                        {"Update"}</Button>

                            </Box>
                            :
                            editMode === 2?<Box>
                                        <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto',
                                            fontSize:20,pb:2, minWidth:'100%', mr:45, }}>
                                            <div>Edit Company &nbsp;</div>
                                        </Box>

                                        <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto',
                                            fontSize:20,pb:2, minWidth:'100%', mr:45, }}>
                                            <TextField
                                                variant="outlined"
                                                value={localCompany}
                                                onChange={(event)=>setLocalCompany(event.target.value)}
                                                sx={{color:'#fff', bgColor:'#fff',pb:2}}
                                                //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                label="Company Name"
                                            />
                                        </Box>

                                    {error && <>{error}</>}
                                    <Button variant="contained" size="small" sx={{px:5, py:1.5,pt:2,borderRadius:2,
                                        backgroundColor:"#5A00E2"}}
                                            onClick={()=>checkFields()}>
                                        {"Update"}</Button>

                                    </Box>
                                    :
                            editMode === 3?<Box>
                                <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto',
                                    fontSize:20,pb:2, minWidth:'100%', mr:45, }}>
                                    <div>Edit Email &nbsp;</div>
                                </Box>


                                    <div style={{display:'flex', alignItems:'center', paddingTop:12, justifyContent:'space-between', alignItem:'center'}}>

                                            <div style={{fontSize:12, color:'#939EAA',textTransform:'uppercase'}}>Current Email Address</div>
                                            <div style={{fontSize:18, paddingLeft:8, color:'#030D55',}}>
                                                {user!== null && user !== undefined ? user.email: "123"}</div>

                                    </div>

                                <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto',
                                    fontSize:20,pb:2, minWidth:'100%', mr:45, }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        sx={{width: "100%"}}
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={(e) => setEmail(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon/>
                                                </InputAdornment>
                                            ),
                                            placeholder: "Email Address"
                                        }}
                                    />

                                    <TextField
                                        margin="normal"
                                        required
                                        sx={{width: "100%"}}
                                        name="password"
                                        label="Enter Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon/>
                                                </InputAdornment>
                                            ),
                                            placeholder: "Enter Password"
                                        }}
                                    />
                                </Box>

                            </Box>:
                                editMode === 4?<Box>
                                    <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto',
                                        fontSize:20,pb:2, minWidth:'100%', mr:45, }}>
                                        <div>Change Password &nbsp;</div>
                                    </Box>

                                    <TextField
                                        margin="normal"
                                        required
                                        sx={{width: "100%"}}
                                        name="password"
                                        label="Enter Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon/>
                                                </InputAdornment>
                                            ),
                                            placeholder: "Current Password"
                                        }}
                                    />

                                    <TextField
                                        margin="normal"
                                        required
                                        sx={{width: "100%"}}
                                        name="password"
                                        label="Enter Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon/>
                                                </InputAdornment>
                                            ),
                                            placeholder: "New Password"
                                        }}
                                    />

                                    <TextField
                                        margin="normal"
                                        required
                                        sx={{width: "100%"}}
                                        name="password"
                                        label="Enter Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon/>
                                                </InputAdornment>
                                            ),
                                            placeholder: "Repeat Password"
                                        }}
                                    />

                                </Box>:null}

                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1} sx={{width:'100%',}}>
                    <Box sx={{ display: 'flex', flex:'1',flexDirection:'column', font:'roboto',fontSize:20,mr:75,width:'100%'}}>
                        <div>Notification Settings &nbsp;</div>

                    </Box>
                    <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',pt:4}}>
                        <div style={{display: 'flex',flexDirection:'column',width:"45%"}}>
                            <div style={{color:'black'}}>Email Notification</div>
                            <div style={{color:'gray', width:'80%'}}>{localdataset.title ? localdataset.title : "Euismod rhoncus ac in ultrices a. At ipsum varius massa interdum. Quam adipiscing"} &nbsp;</div>
                        </div>

                        <div style={{ marginLeft:12,display:'flex', flexDirection:'column',alignItems:'start'}}>
                            <div style={{display:'flex', alignItems:"start", paddingBottom:24}}>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <div style={{display: 'flex',flexDirection:'column',marginLeft:8}}>
                                    <div style={{color:'black'}}>News and update</div>
                                    <div style={{color:'gray'}}>{localdataset.title ? localdataset.title : "Euismod rhoncus ac in ultrices a. "} &nbsp;</div>
                                </div>
                            </div>
                            <div style={{display:'flex', alignItems:"start", paddingBottom:24}}>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <div style={{display: 'flex',flexDirection:'column',marginLeft:8}}>
                                    <div style={{color:'black'}}>News and update</div>
                                    <div style={{color:'gray'}}>{localdataset.title ? localdataset.title : "Euismod rhoncus ac in ultrices a. "} &nbsp;</div>
                                </div>
                            </div>
                        </div>

                    </Box>

                    <Divider sx={{width:'100%', marginBottom:2}} />

                    <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',pt:4}}>
                        <div style={{display: 'flex',flexDirection:'column',width:"45%"}}>
                            <div style={{color:'black'}}>Reminders</div>
                            <div style={{color:'gray', width:'80%'}}>{localdataset.title ? localdataset.title : "Euismod rhoncus ac in ultrices a. At ipsum varius massa interdum. Quam adipiscing"} &nbsp;</div>
                        </div>

                        <div style={{ marginLeft:12,display:'flex', flexDirection:'column',alignItems:'start'}}>
                            <div style={{display:'flex', alignItems:"start", paddingBottom:24}}>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <div style={{display: 'flex',flexDirection:'column',marginLeft:8}}>
                                    <div style={{color:'black'}}>All Reminders</div>
                                    <div style={{color:'gray'}}>{localdataset.title ? localdataset.title : "Euismod rhoncus ac in ultrices a. "} &nbsp;</div>
                                </div>
                            </div>
                            <div style={{display:'flex', alignItems:"start", paddingBottom:24}}>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"
                                       style={{backgroundColor:'#5A00E2'}}/>
                                <div style={{display: 'flex',flexDirection:'column',marginLeft:8}}>
                                    <div style={{color:'black'}}>Important only</div>
                                    <div style={{color:'gray'}}>{localdataset.title ? localdataset.title : "Euismod rhoncus ac in ultrices a. "} &nbsp;</div>
                                </div>
                            </div>
                        </div>

                    </Box>

                    <Divider sx={{width:'100%', marginBottom:2}} />

                    <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',pt:4,paddingBottom:2,
                            width:'100%', justifyContent:'space-between'}}>
                        <div style={{display: 'flex',flexDirection:'column',}}>
                            <div style={{color:'black'}}>Notification</div>
                            <div style={{color:'gray',}}>{localdataset.title ? localdataset.title : "Euismod rhoncus ac in ultrices a. At ipsum varius massa interdum. Quam adipiscing"} &nbsp;</div>
                        </div>

                        <div style={{display:'flex', flexDirection:'column',alignItems:'start'}}>
                            <Switch  defaultChecked />
                        </div>

                    </Box>

                    <Divider sx={{width:'100%',marginBottom:2}} />

                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Box sx={{ display: 'flex', flex:'1',flexDirection:'column', font:'roboto',fontSize:20,mr:75}}>
                        <div>API Configuration &nbsp;</div>

                    </Box>
                    <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',pt:4,paddingBottom:2,
                        width:'100%', justifyContent:'space-between'}}>
                        <div style={{display: 'flex',flexDirection:'column',}}>
                            <div style={{color:'black'}}>Notification</div>
                            <div style={{color:'gray', }}>{localdataset.title ? localdataset.title : "Euismod rhoncus ac in ultrices a. At ipsum varius massa interdum. Quam adipiscing"} &nbsp;</div>
                        </div>

                        <div style={{display:'flex', flexDirection:'column',alignItems:'start'}}>
                            <Switch  />
                        </div>

                    </Box>

                    <Divider sx={{width:'100%',marginBottom:2}} />

                    <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',pt:4,paddingBottom:2,
                        width:'100%', justifyContent:'space-between'}}>
                        <div style={{display: 'flex',flexDirection:'column',}}>
                            <div style={{color:'black'}}>Notification</div>
                            <div style={{color:'gray', }}>{localdataset.title ? localdataset.title : "Euismod rhoncus ac in ultrices a. At ipsum varius massa interdum. Quam adipiscing"} &nbsp;</div>
                        </div>

                        <div style={{display:'flex', flexDirection:'column',alignItems:'start'}}>
                            <Switch   />
                        </div>

                    </Box>

                    <Divider sx={{width:'100%',marginBottom:2}} />

                </TabPanel>

            </Box>

      <Modal open={openDetails} onClose={handleCloseDetails}>
          <Box sx={style2}>            
              <DataSourcesDetails user={user} handleCloseDetails={handleCloseDetails}
              data={dsDetails} addDatasetcatalog={addDatasetcatalog}/>
          </Box>                  
       </Modal>

      {/*  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column',}}>*/}
      {/*    <Box component="main" sx={{ flex: 1, py: 2, px: 4, bgcolor: '#eaeff1' }}>*/}
      {/*       <Typography color="inherit" variant="h5" component="h1">*/}
      {/*            <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',}}>*/}
      {/*                <div>Matching Topics &nbsp;</div>*/}
      {/*           */}
      {/*            </Box>*/}
      {/*        </Typography>*/}
      {/*    </Box>*/}

      {/*    <Box sx={{ width:"100%", bgcolor: '#eaeff1', display:'flex', flexDirection:'column', */}
      {/*        justifyContent:"center",alignItems:'center', }}>*/}
      {/*          {dataSources && <TopicsCard */}
      {/*            openDetails={openDetails}*/}
      {/*            data={dataSources}*/}
      {/*            token={token}*/}
      {/*            user={user}*/}
      {/*            handleOpenDetails={handleOpenDetails}*/}
      {/*            handleCloseDetails={handleCloseDetails} */}
      {/*            dataset={dataset.catalog}*/}
      {/*            dataSources={dataSources}*/}
      {/*            removeDatasetcatalog={removeDatasetcatalog}*/}
      {/*            addDatasetcatalog={addDatasetcatalog}*/}
      {/*            />}*/}
      {/*    </Box>*/}
      {/*</Box>*/}
    
      {/* <Box sx={{  minHeight: '23vh', }}>        
        <Box component="main" sx={{ flex: 1, pt:6, px: 4, bgcolor: '#ffffff' }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>HELP CENTER &nbsp;</div>
                 
                  </Box>
              </Typography>
          </Box>

          <Box component="main" sx={{ py:4,bgcolor: '#ffffff' }}>

            <Box sx={{ 
                    minheight:275, my:1, px:16, bgcolor: '#ffffff', display:'flex', flexDirection:'row',
                    alignItems:'center', justifyContent:'space-between', alignSelf:'center' }}>
             <HelpCenterCard 
                title={"GETTING STARTED"}
                description={"Learn about how Data Platform works. Information for new users."}
                linkText={'How to Create a Custom Dataset?'}
                link={'#'}
                all={'See all articles'}/>

              <HelpCenterCard 
                title={"GEOGRAPHIC AND TIME GRAINS"}
                description={"Learn what Geographic and Time grains are and how they work."}
                linkText={'Data Grains Explained'}
                link={'#'}
                all={'See all articles'}/>

              <HelpCenterCard 
                title={"DATA SCIENCE TREATMENTS"}
                description={"Learn about the different data science treatments you can apply to your signals."}
                linkText={'Overview of Data Science Treatments'}
                link={'#'}
                all={'See all articles'}/>

            </Box>
        </Box>
    </Box>   */}

        </div>
    </div>
  );
}

