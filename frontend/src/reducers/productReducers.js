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
    PRODUCT_DETAILS_RESET,

    PRODUCT_ADD_REQUEST,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_ADD_FAIL,
    PRODUCT_ADD_RESET,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,

    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL,
    PRODUCT_REVIEW_RESET,
}from '../constants/productConstants.js'


export const productListReducer = (state={products:[]}, action) =>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return{loading:true, products:[]}

        
            case PRODUCT_LIST_SUCCESS:
                return{loading:false, products:action.payload}

                case PRODUCT_LIST_FAIL:
                    return{loading:false, error:action.payload}
                
                    default:
                        return state
            
    
        }
}


export const productDetailsReducer = (state={product:{reviews:[]}}, action) => {
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return{loading:true, ...state}

        
            case PRODUCT_DETAILS_SUCCESS:
                return{loading:false, product:action.payload}

                case PRODUCT_DETAILS_FAIL:
                    return{loading:false, error:action.payload}
                case PRODUCT_DETAILS_RESET:
                  return {}
                
                    default:
                        return state
            
    
        }
}

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_ADD_REQUEST:
        return { loading: true };
      case PRODUCT_ADD_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case PRODUCT_ADD_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_ADD_RESET:
        return {};
      default: 
        return state;
    }
  };

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_DELETE_REQUEST:
        return {
          loading: true,
         
        };
      case PRODUCT_DELETE_SUCCESS:
        return {
          loading: false,
          success: true,
        };
      case PRODUCT_DELETE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  } 



export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
      case PRODUCT_UPDATE_REQUEST:
        return { loading: true };
      case PRODUCT_UPDATE_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case PRODUCT_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_UPDATE_RESET:
        return { product: {} };
      default:
        return state;
    }
  };

  export const productReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_REVIEW_REQUEST:
        return {
          ...state,
          loading: true
        };
      case PRODUCT_REVIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          needProductRefresh: true // Set the flag to true after successful review
        };
      case PRODUCT_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case PRODUCT_REVIEW_RESET:
        return {
          ...state// Reset the flag when resetting the review state
        };
      default:
        return state;
    }
  };
  