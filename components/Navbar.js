import * as React from 'react';
import Header from './Header';

export default function Navbar({token, setToken, setUser, user}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
          <Header token={token} setToken={setToken} onDrawerToggle={handleDrawerToggle} />
           
  );
}