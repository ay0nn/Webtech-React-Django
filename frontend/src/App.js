import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { Container } from 'react-bootstrap';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/login' element={<LoginScreen />} exact />

            <Route path='/register' element={<RegisterScreen />} exact />
            <Route path='/profile' element={<ProfileScreen />} exact />
            <Route path='/shipping' element={<ShippingScreen />} exact />
            <Route path='/payment' element={<PaymentScreen />} exact />
            <Route path='/placeorder' element={<PlaceOrderScreen />} exact />
            <Route path='/orders/:id' element={<OrderScreen/>} exact />
            <Route path='/product/:id' element={<ProductScreen />} />

            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path='/admin/userList' element={<UserListScreen />} />

            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />

          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
