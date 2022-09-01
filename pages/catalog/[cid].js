import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import FeatureCard from '../../components/FeatureCard';
import EditFeatureCard from '../../components/EditFeatureCard';
import Modal from '@mui/material/Modal';
import CheckIcon from '@mui/icons-material/Check';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Output from '../../components/output';
import {useRouter} from 'next/router';
import {getDatasetsId, downloadDatasetsId, getUser, deleteUserDataset, updateUserDataset, getPublicDatasetsTopics} from '../../function/users';
import DataSourcesDetails from '../../components/datasourcesdetails';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import mixpanel from 'mixpanel-browser';
import LeftNav from "../../components/LeftNav";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {signOut} from "../../function/checkAuth";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TableViewOutlinedIcon from "@mui/icons-material/TableViewOutlined";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
import CachedIcon from '@mui/icons-material/Cached';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CatalogCardOut from "../../components/CatalogCardOut";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { getDatasets} from '../../function/users';
import Tooltip2 from '@mui/material/Tooltip';

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true});
const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius:4,
    p: 4,
};
export default function ManageDataset({
                                          token,
                                          setToken,
                                          dataset,
                                          setDataset,
                                          userdatasets,
                                          setUserdatasets,
                                          dataSources,
                                          setDataSources,
                                          addDatasetcatalog,
                                          removeDatasetcatalog,
                                          user,
                                          setuser,
                                      }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);;
    const handleClose = () => setOpen(false);
    const [userdataset, setUserDataset] = useState([]);
    const [datasetMode, setDatasetMode] = useState(0);
    const [downloadLink, setDownloadLink] = React.useState('');
    const router = useRouter();
    const datasource_id = router.query.cid;
    const catalogID = router.query.catalogID;
    const mainTopic = router.query.mainTopic;
    console.log(datasource_id)
    const [addCatalogMode, setAddCatalogMode] = useState(false);
    const [keyword, setKeyword] = useState('')
    const [localTitle, setLocalTitle] = useState('');
    const [localDescription, setLocalDescription] = useState('');
    const [localTopic, setLocalTopic] = useState('');
    const [localDataset, setLocalDataset] = useState({});
    const [currentTopic, setCurrentTopic] = useState("")
    const [filteredDataSources, setFilteredDataSources] = useState([])
    const [relatedDataSources, setRelatedDataSources] = useState([])
    const [currentRouteTitle, setCurrentRouteTitle] = useState("")

    useEffect(()=>{
        dataSources !== null && dataSources !== undefined &&
        dataSources.map((data,index)=> datasource_id == data.ID && setCurrentRouteTitle(data.title))
    },[])

    useEffect(() => {
        if(userdataset !== null && userdataset !== undefined) {
            setLocalTitle(userdataset.title);
            setLocalDescription(userdataset.description);
            setLocalTopic(userdataset.topic);
            setLocalDataset(userdataset)
        }
    }, [userdataset])

    async function deleteF(dataF){
        console.log(dataF)
        const data = await deleteUserDataset({token, data:dataF});
        if(data){
            window.open("/dashboard1", "_self")
        }
    }

    useEffect(() => {
        setLocalDataset({...userdataset, title:localTitle, description:localDescription,topic:localTopic});
    }, [localTitle, localDescription, localTopic]);

    async function updateF(dataF){
        setLocalDataset({...dataF, title:localTitle, description:localDescription,topic:localTopic});
        console.log("updated dataset data", localDataset)
        const data = await updateUserDataset({token, data:localDataset});
        if(data){
            window.open("/dataset1/"+localDataset.ID, "_self")
        }
    }

    useEffect(async ()=>{
        if(token !== 0 && token && token !== null && token !== undefined){
            const dataset = await getDatasetsId(token, datasource_id);
            setUserDataset(dataset);
            console.log("fetched dataset data",userdataset);
        }
    }, [token, datasource_id]);

    useEffect(async ()=>{
        if(token !== 0 && token && token !== null && token !== undefined){
            console.log("assaadsdaadsadsadsdasadsadsads29", mainTopic, filteredDataSources)
            const catalog = await getPublicDatasetsTopics(token, mainTopic);
            setFilteredDataSources(catalog);
            console.log("filtered catalog data",filteredDataSources, );
            console.log("assaadsdaadsadsadsdasadsadsads69", mainTopic,filteredDataSources )
        }
    }, [token, mainTopic]);

    const [relatedTopic, setRelatedTopic]= useState('')
    useEffect(async ()=>{
        if(token !== 0 && token && token !== null && token !== undefined && 
            relatedTopic !== null && relatedTopic !== undefined){
            const catalog = await getPublicDatasetsTopics(token, relatedTopic[0]);
            setRelatedDataSources(catalog);
            console.log("related catalog data",relatedDataSources, relatedTopic[0]);
        }
    }, [token,relatedTopic, router]);

    const handleDownloadButton = async() => {
        const downloadLink = await downloadDatasetsId(token, datasource_id);
        setDownloadLink(downloadLink.url);
        if(downloadLink.url !== null && downloadLink.url !== undefined){
            await window.open(downloadLink.url, '_blank');
        }
    }

    const addLocalDatasetcatalog = (data) => {
        setUserDataset({...userdataset,catalog:[...userdataset.catalog,data]});
        console.log("catalog added",userdataset)
    };
    const removeLocalDatasetcatalog = (data) => {
        const filtered = userdataset.catalog.filter(item => item.ID !== data.ID);
        setUserDataset({...userdataset,catalog:filtered});
        console.log("catalog removed",userdataset)
    };

    const [openDetails, setOpenDetails] = useState(false);
    const [dsDetails, setDSDetails] = useState([]);
    const handleOpenDetails = (data) => {
        setOpenDetails(true);
        setDSDetails(data);
    };
    const handleCloseDetails = () => {
        setOpenDetails(false);
    };

    useEffect(async () => {
        if(token !== 0 && token && token !== null && token !== undefined &&
            user !=={} && user !== null && user !== undefined){
            console.log('user call token', token);
            const userP = await getUser(token);
            if(userP === null) {
                setuser({})
            }else {
                setuser(userP);
            }

            console.log('userP', userP);
            console.log("the route", router.query)
            console.log("the route", router.query.currentRouteTitle)
        }
    }, [token, router]);

    useEffect(async () => {
        if(token !== 0 && token && token !== null && token !== undefined &&
            userdataset != [] && userdataset !== null && userdataset !== undefined){
            const data = await getDatasets(
                token
            );
            setUserdatasets(data);
            console.log("fetched datasets",data);
        }
    }, [token,router]);

    useEffect(async ()=>{
        mixpanel.track('Viewed Dataset', {
            'source': "Dataset Details Page",
            'scrolled first': true,
            'email':user.email
        })
    }, [token, datasource_id]);

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

    return (

        <div style={{display:'flex',minWidth:'100%', maxWidth:'100%', flexDirection:'row'}}>

            {/* <Box sx={{width:"18%"}}>
                <Box sx={{width:"18%", position:'fixed'}}>
                    <LeftNav token={token} userdatasets={userdatasets} setUserdatasets={setUserdatasets}/>
                </Box>
            </Box> */}
            <div style={{display:'flex',flexDirection:'column',minWidth:'100%', maxWidth:'100%',}}>
                <div style={{ display: 'flex', flexDirection:'column', backgroundColor: '#FAFAFB'}}>
                    {/* <Box component="main" sx={{  minWidth:'100%', display:'flex', position:'fixed'}}>
                        <Box sx={{minWidth:'100%', display:'flex', flexDirection:'row', bgcolor:'white', alignItems:'center', height:"70px"}} >
                        </Box>

                        <div style={{display:"flex",flexDirection:'row', width:'30%', backgroundColor:"#fff",paddingLeft:12,
                            alignItems: 'center',cursor: 'pointer', justifyContent:'space-around', height:"70px"}}>
                            <Link href='/login'>
                                {/* <NotificationsIcon fontSize="large" sx={{color:'#939EAA'}}/> 
                            </Link>
                            &nbsp;&nbsp;&nbsp;
                            <Link >
                                <AccountCircleIcon onClick={()=>router.push("/settings")} fontSize="large" 
                                    sx={{color:'#939EAA'}}/>
                            </Link>
                            &nbsp;&nbsp;&nbsp;
                            <p style={{fontSize:20}}>{user && user.firstname ? user.firstname : 'Account'} </p>
                            &nbsp;&nbsp;&nbsp;
                            <div
                                // onClick={()=>signOut({path:router.pathname})}
                                onClick={handleClickUser}
                            >
                                <ArrowDropDownIcon fontSize="large" sx={{color:'#939EAA'}}/>
                            </div>

                            <Menu
                                id="basic-menu"
                                anchorEl={anchorElUser}
                                open={openUser}
                                onClose={handleCloseUser}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={()=>router.push('/settings')}><SettingsIcon/>&nbsp; Settings</MenuItem>
                                <MenuItem onClick={()=>router.push('/support')}><LiveHelpIcon/>&nbsp; Support</MenuItem>
                                <MenuItem onClick={()=>signOut({path:router.pathname})}><ExitToAppIcon/>&nbsp; Sign Out</MenuItem>
                            </Menu>
                        </div>
                    </Box> */}

                    <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:2, justifyContent:'space-between', paddingTop:12}}>

                        <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18, width:"50%",
                            color:'gray-700', alignItems:'center'}}>
                            {datasetMode ===1 ?<Button  size="medium" sx={{display:'flex', alignItems:'center',paddingRight:2,
                                    justifyContent:'center'}} startIcon={<ArrowBackIcon />} onClick={()=>setDatasetMode(0)}>
                                    {"Back"}</Button>:
                                datasetMode ===0 ?<Button  size="medium" sx={{display:'flex', alignItems:'center',paddingRight:2,
                                    justifyContent:'center'}} startIcon={<ArrowBackIcon />} onClick={()=>router.back()}>
                                    {"Back"}</Button>:null}
                            <Divider variant="middle" orientation="vertical" />
                            <div style={{paddingLeft:8,paddingRight:2,textTransform:'capitalize'}}><div>Go Back to {router.query.currentRouteTitle}</div></div>
                            {/* <Button variant="outlined" size="medium" sx={{borderRadius:3, marginLeft:2, width:'22ch', color:'#000', borderColor:'#939EAA' }}
                                    startIcon={<CachedIcon />} onClick={()=>router.reload()}>
                                {"Refresh"}</Button> */}
                        </Box>

                    </Box>

                    <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:2, justifyContent:'space-between'}}>
                        <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:24,
                            color:'gray-900',justifyContent:'space-around'}}>
                            <div>Data Catalog Overview: &nbsp;</div>{dataSources !== null && dataSources !== undefined &&
                                dataSources.map((data,index)=> datasource_id == data.ID && <div>{data.title}</div>)}
                        </Box>

                    </Box>

                    {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
                    <div style={{ }}>
                        <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:2, justifyContent:'space-between'}}>
                        {
                            dataSources !== null && dataSources !== undefined
                            && dataSources.map((data,index)=> datasource_id == data.ID && <CatalogCardOut token={token} localDataset={localDataset}
                                              setLocalDataset={setLocalDataset} localTitle={localTitle} setLocalTitle={setLocalTitle}
                                              localDescription={localDescription}setLocalDescription={setLocalDescription} localTopic={localTopic}
                                              setLocalTopic={setLocalTopic}data={data} datasetMode={datasetMode} setDatasetMode={setDatasetMode}
                                              dataSources={dataSources}setDataSources={setDataSources} userdataset={userdataset} setUserDataset={setUserDataset}
                                              deleteF={deleteF} updateF={updateF} currentTopic={currentTopic} setCurrentTopic={setCurrentTopic}
                            />)
                        }
                        </Box>

                    </div>
                </div>

                <Modal open={openDetails} onClose={handleCloseDetails}>
                    <Box sx={style2}>
                        <DataSourcesDetails handleCloseDetails={handleCloseDetails} datasetMode={datasetMode}
                                            data={dsDetails} addDatasetcatalog={addDatasetcatalog}
                                            removeDatasetcatalog={removeDatasetcatalog}/>
                    </Box>
                </Modal>

                <div style={{ display: 'flex', minHeight: '23vh', backgroundColor:'#FAFAFB',pt:4, width:'100%'}}>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',mb:4, width:'100%', }}>

                        <Box component="main" sx={{display:'flex', justifyContent:'space-between',
                            py: 2, width:'100%', }}>
                            <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', justifyContent:'space-between',
                                fontSize:24,font:'roboto',pl:2}}>
                                <div>{'Related ' }Data Catalogs &nbsp;</div>
                            </Box>

                        </Box>

                        <div style={{ minWidth: 275, display:'flex', flexDirection:'column', pt:1,paddingLeft:'0.75em',paddingRight:'0.75em',
                            alignItems:'center' }}>
                            <div style={{ width:"100%",  display:'flex', flexDirection:'column',paddingLeft:'0.75em',paddingRight:'0.75em',
                                justifyContent:"center",alignItems:'center', border:'1px solid #E2E2EA', borderRadius:'1rem', paddingTop:'0.75rem',
                                backgroundColor:'#FAFAFB'}}>
                                {       filteredDataSources !== null && filteredDataSources !== undefined &&
                                                filteredDataSources.filter((data)=> String(data.ID) !== String(catalogID)).length === 0 || 
                                                filteredDataSources.filter((data)=> String(data.ID) !== String(catalogID)).length < 0 ? 
                                                    <div>We are working on adding more catalogs to our platform.</div>:
                                                filteredDataSources.filter((data)=> String(data.ID) !== String(catalogID)).map((data,index)=> 
                                                    index < 5 && data.title.length > 0 ? <FeatureCard
                                                        key={data.ID}
                                                        data={data}
                                                        index={index}
                                                        token={token}
                                                        user={user}
                                                        currentRouteTitle={currentRouteTitle}
                                                        datasetMode={datasetMode}
                                                        dataset={userdataset}
                                                        openDetails={openDetails}
                                                        addLocalDatasetcatalog={addLocalDatasetcatalog}
                                                        removeLocalDatasetcatalog={removeLocalDatasetcatalog}
                                                        handleOpenDetails={handleOpenDetails}
                                                        handleCloseDetails={handleCloseDetails}/> :
                                                        index < 5 &&
                                                        <div>We are working on adding more catalogs to our platform.</div> )
                                }
                            </div>

                        </div>

                    </div>


                </div>

                {/*<Modal*/}
                {/*    open={open}*/}
                {/*    onClose={handleClose}*/}
                {/*    aria-labelledby="modal-modal-title"*/}
                {/*    aria-describedby="modal-modal-description"*/}
                {/*>*/}
                {/*    <Box sx={{ position: 'absolute', bgColor:'#fff',*/}
                {/*        top: '50%',*/}
                {/*        left: '50%',*/}
                {/*        transform: 'translate(-50%, -50%)',*/}
                {/*        width:'70%'}}>*/}
                {/*        <Output data={dataset} downloadLink={downloadLink}/>*/}
                {/*    </Box>*/}
                {/*</Modal>*/}

            </div>
        </div>
    );
}

