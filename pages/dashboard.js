import {useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
// import Modal from '@mui/material/Modal';
import Modal from 'react-bootstrap/Modal';
import { confirmSignUp, signIn, signOut } from '../function/checkAuth';
import TopicDetails from '../components/topicDetails';
import {useRouter} from 'next/router';
import {getPublicDatasets, getDatasets, getUser} from '../function/users';
import LeftNav from "../components/LeftNav";
import mixpanel from 'mixpanel-browser';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import { RWebShare } from "react-web-share";
import styles from '../styles/dashboard.module.css';
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Auth } from 'aws-amplify';
import {createUser} from "../function/users";
import NewsUpdate from '../components/NewsUpdate';
import FeatureCard from '../components/FeatureCard'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from "@mui/material/Divider";
import CachedIcon from '@mui/icons-material/Cached';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import GetAppIcon from '@mui/icons-material/GetApp';
import EditIcon from '@mui/icons-material/Edit';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from '@mui/material/TextField';
import ReactPaginate from "react-paginate";
//import { ModalHover } from 'react-modal-hover'
//import Modal from 'react-modal';
import Tooltip2 from '@mui/material/Tooltip';

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true});
import {
    CartesianGrid,
    XAxis,
    YAxis,
    BarChart,
    ResponsiveContainer,
    Bar, 
    Tooltip,
    Legend,
  } from "recharts";
import MyActivity from '../components/MyActivity';
import TopicCard from '../components/TopicCard';

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

