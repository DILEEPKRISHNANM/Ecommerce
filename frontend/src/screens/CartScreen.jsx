import React ,{useEffect} from 'react'

import {Link,useParams,useLocation,useNavigate} from 'react-router-dom'

import { useDispatch,useSelector } from 'react-redux'
import { Row,Col,ListGroup,Image,Form,Button,Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart,removeFromCart } from '../actions/cartActions'

function CartScreen() {

  const navigate = useNavigate();
  const id = useParams();
  const productId = id.id;
  const location = useLocation();
  const qty = new URLSearchParams(location.search).get('qty')
  const dispatch = useDispatch();


  const cart = useSelector(state=>state.cart)
  // console.log(cart.cartItems)
  const cartItems = cart ? cart.cartItems :[];
 

  useEffect(()=>{
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  },[dispatch,productId,qty])



  
  const removeFromCartHandler = (id) =>{
    console.log("removed",id)
    dispatch(removeFromCart(id))
  }
  
  

  const checkOutHandler = () =>{
    navigate('/login?redirect=shipping')
  }
  
  // console.log(productId)
  
  
  return (
    <div>
        <Row>
            <Col md={8}>
              <h1>Shopping cart</h1>
              {cartItems.length===0 ? (<Message variant='info'>Your Cart is Empty <Link to='/'>Go Back</Link></Message>):(
                <ListGroup variant='flush'>
                  {cartItems.map(item =>(
                    <ListGroup.Item key={item.product}>
                        <Row>
                          <Col md={2}>
                              <Image src={item.image} alt={item.name}  fluid rounded/>
                          </Col>

                          <Col md={3}>
                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                              
                          </Col>

                          <Col md={2}>
                              ${item.price}
                          </Col>


                          <Col md={3}>
                              <Form.Control
                                      as="select"
                                      value={item.qty}
                                      onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}
                                      style={{
                                        WebkitAppearance: 'menulist-button',
                                        MozAppearance: 'menulist-button',
                                        appearance: 'menulist-button',
                                        cursor:'pointer'
                                        /* Add other local styles as needed */
                                      }}
                              >
                               {parseInt(item.countInStock, 10) > 0 &&
                                  [...Array(item.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  ))}
                              </Form.Control>
                          </Col>

                          <Col md={1}>

                            <Button 
                              type='button' 
                              variant='light'
                              onClick={()=>removeFromCartHandler(item.product)}
                            >
                              <i className='fas fa-trash'></i>
                            </Button>
                          </Col>
                          
                        </Row>
                    </ListGroup.Item>
                  ))}

                </ListGroup>
              )
              }

            </Col>

            <Col md={4}>
                <Card>
                  <ListGroup>
                    <ListGroup.Item>
                      <h2>SubTotal: ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})items</h2>
                      ${cartItems.reduce((acc,item)=>acc+Number(item.qty)*item.price,0).toFixed(2)}

                    </ListGroup.Item>


                    <ListGroup.Item>
                     <Button
                     type='button'
                     className='btn-block'
                     disabled = {cartItems.length === 0}
                     onClick={checkOutHandler}
                     >
                      Proceed To CheckOut

                     </Button>

                    </ListGroup.Item>
                  </ListGroup>
                </Card>

            </Col>
        </Row>
    </div>
  )
}

export default CartScreen