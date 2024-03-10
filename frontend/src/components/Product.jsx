import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({product}) {
  return (
    <Card className='p-3 my-3 rounded'>
       <Link to={`/products/${product._id}`} >
        <Card.Img src={product.image} />
        </Link>

        <Card.Body>
                <Link to={`/products/${product._id}`} >
                       <Card.Title as="div">
                            <strong>{product.name}</strong>
                        </Card.Title>
                </Link>
        </Card.Body>

        <Card.Text as="div">
                <div className='my-3'>

                    <Rating value={product.rating} text={` ${product.numReviews} reviews`}  color={'#f8e825'}/>   


                    {/*  here color object is created and the value in the color variable is like {color:#f8e825} so css style for the color as expected!!*/}
                </div>
        </Card.Text>

        <Card.Text as="h4">
                ${product.price}
        </Card.Text>


    </Card>
  )
}

export default Product