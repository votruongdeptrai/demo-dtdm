import axios from 'axios';
import { api } from '../urlConfig';
import store from '../store';
import { authConstants } from '../actions/constants';

const accesstoken = localStorage.getItem('accesstoken');

const axiosIntance = axios.create({
    baseURL: api,
    headers: {
        'Authorization': accesstoken ? `Bearer ${accesstoken}` : ''
    }
});

axiosIntance.interceptors.request.use((req) => {
    const { auth } = store.getState();
    if(auth.token){
        req.headers.Authorization = `Bearer ${auth.token}`;
    }
    
    return req;
})

// axiosIntance.interceptors.response.use((res) => {
//     return res;
// }, (error) => {

    // const status = error.response ? error.response.status : 500;
    // if(status === 401 || status === 500){
    //     localStorage.clear();
    //     store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    // }


//     return Promise.reject(error);
// })

export default axiosIntance;