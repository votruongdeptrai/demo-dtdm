import './App.css';
import Header from './components/Header';
import MenuHeader from './components/MenuHeader';
import Home from './containers/Home';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductListPage from './containers/ProductListPage';
import ScrollToTop from './components/ScrollToTop';
// import Loading from './components/Loading';
// import ProductSearch from './containers/ProductListPage/ProductSearch';
// import ProductDetails from './containers/ProductListPage/ProductDetails';
import ProductBrand from './containers/ProductListPage/ProductBrand';
// import ProductPage from './containers/ProductListPage/ProductPage';
import ProductViewAll from './containers/ProductListPage/ProductViewAll';
import LoginPage from './containers/LoginPage';
import Activation from './containers/Activation';
import PrivateRoute from './helpers/privateRoute';
import ProductDetails from './containers/ProductListPage/ProductDetails';
import CartPage from './containers/CartPage';
import { getCartItems, updateCart } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutPage from './containers/CheckoutPage';
import OrderPage from './containers/OrderPage';
import OrderDetailsPage from './containers/OrderDetailsPage';
import Invoice from './containers/Invoice';
import ProductSearch from './containers/ProductListPage/ProductSearch';
import ForgotPassword from './containers/ForgotPassword';
import ResetPassword from './containers/ResetPassword';
// import Login from './containers/Login';

function App() {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const [scroll, setScroll] = useState(false)
    const handleScroll = () => {
        setScroll(window.scrollY >= 500)
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        dispatch(updateCart());
    }, [auth.authenticate]);

    
    return (
        <div className="App">
            <ScrollToTop scrollY={scroll} />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/login' exact component={LoginPage} />
                <Route path='/mobiles' exact component={ProductBrand} />
                <Route path='/cart' exact component={CartPage} />
                <Route path='/checkout' exact component={CheckoutPage} />
                <Route path='/search' exact component={ProductSearch} />
                <Route path='/forgot_password' exact component={ForgotPassword} />
                <Route path="/account/orders" component={OrderPage} />
                <PrivateRoute path='account/orders' exact component={OrderPage} />
                <Route path='/order_details/:orderId' exact component={OrderDetailsPage} />
                <Route path='/invoice/:orderId' exact component={Invoice} />
                <Route path='/user/activate/:activation_token' exact component={Activation} />
                <Route path='/user/reset/:token' exact component={ResetPassword} />
                <Route path='/:productSlug/:productId/p' exact component={ProductDetails} />
                <Route path='/:slug/mode-viewall' exact component={ProductViewAll} />
                <Route path='/:slug' exact component={ProductListPage} />
            </Switch>
        </div>
    );
}

export default App;
