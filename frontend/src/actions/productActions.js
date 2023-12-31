import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,

    PRODUCT_ADD_REQUEST,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_ADD_FAIL,

    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL,
    PRODUCT_REVIEW_RESET,


}from '../constants/productConstants'
// actions/productActions.js
export const listProducts = (keyword = '', page = 1) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const queryParams = keyword !== null && keyword !== 'null' ? `?keyword=${keyword}&page=${page}` : `?page=${page}`;

    const { data } = await axios.get(`/api/products/${queryParams}`);

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};



export const listProductDetails = (id) => async (dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data}=await axios.get(`/api/products/${id}/`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST });
  
      // Access userInfo from Redux store state using getState
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`, // Include the user token in the request headers
          'Content-Type': 'application/json',
          // Add any other headers if required
        },
      };
  
      await axios.delete(`/api/products/delete/${id}/`, config);
  
      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };

  export const createProduct = () => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_ADD_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(`/api/products/create/`, {}, config);
  
      dispatch({
        type: PRODUCT_ADD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const updateProduct = (product) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/products/update/${product._id}/`,
        product,
        config
      );
  
      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data,
      });
   
      
      dispatch({type:PRODUCT_DELETE_SUCCESS,
         payload:data})
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const reviewProduct = (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_REVIEW_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        `/api/products/${productId}/reviews/`,
        review,
        config
      );
  
      dispatch({
        type: PRODUCT_REVIEW_SUCCESS,
        payload: data,
      });
  
      // Reset the review state after successful review
      dispatch({ type: PRODUCT_REVIEW_RESET });
  
    } catch (error) {
      dispatch({
        type: PRODUCT_REVIEW_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  