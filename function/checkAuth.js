import { Auth } from 'aws-amplify';
import { fetchAuth } from './fetchAuth';
import mixpanel from 'mixpanel-browser';

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true});

export async function checkAuth({
	token,
	setToken,
	role,
	setRole = () => {},
	setLocation = () => {},
}) {
	try {
		const user = await Auth.currentAuthenticatedUser();
		console.log('user:', user);
		if (user) {
			const too = user.getSignInUserSession().getIdToken().getJwtToken();
			setToken(too);
			console.log("token",too)
			// const response = await fetchAuth(too, '/users');
			// setRole(response.type);
			// setLocation(response.location.split(',')[0]);
			mixpanel.track('Logged In', {
				'source': "Data Platform Login Page",
				'signed in': true,
				'email':user.email
			  });
		} else {
			setToken(null);
		}
	} catch (e) {
		console.log('error:', e);
		setToken(null);
	}
}

export async function signIn({ email, password, token, setToken }) {
	try {
		const user = await Auth.signIn(email, password);
		if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
			const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
			await Auth.completeNewPassword(
				user, // the Cognito User Object
				'mpghealth35' // the new password
			);
		}
		/* Once the user successfully signs in, update the form state to show the signed in state */
		await checkAuth({ token, setToken });
		return null;
	} catch (err) {
		console.log({ err });
		return err;
	}
}

export async function signUp({
	email,
	password,
	name,
	company,
	token,
	setToken,
}) {
	try {
		await Auth.signUp({
			username: email,
			password: password,
			attributes: {
				name: name,
				"custom:company":company,
				email: email,
			}
		});
		/* Once the user successfully signs in, update the form state to show the signed in state */
		// await checkAuth({token, setToken})
		mixpanel.track('Signed Up', {
			'source': "Create Account Page",
			'signed in': false,
			'signed up': true,
			'action': "account created",
		  });
		console.log("first time user created");
		return null;
	} catch (err) {
		console.log("first time registering the user on amplify",{ err });
		return err.message;
	}
}

export async function confirmSignUp({ email, otp, token, setToken }) {
	try {
		await Auth.confirmSignUp(email, otp);
		/* Once the user successfully signs in, update the form state to show the signed in state */
		// await checkAuth({token, setToken})
		mixpanel.track('Confirm Sign Up', {
			'source': "Create Account Page",
			'signed in': true,
			'signed up': true,
			'action': "account verified successfully",
		  });

		console.log("signup confimed in the confirm signup api call");
		return null;
	} catch (err) {
		console.log("confirming the user using the OTP",{ err });
		return err.message;
	}
}

export async function recieveOTP({ email }) {
	try {
		await Auth.resendSignUp(email);
		/* Once the user successfully signs in, update the form state to show the signed in state */
		// await checkAuth({token, setToken})
		mixpanel.track('OTP Recieved', {
			'source': "OTP Verification Page",
			'signed in': false,
			'signed up': true,
			'action': "OTP Recieved",
		  });
		return null;
	} catch (err) {
		console.log({ err });
		return err.message;
	}
}

export async function recieveForgotOTP({ email }) {
	try {
		await Auth.forgotPassword(email);
		/* Once the user successfully signs in, update the form state to show the signed in state */
		// await checkAuth({token, setToken})
		return null;
	} catch (err) {
		console.log({ err });
		return err.message;
	}
}

export async function forgotPasswordSubmit({ email, otp, password, path }) {
	try {
		await Auth.forgotPasswordSubmit(email, otp, password);
		/* Once the user successfully signs in, update the form state to show the signed in state */
		// await checkAuth({token, setToken})
		mixpanel.track('Forgot Password', {
			'source': path,
			'signed in': false,
			'signed up': true,
			'action': "clicked on forgot password",
		  });
		return null;
	} catch (err) {
		console.log({ err });
		return err.message;
	}
}

export async function signOut({path}) {
	try {
		await Auth.signOut();
		mixpanel.track('Signed Out', {
			'source': path,
			'signed in': false,
			'signed up': true,
			'action': "signed out",
		  });
	} catch (error) {
		console.log('error signing out: ', error);
	}
}
