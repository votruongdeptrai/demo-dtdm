import { authConstants } from "../actions/constants";
import { persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";

const initState = {
    token: null,
    user: {
        firstName: "",
        lastName: "",
        email: "",
        avatar: "",
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: "",
};

const persistConfig = {
    key: 'auth',
    storage: storage,
    blacklist: ['message']
};

const authReducer = (state = initState, action) => {
    console.log(action);

    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            return state = {
                ...state,
                authenticating: true,
                message: ''
            };
        case authConstants.LOGIN_SUCCESS:
            return state = {
                ...state,
                user: action.payload.user,
                token: action.payload.accesstoken,
                authenticate: true,
                authenticating: false,
                error: null,
                message: ''
            }
        case authConstants.LOGIN_FAILURE:
            return state = {
                ...state,
                authenticate: false,
                authenticating: false,
                error: action.payload.error,
                message: ''
            };

        // case authConstants.GOOGLE_LOGIN_REQUEST:
        //     return state = {
        //         ...state,
        //         authenticating: true,
        //         message: ''
        //     };
        case authConstants.GOOGLE_LOGIN_SUCCESS:
            return state = {
                ...state,
                user: action.payload.user,
                token: action.payload.accesstoken,
                authenticate: true,
                authenticating: false,
                error: null,
                message: ''
            }

        case authConstants.FACEBOOK_LOGIN_SUCCESS:
            return state = {
                ...state,
                user: action.payload.user,
                token: action.payload.accesstoken,
                authenticate: true,
                authenticating: false,
                error: null,
                message: ''
            }
        case authConstants.LOGOUT_REQUEST:
            return state = {
                ...state,
                loading: true,
            };
        case authConstants.LOGOUT_SUCCESS:
            return state = {
                ...initState,
            };
        case authConstants.LOGOUT_FAILURE:
            return state = {
                ...state,
                error: action.payload.error,
                loading: false,
            };
        case authConstants.SIGNUP_REQUEST:
            return state = {
                ...state,
                loading: false,
                error: null
            }
        case authConstants.SIGNUP_SUCCESS:
            return state = {
                ...state,
                loading: false,
                error: null,
                message: action.payload.msg
            }
        case authConstants.SIGNUP_FAILURE:
            return state = {
                ...state,
                error: action.payload.error,
            };
        default:
            return state;
    }
}

export default persistReducer(persistConfig, authReducer)