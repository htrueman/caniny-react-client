import UserProfile from './UserProfile';
import {authRoles} from 'app/auth';

export const UserProfileConfig = {
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
            path: '/profile',
            component: UserProfile
        }
    ]
};

