
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import  PlaceOrderScreen  from './screens/PlaceOrderScreen';
import  OrderScreen  from './screens/OrderScreen';
import  UserListScreen  from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen'




function App() {
  return (
    <div className="App">
      <Router>

      <Header />
      <main className="py-5">
        
        <Container>
          <Routes>
              <Route path='/' Component={HomeScreen} exact />
              <Route path='/shipping' Component={ShippingScreen} />
              <Route path='/login' Component={LoginScreen}  />
              <Route path='/register' Component={RegisterScreen}  />
              <Route path='/profile' Component={ProfileScreen}  />
              <Route path='/order/:id' Component={OrderScreen}  />
              <Route path='/products/:id' Component={ProductScreen}  />
             
              <Route path='cart/:id?' Component = {CartScreen} />
              <Route path='/placeorder'  Component={PlaceOrderScreen} />
              
              <Route path='/payment' Component={PaymentScreen} />
              <Route path='/admin/userlist' Component={UserListScreen} />
              <Route path='/admin/user/:id/edit' Component={UserEditScreen} />
              
              
              
          </Routes>
            
        </Container>
          
      </main>
     
      <Footer />

      </Router>
     
    </div>
  );
}

export default App;
