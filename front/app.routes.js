export const ROUTER_STATES = {
    mainState: {
        name: 'mainState',
        url: '/',
        component: 'checkLogin',
    },
    mainViewState: {
        name: 'mainView',
        url: '/main-view',
        component: 'chat',
    },
    editProfileState: {
        name: 'editProfile',
        url: '/edit-profile',
        component: 'editProfile',
    },
    signInState: {
        name: 'signIn',
        url: '/auth/sign-in',
        component: 'signIn',
    },
    signUpState: {
        name: 'signUp',
        url: '/auth/sign-up',
        component: 'signUp',
    },
};