export default function Dashboard({
                                      token,
                                      setToken,
                                      dataset,
                                      userdatasets,
                                      setUserdatasets,
                                      user,
                                      name,
                                      email, 
                                      company,
                                      setuser,
                                      addDatasetcatalog,
                                      removeDatasetcatalog,

                                  }) {

    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const open = Boolean(anchorEl);
    const openUser = Boolean(anchorElUser);
    const open2 = Boolean();
    const [currentRouteTitle, setCurrentRouteTitle] = useState("")
    const [items, setItems] = useState([]); 
    const [keywordRoute, setKeywordRoute] = useState(router.query.keyword)

    useEffect(()=>{
        console.log("dashboard token", token)
    },[token])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickUser = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUser = () => {
        setAnchorElUser(null);
    };

    const handleClose2 = () => {
        setAnchorEl(null);
    };

    const [localdataset, setLocaldataset] = useState([]);

    const handleOpen2 = () => {
        setOpen(false);
        setOpen2(true);}
    const handleClose = () => setOpen(false);

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

    useEffect((async ()=> {
        console.log("dashboard user create function reached")
        console.log("query",router.query)
        console.log("cameFrom",router.query.cameFrom)
        console.log("origin",router.query.origin)
        sleep(2000);
        if(token && (user === {} || user === null || user.error)){
          console.log("cleared the conditions to create user")

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
        //   if("ID" in erro){
        //        router.reload()
        //      }
        }
    }),[])
        
    const [openDetails, setOpenDetails] = useState(false);
    const [dsDetails, setDSDetails] = useState([]);
    const [showDraft, setShowDraft] = useState(true)
    const [isActive, setIsActive] = React.useState(false);
    const [topicFilteredDataSources, setTopicFilteredDataSources] = useState([])
    const [keywordFilteredDataSources, setKeywordFilteredDataSources] = useState([])
    const [catalogCount, setCatalogCount] = useState(0)
    const [datasetTopics, setDatasetTopics] = useState([])
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const handleOpenDetails = (data) => {
        setOpenDetails(true);
        setDSDetails(data);
    };
    const handleCloseDetails = () => {
        setOpenDetails(false);
    };

    function openModal() {
        setIsOpen(true);
      }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        
      }

      const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
      
    
      function closeModal() {
        setIsOpen(false);
      }

    const [keyword, setKeyword] = useState('');
    useEffect( async (event) => {
        if(token!==null  && router.query.keyword && searchMode === 0 ){
            console.log("SEARCH", keyword)
            mixpanel.track('Keyword Search for Catalogs', {
              'source': "Browse Catalog page",
              'action': "keyword search",
              'keyword': keyword,
              'email': user.email,
            });
            if (router.query.keyword){
                setIsActive(true);
                const data = await getPublicDatasets(
                token,router.query.keyword
                );
                setKeywordFilteredDataSources(data);
                setIsActive(false);
                setShowResults(true)
                console.log("making results true keyword search")
                setSearchMode(0)
                console.log("fetched data",data);
                console.log("fetched data",keywordFilteredDataSources);
            }
        }
    },[router])

    const handleKeywordSearch = async (event) => {
        if(token!==null && keyword!==''){
            console.log("SEARCH", keyword)
            mixpanel.track('Keyword Search for Catalogs', {
              'source': "Browse Catalog page",
              'action': "keyword search",
              'keyword': keyword,
                'email': user.email,
            });
            setIsActive(true);
            const data = await getPublicDatasets(
            token,keyword
          );
            setKeywordFilteredDataSources(data);
            setIsActive(false);
            setShowResults(true)
            console.log("making results visible keyword manual search")
            setSearchMode(1)
            console.log("fetched data",data);
            console.log("fetched data",keywordFilteredDataSources);
        }
    };

    const handleTopicFilter = async (topic) => {
        setLocalFilterTopics([...localFilterTopics,topic])
        setFilterTopics(localFilterTopics)
        if(token!==null){
            mixpanel.track('Topic Filtered Keyword Search for Catalogs', {
                'source': "Browse Catalog page",
                'action': "keyword search",
                'keyword': keyword,
                'topic': topic,
                'email': user.email,
            });
            setIsActive(true);
            const catalog = await getPublicDatasetsTopicKeyword({token, keyword,topics:filterTopics});
            setTopicFilteredDataSources(catalog);
            setIsActive(false);
            console.log("filtered catalog data",catalog);
            setShowResults(true)
            console.log("making results visible topic search")
            setSearchMode(2)
            console.log("fetched data",catalog);
            console.log("fetched data",topicFilteredDataSources);
        }
    };

    const [dataSources, setDataSources] = useState([]);

    useEffect(async () => {
		if(token!==null){
            const data = await getPublicDatasets(
			token
		    );
			setDataSources(data);
      console.log("fetched data",data);
      }    
    }, [token, router, userdatasets, user]);

    useEffect(async () => {
        if(token !== 0 && token && token !== null && token !== undefined &&
            (userdatasets === [] || userdatasets === null || userdatasets !== undefined)){
            console.log('get datasets called from datasets page', token);
            const data = await getDatasets(
                token
            );
            setUserdatasets(data);
            setCatalogCount([...new Set(userdatasets.map(item => item.data_sources))])
            console.log("unique catalogs datasets",data);
        }
    }, [token,router,]);

    useEffect(async () => {
		if(router.query !== null && router.query.length >0 ){
            if (router.query.keyword){
                setKeywordRoute(router.query.keyword)
                setShowResults(true)
            }
            
            console.log("the router keyword making results true",router.query.keyword);
      }
    }, [keywordRoute, router.query]);

    useEffect(async ()=>{
        if(dataSources && dataSources !== null && dataSources !== undefined && dataSources.length > 0){
        setUniqueTopics([...new Set(dataSources.map(item => item.topic))])

        console.log("unique topicsssssss",uniqueTopics);
        }
    }, [dataSources])

    useEffect(async ()=>{
        if(userdatasets && userdatasets !== null && userdatasets !== undefined && userdatasets.length > 0){
            userdatasets.map(item => setDatasetTopics(prev=>[...new Set([...prev,item.topic.toString().split(",")[0]])]))
        
        console.log("unique dataset topicsssssss",datasetTopics);
        }
    }, [dataSources, userdatasets,token, router])

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today  = new Date();
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - 61);
    const post1 = new Date(2018, 0, 1, 10, 33);
    const post2 = new Date(2020, 1, 18, 9, 33);
    const post3 = new Date(2020, 12, 21, 11, 33);
    const [uniqueTopics, setUniqueTopics] = useState();
    const [topicNumbers, setTopicNumbers] = useState([]);
    const [showResults, setShowResults] = useState(false)
    const [datasetMode, setDatasetMode] = useState(0)
    const [searchMode, setSearchMode] = useState(0)
    const [datasetUniqueTopics, setDatasetUniqueTopics] = useState([])
    const [datasetUniqueTopicsTop, setDatasetUniqueTopicsTop] = useState([])

    const [users, setUsers] = useState(searchMode === 0 ? dataSources && dataSources.slice(0, 50):
                                     searchMode === 1 ? keywordFilteredDataSources && keywordFilteredDataSources.slice(0, 50):
                                     searchMode === 2 ? topicFilteredDataSources && topicFilteredDataSources.slice(0, 50):null);

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = users !== null && users && users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .sort((a,b)=>new Date(b.CreatedAt) - new Date(a.CreatedAt)).map((data,index)=> <FeatureCard
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
                        dataSources={dataSources}
                        removeDatasetcatalog={removeDatasetcatalog}
                        addDatasetcatalog={addDatasetcatalog}
                    />
      );

      useEffect(()=>{
        if(searchMode === 1){
            setUsers(dataSources && dataSources.slice(0, 50));
        }else if(searchMode === 0){
            setUsers(keywordFilteredDataSources && keywordFilteredDataSources.slice(0, 50));
        }else if(searchMode === 2){
            setUsers(topicFilteredDataSources && topicFilteredDataSources.slice(0, 50));
        }
    },[searchMode, dataSources, keywordFilteredDataSources, topicFilteredDataSources])

    const pageCount = users !== null && users && Math.ceil(users.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(async ()=>{
        topicNumbers.length === 0 && uniqueTopics && uniqueTopics.length > 0 && 
            uniqueTopics.map(async (topic)=>{
            const data = dataSources.filter(item=>item.topic === topic)
            setTopicNumbers(prev=>[...prev, {name:topic, Catalogs:data.length}])
            }
        )
        setItems([...topicNumbers])
        console.log("topic number count",topicNumbers);
    }, [dataSources,uniqueTopics,])

    useEffect(async ()=>{
         datasetTopics && datasetTopics.length > 0 && userdatasets && datasetTopics.map(async (topic)=>{
            const data = userdatasets.filter(item=>item.topic === topic)
            setDatasetUniqueTopics(prev=>[...prev, {name:topic, Catalogs:data.length}])
        }
        )
        console.log("dataset unique topics count",datasetUniqueTopics);
    }, [datasetTopics, uniqueTopics])

    const CustomizedLabel = ({ x, y, width, height, value, value2, value3, value4, fill }) => {
            return <text x={x + (width / 2) + 6+9 +4+2} y={y + (height / 2)} fill={fill} textAnchor="middle" dominantBaseline="central">{value}</text>;
        };

    return (
        <div style={{ display: 'flex',flexDirection:'column',backgroundColor: '#FAFAFB', fontStyle:'roboto',
                    height:'100%', minWidth:'100%', maxwidth:'100%',minHeight:'100%', maxHeight:'100%',}}>

            {showResults == false ? <div style={{ display: 'flex',flexDirection:'column',backgroundColor: '#FAFAFB', fontStyle:'roboto',
                    height:'100%', minWidth:'100%', maxwidth:'100%',minHeight:'100%', maxHeight:'100%',}}>

                     <div style={{ minWidth:'100%', maxwidth:'100%',display: 'flex', flexDirection:'column', paddingBottom:"2em",
                        paddingLeft:'1em', paddingRight:'1em',paddingTop:'6.5em',
                        justifyContent:'space-between',}}>

                        <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', maxWidth:'40%',
                            color:'gray-700',justifyContent:'space-between', alignItems:'end'}}>
                            <div style={{fontSize:28, paddingBottom:10}}>Hi! {Auth.user && Auth.user.attributes.name.split(" ")[0].substring(0,9)} &nbsp;&nbsp;</div>

                        </Box>

                        {showDraft && <div style={{ minWidth:"100%", minWidth:'100%',backgroundColor: 'gray-900', display:'flex', flexDirection:'row', flex:'start',
                            alignItems:'start',paddingTop:1}}>

                            <div style={{height:'22ch', minWidth:'69%', maxWidth:'69%', backgroundColor:'#E4F7FF',
                                marginRight:14, display:'flex', flexDirection:'row',marginBotoom:8,
                                justifyContent:"space-between",borderRadius:9,  }}>
                                <div style={{marginTop:18,marginLeft:18, display:'flex', flex:"start", flexDirection:'column',
                                    lineHeight:"22px", justifyContent:'space-between', width:'80%', overflow:'hidden',
                                }}
                                >

                                    <div>
                                        <div style={{color:'black', fontSize:20,}}>Announcement </div>
                                            <div style={{paddingTop:12,color:'gray'}}>The health data platform is in public beta, for a limited time period we are offering our professional version of the platform for free to the early adopters. 
                                            Please take our product for a test drive and let us know what you think.</div>
                                    </div>
                                    <div style={{paddingTop:12,color:'gray', paddingBottom:24}}>{today.toLocaleDateString("en-US", options)}</div>
                                </div>

                                
                                <div style={{marginTop:12, cursor:'pointer', width:'20%', display:'flex', justifyContent:"center",alignItems:'center'}}
                                     onClick={()=>{
                                        setOpenDetails(true)
                                        console.log("clicked on opendetails")
                                     }} >
                                    <div>
                                        <Tooltip2 title="Add" arrow>
                                        <CelebrationIcon sx={{fontSize:124, color: "#FFC542", opacity:0.4, pb:1,
                                        }}> Lulli</CelebrationIcon>
                                        </Tooltip2>
                                    
                                    </div>

                                </div>
                                
                            </div>

                            <div style={{height:'22ch', minWidth:'29.5%', maxWidth:'29.5%', backgroundColor:'#FFF4E4',
                                display:'flex', flexDirection:'column',marginBottom:8,
                                justifyContent:"space-around", flex:'end',borderRadius:9, }}>
                                <div style={{marginLeft:18, display:'flex', flex:"start", flexDirection:'column',height:'100%',
                                    lineHeight:"22px", justifyContent:'space-between', justifyItems:'space-between',paddingTop:18, paddingRight:12
                                }}>

                                    <div>
                                        <div style={{color:'black', fontSize:18,}}>We would love to hear your opinion </div>
                                        <div style={{paddingTop:12,color:'gray'}}>Please feel free to give your advice and notes on how we can do better to give you more. </div>
                                    </div>
                                    <div style={{paddingTop:18,color:'gray', paddingBottom:24, display:'flex',width:'100%',
                                                justifyContent:'space-between'}}>
                                        <Button
                                            variant="contained"
                                            sx={{backgroundColor:'#FF9800', borderRadius:2, color:"#fff",
                                                textTransform:'capitalize', maxHeight:42}}
                                            endIcon={<ArrowForwardIcon />}
                                            color="primary"
                                            onClick={()=>{
                                                mixpanel.track('Redirected to Survey Page', {
                                                    'source': "Dashboard Page",
                                                    'action': "Survey Button Clicked",
                                                    'email': user.email !== null && user.email !== undefined && user.email,
                                                });
                                                router.push('https://0w6e3b6atr1.typeform.com/to/JliJ1Qvo')
                                            }}
                                        >Take Survey</Button>
                                        <PollOutlinedIcon sx={{fontSize:42}}/>
                                    </div>
                                </div>
                            </div>

                        </div>}

                    </div>
                    

                    <div style={{ display: 'flex', flexDirection:'column', paddingLeft:'1em', paddingRight:'1em',
                        justifyContent:'space-between'}}>

                        <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', maxWidth:'40%',
                            color:'gray-700',justifyContent:'space-between', alignItems:'end'}}>
                            <div style={{fontSize:22, paddingBottom:12}}>My Work Space &nbsp;&nbsp;</div>

                        </Box>

                        {showDraft && <div style={{ width:"100%", backgroundColor: 'gray-900', display:'flex', flexDirection:'row', flex:'start',
                            alignItems:'start', paddingTop:1}}>

                            {/*<NewsUpdate title={"Big Data is essential to every significant healthcare undertaking."} 
                                description={"Read about the challenges, applications, and potential brilliant future for healthcare big data."} 
                                url ={"https://catalyst.nejm.org/doi/full/10.1056/CAT.18.0290"} 
                                date={"6th"} />
                            
                            <NewsUpdate title={"How these 4 tech trends are reshaping healthcare"} 
                                description={"It’s evident that, in the years ahead, this sector will continually and increasingly be defined by the development."} 
                                url ={"https://medcitynews.com/2020/02/from-data-to-ai-how-these-4-tech-trends-are-reshaping-healthcare/"} 
                                date={"6th"} />

                             <NewsUpdate title={"Five distinct trends are converging to determine"} 
                                description={"Five distinct trends are converging to determine how artificial intelligence (AI) and robotics will define New Health."} 
                                url ={"https://www.pwc.com/gx/en/industries/healthcare/publications/ai-robotics-new-health/five-trends.html"} 
                                date={"6th"} /> */}

                            <MyActivity title={"Five distinct trends are converging to determine"}
                                description={"Five distinct trends are converging to determine how artificial intelligence (AI) and robotics will define New Health."}
                                dataset={dataset} setUserdatasets={setUserdatasets} userdatasets={userdatasets} 
                                dataSources={dataSources} setDataSources={setDataSources}
                                categoryName={"Datasets"}
                                />

                            {/* <MyActivity title={"Five distinct trends are converging to determine"}
                                description={"Five distinct trends are converging to determine how artificial intelligence (AI) and robotics will define New Health."}
                                dataset={dataset} setUserdatasets={setUserdatasets} userdatasets={userdatasets} 
                                dataSources={dataSources} setDataSources={setDataSources} catalogCount={catalogCount}
                                categoryName={"Catalogs"}
                                /> */}
                            <div style={{height:'20ch', minWidth:'30%', maxWidth:'30%', backgroundColor:'#FFF',
                                display:'flex', flexDirection:'column',marginRight:16, 
                                justifyContent:"space-around", flex:'end',borderRadius:9,}}>
                                
                                 <div style={{cursor:'pointer', display:'flex', flexDirection:'column',height:'100%',
                                    lineHeight:"22px", justifyContent:'center',  alignItems:'center', paddingBottom:'3.5rem',

                                }}
                                    
                                >
                                    {datasetUniqueTopics && datasetUniqueTopics.length > 0 &&<div style={{
                                                    
                                                    fontStyle: 'normal',
                                                    fontWeight: '700',
                                                    fontSize: '30px',
                                                    lineHeight: '33px',
                                                    paddingBottom:'1rem',
                                                    
                                                    

                                                    /* identical to box height */
                                                    letterSpacing: '0.01em',

                                                    /* Primary/Primary_Purple */
                                                    color: '#474F5A',


                                                    /* Inside auto layout */
                                                    }}>
                                        {  "Top 3 Topics"}
                                        
                                    </div>}

                                <div style={{display:'flex', width:'100%', justifyContent:'space-between', paddingLeft:'1rem'}}>

                                        <div style={{display:'flex', flexDirection:'column', justifyContent:'center',
                                        alignItems:'center',  width:'100%'}}
                                    >
                                            <div style={{width: '100%',fontStyle: 'normal',fontWeight: '700',fontSize: '18px',
                                                    lineHeight: '33px',letterSpacing: '0.01em',color: '#474F5A',
                                                    }}>
                                            
                                        
                                            </div>

                                            
                                                <div style={{width:'80%',height: '33px',fontStyle: 'normal',fontWeight: '700',fontSize: '12px',
                                                    lineHeight: '33px',letterSpacing: '0.01em',display:'flex',flexDirection:'column',
                                                    order: '1',flexGrow: 0,}}
                                            >
                                                
                                                {datasetTopics && datasetTopics.length > 0 ?
                                                    datasetTopics.sort((a,b)=>b.Catalogs - a.Catalogs).map((topic, index) => 
                                                    index < 3 && <Tooltip2 title={<h2>{topic.split(",")[0]}</h2>} arrow><Button sx={{
                                                    borderRadius:4, border:1, fontSize:"1.1em", mr:1, textTransform:'capitalize',letterSpacing:'0.1em',
                                                    color:'#5A00E2',marginBottom:'0.5rem',color: '#5A00E2',
                                                    height: '28px',fontStyle: 'normal',fontWeight: '700',
                                                    lineHeight: '33px'
                                                    }}
                                                    size="small"
                                                    onClick={()=>router.push({
                                                    pathname: `/topic/${topic.split(",")[0]}`,
                                                    query:{
                                                        currentRouteTitle:router.pathname.includes('/browsecatalogue')?"Browsing Catalogs":
                                                            router.pathname.includes('/topic')?"Topics":
                                                            router.pathname.includes('/datasets')?"Browsing Your Datasets":
                                                            router.pathname.includes('/catalog')?"Browsing Catalog":
                                                            router.pathname.includes('/searchresult')?"Search Results":
                                                            router.pathname.includes('/dashboard')?"Dashboard":
                                                            router.pathname.includes('/dataset')?props.data.title:
                                                            router.query.tid
                                                    }
                                                })}>
                                                     { topic.split(",")[0].substring(0,29) + ".."}
                                                    </Button></Tooltip2>
                                            ) : <div style={{display:'flex', flexDirection:'column',
                                                    justifyContent:'center', alignItems:'center', paddingTop:'0.25em', paddingBottom:'2em'}}
                                                    onClick={()=>router.push('/searchresult')}>
                                                    <div style={{fontSize:22, fontWeight:'bold', color:'gray-700',}}>No Topics Found</div>
                                                    <div style={{fontSize:18, color:'gray-700', textAlign:'center'}}>Try creating a new Dataset to get Top Topics</div>
                                                </div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                   
                                </div>
                            </div>

                            <div style={{height:'20ch', minWidth:'43%', maxWidth:'43%', backgroundColor:'#FFF',
                                display:'flex', flexDirection:'column',marginBotoom:8,marginRight:14, 
                                justifyContent:"space-around", flex:'end',borderRadius:9,}}>
                                
                                <div style={{cursor:'pointer', display:'flex', flexDirection:'column',
                                    lineHeight:"22px", justifyContent:'center',   alignItems:'center', paddingBottom:'1.7rem',

                                }}
                                    
                                >
                                    <div style={{
                                                    
                                                    fontStyle: 'normal',
                                                    fontWeight: '700',
                                                    fontSize: '30px',
                                                    lineHeight: '33px',
                                                    paddingBottom:'1rem',
                                                    
                                                    

                                                    /* identical to box height */
                                                    letterSpacing: '0.01em',

                                                    /* Primary/Primary_Purple */
                                                    color: '#474F5A',


                                                    /* Inside auto layout */
                                                    }}>
                                        { "Recent Activity (Last 60 Days)"}
                                        
                                    </div>

                                <div style={{display:'flex', width:'90%', justifyContent:'space-between', paddingLeft:'3rem'}}>
                                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center',
                                        alignItems:'center',  }}
                                        onClick={()=>router.push({
                                            pathname: `/datasets/`,
                                            query:{
                                                currentRouteTitle:router.pathname.includes('/browsecatalogue')?"Browsing Catalogs":
                                                    router.pathname.includes('/topic')?"Topics":
                                                    router.pathname.includes('/datasets')?"Browsing Your Datasets":
                                                    router.pathname.includes('/catalog')?"Browsing Catalog":
                                                    router.pathname.includes('/searchresult')?"Search Results":
                                                    router.pathname.includes('/dashboard')?"Dashboard":
                                                    router.pathname.includes('/dataset')?props.data.title:
                                                    router.query.tid,
                                                    datasetRecentType:"created"
                                            }})}
                                    >
                                            <div style={{width: '100%',fontStyle: 'normal',fontWeight: '700',fontSize: '18px',
                                                    lineHeight: '33px',letterSpacing: '0.01em',color: '#474F5A',
                                                    }}>
                                            {"Datasets Created"}
                                        
                                            </div>
                                            <div style={{width: '100%',height: '33px',fontStyle: 'normal',fontWeight: '700',fontSize: '28px',
                                                    lineHeight: '33px',letterSpacing: '0.01em',color: '#5A00E2',
                                                    }}
                                            >{userdatasets && userdatasets !== null && userdatasets.length >0 ?
                                                userdatasets.filter((dataset,index)=>new Date(dataset.CreatedAt) > recentDate).length : 0}
                                            </div>
                                        </div>

                                        <div style={{display:'flex', flexDirection:'column', justifyContent:'center',
                                        alignItems:'center',  }}
                                        onClick={()=>router.push({
                                            pathname: `/datasets/`,
                                            query:{
                                                currentRouteTitle:router.pathname.includes('/browsecatalogue')?"Browsing Catalogs":
                                                    router.pathname.includes('/topic')?"Topics":
                                                    router.pathname.includes('/datasets')?"Browsing Your Datasets":
                                                    router.pathname.includes('/catalog')?"Browsing Catalog":
                                                    router.pathname.includes('/searchresult')?"Search Results":
                                                    router.pathname.includes('/dashboard')?"Dashboard":
                                                    router.pathname.includes('/dataset')?props.data.title:
                                                    router.query.tid,
                                                    datasetRecentType:"modified"
                                            }})}
                                    >
                                            <div style={{width: '100%',fontStyle: 'normal',fontWeight: '700',fontSize: '18px',
                                                    lineHeight: '33px',letterSpacing: '0.01em',color: '#474F5A',
                                                    }}>
                                            { "Datasets Modified"}
                                        
                                            </div>
                                            <div style={{width: '100%',height: '33px',fontStyle: 'normal',fontWeight: '700',fontSize: '28px',
                                                    lineHeight: '33px',letterSpacing: '0.01em',color: '#5A00E2',flex: 'none',
                                                    order: '1',flexGrow: 0,}}
                                            >{userdatasets && userdatasets !==null && userdatasets !==undefined && userdatasets.length>0 ?
                                                userdatasets.filter((dataset,index)=>new Date(dataset.UpdatedAt) > recentDate).length : 0}
                                            </div>
                                        </div>

                                        
                                </div>

                                    
                                </div>
                            </div>

                        </div>}

                    </div>

                    {showDraft && <div style={{ width:"100%", bgcolor: 'gray-900', display:'flex', flexDirection:'row', flex:'start',
                        alignItems:'start',marginLeft:2, }}></div>}

                        <div style={{ minWidth:'100%', maxWidth:'100%',paddingTop:'1.5em', 
                             display:'flex', flexDirection:'row',
                            justifyContent:"space-between",borderRadius:9,  }}>
                            <div style={{marginTop:18, cursor:'pointer', display:'flex', flexDirection:'row', backgroundColor:'#FAFAFB',
                                lineHeight:"22px", justifyContent:'space-between', width:'100%',
                            }}
                            >

                                {/* <LineChart width={700} height={450} data={data}margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                   <Line type="monotone" strokeWidth={3} dataKey="datasets" stroke="#46D989" label={"Hello"}/>
                                   <Line type="monotone" strokeWidth={3} dataKey="industry_points" stroke="#24BBFF" />
                                   <CartesianGrid stroke="#F1F1F5" strokeDasharray="1 1" horizontal={false} />
                                   <XAxis dataKey="name" axisLine={false} stroke="#92929D"/>
                                   <YAxis axisLine={false} stroke="#92929D"/>
                                   <Tooltip content={<CustomTooltip />}/>
                                 </LineChart> */}

                                 {/* <PieChart width={750} height={250}>
                                    <Pie data={data} dataKey="datasets" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                                    <Pie data={data} dataKey="industry_points" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                                    </PieChart> */}
                                
                                <div style={{display:'flex', flexDirection:'column', width:'74%', paddingBottom:'1em', paddingLeft:'2em',
                                            backgroundColor:'#fff', marginLeft:'1em', marginRight:'1em'}}>
                                        <div style={{color:'black', fontSize:28,paddingBottom:"1em",paddingTop:"0.75em",
                                            textAlign:'center'}}>
                                            Catalog Count By Topic</div>
                                        <div className="pie-row" style={{ styles }}>
                                            <ResponsiveContainer height={items.length * 42 + 69 +42 } width="100%">
                                            <BarChart
                                                data={items}
                                                layout="vertical" barCategoryGap={1}
                                                margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
                                                >
                                                <CartesianGrid strokeDasharray="9 9" />
                                                <XAxis type="number" />
                                                <YAxis type="category" width={220} padding={{ left: 20 }} dataKey="name" />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="Catalogs" fill="#8884d8" label={<CustomizedLabel />}
                                                />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                </div>
                                
                                <div style={{display:'flex', flexDirection:'column', width:'25%',paddingRight:'1em'}}>
                                    <div style={{color:'black', fontSize:28,paddingBottom:"1em",paddingTop:'0.75rem',
                                        textAlign:'center'}}>
                                        Top Topics</div>
                                    {items && items !== null && items.length > 0 && items.sort((a,b)=>b.Catalogs - a.Catalogs).map((topic, index) => 
                                        index < 7 && <TopicCard dataset={dataset} setUserdatasets={setUserdatasets} userdatasets={userdatasets} 
                                            dataSources={dataSources} setDataSources={setDataSources}
                                            topicName={topic.name} topicCount={topic.Catalogs}/>)}
                                
                                </div>

                                {/* <ResponsiveContainer width="100%" height="100%">
                                    <PieChart width={400} height={400}>
                                    <Pie
                                        dataKey="datasets"
                                        isAnimationActive={false}
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        label
                                    />
                                    <Pie dataKey="industry_points" data={data} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
                                    <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer> */}

                                {/* <BarChart width={1100} height={450} data={data} margin={{  bottom: 5}} >
                                    <XAxis dataKey="name" axisLine={false} stroke="#92929D" />
                                    <YAxis axisLine={false} stroke="#92929D"/>
                                    <Tooltip />
                                    <CartesianGrid stroke="#F1F1F5" strokeDasharray="1 1" horizontal={false} />
                                    <Bar dataKey="datasets" fill="#8884d8" barSize={50} />
                                </BarChart> */}
                                </div>

                        </div>
                    

                        <Modal
                            //{...props}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                Modal heading
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h4>Centered Modal</h4>
                                <p>
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                                consectetur ac, vestibulum at eros.
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={handleCloseDetails}>Close</Button>
                            </Modal.Footer>
                            </Modal>

                </div>

                : <Box sx={{minHeight:'100%', minWidth:'100%', overflowX:"hidden", paddingLeft:'0.75em',paddingRight:'0.75em',
                overflowY:'auto', maxHeight:'60vh', paddingTop:'0.15em'}}>

                <div style={{ display: 'flex', flexDirection:'row', justifyContent:'space-between', paddingTop:96, paddingBottom:24,
                    paddingLeft:16, paddingRight:16}}>

                    <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18, 
                        color:'gray-700', alignItems:'center'}}>
                        {datasetMode ===1 ?<Button  size="medium" sx={{display:'flex', alignItems:'center',paddingRight:2,
                                justifyContent:'center'}} startIcon={<ArrowBackIcon />} onClick={()=>setShowResults(false)}>
                                {"Back"}</Button>:
                            datasetMode ===0 ?<Button  size="medium" sx={{display:'flex', alignItems:'center',paddingRight:2,
                                justifyContent:'center'}} startIcon={<ArrowBackIcon />} onClick={()=>setShowResults(false)}>
                                {"Back"}</Button>:null}
                        <Divider variant="middle" orientation="vertical" />
                        <div style={{paddingLeft:8,paddingRight:2,}}>Go Back to {datasetMode ===0 ?" Dashboard": router.query.keyword}</div>
                        <Button variant="outlined" size="medium" sx={{borderRadius:3, marginLeft:2, paddingLeft:2,paddingRight:2, color:'#939EAA', borderColor:'#939EAA' }}
                                startIcon={<CachedIcon />} onClick={()=>router.reload()}>
                            {"Refresh"}</Button>
                    </Box>
                    {/* <Box sx={{display:"flex", alignItems:'center', justifyContent:'space-between', width:'24%', }}>
                        {datasetMode==0?<div><DeleteOutlineIcon fontSize="large" sx={{cursor:'pointer',}}
                                                                onClick={() => deleteF(userdataset)}/></div>:null}
                        <Button variant="outlined" size="medium" sx={{borderRadius:3, color:'#939EAA', borderColor:'#939EAA'}}
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
                        {datasetMode === 0 ?<Button variant="outlined" size="medium" sx={{borderRadius:3, color:'#939EAA', borderColor:'#939EAA'}}
                                                    startIcon={<EditIcon />} onClick={() => setDatasetMode(1)}>
                            {"Edit"}</Button>: datasetMode === 1 ?
                            <Button variant="outlined" size="medium" sx={{borderRadius:3, color:'#939EAA', borderColor:'#939EAA'}}
                                    startIcon={<CheckIcon />} onClick={() => {updateF(userdataset)}}>
                                {"Update"}</Button>:null}
                    </Box> */}

                </div>

                {/* {searchMode === 0 ? keywordFilteredDataSources !== null && keywordFilteredDataSources !== undefined &&
                    keywordFilteredDataSources.sort((a,b)=>new Date(b.CreatedAt) - new Date(a.CreatedAt)).map((data,index)=> index < 9 &&<FeatureCard
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
                    />)
                    :
                    searchMode === 1 ? keywordFilteredDataSources !== null && keywordFilteredDataSources !== undefined &&
                    keywordFilteredDataSources.map((data,index)=> <FeatureCard
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
                />):
                    searchMode === 2 ? topicFilteredDataSources !== null && topicFilteredDataSources !== undefined &&
                        topicFilteredDataSources.map((data,index)=> <FeatureCard
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
                    />):null} */}

                    {displayUsers}
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
                </Box>}
        </div>
    );
}
