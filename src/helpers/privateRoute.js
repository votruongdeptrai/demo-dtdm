import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {

    const auth = useSelector(state => state.auth)
    return <Route {...rest} component={(props) => {
        if(auth.authenticate){
            return <Component {...props} />
        }else{
            return <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        }
    }} />
}

export default PrivateRoute;