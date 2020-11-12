import React from 'react';
import Header from '../Header.jsx'
import Footer from '../Footer.jsx'
import Home from '../Page/Home.jsx'
import Login from '../Page/Login.jsx'
import Register from '../Page/Register.jsx'
import ShoppingCart from '../Page/ShoppingCart.jsx'
import Product from '../Page/Product/Product.jsx'
import Buy from '../Page/Buy.jsx'
import ConnectedAccount from '../Page/ConnectedAccount.jsx'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";


function App(){
    return <Router>

            <Header></Header>

                <Switch>
                    <Route exact path="/Login">
                        <Login></Login>
                    </Route>
                    <Route exact path="/Register">
                        <Register></Register>
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
                    <Route exact path="/ConnectedAccount">
                        <ConnectedAccount></ConnectedAccount>
                    </Route>
                    <Route path="/">
                        <Home></Home>
                    </Route>
                </Switch>

            <Footer></Footer>
    </Router>    
}

export default App;