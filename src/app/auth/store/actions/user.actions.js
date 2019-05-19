import history from 'history.js';
import {setDefaultSettings, setInitialSettings} from 'app/store/actions/fuse';
import _ from '@lodash';
import store from 'app/store';
import * as Actions from 'app/store/actions';
import firebase from 'firebase/app';
import firebaseService from 'app/services/firebaseService';
import auth0Service from 'app/services/auth0Service';
import jwtService from 'app/services/jwtService';
import organizationService from 'app/services/organizationService';
import {LOGIN_ERROR} from "./login.actions";

export const SET_USER_DATA = '[USER] SET DATA';
export const SET_ORGANIZATION_DATA = '[USER] SET ORGANIZATION DATA';
export const REMOVE_USER_DATA = '[USER] REMOVE DATA';
export const USER_LOGGED_OUT = '[USER] LOGGED OUT';

/**
 * Set user data from Auth0 token data
 */
export function setUserDataAuth0(tokenData) {
    const user = {
        role: 'admin',
        from: 'auth0',
        data: {
            displayName: tokenData.username,
            photoURL: tokenData.picture,
            email: tokenData.email,
            settings: (tokenData.user_metadata && tokenData.user_metadata.settings) ? tokenData.user_metadata.settings : {},
            shortcuts: (tokenData.user_metadata && tokenData.user_metadata.shortcuts) ? tokenData.user_metadata.shortcuts : []
        }
    };

    return setUserData(user);
}

/**
 * Set user data from Firebase data
 */
export function setUserDataFirebase(user, authUser) {
    if (user && user.data &&
        user.data.settings &&
        user.data.settings.theme &&
        user.data.settings.layout &&
        user.data.settings.layout.style) {
        // Set user data but do not update
        return setUserData(user);
    } else {
        // Create missing user settings
        return createUserSettingsFirebase(authUser);
    }
}

/**
 * Create User Settings with Firebase data
 */
export function createUserSettingsFirebase(authUser) {
    return (dispatch, getState) => {
        const guestUser = getState().auth.user;
        const fuseDefaultSettings = getState().fuse.settings.defaults;
        const currentUser = firebase.auth().currentUser;

        /**
         * Merge with current Settings
         */
        const user = _.merge({}, guestUser,
            {
                uid: authUser.uid,
                from: 'firebase',
                role: "admin",
                data: {
                    displayName: authUser.displayName,
                    email: authUser.email,
                    settings: {...fuseDefaultSettings}
                }
            }
        );
        currentUser.updateProfile(user.data);

        updateUserData(user);
        return dispatch(setUserData(user));
    }
}

/**
 * Set User Data
 */
export function setUserData() {
    return (dispatch) =>
        jwtService.getUserProfile()
            .then((res) => {
                    return dispatch({
                        type: SET_USER_DATA,
                        payload: res
                    });
                }
            )
}

/**
 * Set Organization Data
 */
export function setOrganizationData() {
    return (dispatch) =>
        organizationService.getOrganizationInfo()
            .then((res) => {
                    console.log(res);
                    return dispatch({
                        type: SET_ORGANIZATION_DATA,
                        payload: res
                    });
                }
            )
}

/**
 * Update User Settings
 */
export function updateUserSettings(settings) {
    return (dispatch, getState) => {
        const oldUser = getState().auth.user;
        const user = _.merge({}, oldUser, {data: {settings}});

        updateUserData(user);

        return dispatch(setUserData(user));
    }
}

/**
 * Update User Shortcuts
 */
export function updateUserShortcuts(shortcuts) {
    return (dispatch, getState) => {
        const user = getState().auth.user;
        const newUser = {
            ...user,
            data: {
                ...user.data,
                shortcuts
            }
        };

        updateUserData(newUser);

        return dispatch(setUserData(newUser));
    }
}

/**
 * Remove User Data
 */
export function removeUserData() {
    return {
        type: REMOVE_USER_DATA
    }
}

/**
 * Logout
 */
export function logoutUser() {

    return (dispatch, getState) => {

        const user = getState().auth.user;

        history.push({
            pathname: '/'
        });


        jwtService.logout();
        dispatch(setInitialSettings());

        dispatch({
            type: USER_LOGGED_OUT
        })
    }
}

/**
 * Update User Data
 */
export function updateUserData(user) {
    return (dispatch) =>
        jwtService.updateUserProfile(user)
            .then((res) => {
                    return dispatch({
                        type: SET_USER_DATA,
                        payload: res
                    });
                }
            )
}
