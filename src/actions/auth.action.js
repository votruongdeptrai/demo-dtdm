import { authConstants, cartConstants, userConstants } from "./constants";
import axios from '../helpers/axios'

export const register = (user) => {
    return async dispatch => {
        try {
            dispatch({type: authConstants.SIGNUP_REQUEST})
            const res = await axios.post('/auth/register', {
                ...user
            })
            if (res.status === 200) {
                dispatch({
                    type: authConstants.SIGNUP_SUCCESS,
                    payload: res.data
                })
            }
        } catch (err) {
            
            console.log(err)
        }
    }
}


export const login = (user) => {
    return async dispatch => {
        try {
            dispatch({type: authConstants.LOGIN_REQUEST})
            const res = await axios.post('/auth/login', {
                ...user
            })
            if (res.status === 200) {
                const { accesstoken, user } = res.data;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('accesstoken', accesstoken)
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        accesstoken, user
                    }
                })
            }
        } catch (err) {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: err.response.data.msg }
            });
        }
    }
}

export const logout = () => {
    return async dispatch => {
        try {
            dispatch({ type: authConstants.LOGOUT_REQUEST });
            const res = await axios.get(`/auth/logout`);

            if (res.status === 200) {
                localStorage.clear();
                dispatch({ type: authConstants.LOGOUT_SUCCESS });
                dispatch({ type: cartConstants.RESET_CART })
                dispatch({ type: userConstants.RESET_ADDRESS })
            }
        } catch (err) {
            
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: err.response.data.msg }
            });
        }
    }
}

export const googlelogin = (tokenId) => {
    return async dispatch => {
        try {
            dispatch({type: authConstants.GOOGLE_LOGIN_REQUEST})
            const res = await axios.post('/auth/google_login', tokenId)
            if (res.status === 200) {
                const { accesstoken, user } = res.data;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('accesstoken', accesstoken)
                dispatch({
                    type: authConstants.GOOGLE_LOGIN_SUCCESS,
                    payload: {
                        accesstoken, user
                    }
                })
            }
        } catch (err) {
            dispatch({
                type: authConstants.GOOGLE_LOGIN_FAILURE,
                payload: { error: err.response.data.msg }
            });
        }
    }
}

export const loginWithFb = (payload) => {
    return async dispatch => {
        try {
            dispatch({type: authConstants.FACEBOOK_LOGIN_REQUEST})
            const res = await axios.post('/auth/facebook_login', payload)
            if (res.status === 200) {
                const { accesstoken, user } = res.data;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('accesstoken', accesstoken)
                dispatch({
                    type: authConstants.FACEBOOK_LOGIN_SUCCESS,
                    payload: {
                        accesstoken, user
                    }
                })
            }
        } catch (err) {
            dispatch({
                type: authConstants.FACEBOOK_LOGIN_FAILURE,
                payload: { error: err.response.data.msg }
            });
        }
    }
}

