import React from 'react';
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import Home from '../Home/Home.jsx'
import Login from '../Login/Login.jsx'
import Register from '../Register/Register.jsx'
import ShoppingCart from '../ShoppingCart/ShoppingCart.jsx'
import Product from '../Product/Product.jsx'
import Buy from '../Buy/Buy.jsx'
import RegisterOrConnection from '../RegisterOrConnection/RegisterOrConnection.jsx'
import ConnectedAccount from '../ConnectedAccount/ConnectedAccount.jsx'
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
                    <Route exact path="/RegisterOrConnection">
                        <RegisterOrConnection></RegisterOrConnection>
                    </Route>
                    <Route path="/">
                        <Home></Home>
                    </Route>
                </Switch>

            <Footer></Footer>
    </Router>    
}

export default App;