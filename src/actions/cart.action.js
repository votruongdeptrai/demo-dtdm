
import axios from "../helpers/axios";
import { cartConstants } from "./constants";
import store from "../store";
import { useSelector } from "react-redux";


const getCartItems = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: cartConstants.ADD_TO_CART_REQUEST })
            const res = await axios.post(`/user/getCartItems`)
            if (res.status === 200) {
                const { cartItems } = res.data
                if (cartItems) {
                    dispatch({
                        type: cartConstants.ADD_TO_CART_SUCCESS,
                        payload: { cartItems },
                    })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}


export const addToCart = (product, newQty = 1) => {
    return async (dispatch) => {
        const {
            cart: { cartItems },
            auth
        } = store.getState();

        const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty + newQty) : 1;
        cartItems[product._id] = {
            ...product,
            qty,
        };

        if (auth.authenticate) {
            dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
            const payload = {
                cartItems: [
                    {
                        product: product._id,
                        quantity: qty,
                    },
                ],
            };
            const res = await axios.post(`/user/cart/addtocart`, payload);
            if (res.status === 201) {
                dispatch(getCartItems());
            }
        } else {
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }

        dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems },
        });
    };
};





export const updateCart = () => {
    return async (dispatch) => {
        const { auth } = store.getState();
        let cartItems = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : null;

        if (auth.authenticate) {
            localStorage.removeItem("cart");
            //dispatch(getCartItems());
            if (cartItems) {
                const payload = {
                    cartItems: Object.keys(cartItems).map((key, index) => {
                        return {
                            quantity: cartItems[key].qty,
                            product: cartItems[key]._id,
                        };
                    }),
                };
                if (Object.keys(cartItems).length > 0) {
                    const res = await axios.post(`/user/cart/addtocart`, payload);
                    if (res.status === 201) {
                        dispatch(getCartItems());
                    }
                }
            } else {
                dispatch(getCartItems());
            }
        } else {
            if (cartItems) {
                dispatch({
                    type: cartConstants.ADD_TO_CART_SUCCESS,
                    payload: { cartItems },
                });
            }
        }
    };
};


export const addItemsSave = (product) => {
    return async (dispatch) => {
        try {
            const payload = {
                cartItemsSaved: [
                    {
                        product: product._id,
                        quantity: product.qty,
                    },
                ],
            };
            const res = await axios.post(`/user/cart/saveItems`, payload);
            dispatch({ type: cartConstants.SAVE_CART_ITEM_REQUEST });
            if (res.status === 200) {
                dispatch(getCartItems());
                dispatch(getCartItemsSaved());
            } else {
                const { msg } = res.data;
                dispatch({
                    type: cartConstants.SAVE_CART_ITEM_FAILURE,
                    payload: { msg },
                });
            }
        } catch (error) {
        }
    };
};

const getCartItemsSaved = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: cartConstants.SAVE_CART_ITEM_REQUEST })
            const res = await axios.get(`user/cart/getItemsSaved`)
            if (res.status === 200) {
                const { cartItemsSaved } = res.data
                dispatch({
                    type: cartConstants.SAVE_CART_ITEM_SUCCESS,
                    payload: { cartItemsSaved },
                })
                dispatch(getCartItems());
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const moveToCart = (payload) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`user/cart/removeItemsSaved`, payload)
            if (res.status === 202) {
                dispatch(getCartItems());
                dispatch(getCartItemsSaved())
            }
        } catch (error) {
            console.log(error);
        }
    }
}


export const removeCartItem = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
            const res = await axios.post(`/user/cart/removeItem`, { payload });
            if (res.status === 202) {
                dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
                dispatch(getCartItems());
            } else {
                const { error } = res.data;
                dispatch({
                    type: cartConstants.REMOVE_CART_ITEM_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};


export { getCartItems, getCartItemsSaved }