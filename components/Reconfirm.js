import React from 'react';
import styles from '../styles/LoginForm.module.css';
import Image from 'next/image';
import { Grid } from '@material-ui/core';
import mixpanel from 'mixpanel-browser';

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true}); 

const ForgotForm = ({
	error,
	email,
	setemail,
	otpSent,
	otp,
	setOtp,
	confirmOTP,
	recieveOTP,
}) => {
	return (
		<Grid xs={12} item className={styles.main_container}>
			<Grid
				xs={11}
				sm={8}
				md={7}
				lg={5}
				item
				className={styles.inner_container}
			>
				<div className={styles.input_fields}>
					<div className={styles.logo}>
						<Image
							src='/logo.png'
							layout={'intrinsic'}
							height={100}
							width={450}
						/>
					</div>
					<h1>Confirm your account</h1>
					<input
						disabled={otpSent}
						type='Username'
						placeholder='Email*'
						className={styles.input}
						value={email}
						onChange={(e) => setemail(e.target.value)}
					/>
					{otpSent && (
						<input
							type='otp'
							placeholder='OTP*'
							className={styles.input}
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
						/>
					)}
					{error && <p className={styles.error}>{error}</p>}
					<button
						onClick={otpSent ? confirmOTP : recieveOTP}
						type='Submit'
						className={styles.button}
					>
						{otpSent ? 'Confirm OTP' : 'Recieve OTP'}
					</button>
				</div>
			</Grid>
		</Grid>
	);
};

export default ForgotForm;
