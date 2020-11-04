import React from 'react';
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import Home from '../Home/Home.jsx'
import Login from '../Login/Login.jsx'
import Account from '../Account/Account.jsx'
import ShoppingCart from '../ShoppingCart/ShoppingCart.jsx'
import Product from '../Product/Product.jsx'
import Buy from '../Buy/Buy.jsx'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";



function App(){
    return <div>
        <Header></Header>
        
        <Router>
            <Switch>
                <Route exact path="/Login">
                    <Login></Login>
                </Route>
                <Route exact path="/Account">
                    <Account></Account>
                </Route>
                <Route exact path="/ShoppingCart">
                    <ShoppingCart></ShoppingCart>
                </Route>
                <Route exact path="/Product">
                    <Product></Product>
                </Route>
                <Route exact path="/Buy">
                    <Buy></Buy> 
                </Route>
                <Route path="/">
                    <Home></Home>
                </Route>
            </Switch>
        </Router>
        
        <Footer></Footer>
    </div>
}

export default App;