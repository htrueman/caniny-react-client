import * as Actions from '../actions';
import {USER_LOGGED_OUT} from "../actions";

const initialState = {
    success: false,
    error  : {
        username: null,
        password: null
    }
};

const login = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.LOGIN_SUCCESS:
        {
            return {
                ...initialState,
                success: true
            };
        }
        case Actions.LOGIN_ERROR:
        {
            return {
                success: false,
                error  : action.payload
            };
        }
        case Actions.USER_LOGGED_OUT:
        {
            return {
                success: false,
                error  : action.payload
            };
        }
        default:
        {
            return state
        }
    }
};

export default login;