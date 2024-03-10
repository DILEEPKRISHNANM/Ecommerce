import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import {productListReducer,productDetailsReducer} from './reducers/productReducers'; // Assuming productListReducers is a default export
import { cartReducer } from './reducers/cartReducers';

import { UserDetailsReducer, UserLoginReducer,UserRegisterReducer,UserUpdateProfileReducer,UserListReducer,UserDeleteReducer } from './reducers/userReducers'


import { orderCreateReducer ,orderDetailReducer,orderPayReducer,orderListMyyReducer} from './reducers/orderReducers'



const cartItemsFromStorage = localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems')) :[]

const userInfoFromStorage = localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')) :null


const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?
    JSON.parse(localStorage.getItem('shippingAddress')) :{}


const initialState = {
    cart:{
        cartItems:cartItemsFromStorage,
        shippingAddress:shippingAddressFromStorage,
    },
    userLogin:{userInfo:userInfoFromStorage}
};

const middleware = [thunk];

// const store = configureStore({
//   reducer: {
//     productList: productListReducers,
//   },
//   middleware,
//   devTools: true,
//   preloadedState: initialState,
// });

// export default store;

const store = configureStore({
    reducer:{
        productList:productListReducer,
        productDetails:productDetailsReducer,
        cart:cartReducer,
        userLogin:UserLoginReducer,
        userRegister:UserRegisterReducer,
        userDetails:UserDetailsReducer,
        UserUpdateProfile:UserUpdateProfileReducer,
        orderCreate:orderCreateReducer,
        orderDetail:orderDetailReducer,
        orderPay:orderPayReducer,
        orderListMy:orderListMyyReducer,
        userList:UserListReducer,
        userDelete:UserDeleteReducer

    },
    middleware,
    devTools:true,
    preloadedState:initialState,
});


export default store;
