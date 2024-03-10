import React, {  useEffect, useState } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link,useNavigate,useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PayPalButton } from 'react-paypal-button-v2'

import { getOrderDetails,payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'


function OrderScreen() {


    const {id} = useParams();
    const orderId = id
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const orderDetail = useSelector(state=>state.orderDetail)


    const { error, order, loading } = orderDetail || {};

    const [sdkReady,setSdkReady] = useState(false)


    const orderPay = useSelector(state=>state.orderPay)


    const { loading:loadingPay,success:successPay} = orderPay

    
    

   

    




    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc,item)=> acc+(item.price * item.qty),0).toFixed(2)
    }
    
   
    const addPayPalScript = ()=>{
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AasfuGd1ScF20b_vae8WarpwwSys6tlAqbIHUBkU3bVNAzYHif3uqd2uEYlNNMlByl6klO7gzBea2NQu'
        script.async = true
        script.onload = ()=>{
                setSdkReady(true)
        }
        document.body.appendChild(script)
    }


    const successPaymentHandler = (paymentResult)=>{
        dispatch(payOrder(orderId,paymentResult))
    }

    useEffect(()=>{
        if(!order || order._id !== Number(orderId)||successPay){
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
        
    },[dispatch,order,orderId,successPay])

    

    


  
    return loading ? (<Loader />)
        :error ? (
            <Message variant='danger'>{error}</Message>
        ) :( 
                            <div>
                                <h1>Order Id : {order._id}</h1>
                            
                                <Row>
                                    <Col md={8}>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <h2>Shipping</h2>
                                                <p><strong>Name :</strong>{order.user.name}</p>
                                                <p><strong>Email: </strong><a href={`mailto:${order.user.email}`} style={{'text-decoration':'none'}}>{order.user.email}</a></p>
                                                <p>
                                                    <strong>Shipping: </strong>
                                                    
                                                    {order.shippingAddress.address}, <br /> {order.shippingAddress.city} 
                                                    {'  '}
                                                    {order.shippingAddress.postalCode},
                                                    {'  '}
                                                    {order.shippingAddress.country}
                                                </p>

                                                { order.isDelivered ? 
                                                    <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                                                    : <Message variant='warning'>Not Delivered</Message>
                                                }
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <h2>Payment Method</h2>
                                                <p>
                                                    <strong>Method: </strong>
                                                    {order.paymentMethod}
                                                </p>

                                                { order.isPaid ? 
                                                    <Message variant='success'>paid on {order.paidAt}</Message>
                                                    : <Message variant='warning'>Not Paid</Message>
                                                }
                                                    
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <h2>Order Items</h2>
                                                {order && order.orderItems && order.orderItems.length === 0 ? 
                                                            <Message variant='info'> Your Order Is Empty</Message>
                                                            : (
                                                                <ListGroup>
                                                                    {order.orderItems.map((item,index)=>(
                                                                                <ListGroup.Item key={index}>
                                                                                    <Row>
                                                                                        <Col md={1}>
                                                                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                                                                        </Col>

                                                                                        <Col>
                                                                                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                                                        </Col>


                                                                                        <Col md={4}>
                                                                                                {item.qty} x $ {item.price} = $ {(item.qty * item.price).toFixed(2)}
                                                                                        </Col>
                                                                                    </Row>
                                                                                </ListGroup.Item>
                                                                    ))}
                                                                </ListGroup>
                                                            )
                                                }
                                            </ListGroup.Item>

                                        

                                        </ListGroup>

                                    </Col>


                                    <Col md={4}>


                                        <Card>
                                            <ListGroup variant='flush'>
                                                <ListGroup.Item>
                                                    <h2>Order Summary</h2>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Item:</Col>
                                                        <Col>
                                                            $ {order.itemsPrice}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>


                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Shipping:</Col>
                                                        <Col>
                                                            $ {order.shippingPrice}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>


                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Tax:</Col>
                                                        <Col>
                                                            $ {order.taxPrice}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>


                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Total Price:</Col>
                                                        <Col>
                                                            $ {order.totalPrice}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>


                                                {!order.isPaid && (
                                                            <ListGroup.Item>
                                                                {loadingPay && <Loader />}

                                                                {!sdkReady ? (
                                                                    <Loader />
                                                                ) : (
                                                                        <PayPalButton
                                                                            amount={order.totalPrice}
                                                                            onSuccess={successPaymentHandler}
                                                                        />
                                                                    )}
                                                            </ListGroup.Item>
                                                )}

                                            
                                            
                                            </ListGroup>
                            
                                        </Card>
                                    </Col>

                                </Row>
                            </div>
        )
}

export default OrderScreen