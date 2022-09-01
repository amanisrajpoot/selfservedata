import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Modal } from '@material-ui/core';
import SettingsIcon from '@mui/icons-material/Settings';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import Link from 'next/link'
import {getPublicDatasets, getDatasets, getUser} from '../function/users';
import Box	from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Auth from 'aws-amplify';
import * as React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { signOut } from '../function/checkAuth';
import Avatar from '@mui/material/Avatar';


export default function TopNav({
	setmenu,
	leftAnimation,
	setLeftAnimation,
	role,
	setLocation,
	userdatasets,
	setUserdatasets,
	location,
	menu,
	token,
	user,
	Auth
}) {
	const router = useRouter();
	const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
	const openUser = Boolean(anchorElUser);
	const [keyword, setKeyword] = useState('');


	const handleClickUser = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUser = () => {
        setAnchorElUser(null);
    };

	async function redirect(route) {
		setmenu(false);
		await router.push(route);
	}
	const [doctor, setDoctor] = useState(null);
	useEffect(async () => {
		if(token !== 0 && token && token !== null && token !== undefined && 
            (userdatasets === [] || userdatasets === null)){
			console.log('get datasets called from leftnav', token);
        	const data = await getDatasets(
            token
       		 );
        setUserdatasets(data);
    	console.log("fetched datasets",data);
		}
    }, [token]);

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
    }, []);



	return (
		<div style={{ display:'flex',minWidth:'100%', maxWidth:'100%', position:'fixed', height:'7vh',
					justifyContent:'flex-end'  }}>
				<div style={{ display:'flex',minWidth:'83%', maxWidth:'83%', position:'fixed',backgroundColor:'black',
					 }}>
                        <div style={{ display:'flex', flexDirection:'row', backgroundColor:'white', alignItems:'center',
							 minWidth:'85.5%', maxWidth:'85.5%',
						
						 }} >
                            {router.pathname.includes("/dashboard") && <div style={{color:'gray', paddingRight:'1em', paddingLeft:'1em'}}>
                                <SearchIcon />
                            </div>}

                            {router.pathname.includes("/dashboard") && <InputBase
                                // onChange={setVal}
                                sx={{ bgcolor:'white',width:'90%'}}
                                placeholder="Search Google Maps"
								onChange={(e) => setKeyword(e.target.value)}
								onKeyDown={(e)=>{
									if (e.key === "Enter") {
									console.log(e.target.value);
									router.push({
                                        pathname: `/dashboard/`,
                                        query:{
											keyword
										}
										})
									}
								}
							}								
                                inputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    placeholder:"Search for Datasets, Catalogs, and more"
                                }}
                            />}
                        </div>

						<div style={{ display:'flex', flexDirection:'row', alignItems:'center',
							minWidth:'19%', maxWidth:'19%', justifyContent:'space-between', 
							backgroundColor:'white', alignItems:'center', }} >
							<div style={{display:"flex",flexDirection:'row', backgroundColor:"#fff",
								alignItems: 'center', height:"4.7em",  }}>
								{/* <Link href='/login'>
									{/* <NotificationsIcon
										fontSize="large"
										sx={{color:'#939EAA', cursor:'pointer'}}
									/> 
								</Link> */}
								&nbsp;&nbsp;&nbsp;
								<Link href={"/settings"}>
									{/* <AccountCircleIcon onClick={()=>router.push("/settings")} 
										fontSize="large" sx={{color:'#939EAA'}}/> */}
									<Avatar alt={Auth.user?Auth.user.attributes.name.split(" ")[0].toUpperCase():'U'} sx={{height:35, width:35,cursor:'pointer' }} onClick={()=>router.push("/settings")}
										src='url(/user_logo.jpg)' />
								</Link>
								&nbsp;&nbsp;&nbsp;
								<p style={{fontSize:16, cursor:'pointer', paddingLeft:4,overflow:'auto' }} onClick={()=>router.push("/settings")}>
									{user && user.name?user.name.substring(0,9):Auth.user?Auth.user.attributes.name.split(" ")[0].substring(0,9): 'Account'} </p>
								&nbsp;
								<div
									// onClick={()=>signOut({path:router.pathname})}
									style={{cursor:'pointer'}}
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
									<MenuItem onClick={()=>{
										router.push('/settings')
										handleCloseUser()
										}}><SettingsIcon/>&nbsp; Settings</MenuItem>
									<MenuItem onClick={()=>{
										router.push('/support')
										handleCloseUser()
										}}><LiveHelpIcon/>&nbsp; Support</MenuItem>
									<MenuItem onClick={()=>{
										// mixpanel.track('Sign Out', {
										// 	'source': "Dashboard Page",
										// 	'action': "Signed Out from User Menu",
										// 	'email': user.email !== null && user.email !== undefined && user.email,
										// });
										signOut({path:router.pathname})
										handleCloseUser()
									}}><ExitToAppIcon/>&nbsp; Sign Out</MenuItem>
								</Menu>
							</div>
						</div>
						</div>
				</div>		
		

	)
}
