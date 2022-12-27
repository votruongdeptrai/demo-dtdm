import { productConstants } from "../actions/constants"
import { persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";

const initState = {
    categoryParent: '',
    categoryName: '',
    products: [],
    countProducts: '',
    priceRange: {},
    productsByPrice: {},
    pageRequest: false,
    page: {},
    error: null,
    productDetails: {},
    loading: false,
}

const persistConfig = {
    key: 'product',
    storage: storage,
    blacklist: ['categoryParent', 'categoryName', 'countProducts', 'priceRange', 'productsByPrice', 'pageRequest', 'error', 'productDetails', 'loading']
};


const productReducer = (state = initState, action) => {
    switch (action.type) {
        case productConstants.GET_PRODUCTS_BY_SLUG_REQUEST:
            console.log(state)
            return state = {
                ...state,
                loading: true
            }
        case productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS:
            return state = {
                ...state,
                loading: false,
                categoryParent: action.payload.categoryParent,
                countProducts: action.payload.countProducts,
                categoryName: action.payload.categoryName,
                products: action.payload.products,
                priceRange: action.payload.priceRange,
                productsByPrice: {
                    ...action.payload.productsByPrice,
                },
            }

        case productConstants.GET_PRODUCTS_BY_SLUG_FAILURE:
            return state = {
                ...state,
                error: action.payload.err,
                loading: false
            }

        case productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
            return state = {
                ...state,
                loading: true,
            };
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            return state = {
                ...state,
                loading: false,
                productDetails: action.payload.productDetails,
            };
        case productConstants.GET_PRODUCT_FILTER_SUCCESS:
            return state = {
                ...state,
                loading: false,
                products: [...action.payload.products]
            };
        case productConstants.GET_PRODUCT_SEARCH_SUCCESS:
            return state = {
                ...state,
                loading: false,
                products: [...action.payload.products]
            };
        case productConstants.GET_PRODUCT_FILTER_RANGE_SUCCESS:
            return state = {
                ...state,
                loading: false,
                products: [...action.payload.products]
            };
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
            return state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        default:
            return state

    }

}

export default persistReducer(persistConfig, productReducer)