import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CopyrightIcon from '@mui/icons-material/Copyright';
import FacebookIcon from '@mui/icons-material/Facebook';

const lightColor = 'rgba(255, 255, 255, 0.7)';


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

let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const drawerWidth = 256;

export default function Footer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>        
          
          <Box component="footer" sx={{ p: 2, bgcolor: '#3e3e33',zIndex: 0, pl:11,
              minHeight: '8vh', display: 'flex', flexDirection:'row' , justifyContent: 'space-between' }}>

          <Toolbar sx={{width:'50%'}}>
            <Grid item xs>
              
              <Typography color="#BCBCBC" variant="h5" component="h5">
              <CopyrightIcon fontSize={'small'}/>
                &nbsp;
                Data Platform
              </Typography>
            </Grid>
        </Toolbar>
        
          <Toolbar component="nav" variant="dense" className="flex-row"
          sx={{justifyContent:'space-between', width:'50%'}}>
            <Grid item sx={{display:'flex', justifyContent: 'space-around' , width:'91%', color:'#BCBCBC'}}>
              {/* <Button
                sx={{ borderColor: lightColor }}
                color="inherit"
                size="medium"
              >
                Terms of Use
              </Button>
              <Button
                sx={{ borderColor: lightColor }}
                color="inherit"
                size="medium"
              >
                Privacy Policy
              </Button>
              <Button
                sx={{ borderColor: lightColor }}
                
                color="inherit"
                size="medium"
              > 
                Contact Support
              </Button>

              <Grid item>
                <div style={{fontSize:24}}>|
                </div>
             </Grid>

             <div style={{display:"flex",flexDirection:'row', 
                alignItems: 'center',}}>
                      <FacebookIcon />
                      &nbsp;&nbsp;
                      <TwitterIcon />
                      &nbsp;&nbsp;
                      <YouTubeIcon />
                      
              </div>*/}


            </Grid>
        </Toolbar>
          </Box>
    </ThemeProvider>
          
          
  );
}
