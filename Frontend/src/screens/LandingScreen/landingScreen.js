import React, { useEffect } from 'react'
import {allProducts} from '../../actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
import Products from '../../components/ProductDisplay/ProductDisplay'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { Row, Col } from 'react-bootstrap'
import './landing.css'



const LandingScreen = () => {

      const dispatch = useDispatch()

      const productsAll = useSelector((state) => state.allproduct)
      const { loading, error, products } = productsAll

      useEffect(() => {
            dispatch(allProducts())
      }, [dispatch])


      return (
            <>
            <br></br>
                <h1 style={{ textAlign: "center" }}>MENU</h1>
                {
                        loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>
                        ) : (
                              <Row className='ro' style={{ backgroundColor: "#eaeaf7" }} >
                              {products.map((product) =>

                                    <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                                          <Products product={product} />
                                    </Col>
                                   
                                    
                              
                               )}
                  </Row>
                  )}
                 
            </>
      )
}

export default LandingScreen