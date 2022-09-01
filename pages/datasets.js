import {useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/router';
import {getPublicDatasets, getDatasets, getUser} from '../function/users';
import DatasetCard from '../components/DatasetCard';
import LeftNav from "../components/LeftNav";
import mixpanel from 'mixpanel-browser';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined'
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Auth } from 'aws-amplify';
import {createUser} from "../function/users";
import ReactPaginate from "react-paginate";
import CachedIcon from '@mui/icons-material/Cached';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true});

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const drawerWidth = 256;

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

export default function Datasets({
                                      token,
                                      setToken,
                                      name,
                                      email,
                                      company,
                                      dataset,
                                      userdatasets,
                                      setUserdatasets,
                                      dataSources,
                                      setDataSources,
                                      user,
                                      setuser,

                                  }) {

    const router = useRouter()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const open = Boolean(anchorEl);
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


    const [localdataset, setLocaldataset] = useState([]);

    const handleOpen2 = () => {
        setOpen(false);
        setOpen2(true);}
    const handleClose = () => setOpen(false);

    useEffect(async () => {
        console.log('user call token', token);
        if(token !== 0 && token && token !== null && token !== undefined &&
            user !== {} && user !== null && user !== undefined){
            console.log('get users called from datasets page', token);
            const userP = await getUser(token);
            if(user === null){
                setuser({});
            }else{
                setuser(userP)
            }
            console.log('userP', userP);
        }
    }, [token, router]);

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

    useEffect(async () => {
        if(token !== 0 && token && token !== null && token !== undefined &&
            (userdatasets === [] || userdatasets === null || userdatasets !== undefined)){
            console.log('get datasets called from datasets page', token);
            const data = await getDatasets(
                token
            );
            setUserdatasets(data);
            console.log("unique catalogs datasets",data);
        }
    }, [token,router,]);

    useEffect(async () => {
        if(token !== 0 && token && token !== null && token !== undefined &&
            (userdatasets === [] || userdatasets === null || userdatasets !== undefined)){
            console.log('get datasets called from datasets page', token);
            const data = await getDatasets(
                token
            );
            setUserdatasets(data);
            console.log("fetched datasets",data);
        }
    }, []);

    const [openDetails, setOpenDetails] = useState(false);
    const [dsDetails, setDSDetails] = useState([]);
    const [showDraft, setShowDraft] = useState(true)

    const handleOpenDetails = (data) => {
        setOpenDetails(true);
        setDSDetails(data);
    };
    const handleCloseDetails = () => {
        setOpenDetails(false);
    };

    
    const recentDate = new Date();
    const [datasetRecentType, setDatasetRecentType] = useState('default');
    const [currentRouteTitle, setCurrentRouteTitle] = useState('');
    recentDate.setDate(recentDate.getDate() - 61);

    useEffect(()=>{
        if(router.query.datasetRecentType){
            setDatasetRecentType(router.query.datasetRecentType);
        }
        if(router.query.currentRouteTitle){
            setCurrentRouteTitle(router.query.currentRouteTitle);
        }
    },[]) 

    const [users, setUsers] = useState();

    useEffect(()=>{
        if(datasetRecentType === "created"){
            setUsers(userdatasets !== null && userdatasets
                .filter(user => new Date(user.CreatedAt) > recentDate));
        }else if(datasetRecentType === "modified"){
            setUsers(userdatasets !== null && userdatasets
                .filter(user => new Date(user.UpdatedAt) > recentDate));
        } else if(datasetRecentType === "default"){
            setUsers(userdatasets !== null && userdatasets);
        }
    },[router, datasetRecentType, token])

    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;

    const displayUsers = users !==null && users && users.length > 0 && users
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .sort((a,b)=>new Date(a.CreatedAt) - new Date(b.CreatedAt)).map((data, index)=>  <DatasetCard
            key={data.dataset_id}
            index={index}
            data={data}
            token={token}
            user={user}
            openDetails={openDetails}
            pagesVisited={pagesVisited}
            handleOpenDetails={handleOpenDetails}
            handleCloseDetails={handleCloseDetails}/>)

    const pageCount = users !== null && users && Math.ceil(users.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
        };

    return (
        <div style={{display: 'flex', flexDirection:'column', minHeight:'100%', maxHeight:'100%',width:'100%', 
            backgroundColor: '#FAFAFB', fontStyle:'roboto',margin:0, padding:0,}}>

                    <div style={{ display: 'flex', flexDirection:'row', paddingBottom:"2em",
                        paddingLeft:'1em', paddingRight:'1em',paddingTop:'6.5em',
                        justifyContent:'space-between', 
                         }}>

                        

                        { (datasetRecentType === 'created' || datasetRecentType ==='modified' || datasetRecentType ==='dashboard') ?
                        <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18, 
                            color:'gray-700', alignItems:'center'}}>
                            {datasetRecentType === 'created' ?<Button  size="medium" sx={{display:'flex', alignItems:'center',paddingRight:2,
                                    justifyContent:'center'}} startIcon={<ArrowBackIcon />} onClick={()=>router.back()}>
                                    {"Back"}</Button>:
                                datasetRecentType === 'modified' ?<Button  size="medium" sx={{display:'flex', alignItems:'center',paddingRight:2,
                                    justifyContent:'center'}} startIcon={<ArrowBackIcon />} onClick={()=>router.back()}>
                                    {"Back"}</Button>:
                                datasetRecentType === 'dashboard' ?<Button  size="medium" sx={{display:'flex', alignItems:'center',paddingRight:2,
                                    justifyContent:'center'}} startIcon={<ArrowBackIcon />} onClick={()=>router.back()}>
                                    {"Back"}</Button>:null}
                            <Divider variant="middle" orientation="vertical" />
                            <div style={{paddingLeft:8,paddingRight:2,}}>Go Back to {currentRouteTitle}</div>
                            {/* <Button variant="outlined" size="medium" sx={{borderRadius:3, marginLeft:2, paddingLeft:2,paddingRight:2, color:'#939EAA', borderColor:'#939EAA' }}
                                    startIcon={<CachedIcon />} onClick={()=>router.reload()}>
                                {"Refresh"}</Button> */}
                        </Box>:

                         <div style={{ display: 'flex', flexDirection:'row', font:'roboto',
                            color:'gray-700',justifyContent:'space-between', alignItems:'end'}}>
                            <div style={{fontSize:28}}>My Datasets
                                {datasetRecentType === 'created' ? " (Recently Created)" :
                                    datasetRecentType === 'modified' ? " (Recently Modified)":null}&nbsp;&nbsp;</div>

                        </div> }

                        
                        <Button variant="contained" size="large"
                                sx={{backgroundColor:'#5A00E2', px:2, borderRadius:3, textTransform: "capitalize"}}
                                startIcon={<AddIcon />}
                                onClick={() => {
                                    router.push('/searchresult');
                                    // mixpanel.time_event('Create Dataset');
                                    mixpanel.track('Clicked on Create Dataset', {
                                        'source': "Data Platform Dashboard",
                                        'scrolled first': true,
                                        'email':user.email
                                    });
                                }}>
                            {/* onClick={handleOpen}> */}
                            Create a Dataset</Button>

                    </div>

                    <div style={{display:'flex',flexDirection:'column',
                        paddingLeft:'1em', paddingRight:'1em',paddingBottom:'1em'}}>

                        <div style={{ display: 'flex', flexDirection:'row', py: 2,
                            px:2, bgcolor: 'gray-900', 
                            justifyContent:'space-between', paddingBottom:16}}>

                            <div style={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18,
                                color:'gray-700',justifyContent:'space-around', alignItems:'center'}}>
                                <div><TableViewOutlinedIcon fontSize="large"/>&nbsp;&nbsp;</div>
                                <div>{datasetRecentType === 'created' ? "My Datasets (Recently Created)" :
                                    datasetRecentType === 'modified' ? "My Datasets (Recently Modified)": 'My Datasets'} &nbsp;</div>
                                {users !== null && users !== undefined && <div>{"("+ users.length+")"}</div>}
                                <Divider variant="middle"/>
                            </div>

                            {/* <SettingsIcon fontSize="large" sx={{cursor:'pointer', color:"gray"}}
                                onClick={()=>router.push("/settings")}/> */}
                        </div>

                        {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
                        {/* <SignalTable /> */}
                        <div style={{ display:'flex', flexDirection:'column', borderRadius:'0.75em', paddingRight:'1em', paddingLeft:'0.25em',
                            backgroundColor: '#FAFAFB',
                            justifyContent:"center",alignItems:'center', flexWrap:'wrap',border:'0.5px solid #bfbfbf',}}>
                            
                            {displayUsers && displayUsers.length > 0 ? displayUsers : <div style={{display:'flex', flexDirection:'column',
                                justifyContent:'center', alignItems:'center', paddingTop:'2em', paddingBottom:'2em'}}>
                                <div style={{fontSize:18, fontWeight:'bold', color:'gray-700'}}>No Datasets Found</div>
                                <div style={{fontSize:18, color:'gray-700'}}>Try creating a new Dataset or change your search criteria.</div>
                            </div>
                            }
                            {/* .length > 0 ? displayUsers: <cite style={{fontSize:"1.5em", 
                            //     fontFamily:'roboto', paddingTop:'0.25em'}}>
                            //     {"You're almost there! Create a dataset to get started..."}
                        // </cite> */}
                                
                        </div>

                        {users && users.length > 5 && <div style={{ display:'flex', flexDirection:'column', borderRadius:'0.75em', 
                            paddingRight:'3em', paddingTop:'1em',
                            justifyContent:"center",alignItems:'center', flexWrap:'wrap',}}>
                            <ReactPaginate
                                        previousLabel={"Previous"}
                                        nextLabel={"Next"}
                                        pageCount={pageCount}
                                        onPageChange={changePage}
                                        containerClassName={"paginationBttns"}
                                        previousLinkClassName={"previousBttn"}
                                        nextLinkClassName={"nextBttn"}
                                        disabledClassName={"paginationDisabled"}
                                        activeClassName={"paginationActive"}
                                    />
                        {/* </Paper> */}
                        </div>}

                    </div>

                    

                </div>

    );
}

