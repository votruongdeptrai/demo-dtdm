import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    blacklist: ['auth', 'cart', 'user', 'product'],
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

const Persistor = persistStore(store)
export {Persistor}
export default store;