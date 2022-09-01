export const PAGE_SIZE = 12;
export const CONTACT_EMAIL = '';
export const adminRoute = ['/admin/hil', '/admin/drugs'];
export const nonAuthRoutes = [
	'/',
	'/login',
	'/signup',
	'/signup1',
	'/forgotpassword',
	'/forgetpassword',
	'/forgotpassword1',
	'/resetpassword',
	'/helpcenter',
	'/explore',
	'/createfeature',
	'/accountcreated',
	'/accountcreated2'
];
export const nonDashboardRoute = nonAuthRoutes + adminRoute;

export const adminUsers = [
	'dmayank0@gmail.com',
	'admin@buddydrrx.com',
	'drugs@buddydrrx.com',
];

export const NOCORS = 'https://heruko-nocors.herokuapp.com/';
// export const BASE_BACKEND = "https://5dblw3od51.execute-api.us-east-2.amazonaws.com/dev"
export const BASE_BACKEND = "https://pwtjxgdzfj.execute-api.us-east-1.amazonaws.com/production";
	//"https://3i489l9f1c.execute-api.us-east-1.amazonaws.com/dev";
	// 'https://bye6meiro4.execute-api.us-east-2.amazonaws.com/Dev';

export const EMAIL_VALIDATOR =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const PHONE_VALIDATOR = /^\d{10}$/;
export const PASSWORD_VALIDATOR = '';

export const compliance = { good: 6, bad: 0 };

export const dropDownStyle = {
	control: (provided, state) => ({
		...provided,
		height: '44px',
		outline: 'none',
		border: 'none',
	}),
	container: (provided, state) => ({
		...provided,
		outline: 'none',
		border: '1px solid #D6D6D6',
		// margin: "1px 0",
		borderRadius: '5px',
	}),
	indicatorsContainer: (provided, state) => ({
		...provided,
		// width: "10px",
		flex: '0 !important',
	}),
};
