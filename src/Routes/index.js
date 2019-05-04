
const ROUTES = Object.freeze({
    HOME: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    RESET_PASSWORD: '/reset-password',
    PROFILE: '/profile'
});

export {
    ROUTES
};

export { default as Home } from './Home.route';
export { default as SignIn } from './SignIn.route';
export { default as SignUp } from './SignUp.route';
export { default as Profile } from './Profile.route';
export { default as ResetPassword } from './ResetPassword.route';
export { default as NotFound } from './NotFound.route';