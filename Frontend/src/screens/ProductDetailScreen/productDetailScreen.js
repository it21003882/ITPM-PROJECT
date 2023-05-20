import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { getProductDetails } from '../../actions/productAction'
import Aos from 'aos'
import 'aos/dist/aos.css'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import './productDetail.css'

Aos.init()
Aos.refresh()

const ProductDetail = ({ match, history }) => {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const productDetailsByid = useSelector((state) => state.productDetailsByid)
    const { loading, error, products } = productDetailsByid

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        dispatch(getProductDetails(match.params.id))
    }, [dispatch, match])





    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }




    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <div className="container">
                        <div className='op' data-aos="zoom-in">
                            <Row>

                                <Col md={7}>
                                    <Image src={products.image} alt={products.name} fluid />
                                </Col>

                                <Col md={5} className="rt">
                                    <h4>ADD TO CART</h4>
                                    <Card >
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Category:</Col>
                                                    <Col>
                                                        <strong> {products.category}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                        <strong>LKR {products.price}.00</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Control
                                                            type='number'
                                                            placeholder='Enter name'
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>


                                            <ListGroup.Item>
                                                <Button
                                                    onClick={addToCartHandler}
                                                    className='btn-block '
                                                    type='button'
                                                    variant='warning'
                                                >
                                                    Add To Cart
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>

                                </Col>
                            </Row>

                            <Row>
                                <Col md={7}>
                

                                    <br></br>
                                    <div class="fg">
                                        <div className="df">
                    
                                            <h2> {products.name}</h2>
                                        </div>
                                    </div>
                                    <hr></hr>

                                    <h6>LKR {products.price}.00</h6>
                                    <h6>About the ItemS</h6>
                                    <p>{products.description}</p>
                                </Col>
                                <Col md={5} className="re">

                                </Col>
                            </Row>
                        </div>
                    </div>
                </>
            )
            }
        </>
    )
}

export default ProductDetail
