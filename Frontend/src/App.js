import React from 'react'
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

import LoginScreen from './screens/LoginScreen/loginScreen'
import LandingScreen from './screens/LandingScreen/landingScreen';
import OrderManagement from './screens/OrderManagementScreen/orderManagementScreen';
import ProductDetail from './screens/ProductDetailScreen/productDetailScreen'
import CartScreen from './screens/CartScreen/cartScreen'
import PaymentScreen from './screens/PaymentScreen/payementScreen'
import PlaceOrder from './screens/PlaceOrderScreen/placeOrderScreen'
import Nav1 from './components/Navbar/navbar';
import OrderScreen from './screens/OrderScreen/orderScreen'
import OrderList from './screens/OrderListScreen/orderListScreen'
import ShippingScreen from './screens/ShippingScreen/shippingScreen';





const App = () => {
  return (
    <Router>
      <div>
        <Nav1 />
        <Route path="/" component={LandingScreen} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/OrderManagement" component={OrderManagement} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path='/cart/:id?' component={CartScreen} />
        <Route path='/payment' component={PaymentScreen} />
        <Route path='/placeorder' component={PlaceOrder} />
        <Route path='/order/:id' component={OrderScreen} />
        <Route path='/orderList' component={OrderList} />
        <Route path='/shipping' component={ShippingScreen} />
      </div>
    </Router>
  );
}

export default App;
