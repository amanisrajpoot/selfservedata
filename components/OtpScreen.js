import React from 'react';
import styles from '../styles/LoginForm.module.css';
import { Grid } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { confirmSignUp } from '../function/checkAuth';
import mixpanel from 'mixpanel-browser';

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true}); 

function Copyright(props) {
	return (
	  <Typography variant="body2" color="text.secondary" align="center" {...props}>
		{'Copyright © '}
		<Link color="inherit" href="/">
		  Data Platform
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	  </Typography>
	);
  }
  
const theme = createTheme();

const OTPForm = ({ error, email, otp, setOtp, confirmSignUp }) => {
	const handleSubmit = (event) => {
		event.preventDefault();
		// const data = new FormData(event.currentTarget);
		confirmSignUp();
		// console.log({
		//   email: data.get('email'),
		//   password: data.get('password'),
		// });
	  };

	return (
	<ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
		  	<h1>Account Verification</h1>
			<p>Enter the OTP you must have recieved on your email </p>
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="Username"
                  name="Username"
                  disabled
                  fullWidth
                  id="name"
                  label="Email"
				  type='Username'
                  value={email}
                  autoFocus
                />
              </Grid>
			  <Grid item xs={12}>
                <TextField
                  autoComplete="OTP"
                  type='otp'
				  placeholder='OTP'
                  fullWidth
                  id="otp"
                  label="otp"
                  value={otp}
				  onChange={(e) => setOtp(e.target.value)}
				  required
                  autoFocus
                />
              </Grid>
			</Grid>

			{error && <p className={styles.error}>{error}</p>}
			<Button
              type="submit"
              fullWidth
              // href="/login"
              variant="contained"
              sx={{ mt: 3, mb: 2, py:2 }}
              onClick={handleSubmit}
              
            >Confirm Signup</Button>
		</Box>
		<Copyright sx={{ mt: 5 }} />

          </Box>
      </Container>
    </ThemeProvider>


	);
};

export default OTPForm;
