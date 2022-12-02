import '../styles/globals.css'
import Amplify, {Hub, Auth} from "aws-amplify";
import awsExports from "../components/aws-export";
import {useEffect, useState} from "react";
import {nonAuthRoutes, adminUsers, adminRoute} from "../function/constants";
import {useRouter} from "next/router";
import {checkAuth} from "../function/checkAuth";
import { getDatasets, getPublicDatasets, getUser, getDataSourceList } from '../function/users';
import NextNProgress from 'nextjs-progressbar';
import Layout from "../components/Layout";
import "@fontsource/roboto";
import TopNav from '../components/TopNav';

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  const router = useRouter();
    // Auth Token: 0-> Loading, null-> Not Auth, "string"-> Auth
    const [token, setToken] = useState(0);
    const [location, setLocation] = useState("");
    const [role, setRole] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("")
    const [password, setPassword] = useState("");
    const [user, setuser] = useState({});
    const showNav = router.pathname === '/login' ? false : router.pathname === '/signup'? false: 
        router.asPath === '/'?false:router.asPath === '/forgetpassword'?false:router.asPath === '/'?false:true;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
    useEffect(async () => {
        if(token !== 0 && token && token !== null && token !== undefined && 
            nonAuthRoutes.includes(router.pathname) &&
            (user === {} || user === null || user === undefined)){
            console.log('get users called from app', token);
            const userP = await getUser(token);
            if(userP === null || userP === undefined ){
                setuser({})
            } else{
                setuser(userP)
            }
            console.log('userP', userP);
        }
    }, [token, router]);

    useEffect(() => {
      Hub.listen('auth', (data) => {
          const event = data.payload.event;
          console.log('event:', event);
          if (event === "signOut") {
              setToken(null)
          } else if (event === "signIn") {
              checkAuth({token, setToken, setRole, setLocation}).then(r => {
                  console.log("Event Login", token)
              })
          }
      })
    }, [token,router])

//   useEffect(()=>{
//     console.log("app token",token)
//   })

  useEffect(() => {checkAuth({token, setToken, role, setRole, setLocation}).then(r => {console.log("Set first time token")})}, [])

  useEffect(() => {
      if (token !== 0 && !token && !nonAuthRoutes.includes(router.pathname)){
          router.push("/login").then(r => {console.log("Redirected to Login")})
        
      } else if (token && nonAuthRoutes.includes(router.pathname)){
          router.push("/browsecatalogue").then(r => {console.log("Redirected to Browse Catalogogs")})
      }
  }, [token]);

//   useEffect(() => {
//       if ("serviceWorker" in navigator) {
//           navigator.serviceWorker
//               .register("/service-worker.js")
//               .then(serviceWorker => {
//                   console.log("Service Worker registered: ", serviceWorker);
//               })
//               .catch(error => {
//                   console.error("Error registering the Service Worker: ", error);
//               });
//       }
//   }, [])

  const [dataset, setDataset] = useState({
        user_email:'',
        title:'',
        description:'',
        topic:'',
        row_count:0,
        data_points:0,
        data_sources:0,  
        status:'',
        template:false,
        catalog:[]
  });

  const [dataSourceData, setDataSourceData] = useState({
    "requestParameter": {
      "value": 1
    }
  })

    useEffect( () => {
            setDataset({...dataset,title,description});
            console.log("added details",dataset);
          }, [title, description,token,router]);

    const [dataSources, setDataSources] = useState([]);

    const [data, setData] = useState({
        "requestParameter": {
          "value": parseInt(user.ID)
        }
      })

    useEffect(()=>{
        setData({
            "requestParameter": {
              "value": parseInt(user.ID)
            }
          })
    
      },[router])

    useEffect(async () => {
        if(token !== 0 && token && token !== null && token !== undefined){
                console.log('calling api with this data', token);
            const dataSources = await getDataSourceList(token, data);
            if(dataSources === null){
                setDataSources({});
            }else{
                setDataSources(dataSources.responseData)
            }
            console.log('new api datasources', dataSources);
        }
    }, [token, router, ]);

  return (
      <Layout user={user} setuser={setuser}  Auth={Auth} token={token} setToken={setToken} 
             dataSources={dataSources} setDataSources={setDataSources}>
        <NextNProgress />
        
        <Component role={role} setLocation={setLocation} token={token} location={location} 
            setToken={setToken} dataset={dataset} setDataset={setDataset} 
            user={user} setuser={setuser}
             dataSources={dataSources} setDataSources={setDataSources}
            title={title} description={description} setTitle={setTitle} setDescription={setDescription}
            {...pageProps} name={name} setName={setName} email={email} setEmail={setEmail} company={company} setCompany={setCompany}
            />
      </Layout>
  )
}

export default MyApp
