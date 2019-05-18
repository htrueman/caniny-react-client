import OrganizationProfile from './OrganizationProfile';
import {authRoles} from 'app/auth';

export const OrganizationProfileConfig = {
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
            path: '/organization',
            component: OrganizationProfile
        }
    ]
};

