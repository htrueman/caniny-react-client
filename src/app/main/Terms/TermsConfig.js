import Terms from './Terms';
import {authRoles} from 'app/auth';

export const TermsConfig = {
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
            path: '/terms-service',
            component: Terms
        }
    ]
};

