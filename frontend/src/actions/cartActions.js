import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    // Use the updated cart items from the action payload
    const updatedCartItems = getState().cart.cartItems;

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  } catch (error) {
    // Handle the error here
    console.error("Error fetching product:", error);
    // You can dispatch an error action here to handle the error in your Redux store
    // For example: dispatch({ type: 'PRODUCT_FETCH_ERROR', error: 'Failed to fetch product.' });
    // Alternatively, you can show an error message to the user or take other appropriate actions.
  }
};

export const removeFromCart = (id) => (dispatch, getState) =>{
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,

    })
    const updatedCartItems = getState().cart.cartItems;

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
}
