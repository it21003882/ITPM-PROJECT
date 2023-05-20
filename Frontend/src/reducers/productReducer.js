import {
      PRODUCT_BYID_REQUEST,
      PRODUCT_BYID_SUCCESS,
      PRODUCT_BYID_FAIL,
      PRODUCT_ALL_REQUEST,
      PRODUCT_ALL_SUCCESS,
      PRODUCT_ALL_FAIL
} from '../constants/productConstants'


export const productsAllReducer = (state = { products: [] }, action) => {
      switch (action.type) {
            case  PRODUCT_ALL_REQUEST:
                  return { loading: true }
            case PRODUCT_ALL_SUCCESS:
                  return { loading: false, products: action.payload }
            case PRODUCT_ALL_FAIL:
                  return { loading: false, error: action.payload }
            default:
                  return state
      }
  }


export const productDetailsReducer = (state = { products: {} }, action) => {
      switch (action.type) {
            case PRODUCT_BYID_REQUEST:
                  return { ...state, loading: true }
            case PRODUCT_BYID_SUCCESS:
                  return { loading: false, products: action.payload }
            case PRODUCT_BYID_FAIL:
                  return { loading: false, error: action.payload }
            default:
                  return state
      }
}

