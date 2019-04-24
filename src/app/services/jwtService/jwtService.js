import React from 'react';

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import FuseUtils from '@fuse/FuseUtils';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const baseUrl = 'http://165.22.152.38:8000/api/v1/';

(function () {
    const token = sessionStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
})();

class jwtService extends FuseUtils.EventEmitter {
    init() {
        this.setInterceptors();
        this.handleAuthentication();
    }

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


    setInterceptors = () => {
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
                if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                    // if you ever get an unauthorized response, logout the user
                    this.emit('onAutoLogout', 'Invalid access_token');
                    this.setSession(null);
                }
                throw err;
            });
        });
    };

    handleAuthentication = () => {

        let access_token = this.getAccessToken();

        if (!access_token) {
            return;
        }

        if (this.isAuthTokenValid(access_token)) {
            this.setSession(access_token);
            this.emit('onAutoLogin', true);
        } else {
            this.setSession(null);
            this.emit('onAutoLogout', 'access_token expired');
        }
    };

    createUser = (user, type) => {
        return new Promise((resolve, reject) => {
                axios.post(`${baseUrl}register/${type ? `${type}/` : ''}`, user)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error.response);
                    });
            }
        );
    };

    resetPassword = (email) => {
        return new Promise((resolve, reject) => {
                axios.post(`${baseUrl}password-reset/`, email)
                    .then(response => {
                        if (response.data) {
                            // this.setSession(response.data.access_token);
                            resolve(response.data);
                        } else {
                            reject(response.data);
                        }
                    });
            }
        );
    };

    updatePassword = (pass, id, token) => {
        return new Promise((resolve, reject) => {
                axios.post(`${baseUrl}password-reset-confirm/${id}/${token}/`, pass)
                    .then(response => {
                        if (response.data) {
                            resolve(response.data);
                        } else {
                            reject(response.data);
                        }
                    });
            }
        );
    };

    activate = (id, token) => {
        return new Promise((resolve, reject) => {
                axios.get(`${baseUrl}register/activate/${id}/${token}/`)
                    .then(response => {
                        if (response.data.user) {
                            this.setSession(response.data.access_token);
                            resolve(response.data.user);
                        } else {
                            reject(response.data.error);
                        }
                    });
            }
        );
    };

    signInWithEmailAndPassword = (user, type) => {
        return new Promise((resolve, reject) => {
            axios.post(`${baseUrl}login/`, user)
                .then(response => {
                    console.log(response);

                    this.setSession(response.data.access);
                    resolve(response);
                })
                .catch(error => {
                    this.handleError(error);
                    // reject(error.response.data);
                });
        });
    };

    createOrganization = (organization) => {
        return new Promise((resolve, reject) => {
            axios.post(`${baseUrl}organizations/`, organization)
                .then(response => {
                    if (response.data.user) {
                        this.setSession(response.data.access_token);
                        resolve(response.data.user);
                    } else {
                        reject(response.data);
                    }
                });
        });
    };

    updateUserData = (user) => {
        return axios.post('/api/auth/user/update', {
            user: user
        });
    };

    setSession = access_token => {
        if (access_token) {
            sessionStorage.setItem('token', access_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        } else {
            sessionStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    logout = () => {
        this.setSession(null);
    };

    isAuthTokenValid = access_token => {
        if (!access_token) {
            return false;
        }
        const decoded = jwtDecode(access_token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        } else {
            return true;
        }
    };

    getAccessToken = () => {
        return window.sessionStorage.getItem('jwt_access_token');
    };

//    USERS

    getUsers = (search) => {
        return new Promise((resolve, reject) => {
            console.log(search);

            axios.get(`${baseUrl}users/${search}`)
                .then(response => {
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        reject(response.data);
                    }
                });
        });
    };

    createNewUser = (user) => {
        return new Promise((resolve, reject) => {
            axios.post(`${baseUrl}users/`, user)
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

    updateUser = (user, id) => {
        return new Promise((resolve, reject) => {
            axios.patch(`${baseUrl}users/${id}/`, user)
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

    removeUser = (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`${baseUrl}users/${id}/`)
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

const instance = new jwtService();

export default instance;
