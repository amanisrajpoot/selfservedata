import * as React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LeftNav from './LeftNav';
import Header from './Header';
import TopNav from './TopNav';
import {useRouter} from "next/router";
import styles from '../styles/NavBar.module.css';

export default function Layout({ children, user, Auth, userdatasets }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();
  const showNav = router.pathname === '/login' ? false : router.pathname === '/signup'? false: 
        router.asPath === '/'?false:router.asPath === '/forgetpassword'?false:router.asPath === '/'?false:
        router.pathname.includes("/resetpassword")?false:true;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
      <div className={styles.SuperbodyPart}>
          {showNav && <TopNav user={user} Auth={Auth} />}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
          }}>
            {showNav && <LeftNav user ={user} userdatasets={userdatasets}/>}
            <div className={styles.bodyPartScroll}>
              {children}
              </div>
          </div>
          
      </div>
           
  )
}