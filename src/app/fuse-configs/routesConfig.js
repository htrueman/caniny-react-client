import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {ExampleConfig} from 'app/main/example/ExampleConfig';
import {LoginConfig} from 'app/main/Login/LoginConfig';
import {LPConfig} from 'app/main/LP/LpConfig';
import {RegistrationConfig} from 'app/main/Registration/RegistrationConfig';
import {ResetPasswordConfig} from 'app/main/ResetPassword/ResetPasswordConfig';
import {ActivateAccountConfig} from 'app/main/ActivateAccount/ActivateAccountConfig';
import {UsersConfig} from 'app/main/Users/UsersConfig';
import {AnimalsConfig} from 'app/main/Animals/AnimalsConfig';
import {UserProfileConfig} from 'app/main/UserProfile/UserProfileConfig';
import {OrganizationProfileConfig} from 'app/main/OrganizationProfile/OrganizationProfileConfig';


const logging = () => {
    const token = sessionStorage.getItem('token');

    if (token) return true;
};

const routeConfigs =  [
    ExampleConfig,
    LoginConfig,
    RegistrationConfig,
    LPConfig,
    ResetPasswordConfig,
    ActivateAccountConfig,
    UsersConfig,
    AnimalsConfig,
    UserProfileConfig,
    OrganizationProfileConfig
];


const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/"/>
    }
];

export default routes;
