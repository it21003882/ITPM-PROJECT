import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import './product.css'

const Products = ({ product }) => {
      return (
            <Card className='my-3 p-3 rounded'>
                  <Link to={`/product/${product._id}`}>
                        <Card.Img className='card-img' src={product.image} variant='top' />
                  </Link>

                  <Card.Body>
                        <Link to={`/product/${product._id}`}>
                              <Card.Title as='div' style={{ color: "#daa520" }}><strong>{product.name}</strong></Card.Title>
                        </Link>

                        <Card.Text as='h3' style={{fontSize:"18px"}}>
                              Rs.{product.price}
                        </Card.Text>
                  </Card.Body>
            </Card>
      )
}

export default Products