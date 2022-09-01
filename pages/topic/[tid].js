import {useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TextField from '@mui/material/TextField';
import FeatureCard from '../../components/FeatureCard';
import HelpCenterCard from '../../components/HelpCenterCard';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import { Grid } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { confirmSignUp, signIn, signOut } from '../../function/checkAuth';
import DataSourcesDetails from '../../components/datasourcesdetails';
import { useRouter } from 'next/router';
import {getPublicDatasets, getDatasets, getUser, getPublicDatasetsTopics} from '../../function/users';
import DatasetCard from '../../components/DatasetCard';
import DatasetDraftCard from '../../components/DatasetDraftCard';
import HeaderDatasetCard from '../../components/HeaderDatasetCard';
import LeftNav from "../../components/LeftNav";
import mixpanel from 'mixpanel-browser';
import InputAdornment from "@mui/material/InputAdornment";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SettingsIcon from '@mui/icons-material/Settings';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined'
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import InputBase from '@mui/material/InputBase';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import {FormControl} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ReactPaginate from "react-paginate";



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

export default function TopicBrowser({
                                         token,
                                         setToken,
                                         dataset,
                                         userdatasets,
                                         setUserdatasets,
                                         dataSources,
                                         setDataSources,
                                         addDatasetcatalog,
                                         removeDatasetcatalog,
                                         user,
                                         setuser,
                                     }) {
    const router = useRouter()
    const [search, setSearch] = useState(false);
    const [localDataset, setLocalDataset] = useState([]);
    const [searching4, setSearching4] = useState(false);
    const [topicDatasources, setTopicDatasources] = useState([]);
    const topic_id = router.query.tid;

    useEffect(() => {
        setSearching4(dataset.catalog);
        console.log("fetched dataset",searching4);
    }, [dataset]);

    useEffect(async()=>{
        if(token !== 0 && token && token !== null && token !== undefined &&
            topicDatasources !== [] && topicDatasources !== null && topicDatasources !== undefined){
            const datasources = await getPublicDatasetsTopics(token, topic_id);
            setTopicDatasources(datasources);
        }
    }, [token, topic_id]);

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
        if(token !== 0 && token && token !== null && token !== undefined &&
            user !== {} && user !== null && user !== undefined){
            console.log('user call token', token);
            const userP = await getUser(token);
            if(user === null){
                setuser({});
            }else{
                setuser(userP)
            }
            console.log('userP', userP);
        }
    }, [token, router]);

    useEffect(async () => {
        if(token !== 0 && token && token !== null && token !== undefined){
            const data = await getDatasets(
                token
            );
            setUserdatasets(data);
            console.log("fetched datasets",data);
        }
    }, [token,router]);

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

    const [users, setUsers] = useState(topicDatasources && topicDatasources.slice(0, 50));

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = users !==null && users && users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((data,index)=> <div style={{minWidth:'100%',maxWidth:'100%', paddingLeft:'0.7rem',
                    paddingRight:'0.7rem'}}>
                        <FeatureCard
                        openDetails={openDetails}
                        data={data}
                        index={index}
                        token={token}
                        user={user}
                        pagesVisited={pagesVisited}
                        usersPerPage={usersPerPage}
                        handleOpenDetails={handleOpenDetails}
                        handleCloseDetails={handleCloseDetails}
                        dataset={dataset.catalog}
                        removeDatasetcatalog={removeDatasetcatalog}
                        addDatasetcatalog={addDatasetcatalog}
                                    dataSources={topicDatasources}
                        
                    />
                    </div>
      );

    const pageCount = users !== null && users && Math.ceil(users.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(()=>{
            setUsers(topicDatasources && topicDatasources.slice(0, 50));
    },[ dataSources, topicDatasources])

    return (

        <div style={{height:'100%', display:'flex',minWidth:'100%', maxWidth:'100%',}}>
            {/*<Navbar token={token} setToken={setToken}/>*/}
                {/* <Box sx={{width:"18%"}}>
                    <Box sx={{width:"18%", position:'fixed'}}>
                        <LeftNav token={token} userdatasets={userdatasets} setUserdatasets={setUserdatasets}/>
                    </Box>
                </Box> */}
                <div style={{ display: 'flex', minWidth:'100%', maxWidth:'100%',flexDirection:'column',backgroundColor: '#FAFAFB', 
                        fontStyle:'roboto',paddingLeft:'0.7rem', paddingRight:'0.7rem', paddingTop:'5.5rem', paddingBottom:'0.7rem',}}>
                        <div style={{ display: 'flex', flexDirection:'row', justifyContent:'space-between',
                        paddingLeft:'0.7rem', paddingRight:'0.7rem', paddingTop:'0.7rem',
                         width:'100%', alignItems:'center' }}>

                            <div style={{ display: 'flex', flexDirection:'row', font:'roboto', width:'100%',marginRight:2,
                                color:'gray-700',justifyContent:'space-between', alignItems:'center',
                                paddingLeft:'0.7rem', paddingRight:'0.7rem',}}>
                                <div style={{display:'flex', alignItems:'center', width:'44%'}}>
                                    <Button  size="medium" sx={{display:'flex', alignItems:'center',paddingRight:2,
                                    justifyContent:'center'}} startIcon={<ArrowBackIcon />} onClick={()=>router.back()}>
                                    {"Back"}</Button>
                                    <Divider variant="middle" orientation="vertical" flexItem />
                                    <div style={{paddingLeft:8,paddingRight:2,textTransform:'capitalize'}}>Go Back to {router.query.currentRouteTitle}</div>
                                </div>

                                <div style={{display:'flex', width:'55%', alignItems:'center', }}>
                                        <div style={{fontSize:28,}}>Topic &nbsp;</div>
                                        
                                </div>

                            </div>

                        </div>

                    <div>

                        <div style={{ display: 'flex', flexDirection:'row', backgroundColor: 'gray-900', width:'100%',
                            paddingLeft:'0.7rem', paddingRight:'0.7rem', paddingTop:'0.7rem', paddingBottom:'0.7rem',
                            justifyContent:'space-between'}}>

                            <div style={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18,
                                color:'gray-700',justifyContent:'space-around', alignItems:'center'}}>
                                <div><TableViewOutlinedIcon fontSize="large"/>&nbsp;&nbsp;</div>
                                <div>Data Catalogs &nbsp;</div>
                                {topicDatasources !== null && topicDatasources !== undefined && <div>{"("+ topicDatasources.length+")"}</div>}
                                <div style={{color:'gray'}}><Divider variant="middle" flexItem/></div>

                            </div>
                            <div style={{color:'gray'}}><Divider variant="middle" flexItem/></div>
                            <div style={{display:'flex', width:'54.7%',}}>
                                    
                                    <div style={{fontSize:18, color:'gray', textTransform:'capitalize',
                                        paddingTop:'0.5rem'}}>{topic_id && topic_id.length > 39 ? topic_id.substring(0, 39) + "..." : topic_id}</div>
                                        

                            </div>
                            {/* <SettingsIcon fontSize="large" sx={{cursor:'pointer', color:"gray"}}/> */}

                        </div>

                        {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
                        {/* <SignalTable /> */}
                        <div style={{  display:'flex', flexDirection:'column', borderRadius:'1rem', paddingTop:'0.5rem',
                            justifyContent:"center",alignItems:'center', flexWrap:'wrap',border:'0.5px solid #bfbfbf',
                            backgroundColor: '#FAFAFB',
                            }}>
                            
                                {/* {topicDatasources && topicDatasources.map((data,index)=><FeatureCard
                                    openDetails={openDetails}
                                    data={data}
                                    index={index}
                                    token={token}
                                    user={user}
                                    handleOpenDetails={handleOpenDetails}
                                    handleCloseDetails={handleCloseDetails}
                                    dataset={dataset.catalog}
                                    dataSources={topicDatasources}
                                    removeDatasetcatalog={removeDatasetcatalog}
                                    addDatasetcatalog={addDatasetcatalog}
                                />)} */}

                                {displayUsers}
                                
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

                    <Modal open={openDetails} onClose={handleCloseDetails}>
                        <Box sx={style2}>
                            <DataSourcesDetails user={user} handleCloseDetails={handleCloseDetails}
                                                data={dsDetails}/>
                        </Box>
                    </Modal>

                </div>

            {/*<Footer />*/}

        </div>
    );
}

