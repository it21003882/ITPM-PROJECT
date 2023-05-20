import axios from 'axios'
import {
      PRODUCT_BYID_REQUEST,
      PRODUCT_BYID_SUCCESS,
      PRODUCT_BYID_FAIL,
      PRODUCT_ALL_REQUEST,
      PRODUCT_ALL_SUCCESS,
      PRODUCT_ALL_FAIL
     
} from '../constants/productConstants'




export const allProducts = () => async (dispatch) => {
      try {
            dispatch({
                  type: PRODUCT_ALL_REQUEST,
            })
  
            const { data } = await axios.get('/api/products/')
  
            console.log(data)
  
            dispatch({
                  type: PRODUCT_ALL_SUCCESS,
                  payload: data
            })
      } catch (error) {
            console.log(error)
  
            dispatch({
                  type: PRODUCT_ALL_FAIL,
                  payload:
                        error.response && error.response.data.message
                              ? error.response.data.message
                              : error.message,
  
            })
      }
  }

export const getProductDetails = (id) => async (dispatch, getState) => {
      try {
            dispatch({
                  type: PRODUCT_BYID_REQUEST,
            })

            const { data } = await axios.get(`/api/products/${id}`)

            dispatch({
                  type: PRODUCT_BYID_SUCCESS,
                  payload: data
            })

      } catch (error) {
            dispatch({
                  type: PRODUCT_BYID_FAIL,
                  payload:
                        error.response && error.response.data.message
                              ? error.response.data.message
                              : error.message,
            })
      }
}

