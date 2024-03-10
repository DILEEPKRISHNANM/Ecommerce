import React, {  useEffect} from 'react'
import { Table,Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import  Loader  from '../components/Loader'
import { deleteUser, listUser } from '../actions/userActions'





function UserListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;


  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin



  const userDelete = useSelector(state=>state.userDelete)
  const {success:succesDelete} = userDelete


  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
        dispatch(listUser())
    } else {
      navigate('/login')
        
    }

}, [dispatch, navigate, userInfo,succesDelete])



  const deleteHandler =(id,isadmin)=>{
    if(isadmin){
      window.alert('Admin Cannot be deleted')
    }
    else if(window.confirm("Are you sure??")){
      dispatch(deleteUser(id))
    }
    
  }

  

  // Ensure that users is always an array
  // console.log(users)
  

  return (
    <div>
      <h1>USERS</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped responsive bordered hover className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              { users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? (
                    <i className='fas fa-check' style={{color:'green'}}></i>
                  )
                    :(
                      <i className='fas fa-check' style={{color:'red'}}></i>
                    )
                  
                  }
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>


                    <Button variant='danger' className='btn-sm'>
                        <i className='fas fa-trash' onClick={()=>deleteHandler(user._id,user.isAdmin)}></i>

                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default UserListScreen;

