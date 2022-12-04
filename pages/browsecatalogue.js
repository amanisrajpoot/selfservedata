import {useState, useEffect } from 'react';
// import '../styles/globalStyles.css';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import { InputBase } from '@mui/material';
import FeatureCard from '../components/FeatureCard';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import { Grid } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import DataSourcesDetails from '../components/datasourcesdetails';
import { useRouter } from 'next/router';
import {getPublicDatasets, getDatasets, getUser, getPublicDatasetsTopics, getPublicDatasetsTopicKeyword} from '../function/users';
import {getDataSourceInfoByID, getDataSourceList } from '../function/users';
import LeftNav from "../components/LeftNav";
import mixpanel from 'mixpanel-browser';
import InputAdornment from "@mui/material/InputAdornment";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';

import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined'
import FilterListIcon from '@mui/icons-material/FilterList';
import CancelIcon from '@mui/icons-material/Cancel';
import LoadingOverlay from 'react-loading-overlay';
import SyncLoader from 'react-spinners/SyncLoader';
import { Auth } from 'aws-amplify';
import {createUser} from "../function/users";
import TextField from '@mui/material/TextField';
import Pagination from 'react-bootstrap/Pagination'
import axios from 'axios'
import ReactPaginate from "react-paginate";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


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

export default function BrowseCatalogue({
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
  addDatasetcatalog,
  removeDatasetcatalog,
  user,
  setuser,
}) {

  const router = useRouter()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElUser2, setAnchorElUser2] = React.useState(null);
    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);
    const openUser = Boolean(anchorElUser);
    const [isActive, setIsActive] = React.useState(false);
    //const [dataSources, setDataSources] = useState([]);
    const [data, setData] = React.useState({
        "requestParameter": {
          "value": parseInt(user.ID)
        }
      })

  const [localdataset, setLocaldataset] = useState([]);

  useEffect(()=>{
    setData({
        "requestParameter": {
          "value": parseInt(user.ID)
        }
      })

  },[router])

    useEffect(async () => {
        if(token !== 0 && token && token !== null && token !== undefined && 
            user !== {} && user !== null && user !== undefined){
                console.log('get users called from catalog page', token);
            const userP = await getUser(token);
            if(userP === null){
                setuser({});
            }else{
                setuser(userP)
                setData({
                    "requestParameter": {
                      "value": parseInt(user.ID)
                    }
                  })
            }
            console.log('userP', userP);
        }
    }, [token, router]);

    useEffect(async () => {
        if(token !== 0 && token && token !== null && token !== undefined && 
            user !== {} && user !== null && user !== undefined){
                setData({
                    "requestParameter": {
                      "value": parseInt(user.ID)
                    }
                  })   
        }
    }, [router, user]);

    useEffect(async () => {
        if(token !== 0 && token && token !== null && token !== undefined){
                console.log('calling api with this data', token, data);
            const dataSources = await getDataSourceList(token, data);
            if(dataSources === null){
                setDataSources({});
            }else{
                setDataSources(dataSources.responseData)
            }
            console.log('new api datasources', dataSources);
        }
    }, [token, router, data]);

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
  
  const [keyword, setKeyword] = useState('');
  const [localFilterTopics, setLocalFilterTopics] = useState([])
  const [filterTopics, setFilterTopics] = useState([])
  const [uniqueTopics, setUniqueTopics] = useState();
  const [topicFilteredDataSources, setTopicFilteredDataSources] = useState([])
  const [keywordFilteredDataSources, setKeywordFilteredDataSources] = useState([])
  const [searchMode, setSearchMode] = useState(0)
  const [currentPageData, setCurrentPageData] = useState(new Array(2).fill());
  // Example items, to simulate fetching from another resources.
  const [users, setUsers] = useState(searchMode === 0 && dataSources && dataSources.slice(0, 50));

  useEffect(()=>{
    if(searchMode === 0){
        setUsers(dataSources && dataSources.filter((draft)=>draft.status === 'Active'));
    }else if(searchMode === 1){
        setUsers(keywordFilteredDataSources && keywordFilteredDataSources.filter((draft)=>draft.status === 'Active'));
    }else if(searchMode === 2){
        setUsers(topicFilteredDataSources && topicFilteredDataSources.filter((draft)=>draft.status === 'Active'));
    }
    },[searchMode, dataSources, keywordFilteredDataSources, topicFilteredDataSources])

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = users !==null && users && users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .sort((a,b)=>new Date(b.CreatedAt) - new Date(a.CreatedAt)).map((data,index)=>
                <div style={{width:'100%', paddingLeft:'0.7rem',
                    paddingRight:'0.7rem'}}>
                        <FeatureCard
                        openDetails={openDetails}
                        data={data}
                        index={index}
                        token={token}
                        user={user}
                        key={data.id}
                        pagesVisited={pagesVisited}
                        usersPerPage={usersPerPage}
                        handleOpenDetails={handleOpenDetails}
                        handleCloseDetails={handleCloseDetails}
                        dataset={dataset.catalog}
                        dataSources={dataSources}
                        removeDatasetcatalog={removeDatasetcatalog}
                        addDatasetcatalog={addDatasetcatalog}
                    />
                    </div>
      );

  const pageCount = users !== null && users && Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [usersDraft, setUsersDraft] = useState(searchMode === 0 && dataSources && dataSources.slice(0, 50));

  useEffect(()=>{
    if(searchMode === 0){
        setUsersDraft(dataSources && dataSources.filter((draft)=>draft.status === 'Archive'));
        }else if(searchMode === 1){
            setUsersDraft(keywordFilteredDataSources && keywordFilteredDataSources.filter((draft)=>draft.status === 'Archive'));
        }else if(searchMode === 2){
            setUsersDraft(topicFilteredDataSources && topicFilteredDataSources.filter((draft)=>draft.status === 'Archive'));
        }
    },[searchMode, dataSources, keywordFilteredDataSources, topicFilteredDataSources])
    
  const [pageNumberDraft, setPageNumberDraft] = useState(0);

  const usersPerPageDraft = 5;
  const pagesVisitedDraft = pageNumberDraft * usersPerPageDraft;

  const displayUsersDraft = usersDraft !==null && usersDraft && usersDraft
    .slice(pagesVisitedDraft, pagesVisitedDraft + usersPerPageDraft)
    .sort((a,b)=>new Date(b.CreatedAt) - new Date(a.CreatedAt)).map((data,index)=> 
                    <div style={{width:'100%', paddingLeft:'0.7rem',
                    paddingRight:'0.7rem'}}>
                        <FeatureCard
                        openDetails={openDetails}
                        data={data}
                        index={index}
                        token={token}
                        user={user}
                        key={data.id}
                        pagesVisited={pagesVisitedDraft}
                        usersPerPage={usersPerPageDraft}
                        handleOpenDetails={handleOpenDetails}
                        handleCloseDetails={handleCloseDetails}
                        dataset={dataset.catalog}
                        dataSources={dataSources}
                        removeDatasetcatalog={removeDatasetcatalog}
                        addDatasetcatalog={addDatasetcatalog}
                    />
                    </div>
      );

  const pageCountDraft = usersDraft !== null && usersDraft && Math.ceil(usersDraft.length / usersPerPageDraft);

  const changePageDraft = ({ selected }) => {
    setPageNumberDraft(selected);
  };

  const [draftVisibility, setDraftVisibility] = useState(true)

  return (
    
    <div style={{minHeight:"100%", display:'flex',minWidth:'100%', maxWidth:'100%',backgroundColor: '#FAFAFB',
        fontStyle:'roboto', minWidth:'100%',maxWidth:'100%',
            paddingLeft:'1em', paddingRight:'1em',paddingTop:'7.15em',flexDirection:'column'}}>
      {/*<Navbar token={token} setToken={setToken}/>*/}

            <div style={{ display: 'flex', flexDirection:'row', font:'roboto',paddingBottom:"1.5em",minWidth:'100%',
                            color:'gray-700',justifyContent:'space-between', alignItems:'end'}}>
                            <div style={{fontSize:28}}>Data Catalogs &nbsp;&nbsp;</div>

                        </div>        

          <div style={{ display: 'flex', flexDirection:'row', bgcolor: 'gray-900', minWidth:'100%', maxWidth:'100%',
              justifyContent:'space-between',paddingBottom:"1.5em", }}>

              <div style={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18,
                    color:'gray-700',justifyContent:'space-around', alignItems:'center', }}>
                    <div><TableViewOutlinedIcon fontSize="large"/>&nbsp;&nbsp;</div>
                      <div>Added Data Catalogs &nbsp;</div>
                  {/* {searchMode === 0 && dataSources !== null && dataSources !== undefined ?
                  <div>{"("+ dataSources.length+")"}</div>: */}
                      {users !== null && searchMode === 0 && dataSources !== null && dataSources !== undefined ?
                      <div>{"("}{users === null ? "Loading catalogs...": users.length>=0 ? users.length:null}{")"}</div>:
                      searchMode === 1 && keywordFilteredDataSources !== null && keywordFilteredDataSources !== undefined ?
                      <div>{"("+ keywordFilteredDataSources.length+")"}</div>:
                      searchMode === 2 && topicFilteredDataSources !== null && topicFilteredDataSources !== undefined ?
                      <div>{"("+ topicFilteredDataSources.length+")"}</div>:null}
                    <div style={{color:'gray'}}><Divider variant="middle" flexItem/></div>

                    

                </div>

                
                <Button variant="contained" size="large"
                                sx={{backgroundColor:'#5A00E2', px:2, borderRadius:3, textTransform: "capitalize"}}
                                startIcon={<AddIcon />}
                                onClick={() => {
                                    router.push('/submitfile');
                                    // mixpanel.time_event('Create Dataset');
                                    mixpanel.track('Clicked on Create Dataset', {
                                        'source': "Data Platform Dashboard",
                                        'scrolled first': true,
                                        'email':user.email
                                    });
                                }}>
                            {/* onClick={handleOpen}> */}
                            Add a Datasource</Button>

          </div>


          {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
            {/* <SignalTable /> */}
            <LoadingOverlay
                active={isActive}
                spinner={<SyncLoader />}
                // text='Loading your content...'
                > 
            <div style={{ display:'flex', flexDirection:'column', borderRadius:'0.75em', minWidth:'100%',maxWidth:'100%',
                            justifyContent:"center",alignItems:'center', border:'0.5px solid #bfbfbf',}}>
                    
                        {/* <div style={{ display:'flex', minWidth:'98.5%',maxWidth:'98.5%',borderRadius:'1rem',backgroundColor:'#fff',flexDirection:'column',
                            paddingLeft:'1rem',marginRight:'1rem',marginLeft:'1rem',paddingTop:'3rem',paddingBottom:'2rem',
                            marginTop:'0.5em',
                            
                            }}>
                            <div style={{display:'flex',minWidth:'98%',maxWidth:'98%', alignItems:'center',textTransform: "capitalize",
                                marginLeft:'1rem'}}>
                                
                                    {/* <input variant="outlined" placeholder="Search..."
                                        value={keyword} onChange={(event)=>setKeyword(event.target.value)}
                                        label="Keyword" style={{ bgcolor: '#ffffff', minHeight:"5.5vh",maxHeight:'5.5vh',
                                            border:'1px solid',borderColor:"#E2E2EA",fontSize:20,
                                            borderRadius:4, width:'100%'}}
                                            onKeyDown={()=>handleKeywordSearch()}>
                                        {/*<FilterListIcon sx={{ fontSize: 25,  }}/>*/}
                                    {/*</input> 

                                    <TextField fullWidth id="outlined-basic" variant="outlined"
                                                className="inputRounded" value={keyword} 
                                                onChange={(e) => setKeyword(e.target.value)}
                                                label="Keyword" 
                                                sx={{ display:'flex',bgcolor: '#ffffff',borderRadius:'4rem', width:'79%' }}
                                                onKeyDown={()=>handleKeywordSearch()}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon />
                                                        </InputAdornment>
                                                    ),
                                                    placeholder:"Search..."
                                                }}/>

                                    {/* <InputBase
                                        // onChange={setVal}
                                        sx={{ width:'100%'}}
                                        id="outlined-basic" variant="outlined"
                                        placeholder="Search Google Maps"
                                        onChange={(e) => setKeyword(e.target.value)}
                                        onKeyDown={()=>handleKeywordSearch()}
                                        inputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                            placeholder:"Search..."
                                        }}
                                    /> 

                                    <Button sx={{minWidth:'18%',maxWidth:'18%', minHeight:'6vh',maxHeight:'6vh', display:'flex',ml:3,color:'#939EAA',
                                        alignItems:'center', justifyContent:'center', borderRadius:2, border:0.5, borderColor:'gray',
                                        textTransform: "capitalize",color:'#000',
                                        py:3
                                        }}
                                            variant="outlined"
                                            onClick={handleClick}>
                                        <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.25 5.25H15.75" stroke="#030D55" stroke-width="1.5" stroke-linecap="round"/>
                                            <path d="M4.5 9H13.5" stroke="#030D55" stroke-width="1.5" stroke-linecap="round"/>
                                            <path d="M7.5 12.75H10.5" stroke="#030D55" stroke-width="1.5" stroke-linecap="round"/>
                                        </svg>

                                        <div style={{fontSize: "1em",paddingLeft:'0.5em',
                                            lineHeight: "125%"}}>Filter By Topics</div>
                                    </Button>

                                    <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={()=> {
                                        handleClose()
                                        
                                        }
                                    }
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    {uniqueTopics && uniqueTopics !== null && uniqueTopics !== undefined && uniqueTopics.length > 0 &&
                                         uniqueTopics.map((topic, index)=><MenuItem onClick={() => {
                                            setLocalFilterTopics(topic.split(",")[0])
                                            
                                    }}>
                                        <div onClick={() => setSearchMode(2)}
                                            style={{paddingLeft:10}}>{topic.split(",")[0]}</div>
                                        </MenuItem>)
                                    }

                                </Menu>
                            </div>
                            {filterTopics.length >0 && <div style={{display:'flex', paddingTop:'1.5em'}}>
                                <div style={{paddingTop:8}}>Applied Filters: {filterTopics && filterTopics.length >0 && 
                                    filterTopics.toString().split(/(?:,| )+/).map((word,index)=> index <7 && <Button
                                    variant="outlined"
                                    sx={{marginRight:1, borderRadius:4, bgcolor:'#FF49A1',color:'#fff',
                                        textTransform:'lowercase', borderColor:'#FF49A1',
                                    }}
                                    onClick={()=>{
                                        mixpanel.track('Keywords Entered in the Search Bar', {
                                            'source': "Browse Catalog page",
                                            'action': "Keyword Entered",
                                            'keywords': keyword.split(/(?:,| )+/).filter(key=>key!==word).toString(),
                                            'email': user.email,
                                        });
                                        setFilterTopics(filterTopics.toString().split(/(?:,| )+/).filter(key=>key!==word).toString())
                                        setLocalFilterTopics(filterTopics.toString().split(/(?:,| )+/).filter(key=>key!==word).toString())
                                    }}
                                    endIcon={<CancelIcon />}>
                                    {word +" "}</Button>)
                                
                                    }
                                    <Button variant="outlined"
                                    sx={{borderRadius:4, bgcolor:'#FF49A1',color:'#fff',
                                        textTransform:'lowercase', borderColor:'#FF49A1',
                                    }}
                                    onClick={()=>{
                                        setFilterTopics([])
                                        setLocalFilterTopics([])
                                    }}
                                    endIcon={<CancelIcon />}>
                                    Clear All</Button>
                                    
                                    </div>
                                    </div>}

                    </div> */}

                    <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                        minWidth:'100%',maxWidth:'100%', height:'100%', 
                        paddingTop:8,  backgroundColor: '#FAFAFB'}}>
                            {displayUsers && displayUsers.length > 0 ? displayUsers:
                                 <div>Either Catalogs are Loading or you haven't added any catalogs yet...</div>}
                            </div>    
                </div>
                    {users && users.length > 5 && <div style={{ display:'flex', flexDirection:'column', 
                        borderRadius:'0.75em', paddingTop:'1em', justifyContent:"center",
                        alignItems:'center', flexWrap:'wrap',}}>
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
          
          </LoadingOverlay>

          <div style={{ display: 'flex', flexDirection:'row', bgcolor: 'gray-900', minWidth:'100%', maxWidth:'100%',
              justifyContent:'space-between',paddingBottom:"1.5em", paddingTop:"1.5em",}}>

              <div style={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18,
                    color:'gray-700',justifyContent:'space-around', alignItems:'center', }}>
                    <div><TableViewOutlinedIcon fontSize="large"/>&nbsp;&nbsp;</div>
                      <div>Draft Data Catalogs &nbsp;</div>
                  {/* {searchMode === 0 && dataSources !== null && dataSources !== undefined ?
                  <div>{"("+ dataSources.length+")"}</div>: */}
                      {usersDraft !== null && searchMode === 0 && dataSources !== null && dataSources !== undefined ?
                      <div>{"("}{usersDraft === null ? "Loading catalogs...": usersDraft.length>=0 ? usersDraft.length:null}{")"}</div>:
                      searchMode === 1 && keywordFilteredDataSources !== null && keywordFilteredDataSources !== undefined ?
                      <div>{"("+ keywordFilteredDataSources.length+")"}</div>:
                      searchMode === 2 && topicFilteredDataSources !== null && topicFilteredDataSources !== undefined ?
                      <div>{"("+ topicFilteredDataSources.length+")"}</div>:null}
                    <div style={{color:'gray'}}><Divider variant="middle" flexItem/></div>
                    <div style={{marginLeft:-32, paddingTop:'0.5rem'}}>
                        {draftVisibility === false ? <ArrowDropUpIcon onClick={()=>setDraftVisibility(!draftVisibility)}/> :
                            <ArrowDropDownIcon onClick={()=>setDraftVisibility(!draftVisibility)} />}</div>
                </div>

                

          </div>

          {!draftVisibility && <LoadingOverlay
                active={isActive}
                spinner={<SyncLoader />}
                // text='Loading your content...'
                > 
            <div style={{ display:'flex', flexDirection:'column', borderRadius:'0.75em', minWidth:'100%',maxWidth:'100%',
                            justifyContent:"center",alignItems:'center', border:'0.5px solid #bfbfbf',}}>

                    <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                        minWidth:'100%',maxWidth:'100%', height:'100%', 
                        paddingTop:8,  backgroundColor: '#FAFAFB'}}>
                            { displayUsersDraft && displayUsersDraft.length > 0 ? displayUsersDraft:
                                <div>Either Catalogs are Loading or you haven't added any catalogs yet...</div>}
                            </div>    
                </div>
                    { users && users.length > 5 && <div style={{ display:'flex', flexDirection:'column', 
                        borderRadius:'0.75em', paddingTop:'1em', justifyContent:"center",
                        alignItems:'center', flexWrap:'wrap',}}>
                            <ReactPaginate
                                        previousLabel={"Previous"}
                                        nextLabel={"Next"}
                                        pageCount={pageCountDraft}
                                        onPageChange={changePageDraft}
                                        containerClassName={"paginationBttns"}
                                        previousLinkClassName={"previousBttn"}
                                        nextLinkClassName={"nextBttn"}
                                        disabledClassName={"paginationDisabled"}
                                        activeClassName={"paginationActive"}
                                    />
                        {/* </Paper> */}
                        </div>}
          
          </LoadingOverlay>}
          
    </div>
  );
}

