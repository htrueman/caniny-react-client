import React from 'react';

import axios from 'axios';
import FuseUtils from '@fuse/FuseUtils';
import {NotificationManager} from 'react-notifications';

const baseUrl = 'http://165.22.152.38:8000/api/v1/';

(function () {
    const token = sessionStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
})();

class animalsService extends FuseUtils.EventEmitter {
    handleError = ({response}) => {
        if (typeof response.data === 'object') {
            for (let key in response.data) {
                if (typeof response.data[key] === 'string') {
                    NotificationManager.error(response.data[key], 'Error');
                } else {
                    NotificationManager.error(response.data[key][0], 'Error');
                }
            }
        }
    };

    getAnimals = (search) => {
        return new Promise((resolve, reject) => {
            axios.get(`${baseUrl}animals/${search}`)
                .then(response => {
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        reject(response.data);
                    }
                });
        });
    };

    createNewAnimal = (animal) => {
        return new Promise((resolve, reject) => {
            axios.post(`${baseUrl}animals/`, animal)
                .then(response => {
                    if (response.data) {
                        resolve(response.data);
                    }
                })
                .catch(error => {
                    this.handleError(error);
                    reject(error.response.data);
                });
        });
    };

    updateAnimal = (animal, id) => {
        return new Promise((resolve, reject) => {
            axios.patch(`${baseUrl}animals/${id}/`, animal)
                .then(response => {
                    if (response.data) {
                        resolve(response.data);
                    }
                })
                .catch(error => {
                    this.handleError(error);
                    reject(error.response.data);
                });
        });
    };

    getBreeds = (type) => {
        return new Promise((resolve, reject) => {
            axios.get(`${baseUrl}breeds/?species=${type}`)
                .then(response => {
                    if (response.data) {
                        resolve(response.data);
                    }
                })
                .catch(error => {
                    this.handleError(error);
                    reject(error.response.data);
                });
        });
    }

    // removeUser = (id) => {
    //     return new Promise((resolve, reject) => {
    //         axios.delete(`${baseUrl}animals/${id}/`)
    //             .then(response => {
    //                 resolve(response.data);
    //             })
    //             .catch(error => {
    //                 this.handleError(error);
    //                 reject(error.response.data);
    //             });
    //     });
    // };
}

const instance = new animalsService();

export default instance;
