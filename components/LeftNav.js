import styles from '../styles/LeftNav.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Modal } from '@material-ui/core';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import SourceIcon from '@mui/icons-material/Source';
import SettingsIcon from '@mui/icons-material/Settings';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import Divider from '@mui/material/Divider';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Link from 'next/link'
import {getPublicDatasets, getDatasets, getUser} from '../function/users';


export default function LeftNav({
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
}) {
	const router = useRouter();
	const [addSampleModalVisible, setAddSampleModalVisible] = useState(false);
	const [addPatientsModalVisible, setAddPatientsModalVisible] = useState(false);
	const [locationModalVisible, setLocationModalVisible] = useState(false);
	const [width, setWidth] = useState(null);
	const [favourite, setFavourite] = useState(true)
	const [recently, setRecently] = useState(true)
	const [dashboardColor, setDashboardColor] = useState('#474F5A')
	const [datasetsColor, setDatasetColor] = useState('#474F5A')
	const [catalogColor, setCatalogColor] = useState('#474F5A')

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

	return (
		<div className={`${styles.header} ${leftAnimation}`} style={{ fontFamily:'Roboto', fontStyle:'normal', 
			minHeight:'100vh', fontWeight:700,border: "1px solid #dedede", minWidth:'17%',maxWidth:'17%',
			}}>
			{/* ADD SAMPLES */}
			<Modal
				open={addSampleModalVisible}
				onClose={() => {
					setAddSampleModalVisible(false);
				}}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/*<AddSamples*/}
				{/*	role={role}*/}
				{/*	location={location}*/}
				{/*	onClose={() => setAddSampleModalVisible(false)}*/}
				{/*	token={token}*/}
				{/*/>*/}
			</Modal>

			{/* DISPENSE */}
			<Modal
				open={addPatientsModalVisible}
				onClose={() => {
					setAddPatientsModalVisible(false);
				}}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/*<AddPatients*/}
				{/*	role={role}*/}
				{/*	location={location}*/}
				{/*	onClose={() => setAddPatientsModalVisible(false)}*/}
				{/*	token={token}*/}
				{/*/>*/}
			</Modal>

			{/* LOCATION */}
			<Modal
				open={locationModalVisible}
				onClose={() => {
					setLocationModalVisible(false);
				}}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/*<LocationModal*/}
				{/*	role={role}*/}
				{/*	location={location}*/}
				{/*	setLocation={setLocation}*/}
				{/*	onClose={() => setLocationModalVisible(false)}*/}
				{/*	token={token}*/}
				{/*/>*/}
			</Modal>

			<div className={styles.navbar}>
				<div style={{width:'100%',}}>
					 	<div style={{ width:'100%', }} onClick={()=>router.push("/dashboard")}>
							 <img src='/logo02.png' layout="responsive" width='100%' style={{cursor:'pointer'}}
								></img>
						{/*<div style={{width:'100%',textAlign:'center', fontSize:32, 
						paddingTop:30,paddingBottom:30, cursor:"pointer",
						fontFamily:'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;',
						backgroundImage: 'url(/logo01.png)',}}
						>Health Data Platform</div> */}
						</div>
					<Divider />
				</div>


				<div
					onClick={() => {
						router.push('/dashboard');
						// if (width !== null && width <= 800) {
						// 	setmenu(false);
						// 	setLeftAnimation(styles.menuTopClose);
						// }
					}}
					className={styles.items}
					style={{
						color: router.pathname.includes('/dashboard')
							? '#5A00E2'
							: '#474F5A',
					}}
				>
						{/* <DashboardIcon fontSize="medium" sx={{fontSize:28,}}/> */}
						<svg width="24" height="25" viewBox="0 0 24 25" 
							fill={router.pathname.includes('/dashboard')
								? '#5A00E2'
								: 'background: #474F5A'} 
							xmlns="http://www.w3.org/2000/svg">
							<path opacity="0.4" d="M20.0402 7.48962L14.2802 3.45962C12.7102 2.35962 10.3002 2.41962 8.79023 3.58962L3.78023 7.49962C2.78023 8.27962 1.99023 9.87962 1.99023 11.1396V18.0396C1.99023 20.5896 4.06023 22.6696 6.61023 22.6696H17.3902C19.9402 22.6696 22.0102 20.5996 22.0102 18.0496V11.2696C22.0102 9.91962 21.1402 8.25962 20.0402 7.48962Z" 
								fill={router.pathname.includes('/dashboard')
									? '#5A00E2'
									: 'background: #474F5A'}/>
							<path d="M12 19.418C11.59 19.418 11.25 19.078 11.25 18.668V15.668C11.25 15.258 11.59 14.918 12 14.918C12.41 14.918 12.75 15.258 12.75 15.668V18.668C12.75 19.078 12.41 19.418 12 19.418Z" fill="#474F5A"/>
							</svg>

					<p
						style={{fontSize:20, font:'Roboto', fontWeight:router.pathname.includes('/dashboard') ?900:500,
							color: router.pathname.includes('/dashboard') ? '#5A00E2' : '',
						}}
					>
						Dashboard
					</p>
				</div>


				<div
					onClick={() => {
						router.push('/datasets');
						// if (width !== null && width <= 800) {
						// 	setmenu(false);
						// 	setLeftAnimation(styles.menuTopClose);
						// }
					}}
					className={styles.items}
					style={{
						color: router.pathname.includes('/datasets')
						? '#5A00E2'
						: '#474F5A',
					}}
				>
						{/* <TableViewOutlinedIcon fontSize="medium" sx={{fontSize:28,}}/> */}
						<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M21.75 12.666C21.75 13.6325 20.9665 14.416 20 14.416C19.0335 14.416 18.25 13.6325 18.25 12.666C18.25 11.6995 19.0335 10.916 20 10.916C20.9665 10.916 21.75 11.6995 21.75 12.666Z" 
							fill={router.pathname.includes('/datasets')?"#5A00E2":'#474F5A'} stroke="#5A00E2"/>
							<path d="M21.75 4.66602C21.75 5.63251 20.9665 6.41602 20 6.41602C19.0335 6.41602 18.25 5.63251 18.25 4.66602C18.25 3.69952 19.0335 2.91602 20 2.91602C20.9665 2.91602 21.75 3.69952 21.75 4.66602Z" 
							fill={router.pathname.includes('/datasets')?"#5A00E2":'#474F5A'} stroke="#5A00E2"/>
							<path d="M20 22.916C21.2426 22.916 22.25 21.9087 22.25 20.666C22.25 19.4234 21.2426 18.416 20 18.416C18.7574 18.416 17.75 19.4234 17.75 20.666C17.75 21.9087 18.7574 22.916 20 22.916Z" 
							fill={router.pathname.includes('/datasets')?"#5A00E2":'#474F5A'}/>
							<path d="M4 14.916C5.24264 14.916 6.25 13.9087 6.25 12.666C6.25 11.4234 5.24264 10.416 4 10.416C2.75736 10.416 1.75 11.4234 1.75 12.666C1.75 13.9087 2.75736 14.916 4 14.916Z" 
							fill={router.pathname.includes('/datasets')?"#5A00E2":'#474F5A'}/>
							<path opacity="0.4" d="M19 13.416C19.41 13.416 19.75 13.076 19.75 12.666C19.75 12.256 19.41 11.916 19 11.916H11.75V7.66602C11.75 6.08602 12.42 5.41602 14 5.41602H19C19.41 5.41602 19.75 5.07602 19.75 4.66602C19.75 4.25602 19.41 3.91602 19 3.91602H14C11.58 3.91602 10.25 5.24602 10.25 7.66602V11.916H5C4.59 11.916 4.25 12.256 4.25 12.666C4.25 13.076 4.59 13.416 5 13.416H10.25V17.666C10.25 20.086 11.58 21.416 14 21.416H19C19.41 21.416 19.75 21.076 19.75 20.666C19.75 20.256 19.41 19.916 19 19.916H14C12.42 19.916 11.75 19.246 11.75 17.666V13.416H19Z" 
							fill={router.pathname.includes('/datasets')?"#5A00E2":'#474F5A'}/>
						</svg>





					<p
						style={{fontSize:20, font:'roboto', fontWeight:router.pathname.includes('/datasets/')?900:500,
							color: router.pathname.includes('/datasets')? '#5A00E2' : '',
						}}
					>
						My Datasets
					</p>
				</div>

				<div
					onClick={() => {
						router.push('/browsecatalogue');
						// if (width !== null && width <= 800) {
						// 	setmenu(false);
						// 	setLeftAnimation(styles.menuTopClose);
						// }
					}}
					className={styles.items}
					style={{
						color: router.pathname.includes('/browsecatalogue')
						? '#5A00E2'
						: '#474F5A',
					}}
				>
						{/* <SourceIcon fontSize="medium" sx={{fontSize:28,}}/> */}
						<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M19.3702 5.55906L13.5102 2.94906C12.6502 2.56906 11.3502 2.56906 10.4902 2.94906L4.63018 5.55906C3.15018 6.21906 2.93018 7.11906 2.93018 7.59906C2.93018 8.07906 3.15018 8.97906 4.63018 9.63906L10.4902 12.2491C10.9202 12.4391 11.4602 12.5391 12.0002 12.5391C12.5402 12.5391 13.0802 12.4391 13.5102 12.2491L19.3702 9.63906C20.8502 8.97906 21.0702 8.07906 21.0702 7.59906C21.0702 7.11906 20.8602 6.21906 19.3702 5.55906Z" fill={router.pathname.includes('/browsecatalogue')? '#5A00E2':'#474F5A'}/>
							<path opacity="0.4" d="M11.9998 17.708C11.6198 17.708 11.2398 17.628 10.8898 17.478L4.14982 14.478C3.11982 14.018 2.31982 12.788 2.31982 11.658C2.31982 11.248 2.64982 10.918 3.05982 10.918C3.46982 10.918 3.79982 11.248 3.79982 11.658C3.79982 12.198 4.24982 12.898 4.74982 13.118L11.4898 16.118C11.8098 16.258 12.1798 16.258 12.4998 16.118L19.2398 13.118C19.7398 12.898 20.1898 12.208 20.1898 11.658C20.1898 11.248 20.5198 10.918 20.9298 10.918C21.3398 10.918 21.6698 11.248 21.6698 11.658C21.6698 12.778 20.8698 14.018 19.8398 14.478L13.0998 17.478C12.7598 17.628 12.3798 17.708 11.9998 17.708Z" fill={router.pathname.includes('/browsecatalogue')? '#5A00E2':'#474F5A'}/>
							<path opacity="0.4" d="M11.9998 22.6689C11.6198 22.6689 11.2398 22.5889 10.8898 22.4389L4.14982 19.4389C3.03982 18.9489 2.31982 17.8389 2.31982 16.6189C2.31982 16.2089 2.64982 15.8789 3.05982 15.8789C3.46982 15.8789 3.79982 16.2089 3.79982 16.6189C3.79982 17.2489 4.16982 17.8189 4.74982 18.0789L11.4898 21.0789C11.8098 21.2189 12.1798 21.2189 12.4998 21.0789L19.2398 18.0789C19.8098 17.8289 20.1898 17.2489 20.1898 16.6189C20.1898 16.2089 20.5198 15.8789 20.9298 15.8789C21.3398 15.8789 21.6698 16.2089 21.6698 16.6189C21.6698 17.8389 20.9498 18.9389 19.8398 19.4389L13.0998 22.4389C12.7598 22.5889 12.3798 22.6689 11.9998 22.6689Z" fill={router.pathname.includes('/browsecatalogue')? '#5A00E2':'#474F5A'}/>
							</svg>



					<p
						style={{fontSize:20, font:'roboto', fontWeight:router.pathname.includes('/topic') ?900:500,
							color: router.pathname.includes('/browsecatalogue') ? '#5A00E2' : '',
						}}
					>
						Catalogs
					</p>
				</div>

				{/* <div style={{paddingTop:18, paddingBottom:24}}>
					<Divider />
				</div>

				<div style={{display:'flex', justifyContent:'space-between', paddingBottom:12}}>
					<div style={{textTransform: "capitalize", color:'#939EAA', fontSize:14}}>FAVOURITE</div>
					<div onClick={()=>setFavourite(!favourite)}>
						{favourite?<ExpandLessIcon />:<ExpandMoreIcon/>}
					</div>

				</div>

				{favourite && <>{userdatasets !== null && userdatasets !== undefined && userdatasets.length > 0 ?
                        userdatasets.sort((a,b)=>new Date(a.CreatedAt) - new Date(b.CreatedAt)).map((data, index)=> index <3 &&
						<div style={{display:'flex', justifyContent:'space-between', paddingBottom:12,cursor:"pointer",
				textAlign:'left'}} onClick={() => {router.push(`/dataset/${data.ID}`)}}>
					<div style={{width:"20%"}}><FiberManualRecordIcon color="error" fontSize="small" sx={{color:"#5A00E2"}} /></div>
					<div style={{width:"70%"}}>{data.title.substring(0,16)}</div>
					<div style={{width:"14%", color:'#C5CDD4'}}>{data.data_sources}</div>
				</div>):null} </>} */}

				{/*<div style={{paddingTop:18, paddingBottom:24}}>
					<Divider />
				</div>

				<div style={{display:'flex', justifyContent:'space-between',  paddingBottom:12}}>
					<div style={{textTransform: "capitalize", color:'#939EAA', fontSize:14}}>RECENT DATASETS</div>
					{userdatasets !== null && userdatasets !== undefined && userdatasets.length > 1 && <div onClick={()=>setRecently(!recently)}>
						{recently?<ExpandLessIcon />:<ExpandMoreIcon/>}
					</div>}

				</div>

				 {recently && <><div style={{display:'flex', flex:'start', paddingBottom:9, color:"#5A00E2", alignItems:'center',
				cursor:'pointer', justifyContent:'center'}} onClick={()=>router.push("/searchresult")}>
					<div style={{width:'20%'}}>
						{/* <AddCircleOutlineOutlinedIcon color="disabled" style={{fontSize:28,color:"gray",marginRight:24}} /> 
							<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M12 24.668C18.6274 24.668 24 19.2954 24 12.668C24 6.04055 18.6274 0.667969 12 0.667969C5.37258 0.667969 0 6.04055 0 12.668C0 19.2954 5.37258 24.668 12 24.668Z" fill="white"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22.668C17.5228 22.668 22 18.1908 22 12.668C22 7.14512 17.5228 2.66797 12 2.66797C6.47715 2.66797 2 7.14512 2 12.668C2 18.1908 6.47715 22.668 12 22.668Z" fill="#939EAA"/>
								<path d="M12.9743 13.668V17.668C12.9743 19.0013 10.9743 19.0013 10.9743 17.668V13.668H7.05127C5.71794 13.668 5.71794 11.668 7.05127 11.668H10.9743V7.66797C10.9743 6.33464 12.9743 6.33464 12.9743 7.66797V11.668H16.8974C18.2308 11.668 18.2308 13.668 16.8974 13.668H12.9743Z" fill="white"/>
								</svg>

						</div>
					<div style={{width:'80%'}}>Start New Dataset</div>
				</div>

					{userdatasets !== null && userdatasets !== undefined && userdatasets.length > 0 ?
                        userdatasets.sort((a,b)=>new Date(b.CreatedAt) - new Date(a.CreatedAt)).map((data, index)=> index <3 && 
						<div style={{display:'flex', justifyContent:'space-between',paddingBottom:12,alignItems:'center', cursor:"pointer" }}
							onClick={() => {router.push(`/dataset/${data.ID}`)}}>
							<div style={{width:"21%"}}>
								<div style={{backgroundColor:"#5A00E2", borderRadius:'50%', height:32, width:32, color:'white',
									textAlign:'center',paddingTop:6}}>
									{data.title.charAt(0).toUpperCase()}
								</div></div>
							<div style={{width:"75%"}}>{data.title.substring(0,19)}</div>
							<div style={{width:"10%"}}><FiberManualRecordIcon color="success" fontSize="small" sx={{color:'#9147ff'}}/></div>
						</div>):null}
				</>}
			
				<div
					className={`${styles.items} ${styles.loc}`}
					onClick={() => setLocationModalVisible(true)}
				>
					<Image src='/location.svg' width={20} height={20} />
					<p>Location</p>
				</div>*/}

			</div> 

			{/*<section className={styles.accountSection}>*/}
			{/*	<div*/}
			{/*		onClick={() => {*/}
			{/*			redirect('/profile');*/}
			{/*			if (width !== null && width <= 800) {*/}
			{/*				setmenu(false);*/}
			{/*				setLeftAnimation(styles.menuTopClose);*/}
			{/*			}*/}
			{/*		}}*/}
			{/*		className={styles.itemsAcc}*/}
			{/*		style={{*/}
			{/*			backgroundColor: router.pathname.includes('/profile')*/}
			{/*				? '#ecfefc'*/}
			{/*				: '',*/}
			{/*		}}*/}
			{/*	>*/}
			{/*		<p style={{ marginRight: '1rem', zIndex: '2' }}>*/}
			{/*			<Image src='/account.svg' width={40} height={40} />*/}
			{/*		</p>*/}
			{/*		<p className={styles.itemlabel}>*/}
			{/*			{doctor && doctor.name ? doctor.name : 'Account'}*/}
			{/*		</p>*/}
			{/*	</div>*/}
			{/*	<div*/}
			{/*		onClick={signOut}*/}
			{/*		className={styles.itemsLogout}*/}
			{/*		style={{ marginTop: '0.5em' }}*/}
			{/*	>*/}
			{/*		<p style={{ marginRight: '1rem', zIndex: '2' }}>*/}
			{/*			<Image src='/logout_red.svg' width={40} height={40} />*/}
			{/*		</p>*/}
			{/*		<p className={styles.itemlabel}>Log out</p>*/}
			{/*	</div>*/}
			{/*</section>*/}
		</div>
	);
}
