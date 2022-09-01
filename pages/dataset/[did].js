import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import SignalCardOut from '../../components/SignalCardOut';
import FeatureCard from '../../components/FeatureCard';
import EditFeatureCard from '../../components/EditFeatureCard';
import Modal from '@mui/material/Modal';
import CheckIcon from '@mui/icons-material/Check';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {useRouter} from 'next/router';
import {getDatasetsId, downloadDatasetsId, getUser, deleteUserDataset, updateUserDataset} from '../../function/users';
import {getPublicDatasets, getDatasets, getPublicDatasetsTopics} from '../../function/users';
import DataSourcesDetails from '../../components/datasourcesdetails';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import mixpanel from 'mixpanel-browser';
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
import CachedIcon from '@mui/icons-material/Cached';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import GetAppIcon from '@mui/icons-material/GetApp';
import EditIcon from '@mui/icons-material/Edit';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";


mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true});

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
    const [downloadableLink, setDownloadableLink] = React.useState('');
    const router = useRouter();
    const dataset_id = router.query.did;
    const [addCatalogMode, setAddCatalogMode] = useState(false);
    const [keyword, setKeyword] = useState('')
    const [localTitle, setLocalTitle] = useState('');
    const [localDescription, setLocalDescription] = useState('');
    const [localTopic, setLocalTopic] = useState('');
    const [localDataset, setLocalDataset] = useState({});
    const currentRouteTitle = (userdataset !== null && userdataset !== undefined && userdataset.title);

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
            window.open("/dashboard", "_self")

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
            window.open("/dataset/"+localDataset.ID, "_self")
        }
    }

    useEffect(async ()=>{
        if(token !== 0 && token && token !== null && token !== undefined &&
            userdataset !== [] && userdataset !== null && userdataset !== undefined){
            const dataset = await getDatasetsId(token, dataset_id);
            setUserDataset(dataset);
            
            console.log("fetched dataset data",userdataset,);
        }
    }, [token, dataset_id]);

    useEffect(() => {
        if(userdataset.topic && userdataset !== null && userdataset !== undefined) {
            setDatasetTopics(userdataset.topic.toString());
        }
    }, [userdataset]);

    useEffect(async () => {
        if(token !== 0 && token && token !== null && token !== undefined &&
            userdataset !== [] && userdataset !== null && userdataset !== undefined){
            const data = await getDatasets(
                token
            );
            setUserdatasets(data);
            console.log("fetched datasets",data);
        }
    }, [token,router]);

    const handleDownloadButton = async() => {
        const downloadLink = await downloadDatasetsId(token, dataset_id, user.email);
        setDownloadableLink("https://download.devi.ai/"+downloadLink.url);
        // if(downloadLink.url !== null && downloadLink.url !== undefined){
        //     await window.open(downloadableLink, '_blank');
        // }
    }

     useEffect(async()=>{
         if(downloadableLink !== null && downloadableLink !== undefined && downloadableLink !== ''){
         await window.open(downloadableLink, '_blank');
     }}, [downloadableLink])

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
            user !== {} && user !== null && user !== undefined){
            console.log('user call token', token);
            const userP = await getUser(token);
            if(userP === null) {
                setuser({})
            }else {
                setuser(userP);
            }

            console.log('userP', userP);
        }
    }, [token, router]);

    useEffect(async ()=>{
        mixpanel.track('Viewed Dataset', {
            'source': "Dataset Details Page",
            'scrolled first': true,
            'email':user.email
        })
    }, [token, dataset_id]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const openUser = Boolean(anchorElUser);
    const open2 = Boolean();
    const [topicDatasources, setTopicDatasources] = useState([]);
    const [datasetTopics, setDatasetTopics] = useState('');

    const handleClick = (event) => {
        handleDownloadButton();
        setAnchorEl(event.currentTarget);
    };

    useEffect(async()=>{
        if(token !== 0 && token && token !== null && token !== undefined &&
            topicDatasources !== [] && topicDatasources !== null && topicDatasources !== undefined){
            const datasources = await getPublicDatasetsTopics(token, datasetTopics && datasetTopics.split(",")[0]);
            setTopicDatasources(datasources);
            console.log("fetched topic datasources",datasources, );
        }
    }, [token, datasetTopics]);

    return (

        <div style={{display:'flex', flexDirection:'row', minWidth:'100%', maxWidth:'100%',}}>

            {/* <Box sx={{width:"18%"}}>
                <Box sx={{width:"18%", position:'fixed'}}>
                    <LeftNav token={token} userdatasets={userdatasets} setUserdatasets={setUserdatasets}/>
                </Box>
            </Box> */}
            <div style={{display:'flex',flexDirection:'column', minWidth:'100%', maxWidth:'100%'}}>
                <div style={{ display: 'flex', flexDirection:'column', backgroundColor: '#FAFAFB',}}>

                    <div style={{ display: 'flex', flexDirection:'row', justifyContent:'space-between', paddingTop:96,
                        paddingLeft:16, paddingRight:16}}>

                        <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18, 
                            color:'gray-700', alignItems:'center'}}>
                            {datasetMode ===1 ?<Button  size="medium" sx={{display:'flex', alignItems:'center',paddingRight:2,
                                    justifyContent:'center'}} startIcon={<ArrowBackIcon />} onClick={()=>setDatasetMode(0)}>
                                    {"Back"}</Button>:
                                datasetMode ===0 ?<Button  size="medium" sx={{display:'flex', alignItems:'center',paddingRight:2,
                                    justifyContent:'center'}} startIcon={<ArrowBackIcon />} onClick={()=>router.push('/datasets')}>
                                    {"Back"}</Button>:null}
                            <Divider variant="middle" orientation="vertical" />
                            <div style={{paddingLeft:8,paddingRight:2,}}>Go Back to {datasetMode ===0 ?" My Datasets": currentRouteTitle}</div>
                            <Button variant="outlined" size="medium" sx={{borderRadius:3, marginLeft:2, paddingLeft:2,paddingRight:2, color:'#000', borderColor:'#939EAA' }}
                                    startIcon={<CachedIcon />} onClick={()=>router.reload()}>
                                {"Refresh"}</Button>
                        </Box>
                        <Box sx={{display:"flex", alignItems:'center', justifyContent:'space-between', width:'21%', }}>
                            {datasetMode==0?<div><DeleteOutlineIcon fontSize="large" sx={{cursor:'pointer',}}
                                                                    onClick={() => deleteF(userdataset)}/></div>:null}
                            <Button variant="outlined" size="medium" sx={{borderRadius:3, color:'#000', borderColor:'#939EAA'}}
                                    startIcon={<GetAppIcon />} onClick={handleClick}
                                    >
                                {"Export"}</Button>

                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={()=>handleDownloadButton()}>Download CSV</MenuItem>
                                <MenuItem disabled onClick={()=>handleClose}><div><div>XLS </div><div style={{fontSize:12}}>(Enterprise Version)</div></div> </MenuItem>
                                <MenuItem disabled onClick={()=>handleClose}><div><div>API Configuration</div> <div style={{fontSize:12}}>(Enterprise Version)</div></div></MenuItem>
                            </Menu>
                            {datasetMode === 0 ?<Button variant="outlined" size="medium" sx={{borderRadius:3, color:'#000', borderColor:'#939EAA'}}
                                                        startIcon={<EditIcon />} onClick={() => setDatasetMode(1)}>
                                {"Edit"}</Button>: datasetMode === 1 ?
                                <Button variant="outlined" size="medium" sx={{borderRadius:3, color:'#000', borderColor:'#939EAA'}}
                                        startIcon={<CheckIcon />} onClick={() => {updateF(userdataset)}}>
                                    {"Update"}</Button>:null}
                        </Box>

                    </div>

                    <div style={{ display: 'flex', flexDirection:'row', py: 2,px:2, justifyContent:'space-between',
                         width:'100%', paddingLeft:16, paddingBottom:"1rem", paddingTop:'1rem'}}>
                        <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:24,width:'100%',
                            color:'gray-900', flex:'start'}}>
                            <div>Dataset Overview: &nbsp;</div> {userdataset !== null && userdataset !== undefined && <div>{userdataset.title}</div>}
                        </Box>

                    </div>

                    {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
                    <div style={{paddingLeft:16, paddingRight:16, width: '100%', }}>
                        {
                            userdataset !== null && userdataset !== undefined
                            && <SignalCardOut token={token} localDataset={localDataset} setLocalDataset={setLocalDataset}
                                              localTitle={localTitle} setLocalTitle={setLocalTitle} localDescription={localDescription}
                                              setLocalDescription={setLocalDescription} localTopic={localTopic} setLocalTopic={setLocalTopic}
                                              data={userdataset} datasetMode={datasetMode} setDatasetMode={setDatasetMode}
                                              userdataset={userdataset} setUserDataset={setUserDataset} deleteF={deleteF} updateF={updateF}

                            />
                        }

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
                                <div>{datasetMode === 0? "Included ":'Selected ' }Data Catalogs &nbsp;</div>
                            </Box>

                            {datasetMode ===1 ?<Button variant="contained" size="large" sx={{mx:4, py:2,
                                backgroundColor:'#5A00E2'}}
                                                       startIcon={addCatalogMode ?<CheckIcon />:<AddIcon />} onClick={()=>setAddCatalogMode(!addCatalogMode)}>
                                {addCatalogMode ?"Done":"Add More"}</Button>:null}

                        </Box>

                        <Box sx={{  display:'flex', flexDirection:'column', pt:1,paddingLeft:'0.75em',paddingRight:'0.75em',
                            alignItems:'center' , backgroundColor:'#FAFAFB',}}>
                            <Box sx={{ width:"100%",  display:'flex', flexDirection:'column',paddingLeft:'0.75em',paddingRight:'0.75em',
                                justifyContent:"center",alignItems:'center', border:'1px solid #E2E2EA', borderRadius:4, pt:1}}>
                                {datasetMode === 0 ? userdataset !== null && userdataset !== undefined &&
                                    userdataset.catalog !== null && userdataset.catalog !== undefined &&
                                    userdataset.catalog.map((data,index)=><FeatureCard
                                        key={data.dataset_id}
                                        data={data}
                                        index={index}
                                        token={token}
                                        user={user}
                                        currentRouteTitle={currentRouteTitle}
                                        datasetMode={datasetMode}
                                        dataset={userdataset}
                                        openDetails={openDetails}
                                        handleOpenDetails={handleOpenDetails}
                                        handleCloseDetails={handleCloseDetails}/>)
                                    : datasetMode === 1 ?
                                        userdataset !== null && userdataset !== undefined &&
                                        userdataset.catalog !== null && userdataset.catalog !== undefined &&
                                        userdataset.catalog.map((data,index)=><EditFeatureCard
                                            key={data.dataset_id}
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
                                            handleCloseDetails={handleCloseDetails}/>)
                                        : null}
                            </Box>

                        </Box>

                        {datasetMode === 1 && addCatalogMode === true ?<Box sx={{ display: 'flex', minHeight: '23vh',backgroundColor:'#FAFAFB',}}>

                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',mb:4}}>

                                <Box component="main" sx={{ display:'flex',flexDirection:'row',
                                    flex: 1, py: 2, px: 2, }}>
                                    <Typography color="inherit" variant="h5" component="h1">
                                        <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',}}>
                                            <div>Matching Data Catalogs &nbsp;</div>

                                        </Box>
                                    </Typography>

                                </Box>

                                <Box sx={{ minWidth:'100%',maxWidth:'100%', display:'flex', flexDirection:'column', pt:1,paddingLeft:'0.75em',paddingRight:'0.75em',
                                    alignItems:'center',backgroundColor:'#FAFAFB', }}>
                                    <Box sx={{ width:"100%",  display:'flex', flexDirection:'column', paddingLeft:'0.75em',paddingRight:'0.75em',
                                        justifyContent:"center",alignItems:'center', border:'1px solid #E2E2EA', borderRadius:4, pt:1}}>
                                    {topicDatasources && topicDatasources.map((data,index)=>index < 10 &&<FeatureCard
                                        openDetails={openDetails}
                                        data={data}
                                        index={index}
                                        token={token}
                                        user={user}
                                        currentRouteTitle={currentRouteTitle}
                                        handleOpenDetails={handleOpenDetails}
                                        handleCloseDetails={handleCloseDetails}
                                        dataset={userdataset.catalog}
                                        dataSources={dataSources}
                                        removeDatasetcatalog={removeLocalDatasetcatalog}
                                        addDatasetcatalog={addLocalDatasetcatalog}
                                    />)}
                                    </Box>
                                </Box>

                            </Box>
                        </Box>:null}

                        {/* <div style={{display:'flex', flexDirection:'column', marginLeft:16,
                            overflowX: 'auto',overflowY: 'hidden', whiteSpace: 'nowrap', paddingTop:16,
                            paddingBottom:16}}>

                            <div component="main" style={{ display:'flex',flexDirection:'row',
                                flex: 1,  }}>
                                <Typography color="inherit" variant="h5" component="h1">
                                    <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',}}>
                                        <div>Matching Datasets &nbsp;</div>

                                    </Box>
                                </Typography>

                            </div>
                            <div style={{  display:'flex', flexDirection:'row', marginLeft:4, flex:'start',
                                alignItems:'center', paddingTop:16,
                                overflowX: 'auto',overflowY: 'hidden', whiteSpace: 'nowrap'}}>

                                {userdatasets !== null && userdatasets !== undefined && userdatasets.length > 0 ?
                                    userdatasets.map((data, index)=><DatasetDraftCard
                                        key={data.dataset_id}
                                        index={index}
                                        data={data}
                                        token={token}
                                        user={user}
                                        currentRouteTitle={currentRouteTitle}
                                        openDetails={openDetails}
                                        handleOpenDetails={handleOpenDetails}
                                        handleCloseDetails={handleCloseDetails}/>): null
                                }
                            </div>
                        </div> */}

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

