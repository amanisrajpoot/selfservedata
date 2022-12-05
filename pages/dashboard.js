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
import {getDataSourceInfoByID, getDataSourceList, getDataSourceListByEmail } from '../function/users';
import LeftNav from "../components/LeftNav";
import mixpanel from 'mixpanel-browser';
import InputAdornment from "@mui/material/InputAdornment";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
    const [candidateEmail, setCandidateEmail] = useState("")
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
    }, []);

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
    }, [token, data]);

    useEffect(async () => {
        if(token !== 0 && token && token !== null && token !== undefined){
                console.log('calling api with this data', token, data);
            const dataSources = await getDataSourceListByEmail(token,
                {
                    "requestParameter": {
                      "value": candidateEmail
                    }
                  }
            );
            if(dataSources === null){
                setDataSources({});
            }else{
                setDataSources(dataSources.responseData)
            }
            console.log('new api datasources', dataSources);
        }
    }, [candidateEmail, router,]);

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


  const [candidateEmailList, setCandidateEmailList] = React.useState([
    {
     "Team Name": "enter the dragons",
     "Team Lead Email": "ssbchinmayi@gmail.com",
     "Team Lead Name": "Chinmayi Sista",
     "Mentor Name": "Shubham Jha"
    },
    {
     "Team Name": "spark plugs",
     "Team Lead Email": "jettisravanthi2308@gmail.com",
     "Team Lead Name": "Jetti Sravanthi",
     "Mentor Name": "Shubham Jha"
    },
    {
     "Team Name": "the healers",
     "Team Lead Email": "alveeramahwish1@gmail.com",
     "Team Lead Name": "alveera mahwish",
     "Mentor Name": "Priti Pandey"
    },
    {
     "Team Name": "data dive",
     "Team Lead Email": "riu.21naryani@gmail.com",
     "Team Lead Name": "riya",
     "Mentor Name": "Priti Pandey"
    },
    {
     "Team Name": "stealth",
     "Team Lead Email": "kushsah42@gmail.com",
     "Team Lead Name": "kush Bhargav sah",
     "Mentor Name": "Priti Pandey"
    },
    {
     "Team Name": "scanner",
     "Team Lead Email": "ksaksham81@gmail.com",
     "Team Lead Name": "Saksham Kohli",
     "Mentor Name": "Shubham Jha"
    },
    {
     "Team Name": "mining for bits",
     "Team Lead Email": "mohdaskari48@gmail.com",
     "Team Lead Name": "Syed Mohd Askari",
     "Mentor Name": "Shubham Jha"
    },
    {
     "Team Name": "mark3",
     "Team Lead Email": "amoghpgowda@gmail.com",
     "Team Lead Name": "AMOGH P GOWDA",
     "Mentor Name": "Priti Pandey"
    },
    {
     "Team Name": "data venture",
     "Team Lead Email": "sumukha0000@gmail.com",
     "Team Lead Name": "Sumukha R",
     "Mentor Name": "Shubham Jha"
    },
    {
     "Team Name": "trojan horses",
     "Team Lead Email": "deosaju2260@gmail.com",
     "Team Lead Name": "Deo Saju",
     "Mentor Name": "Shubham Jha"
    },
    {
     "Team Name": "apollonian",
     "Team Lead Email": "kajaanithadevi@gmail.com",
     "Team Lead Name": "Anitha devi Kaja",
     "Mentor Name": "Shubham Jha"
    },
    {
     "Team Name": "super nerds",
     "Team Lead Email": "jnpriyanshipragya@gmail.com",
     "Team Lead Name": "Priyanshi jain",
     "Mentor Name": "Shubham Jha"
    },
    {
     "Team Name": "techworth",
     "Team Lead Email": "sirijami2003@gmail.com",
     "Team Lead Name": "Nitya Siri Chandana Jami",
     "Mentor Name": "Shubham Jha"
    },
    {
     "Team Name": "code reapers",
     "Team Lead Email": "geethikapula2004@gmail.com",
     "Team Lead Name": "Pula Geethika Naidu",
     "Mentor Name": "Shubham Jha"
    },
    {
     "Team Name": "the data gang",
     "Team Lead Email": "aryanacharya12003@gmail.com",
     "Team Lead Name": "Aryan Anandprakash Acharya",
     "Mentor Name": "Priti Pandey"
    },
    {
     "Team Name": "dive in hdata",
     "Team Lead Email": "snekhasuresh2777@gmail.com",
     "Team Lead Name": "Snekha S",
     "Mentor Name": "Aman Rajpoot"
    },
    {
     "Team Name": "healthinfy",
     "Team Lead Email": "mvarshinim02@gmail.com",
     "Team Lead Name": "Medicharla Varshini",
     "Mentor Name": "Aman Rajpoot"
    },
    {
     "Team Name": "we can team",
     "Team Lead Email": "srimalvinachadalavada@gmail.com",
     "Team Lead Name": "srimalvina chadalavada",
     "Mentor Name": "Priti Pandey"
    },
    {
     "Team Name": "sho shin",
     "Team Lead Email": "rrraannjjaann@gmail.com",
     "Team Lead Name": "Ranjan Yadav",
     "Mentor Name": "Aman Rajpoot"
    },
    {
     "Team Name": "binary_beasts",
     "Team Lead Email": "pallavikoribilli@gmail.com",
     "Team Lead Name": "Pallavi Koribilli",
     "Mentor Name": "Aman Rajpoot"
    },
    {
     "Team Name": "data hungers",
     "Team Lead Email": "devendraparihar340@gmail.com",
     "Team Lead Name": "Devendra Parihar",
     "Mentor Name": "Aman Rajpoot"
    },
    {
     "Team Name": "failure immunity",
     "Team Lead Email": "shwetaevangeline@gmail.com",
     "Team Lead Name": "Shweta Evangeline",
     "Mentor Name": "Aman Rajpoot"
    },
    {
     "Team Name": "health stimulator",
     "Team Lead Email": "harshithakasarapu0504@gmail.com",
     "Team Lead Name": "Harshitha Kasarapu",
     "Mentor Name": "Aman Rajpoot"
    },
    {
     "Team Name": "svastha",
     "Team Lead Email": "praseeda.saripalle@gmail.com",
     "Team Lead Name": "Praseeda Saripalle",
     "Mentor Name": "Aman Rajpoot"
    },
    {
     "Team Name": "healthathon winners",
     "Team Lead Email": "kkmittal2019@outlook.com",
     "Team Lead Name": "Krishan Mittal",
     "Mentor Name": "Aman Rajpoot"
    },
    {
     "Team Name": "data dao",
     "Team Lead Email": "jay.oza@somaiya.edu",
     "Team Lead Name": "JAY OZA",
     "Mentor Name": "Aman Rajpoot"
    },
    {
     "Team Name": "phoenix",
     "Team Lead Email": "harshitchoudhary5683@gmail.com",
     "Team Lead Name": "Harshit Choudhary",
     "Mentor Name": "Sourabh Yadav"
    },
    {
     "Team Name": "data sonic",
     "Team Lead Email": "mohitsharma42049@gmail.com",
     "Team Lead Name": "Mohit Sharma",
     "Mentor Name": "Sourabh Yadav"
    },
    {
     "Team Name": "prodigies",
     "Team Lead Email": "nitinbherwani.09.nb@gmail.com",
     "Team Lead Name": "Nitin Bherwani",
     "Mentor Name": "Priti Pandey"
    },
    {
     "Team Name": "weekend warriors",
     "Team Lead Email": "simranyadav0010@gmail.com",
     "Team Lead Name": "Simran Yadav",
     "Mentor Name": "Priti Pandey"
    },
    {
     "Team Name": "hypertext assassins",
     "Team Lead Email": "mohaksinghania.123@gmail.com",
     "Team Lead Name": "Mohak Singhania",
     "Mentor Name": "Priti Pandey"
    },
    {
     "Team Name": "neurons",
     "Team Lead Email": "arunim.malviya.13@gmail.com",
     "Team Lead Name": "Arunim Malviya",
     "Mentor Name": "Sourabh Yadav"
    },
    {
     "Team Name": "the three amigos",
     "Team Lead Email": "aashtamujawdiya60@gmail.com",
     "Team Lead Name": "Aastha Mujawdiya",
     "Mentor Name": "Sourabh Yadav"
    },
    {
     "Team Name": "health conscious",
     "Team Lead Email": "rohitborse2004@gmail.com",
     "Team Lead Name": "Rohit Harishchandra Borse",
     "Mentor Name": "Sourabh Yadav"
    },
    {
     "Team Name": "data_is_cool",
     "Team Lead Email": "manish.malviya.2020@ecajmer.ac.in",
     "Team Lead Name": "Manish Kumar",
     "Mentor Name": "Sourabh Yadav"
    },
    {
     "Team Name": "torscrapers",
     "Team Lead Email": "snehaguptaa1812@gmail.com",
     "Team Lead Name": "SNEHA GUPTA",
     "Mentor Name": "Priti Pandey"
    },
    {
     "Team Name": "deep dive in health",
     "Team Lead Email": "gauravsinghrajawat29@gmail.com",
     "Team Lead Name": "Gaurav Singh",
     "Mentor Name": "Sourabh Yadav"
    },
    {
     "Team Name": "towards infinity",
     "Team Lead Email": "krishnavaibhav6@gmail.com",
     "Team Lead Name": "Vaibhav Krishna",
     "Mentor Name": "Sourabh Yadav"
    },
    {
     "Team Name": "boolean pundits",
     "Team Lead Email": "aum832003@gmail.com",
     "Team Lead Name": "Gyanapriya Pradhan",
     "Mentor Name": "Sourabh Yadav"
    },
    {
     "Team Name": "goslow",
     "Team Lead Email": "s.subodh7976@gmail.com",
     "Team Lead Name": "Subodh Uniyal",
     "Mentor Name": "Sourabh Yadav"
    },
    {
     "Team Name": "code hacker",
     "Team Lead Email": "sujitgouda868@gmail.com",
     "Team Lead Name": "sujit gouda",
     "Mentor Name": "Sourabh Yadav"
    },
    {
     "Team Name": "dataraider",
     "Team Lead Email": "aastharanjan0507@gmail.com",
     "Team Lead Name": "Aastha",
     "Mentor Name": "Sourabh Yadav"
    },
    {
     "Team Name": "team unknown",
     "Team Lead Email": "jhamonishka@gmail.com",
     "Team Lead Name": "Monishka Jha",
     "Mentor Name": "Sourabh Yadav"
    },
    {
     "Team Name": "care lifters",
     "Team Lead Email": "r21bothra05@gmail.com",
     "Team Lead Name": "Rahul Bothra",
     "Mentor Name": "Sourabh Yadav"
    },
    {
     "Team Name": "unstoppable",
     "Team Lead Email": "armansayyed632@gmail.com",
     "Team Lead Name": "Arman Sayyed",
     "Mentor Name": "Sourabh Yadav"
    }
   ]);

  const handleChange = (event) => {
    console.log("Selected email of the candidate", event.target.value )
    setCandidateEmail(event.target.value);
  };


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
                      <div>{"("}{users !== undefined && users === null ? "Loading catalogs...": users.length>=0 ? users.length:null}{")"}</div>:
                      searchMode === 1 && keywordFilteredDataSources !== null && keywordFilteredDataSources !== undefined ?
                      <div>{"("+ keywordFilteredDataSources.length+")"}</div>:
                      searchMode === 2 && topicFilteredDataSources !== null && topicFilteredDataSources !== undefined ?
                      <div>{"("+ topicFilteredDataSources.length+")"}</div>:null}
                    <div style={{color:'gray'}}><Divider variant="middle" flexItem/></div>

                </div>


                <div style={{minWidth:'30%'}}><FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Email ID</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={candidateEmail}
                        label="Age"
                        onChange={handleChange}
                    >
                        {candidateEmailList.map((email)=><MenuItem value={email['Team Lead Email']}>{email['Team Lead Email'] + " " + "(" + email['Mentor Name'].split(" ")[0]+ ")"}</MenuItem>)}

                    </Select>
                    </FormControl>
                    </div>
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

          {/* <div style={{ display: 'flex', flexDirection:'row', bgcolor: 'gray-900', minWidth:'100%', maxWidth:'100%',
              justifyContent:'space-between',paddingBottom:"1.5em", paddingTop:"1.5em",}}>

              <div style={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18,
                    color:'gray-700',justifyContent:'space-around', alignItems:'center', }}>
                    <div><TableViewOutlinedIcon fontSize="large"/>&nbsp;&nbsp;</div>
                      <div>Draft Data Catalogs &nbsp;</div>
                  {/* {searchMode === 0 && dataSources !== null && dataSources !== undefined ?
                  <div>{"("+ dataSources.length+")"}</div>:
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
                        {/* </Paper>
                        </div>}

          </LoadingOverlay>} */}

    </div>
  );
}
