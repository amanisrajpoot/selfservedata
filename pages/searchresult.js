import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TextField from '@mui/material/TextField';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import AddedFeatureCard from '../components/AddedFeatureCard';
import ToAddFeatureCard from '../components/AddedFeatureCard';
import Modal from '@mui/material/Modal';
import DataSourcesDetails from '../components/datasourcesdetails';
import {getPublicDatasets, createUserDataset, getUser} from '../function/users';
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
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {signOut} from "../function/checkAuth";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";
import CachedIcon from "@mui/icons-material/Cached";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoadingOverlay from 'react-loading-overlay';
import SyncLoader from 'react-spinners/SyncLoader';
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

export default function Searchresult({
  token, 
  setToken, 
  name,
  email,
  company,
  dataset,
  setDataset, 
  dataSources,
  setDataSources,
  setUserdatasets, 
  title, setTitle, description, setDescription,
  userdatasets,
  user,
  setuser,
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
  const [isActive, setIsActive] = React.useState(false);
  const [error, setError] = React.useState('');

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
            console.log('get users called from create datasets', token);
            const userP = await getUser(token);
            if(userP === null || userP === undefined ){
                setuser({})
            } else{
                setuser(userP)
            }
            console.log('userP', userP);
        }
    }, [token]);

    useEffect(async () => {
        await setDataset({
            user_email:'',
            title:'',
            description:'',
            topic:'',
            row_count:0,
            data_points:0,
            data_sources:0,  
            status:'',
            template:false,
            catalog:[''],
        });
        setLocalDataset({});
        await setTitle('');
        await setDescription('');
    }, [token, router]);

    const addDatasetcatalog = (data) => {
        setDataset({...dataset,catalog:[...dataset.catalog,data]});
        console.log("dataset",dataset)
    };
    const removeDatasetcatalog = (data) => {
        const filtered = dataset.catalog.filter(item => item.ID !== data.ID);
        setDataset({...dataset,catalog:filtered});
        console.log("dataset",dataset)
    };

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
        //    if("ID" in erro){
        //        router.reload()
        //      }
        }
    },[]);

    const [openDetails, setOpenDetails] = useState(false);
    const [dsDetails, setDSDetails] = useState([]);
    const handleOpenDetails = (data) => {
      setOpenDetails(true);
      setDSDetails(data);
    };
    const handleCloseDetails = () => {
      setOpenDetails(false);
    };

  const [keyword, setKeyword] = useState('');
  const [keywordSearch, setKeywordSearch] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const openUser = Boolean(anchorElUser);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };

    const handleClickUser = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUser = () => {
        setAnchorElUser(null);
    };

  useEffect(() => {
    setLocalDataset(dataset);
    console.log("updated dataset",localDataset);
  }, [dataset]);

  const handleKeywordSearch = async (event) => {
    if(token!==null){
        mixpanel.track('Keyword Search for Catalogs', {
            'source': "Create Dataset Page",
            'action': "keyword search",
            'keyword': keyword,
            'email': user.email,
        });
        setIsActive(true);
        const data = await getPublicDatasets(
        token,keyword
      );
        setDataSources(data);
        setIsActive(false);
        console.log("fetched data",data);
        console.log("previous dataset",dataset);
    }
};

  const handleSendData = async () => {
      
    if(localDataset.title ===''){
        setError('Please enter an appropriate Title');
        return
    }
    if(localDataset.description ===''){
        setError('Please enter an appropriate Description.');
        return
    }
    if(dataset.catalog.length < 1){
        setError('Please add atleast one catalog to your Dataset.');
        return
    }
    if(token!==null){
        setIsActive(true);
        const data = await createUserDataset({
          token,
          dataset
        });
        setUserdatasets(data);
        //setIsActive(false);
        mixpanel.track('Clicked on Create', {
          'source': "Create Dataset Page",
          'scrolled first': true,
            'email':user.email,
        })
        console.log("created dataset",data);
        router.push('/dataset/'+data.ID);
        setIsActive(false);
        await setDataset({
            user_email:'',
            title:'',
            description:'',
            topic:'',
            row_count:0,
            data_points:0,
            data_sources:0,  
            status:'',
            template:false,
            catalog:[],
        });
        setLocalDataset({});
        await setTitle('');
        await setDescription('');
      }
  };

  useEffect( () => {
    setLocaldataset({title, description,});
    setDataset({...dataset,...localdataset});
    console.log("added details",dataset);
  }, [title, description, topic, keywords]);

  useEffect( () => {
    console.log("added details",dataset);
    setError('')
  }, [dataset]);

  return (
    <div style={{display:'flex', flexDirection:'row',minWidth:'100%', maxWidth:'100%',}}>
        
        {/* <Box sx={{width:"18%", display:'flex', flexDirection:'column'}}>
            <LeftNav token={token} userdatasets={userdatasets} setUserdatasets={setUserdatasets}/>
        </Box> */}

        <div style={{minWidth:'100%', maxWidth:'100%', backgroundColor: '#f7f7f7'}}>

            <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:2, bgcolor: '#f7f7f7', minWidth:'100%', maxWidth:'100%',
                justifyContent:'space-between', pt:12}}>

                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18, width:"40%",
                    color:'gray-700', alignItems:'center'}}>
                    <Button  size="medium" sx={{display:'flex', alignItems:'center',paddingRight:2,
                            justifyContent:'center'}} startIcon={<ArrowBackIcon />} onClick={()=>router.back()}>
                            {"Back"}</Button>
                    <Divider variant="middle" orientation="vertical" />
                    <div style={{paddingLeft:8,paddingRight:2,fontSize:24}}>Create Dataset</div>

                </Box>
                </Box>
            
            <LoadingOverlay
                active={isActive}
                spinner={<SyncLoader />}
                // text='Loading your content...'
                > 
            <Box
                sx={{ flexGrow: 1, bgcolor: "background.paper", display: 'flex' , minHeight:'88vh',mx:2, pt:2, minWidth:'100%', maxWidth:'100%',}}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider', textAlign: 'left', minWidth:'20%',maxWidth:'20%' }}
                >
                    <Tab sx={{ textAlign: 'left', }} label={"1. Dataset Information "} {...a11yProps(0)} />
                    <Tab sx={{ textAlign: 'left', }} label="2. Add Catalogues" {...a11yProps(1)} />
                    <Tab sx={{ textAlign: 'left', active: {color:'#5A00E2' }}} label="3. Review and Save" {...a11yProps(2)} />

                </Tabs>
                <TabPanel value={value} index={0} sx={{minWidth:'80%',maxWidth:'80%'}}>
                    <div style={{display:'flex',flexDirection:'column', alignItems:'space-between',minWidth:'96%',maxWidth:'96%' }}>
                    <div style={{minWidth:'100%',}}>
                        <div style={{ display: 'flex', flexDirection:'column', font:'roboto',
                         fontSize:20,pb:2, minWidth:'100%', marginRight:'25rem' }}>
                            <div>BASIC INFO &nbsp;</div>
                            <div style={{fontSize:12, paddingTop:4, color:'gray',}}>*Enter a title and description for your Dataset.</div>
                         </div>

                    <div style={{display:'flex', flexDirection:'column',width:"100%", bgColor:'#fff',color:'#fff', 
                        paddingBottom:32, minWidth:'100%'}}>
                        <FormControl fullWidth sx={{width:'100%' }}>
                            {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>*/}
                            <TextField
                                variant="outlined"
                                value={title}
                                onChange={(event)=>{
                                    setTitle(event.target.value)
                                    setError('')
                                }}
                                sx={{color:'#fff', bgColor:'#fff',pb:2}}
                                //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="Title"
                            />

                            <TextField
                                variant="outlined"
                                value={description}
                                onChange={(event)=>{
                                    setDescription(event.target.value)
                                    setError('')
                                }}
                                sx={{color:'#fff',pb:2}}
                                rows={5}
                                //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="What this data will be doing for you?"
                                multiline
                            />

                        </FormControl>
                    </div>
                    </div>
                        <Divider sx={{width:'100%', marginBottom:2}} />

                        <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto',width:'100%',
                            fontSize:20,pb:2,  justifyContent:'end'}}>

                            {/* <Button variant="outlined" size="small" sx={{ml:2,color:'#5A00E2',borderRadius:4,
                                borderColor:'#5A00E2'}}
                                     onClick={()=>router.push('/dashboard')}>
                                {"Save as Draft"}</Button> */}
                            <Button variant="contained" size="small" sx={{px:5, py:1.5,ml:2,borderRadius:4,width:'16ch',
                                backgroundColor:"#5A00E2"}}
                                    onClick={()=>handleClickChange(1)}>
                                {"Next"}</Button>
                        </Box>


                    </div>
                </TabPanel>
                <TabPanel value={value} index={1} sx={{minWidth:'100%',maxWidth:'100%',paddingRight:'1rem'}}>
                        <div style={{ display: 'flex', flex:'1',flexDirection:'column', font:'roboto', fontSize:20, 
                        minWidth:'100%',maxWidth:'100%',marginRight:'22rem'}}>
                                <div style={{display:'flex',minWidth:'100%',maxWidth:'100%',}}>
                                    <div>ADD CATALOG &nbsp;</div>
                                    {dataSources !== null && dataSources !== undefined &&
                                    <div>{"("+ dataSources.length+")"}</div>}
                                </div>

                            <div style={{fontSize:12, paddingTop:4,color:'gray', paddingBottom:'1rem',minWidth:'100%',maxWidth:'100%'}}>
                                *Search from a wide range of healthcare catalogs..</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', flex:'1', minWidth:'100%',maxWidth:'100%',
                            paddingBottom:'1rem'}}>
                            <div component="main" style={{  minWidth:'80%',maxWidth:'79%', paddingRight:'0.75em' }}>
                                <TextField fullWidth id="outlined-basic" variant="outlined"
                                           value={keyword} onChange={(e) => setKeyword(e.target.value)}
                                           label="Keyword" sx={{ bgcolor: '#ffffff'}}
                                           onKeyDown={()=>handleKeywordSearch()}/>
                            </div>

                            
                            <Button sx={{ height:'55px',  display:'flex', bgcolor: '#009BE5',minWidth:'19%',
                                    alignItems:'center', justifyContent:'center', borderRadius:1, border:0.5, borderColor:'gray',
                                    backgroundColor:"#5A00E2"}}
                                        onClick={()=>handleKeywordSearch()}>
                                    {/*onClick={()=>setSearch(!search)}*/}
                                    {/* <SearchIcon sx={{ fontSize: 25, color:'white' }}/> */}
                                    <div style={{color:'#fff',fontSize:18}}>Search</div>
                            </Button>

                        </div>

                    <div style={{  display:'flex', flexDirection:'column', maxHeight:'51.5vh',
                        justifyContent:"center",alignItems:'center',overflowY:"auto", minWidth:'100%',maxWidth:'100%',
                        overflowX:"hidden", overflowY:"auto"}}>
                    
                    
                        <div style={{minHeight:'100%', minWidth:'100%', overflowX:"hidden", 
                    overflowY:'auto', maxHeight:'51.5vh', paddingRight:-8}}>   
                        
                        {dataSources && dataSources.length > 0 ? dataSources.map((data,index)=>index <21 && <FeatureCard
                            openDetails={openDetails}
                            data={data}
                            index={index}
                            token={token}
                            user={user}
                            handleOpenDetails={handleOpenDetails}
                            handleCloseDetails={handleCloseDetails}
                            dataset={dataset.catalog}
                            dataSources={dataSources}
                            removeDatasetcatalog={removeDatasetcatalog}
                            addDatasetcatalog={addDatasetcatalog}
                        />):<div>We are trying to add more catalogs to the platform.</div>}
                            
                        </div>

                    </div>

                    <Divider sx={{width:'100%', marginBottom:2}} />

                    <div style={{ display: 'flex', flexDirection:'row', font:'roboto',minWidth:'100%',maxWidth:'100%',
                        fontSize:20,pb:2,  justifyContent:'space-between'}}>
                        <Button variant="contained" size="small" sx={{px:5, py:1.5,borderRadius:4,width:'16ch',
                            backgroundColor:"#5A00E2"}}
                                onClick={()=>handleClickChange(0)}>
                            {"Previous"}</Button>

                        {/* <Button variant="outlined" size="small" sx={{ml:2,color:'#5A00E2',ml:58.5,borderRadius:4,
                            borderColor:'#5A00E2'
                            }}
                                onClick={()=>router.push('/dashboard')}>
                            {"Save as Draft"}</Button> */}
                        <Button variant="contained" size="small" sx={{px:5, py:1.5,borderRadius:4,width:'16ch',
                            backgroundColor:"#5A00E2"}}
                                onClick={()=>handleClickChange(2)}>
                            {"Next"}</Button>
                    </div>

                </TabPanel>
                <TabPanel value={value} index={2} sx={{minWidth:'80%',maxWidth:'80%',}}>
                    <div style={{ display: 'flex', flex:'1',flexDirection:'column', font:'roboto',fontSize:20,
                        minWidth:'100%', maxWidth:'100%'}}>
                        <div style={{display:'flex', width:'100%',marginRight:'25rem' }}>
                            <div>REVIEW AND SAVE &nbsp;</div>
                            {error? <><div style={{color:'#fc4103'}}>({error})</div></>:null}
                            </div>
                        
                        <div style={{fontSize:12, paddingTop:4,color:'gray'}}>*Go through the entries and selection you've made.</div>

                    </div>
                    <div style={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',pt:4}}>
                        <div style={{display: 'flex'}}>
                            <div style={{color:'gray'}}>Title: </div>
                            <div style={{marginLeft:128}}>{localdataset.title ? localdataset.title : "Enter a Title"} &nbsp;</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',pt:1}}>
                        <div style={{color:'gray'}}>Description: </div>
                        <div style={{marginLeft:76}}>{localdataset.description ? localdataset.description : "Describe the purpose of the Dataset"} &nbsp;</div>
                    </div>

                    <div style={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',fontSize:20}}>
                                        <div>Added Data Sources &nbsp;</div>
                                        {searching4 !== null && searching4 !== undefined &&
                                        <div>{"("+ searching4.length+")"}</div>}

                            </div>
                            
                    <div style={{minHeight:'100%', minWidth:'100%', overflowX:"hidden", 
                                overflowY:'auto', maxHeight:'44vh', }}> 
                                {searching4.map((data, index)=><AddedFeatureCard
                                    openDetails={openDetails}
                                    data={data}
                                    index={index}
                                    token={token}
                                    user={user}
                                    handleOpenDetails={handleOpenDetails}
                                    handleCloseDetails={handleCloseDetails}
                                    dataset={dataset}
                                    removeDatasetcatalog={removeDatasetcatalog}
                                    addDatasetcatalog={addDatasetcatalog} />)}
                            </div>

                    <Divider sx={{width:'100%', marginBottom:2}} />
                    <div style={{ display: 'flex', flexDirection:'row', font:'roboto',
                        fontSize:20,pb:2,  justifyContent:'space-between'}}>
                        <Button variant="contained" size="small" sx={{px:5, py:1.5,borderRadius:4,
                            backgroundColor:"#5A00E2"}}
                                onClick={()=>handleClickChange(1)}>
                            {"Previous"}</Button>
                        {/* <Button variant="outlined" size="small" sx={{ml:2,ml:56.5,color:'#5A00E2',borderRadius:4,
                            borderColor:'#5A00E2'}}
                                onClick={()=>router.push('/dashboard')}>
                            {"Save as Draft"}</Button> */}
                            
                        <Button variant="contained" size="small" sx={{px:5, py:1.5,borderRadius:4,
                            backgroundColor:"#5A00E2"}}
                                onClick={()=>handleSendData()}>
                            {"Create"}</Button>
                    </div>

                </TabPanel>
                
            </Box>
            </LoadingOverlay>

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

