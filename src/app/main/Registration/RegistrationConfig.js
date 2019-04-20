import {authRoles} from 'app/auth';
import Register from './Registration';
import Step from './SecondStep';

export const RegistrationConfig = {
    settings: {
        layout: {
            config: {
                navbar: {
                    display: false
                },
                toolbar: {
                    display: true
                },
                footer: {
                    display: false
                },
                leftSidePanel: {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    auth: authRoles.onlyGuest,
    routes: [
        {
            path: '/registration',
            exact: true,
            component: Register
        },
        {
            path: '/registration/:type/:id',
            exact: true,
            component: Step
        }

    ]
};

