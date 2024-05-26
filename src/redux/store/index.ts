/* eslint-disable no-return-assign */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { thunk } from 'redux-thunk';
import productDetailReducer from '../slices/productDetailsSlice'
import productReducer from '../slices/productSlice';
import searchReducer from '../slices/searchSlice';
import cartSlice from '../slices/cartSlice';
import userSlice from '../slices/userSlice';

const persistConfig = {
  key: 'root', // optional, if you have multiple reducers, use a unique key for each
  storage: AsyncStorage,
  whitelist: ['cart', 'user'],
};

const rootReducer = combineReducers({
  productDetail: productDetailReducer,
  products: productReducer,
  search: searchReducer,
  cart: cartSlice,
  user: userSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
export const BASE_URL = "https://grocery.chainpulse.tech/api/"
