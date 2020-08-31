import Axios from "axios";
import Cookie from "js-cookie";
import { CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING, 
    CART_SAVE_PAYMENT } from "../constants/cartConstants.js";

/* const is used to make a function expression
used to add an item to the cart.*/
const addToCart = (productId,qty) => async (dispatch, getState) =>{

    try{

const {data} = await Axios.get("/api/products/" + productId);
dispatch({type: CART_ADD_ITEM  , payload: {
/* defining what we want in our shopping cart*/
    product: data._id,
    name: data.name,
    image: data.image,
    price: data.price,
    countInStock: data.countInStock,
    qty
}});

/* used to get access to the cart items we have defined above
it saves the cart items to the cookie so that when you add new items to the cart and refresh they still appear
in the cart.*/

const {cart:{cartItems}} = getState();
Cookie.set("cartItems", JSON.stringify(cartItems));

    }
    catch(error){


    }
}

const removeFromCart = (productId) => (dispatch,getState) => {
    dispatch({type:CART_REMOVE_ITEM, payload:productId});

    const { cart:{cartItems}} = getState();
Cookie.set("cartItems", JSON.stringify(cartItems));
}

/* shipping cart actions */

const saveShipping = (data) => (dispatch) =>{

    dispatch({type: CART_SAVE_SHIPPING, payload: data});
}

/*payment cart actions */
const savePayment = (data) => (dispatch) =>{

    dispatch({type: CART_SAVE_PAYMENT, payload: data});
}

export {addToCart, removeFromCart, saveShipping, savePayment };