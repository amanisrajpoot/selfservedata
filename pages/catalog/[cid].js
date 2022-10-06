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
import {getDataSourceInfoByID, saveDataSourceInfo} from '../../function/users';
import DataSourcesDetails from '../../components/datasourcesdetails';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import mixpanel from 'mixpanel-browser';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import GetAppIcon from '@mui/icons-material/GetApp';
import EditIcon from '@mui/icons-material/Edit';
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
    const [localSource, setLocalSource] = useState('');
    const [localSourceURL, setLocalSourceURL] = useState('');
    const [localDataset, setLocalDataset] = useState({});
    const [currentTopic, setCurrentTopic] = useState("")
    const [filteredDataSources, setFilteredDataSources] = useState([])
    const [relatedDataSources, setRelatedDataSources] = useState([])
    const [currentRouteTitle, setCurrentRouteTitle] = useState("")
    const [dataSource, setDataSource] = useState({
        "requestParameter": {
          "value": parseInt(datasource_id)
        }
      })
    const [dataSourceData, setDataSourceData] = useState({})

    useEffect(()=>{
            if((dataSource === null || dataSource === undefined) && datasource_id !== null){
                setDataSource({
                "requestParameter": {
                "value": parseInt(datasource_id)
                }
            })
            } else if ((dataSource === null || dataSource === undefined) && datasource_id === null){
                setDataSource({
                    "requestParameter": {
                    "value": parseInt(catalogID)
                    }
                })

            }
        }
    ,[router, dataSource])

    useEffect(()=>{
        dataSources !== null && dataSources !== undefined &&
        dataSources.map((data,index)=> datasource_id == data.ID && setCurrentRouteTitle(data.title))
    },[])

    useEffect(() => {
        if(userdataset !== null && userdataset !== undefined) {
            setLocalTitle(userdataset.title);
            setLocalDescription(userdataset.description);
            setLocalTopic(userdataset.topic);
            setLocalSource(userdataset.source_description)
            setLocalSourceURL(userdataset.source_url)
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
        setLocalDataset({...userdataset, title:localTitle, description:localDescription,topic:localTopic, 
            source_description:localSource, source_url:localSourceURL});
    }, [localTitle, localDescription, localTopic, localSource, localSourceURL]);

    async function updateF(dataF){
        setLocalDataset({...dataF, title:localTitle, description:localDescription,topic:localTopic, 
            source_description:localSource, source_url:localSourceURL});
        console.log("updated dataset data", localDataset)
        const data = await saveDataSourceInfo({token, requestParameter:localDataset});
        if(data){
            window.open("/browsecatalogue/", "_self")
        }
    }

    useEffect(async ()=>{
        if(token !== 0 && token && token !== null && token !== undefined){
            const dataSourced = await getDataSourceInfoByID(token, dataSource);
            setDataSourceData(dataSourced.responseData);
            setUserDataset(dataSourced.responseData);
            console.log("fetched datasource data",dataSourced.responseData);
        }
    }, [token, datasource_id]);

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

        <div style={{display:'flex',minWidth:'100%', minHeight:'100%', maxWidth:'100%', flexDirection:'row'}}>

            <div style={{display:'flex',flexDirection:'column',minWidth:'100%',minHeight:'100%', maxWidth:'100%',backgroundColor: '#FAFAFB',}}>
                <div style={{ display: 'flex', flexDirection:'column', backgroundColor: '#FAFAFB', }}>

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

                        <Box sx={{display:"flex", alignItems:'center', justifyContent:'space-between',  }}>
                            {datasetMode==0?<div><DeleteOutlineIcon fontSize="large" sx={{cursor:'pointer',}}
                                                                    onClick={() => deleteF(userdataset)}/></div>:null}

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
                            {datasetMode === 0 ?<Button variant="outlined" size="medium" sx={{borderRadius:3, color:'#000', borderColor:'#939EAA', marginLeft:'1rem'}}
                                                        startIcon={<EditIcon />} onClick={() => setDatasetMode(1)}>
                                {"Edit"}</Button>: datasetMode === 1 ?
                                <Button variant="outlined" size="medium" sx={{borderRadius:3, color:'#000', borderColor:'#939EAA', marginLeft:'1rem'}}
                                        startIcon={<CheckIcon />} onClick={() => {updateF(userdataset)}}>
                                    {"Update"}</Button>:null}
                        </Box>

                    </Box>

                    <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:2, justifyContent:'space-between', height:'100%'}}>
                        <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:24,height:'100%',
                            color:'gray-900',justifyContent:'space-around'}}>
                            <div>Data Catalog Overview: &nbsp;</div>{dataSources !== null && dataSources !== undefined &&
                                <div>{dataSource.title}</div>}
                        </Box>

                    </Box>

                    {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
                    <div style={{ }}>
                        <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:2, justifyContent:'space-between'}}>
                        {
                            dataSource !== null && dataSource !== undefined && 
                             <CatalogCardOut token={token} localDataset={localDataset}
                                              setLocalDataset={setLocalDataset} localTitle={localTitle} setLocalTitle={setLocalTitle}
                                              localDescription={localDescription}setLocalDescription={setLocalDescription} localTopic={localTopic}
                                              setLocalTopic={setLocalTopic}data={dataSourceData} datasetMode={datasetMode} setDatasetMode={setDatasetMode}
                                              dataSources={dataSources}setDataSources={setDataSources} userdataset={userdataset} setUserDataset={setUserDataset}
                                              deleteF={deleteF} updateF={updateF} currentTopic={currentTopic} setCurrentTopic={setCurrentTopic}
                                              localSource={localSource} setLocalSource={setLocalSource} localSourceURL={localSourceURL} setLocalSourceURL={setLocalSourceURL}
                            />
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

                {/* <div style={{ display: 'flex', minHeight: '23vh', backgroundColor:'#FAFAFB',pt:4, width:'100%'}}>

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
                                {       dataSources !== null && dataSources !== undefined &&
                                                dataSources.filter((data)=> String(data.ID) !== String(catalogID)).length === 0 || 
                                                dataSources.filter((data)=> String(data.ID) !== String(catalogID)).length < 0 ? 
                                                    <div>We are working on adding more catalogs to our platform.</div>:
                                                    dataSources.filter((data)=> String(data.ID) !== String(catalogID)).map((data,index)=> 
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
                                                        <div>Add more catalogs to get results here.</div> )
                                }
                            </div>

                        </div>

                    </div>


                </div> */}

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

