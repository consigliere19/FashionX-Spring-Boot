import axios from 'axios';

const CARTITEMS_API_BASE_URL = "https://localhost:8443/cart/items";

class CartItemService{
    getCartItems(){
        return axios.get(CARTITEMS_API_BASE_URL);
    }

    addCartItem(cartItem){
        return axios.post(CARTITEMS_API_BASE_URL, cartItem);
    }

    getCartItemById(cartItemId){
        return axios.get(CARTITEMS_API_BASE_URL + '/' + cartItemId);
    }

    updateCartItem(cartItem, cartItemId){
        return axios.put(CARTITEMS_API_BASE_URL + '/' + cartItemId, cartItem);
    }

    deleteCartItem(cartItemId){
        return axios.delete(CARTITEMS_API_BASE_URL + '/' + cartItemId);
    }
}

export default new CartItemService();