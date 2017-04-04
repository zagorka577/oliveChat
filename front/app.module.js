import angular from 'angular';
import uiRouter from 'angular-ui-router';

import { coreModule } from './core/core.module';
import { editProfileModule } from './edit-profile/edit-profile.module';
import { authModule } from './authentification/authentification.module';
import { chatModule } from './chat/chat.module';

import { ROUTER_STATES } from './app.routes';

import './main.scss';

const app = angular.module('app', [
                                    uiRouter,
                                    coreModule,
                                    editProfileModule,
                                    authModule,
                                    chatModule,
                                  ]);

app.config(($stateProvider, $urlRouterProvider) => {
    $stateProvider.state(ROUTER_STATES.mainState)
                  .state(ROUTER_STATES.editProfileState)
                  .state(ROUTER_STATES.signInState)
                  .state(ROUTER_STATES.signUpState)
                  .state(ROUTER_STATES.mainViewState);
    $urlRouterProvider.otherwise('/');
});

export { app };