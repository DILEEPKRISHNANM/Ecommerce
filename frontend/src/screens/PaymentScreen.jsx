import React ,{useState}from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { Button ,Form,Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import  CheckOutSteps  from '../components/CheckOutSteps'
import { savePaymentMethod } from '../actions/cartActions'
function PaymentScreen() {

    const navigate = useNavigate()
    const cart=useSelector(state=>state.cart);
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    const [paymentmethod,setPaymentMethod] = useState('paypal')

    if(!shippingAddress){
        navigate('/shipping')
    }


    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentmethod))
        navigate('/placeorder')
    }



  return (
    <FormContainer>
            <CheckOutSteps  step1 step2 step3/>
            <Form onSubmit={submitHandler} className='mt-5'>
                    <Form.Group>
                        <Form.Label as='legend'><strong>Select Method</strong></Form.Label>
                        <Col>
                            <Form.Check
                                type='radio'
                                label='Paypal or Credit card'
                                id='paypal'
                                name='paymentMethod'
                                checked
                                onChange={(e)=>setPaymentMethod(e.target.value)}
                                style = {{marginLeft:'40px'}}
                            >
                                
                            </Form.Check>


                            <Button type='submit' variant='primary' className='mt-3'>continue</Button>
                        
                        </Col>
                    </Form.Group>

            </Form>

    </FormContainer>
  )
}

export default PaymentScreen