import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CheckLoginComponent } from './check-login/check-login.component';

const authModule = angular.module('app.auth', [])
    .component('signIn', new SignInComponent())
    .component('signUp', new SignUpComponent())
    .component('checkLogin', new CheckLoginComponent())
    .name;

export { authModule };
