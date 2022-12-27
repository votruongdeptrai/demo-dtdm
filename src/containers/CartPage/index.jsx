import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { addToCart, getCartItems, getCartItemsSaved, removeCartItem } from '../../actions'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import PriceDetails from '../../components/PriceDetails'
import CartItem from './CartItem'
import './style.css'

const CartPage = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const history = useHistory()
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const auth = useSelector(state => state.auth)
    const [cartItems, setCartItems] = useState(cart.cartItems)
    const [cartItemsSaved, setCartItemsSaved] = useState(cart.cartItemsSaved)
    

    useEffect(() => {
        if (auth.authenticate) {
            dispatch(getCartItems())
            dispatch(getCartItemsSaved())
        }
    }, [auth.authenticate])

    useEffect(() => {
        setCartItems(cart.cartItems)
        setCartItemsSaved(cart.cartItemsSaved)
    }, [cart.cartItems, cart.cartItemsSaved])

    const onQuantityIncrement = (_id, qty) => {
        const { name, price, img, discount, offer, slug } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img, discount, offer, slug }, 1));
    };

    const onQuantityDecrement = (_id, qty) => {
        const { name, price, img, discount, offer, slug } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img, discount, offer, slug }, -1));
    };

    // if (cart.updatingCart) {
    //     return <Loading />
    // }

    const onRemoveCartItem = (_id) => {
        dispatch(removeCartItem({ productId: _id }));
      };

    const renderEmptyCart = () => {
        return (
            <div className="empty_content">
                <div className="empty_img">
                    <img src="https://res.cloudinary.com/de4aiajqg/image/upload/v1653404953/avatar/d438a32e-765a-4d8b-b4a6-520b560971e8_feww7u.jpg" alt="" />
                </div>
                <div className="empty_msg">
                    <span>Missing Cart items?</span>
                </div>
                {!auth.authenticate ? <div onClick={() => history.push('/login')} className="empty_login">
                    <span>Login</span>
                </div> : ''}
            </div>
        )
    }

    const renderSaveProduct = () => {
        return (
            <div style={{ marginTop: 40 }} className="cartpage_product">
                <div className="cartpage_number">
                    <span>Save Items ({Object.keys(cartItemsSaved).length})</span>
                </div>

                {Object.keys(cartItemsSaved).length > 0 && Object.keys(cartItemsSaved).map((key, index) => (
                    <CartItem
                        disabled
                        moveToCart
                        key={index}
                        cartItem={cartItemsSaved[key]}
                        onQuantityInc={onQuantityIncrement}
                        onQuantityDec={onQuantityDecrement}
                    />
                ))}

            </div>
        )
    }

    const renderCartPage = () => (
        <div className="cartpage_container">
            <div className="cartpage_content">
                <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
                    <div className="cartpage_product">
                        <div className="cartpage_number">
                            <span>My Cart ({Object.keys(cartItems).length})</span>
                        </div>

                        {Object.keys(cartItems).map((key, index) => (
                            <CartItem
                                key={index}
                                cartItem={cartItems[key]}
                                onQuantityInc={onQuantityIncrement}
                                onQuantityDec={onQuantityDecrement}
                                onRemoveCartItem={onRemoveCartItem}
                            />
                        ))}

                        {Object.keys(cartItems).length > 0 ? (<div className="cartpage_continue_btn">
                            <button onClick={() => history.push('/checkout')}>CONTINUE</button>
                        </div>) : null}
                    </div>

                    {Object.keys(cartItemsSaved).length > 0 ? renderSaveProduct() : null}
                </div>
                <PriceDetails
                    totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
                        return qty + cart.cartItems[key].qty;
                    }, 0)}
                    totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                        const { price, qty } = cart.cartItems[key];
                        return totalPrice + price * qty;
                    }, 0)}
                    totalOffer={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                        const { price, qty, offer } = cart.cartItems[key];
                        return totalPrice + price * offer / 100 * qty;
                    }, 0)}
                    totalDiscount={Object.keys(cart.cartItems).reduce((totalDiscount, key) => {
                        const { discount, qty } = cart.cartItems[key];
                        return totalDiscount + discount * qty;
                    }, 0)}
                />
            </div>
        </div>

    )

    if (props.onlyCartItems) {
        return (
            <>
                {Object.keys(cartItems).map((key, index) => (
                    <CartItem
                        key={index}
                        cartItem={cartItems[key]}
                        onQuantityInc={onQuantityIncrement}
                        onQuantityDec={onQuantityDecrement}
                    />
                ))}
            </>
        );
    }

    return (
        <Layout subheader>
            {Object.keys(cartItems).length > 0 ||  Object.keys(cartItemsSaved).length > 0 ? renderCartPage() : renderEmptyCart()}
        </Layout>
    )
}

export default CartPage