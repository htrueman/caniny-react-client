import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {ExampleConfig} from 'app/main/example/ExampleConfig';
import {LoginConfig} from 'app/main/Login/LoginConfig';
import {RegistrationConfig} from 'app/main/Registration/RegistrationConfig';

const routeConfigs = [
    ExampleConfig,
    LoginConfig,
    RegistrationConfig
];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        exact    : true,
        component: () => <Redirect to="/example"/>
    }
];

 export default routes;
