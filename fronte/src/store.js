import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { productListReducer,
     productDetailsReducer, 
     productSaveReducer, 
     productDeleteReducer,
     productReviewSaveReducer,} from './reducers/productReducers';

     import {
        orderCreateReducer,
        orderDetailsReducer,
        orderPayReducer,
        myOrderListReducer,
        orderListReducer,
        orderDeleteReducer,
      } from './reducers/orderReducers';

import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { cartReducer } from './reducers/cartReducers';

import { userSigninReducer ,
    userRegisterReducer, 
    userUpdateReducer} from './reducers/userReducers';

/* gets the cart items from the cookie and passes them to the initial state
and if the item doesnt exist it returns an empty array || [];*/
const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {cart:{cartItems, shipping:{}, payment:{}}, userSignin:{userInfo}}; /*initial state is empty */

const reducer = combineReducers({

    productList: productListReducer, /*defining a productList whose values come from 
    productListReducer which is a function i created in the productReducers.js file.
    */
    cart: cartReducer,
    productDetails: productDetailsReducer,
    productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  productReviewSave: productReviewSaveReducer,
    userSignin:  userSigninReducer ,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  userUpdate: userUpdateReducer,
  myOrderList: myOrderListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
/*compose(applyMiddleware(thunk) is a middleware that allows running an async action in redux */

export default store;


