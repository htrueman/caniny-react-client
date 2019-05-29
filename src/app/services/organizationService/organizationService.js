import React from 'react';

import axios from 'axios';
import FuseUtils from '@fuse/FuseUtils';
import {NotificationManager} from 'react-notifications';

const baseUrl = 'http://api.caniny.com/api/v1/';

(function () {
    const token = sessionStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
})();

class organizationService extends FuseUtils.EventEmitter {
    handleError = ({response}) => {
        if (response) {
            if (typeof response.data === 'object') {
                for (let key in response.data) {
                    if (typeof response.data[key] === 'string') {
                        NotificationManager.error(response.data[key], 'Error');
                    } else if (typeof response.data[key][0] === 'object') {
                        console.log(response.data[key][0])
                    } else {
                        NotificationManager.error(response.data[key][0], 'Error');
                    }
                }
            }
        }
    };

    getOrganizationInfo = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${baseUrl}organizations/managed/`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    this.handleError(error);

                });
        })
    };


    updateOrganization = (data) => {
        return new Promise((resolve, reject) => {
            axios.put(`${baseUrl}organizations/managed/`, data)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    this.handleError(error);
                    reject(error.response.data);
                });
        });
    };
}

const
    instance = new organizationService();

export default instance;
