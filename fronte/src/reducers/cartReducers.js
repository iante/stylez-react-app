import { CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING, 
    CART_SAVE_PAYMENT } from "../constants/cartConstants";

function cartReducer(state={cartItems: [], shipping:{}, payment:{} }, action){

switch(action.type){

    case CART_ADD_ITEM:
        const item = action.payload;
        /* searching for the product in state.CartItems
        
        (x=> x.product===item.product); --> if product matches,replace the product in the if statetement 
        with the products that come to the item */
        const product = state.cartItems.find(x => x.product === item.product);

        if(product){ 
            /*if you add a product in the cart that was already there, the code below will return the new qty
            and update current items */
           return { cartItems: 
            state.cartItems.map(x=> x.product===product.product ? item : x)};
        }

        return{cartItems: [...state.cartItems, item]};

        case CART_REMOVE_ITEM:
            /* defines actions on removing an item from the cart when user clicks the remove button.
            i.e filters it out.*/
            return {cartItems: state.cartItems.filter(x => x.product !== action.payload)};

            case CART_SAVE_SHIPPING:
                return{...state, shipping: action.payload};

                case CART_SAVE_PAYMENT:
                    return{...state, payment: action.payload};
        default:
            return state;
    }



    }



export {cartReducer};
