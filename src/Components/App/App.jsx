import React from 'react';
import Header from '../Header.jsx'
import Footer from '../Footer.jsx'
import Home from '../../Pages/Home.jsx'
import Login from '../../Pages/Login.jsx'
import Register from '../../Pages/Register.jsx'
import ShoppingCart from '../../Pages/ShoppingCart.jsx'
import Product from '../../Pages/Product.jsx'
import Buy from '../../Pages/Buy.jsx'
import ConnectedAccount from '../../Pages/ConnectedAccount.jsx'
import AdminHome from '../../Pages/AdminHome.jsx'
import {UserContextProvider} from '../UserContext.jsx'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

  

function App(){

    return <Router>
            <UserContextProvider>
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
                    <Route exact path="/Product/:id">
                        
                        <Product></Product>
                    </Route>
                    <Route exact path="/Buy">
                        <Buy></Buy> 
                    </Route>
                    <Route exact path="/ConnectedAccount">
                        <ConnectedAccount></ConnectedAccount>
                    </Route>
                    <Route path="/admin/home">
                        <AdminHome></AdminHome>
                    </Route>
                    <Route path="/">
                        <Home></Home>
                    </Route>
                </Switch>
                <Footer></Footer>
            </UserContextProvider>
    </Router>    
}

export  {App};