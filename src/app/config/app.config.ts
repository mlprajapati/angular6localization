import {InjectionToken} from '@angular/core';

import {IAppConfig} from './iapp.config';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: IAppConfig = {
  routes: {
    users: 'users',
    login:'login',
    dashboard:'dashboard',
    error404: '404'
  },
  endpoints: {
    users: 'http://localhost:4000/results'
  },
  votesLimit: 3,
  topUsersLimit: 4,
  snackBarDuration: 3000,
  repositoryURL: ''
};