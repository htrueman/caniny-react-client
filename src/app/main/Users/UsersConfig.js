import Users from './Users';
import {authRoles} from 'app/auth';

export const UsersConfig = {
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
            path     : '/users',
            component: Users
        }
    ]
};