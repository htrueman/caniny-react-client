import * as Actions from '../actions';

const initialState = {
    role: 'guest',
    'displayName': 'John Doe',
    'photoURL': 'assets/images/avatars/Velazquez.jpg',
    'email': 'johndoe@withinpixels.com',
};

const user = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            };
        }
        case Actions.SET_ORGANIZATION_DATA: {
            console.log(action.payload);
            return {
                ...state,
                ...action.payload
            };
        }
        case Actions.REMOVE_USER_DATA: {
            return {
                ...initialState
            };
        }
        case Actions.USER_LOGGED_OUT: {
            return initialState;
        }
        default: {
            return state
        }
    }
};

export default user;
