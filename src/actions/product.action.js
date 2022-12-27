import axios from "../helpers/axios"
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
    return async dispatch => {
        try {
            const res = await axios.get(`/products/${slug}`);
            dispatch({ type: productConstants.GET_PRODUCTS_BY_SLUG_REQUEST })
            if (res.status === 200) {
                dispatch({
                    type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
                    payload: res.data
                });
            }
        } catch (err) {
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG_FAILURE,
                payload: err
            })
        }
    }
}

export const getProductPage = (payload) => {
    return async dispatch => {
        try {
            const { cid, type } = payload.params;
            const res = await axios.get(`/page/${cid}/${type}`);
            dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
            if (res.status === 200) {
                const { page } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                    payload: { page }
                });
            } else {
                const { error } = res.data;
                dispatch({ 
                    type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                    payload: { error }
                });
            }
        } catch (error) {
            console.log(error)
        }

    }
}

export const getProductDetailsById = (payload) => {
    return async dispatch => {
        dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
        let res;
        try {
            const { productId } = payload.params;
            res = await axios.get(`/product/${productId}`);
            console.log(res);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload: { productDetails: res.data.product }
            });

        } catch (error) {
            console.log(error);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload: { error: res.data.error }
            });
        }

    }
}

export const getProductSearched = (payload) => {
    return async dispatch => {
        dispatch({ type: productConstants.GET_PRODUCT_SEARCH_REQUEST });
        try {
            const res = await axios.get(`/product/search?q=${payload.data}&sortBy=${payload.type ? payload.type : 'createAt'}`);
            dispatch({
                type: productConstants.GET_PRODUCT_SEARCH_SUCCESS,
                payload: res.data
            });


        } catch (error) {
            // console.log(error);
            // dispatch({
            //     type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
            //     payload: { error: res.data.error }
            // });
        }

    }
}

export const getProductFilter = (payload) => {
    return async dispatch => {
        // dispatch({ type: productConstants.GET_PRODUCT_SEARCH_REQUEST });
        try {
            const res = await axios.get(`/products/?sort=${payload.type ? payload.type : 'createAt'}&slug=${payload.slug}`);
            dispatch({
                type: productConstants.GET_PRODUCT_FILTER_SUCCESS,
                payload: res.data
            });
        } catch (error) {
            // console.log(error);
            // dispatch({
            //     type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
            //     payload: { error: res.data.error }
            // });
        }

    }
}

export const getProductFilterRange = (payload) => {
    return async dispatch => {
        // dispatch({ type: productConstants.GET_PRODUCT_SEARCH_REQUEST });
        try {
            const res = await axios.get(`/products/filter_by_range?sort=${payload.type ? payload.type : 'discount'}&slug=${payload.slug}&min=${payload.min}&max=${payload.max}`);
            dispatch({
                type: productConstants.GET_PRODUCT_FILTER_RANGE_SUCCESS,
                payload: res.data
            });

            console.log(res.data)
        } catch (error) {
            // console.log(error);
            // dispatch({
            //     type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
            //     payload: { error: res.data.error }
            // });
        }

    }
}