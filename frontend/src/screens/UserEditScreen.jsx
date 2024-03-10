import React, { useState,useEffect } from 'react'
import { Link,useLocation,useNavigate, useParams} from 'react-router-dom'
import { Row,Col,Button ,Form} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { getUserDetails } from '../actions/userActions'

import FormContainer from '../components/FormContainer'

function UserEditScreen() {
    const [email,setEmail] = useState('');
    
    const [name,setName]=useState('');
    const [isAdmin,setIsAdmin] = useState(false);

    const { id } = useParams();

    const userId = Number(id);
    
   
    const dispatch = useDispatch();
    
    



    const userDetails = useSelector(state => state.userDetails)


    const {error,loading,user} = userDetails


    useEffect(()=>{

        if( user._id !== userId){

            dispatch(getUserDetails(userId));
        }else{
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.IsAdmin);
        }
        
    },[user,userId])



    





    const submitHandler = (e)=>{
        e.preventDefault()

        
    }
  return (
    <div>

            <Link to='/admin/userlist'>
                Go Back
            </Link>

            <FormContainer>
                    <h1>Edit User</h1>
                   

                   
                        
                            <Form onSubmit={submitHandler}>

                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control

                                        type='name'
                                        placeholder='Enter name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='email'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter Email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='isadmin'>
                                    <Form.Check
                                        type='checkbox'
                                        label='Is Admin'
                                        checked={isAdmin}
                                        onChange={(e) => setIsAdmin(e.target.checked)}
                                    >
                                    </Form.Check>
                                </Form.Group>

                                <Button type='submit' variant='primary'>
                                    Update
                                </Button>

                        </Form>
                    

            </FormContainer >
    </div>
  )
}

export default UserEditScreen