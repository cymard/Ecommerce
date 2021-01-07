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
import AdminNavBar from '../../Components/AdminNavBar.jsx'
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
                    </Route>
                    <Route exact path="/Register">
                        <Header></Header>
                        <Register></Register>
                    </Route>
                    <Route exact path="/ShoppingCart">
                        <Header></Header>
                        <ShoppingCart></ShoppingCart>
                    </Route>
                    <Route exact path="/Product/:id">
                        <Header></Header>
                        <Product></Product>
                    </Route>
                    <Route exact path="/Buy">
                        <Header></Header>
                        <Buy></Buy> 
                    </Route>
                    <Route exact path="/ConnectedAccount">
                        <Header></Header>
                        <ConnectedAccount></ConnectedAccount>
                    </Route>
                    <Route path="/admin/home">
                        <AdminNavBar></AdminNavBar>
                        <AdminHome></AdminHome>
                    </Route>
                    <Route path="/">
                        <Header></Header>
                        <Home></Home>
                    </Route>
                </Switch>
                <Footer></Footer>
            </UserContextProvider>
    </Router>    
}

export  {App};