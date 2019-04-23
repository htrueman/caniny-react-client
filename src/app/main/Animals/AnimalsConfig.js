import Animals from './Animals';
import {authRoles} from 'app/auth';

export const AnimalsConfig = {
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
    routes  : [
        {
            path     : '/animals',
            component: Animals
        }
    ]
};