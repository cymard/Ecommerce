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
                <Switch>
                    <Route exact path="/Login">
                        <Header></Header>
                        <Login></Login>
                        <Footer></Footer>
                    </Route>
                    <Route exact path="/Register">
                        <Header></Header>
                        <Register></Register>
                        <Footer></Footer>
                    </Route>
                    <Route exact path="/ShoppingCart">
                        <Header></Header>
                        <ShoppingCart></ShoppingCart>
                        <Footer></Footer>
                    </Route>
                    <Route exact path="/Product/:id">
                        <Header></Header>
                        <Product></Product>
                        <Footer></Footer>
                    </Route>
                    <Route exact path="/Buy">
                        <Header></Header>
                        <Buy></Buy> 
                        <Footer></Footer>
                    </Route>
                    <Route exact path="/ConnectedAccount">
                        <Header></Header>
                        <ConnectedAccount></ConnectedAccount>
                        <Footer></Footer>
                    </Route>
                    <Route path="/admin/home">
                        <AdminHome></AdminHome>
                    </Route>
                    <Route path="/">
                        <Header></Header>
                        <Home></Home>
                        <Footer></Footer>
                    </Route>
                </Switch>
                
            </UserContextProvider>
    </Router>    
}

export  {App};