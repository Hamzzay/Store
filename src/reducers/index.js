import { combineReducers } from 'redux';
import ProductReducer from './ProductReducer';
import OrderReducer from './OrderReducer';

export default combineReducers({
    store: ProductReducer,
    order: OrderReducer,

});