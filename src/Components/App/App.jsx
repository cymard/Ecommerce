import React from 'react';
import Header from '../Header.jsx'
import Footer from '../Footer.jsx'
import Home from '../../Pages/Home.jsx'
import Login from '../../Pages/Login.jsx'
import LoginAdmin from '../../Pages/LoginAdmin.jsx'
import Register from '../../Pages/Register.jsx'
import ShoppingCart from '../../Pages/ShoppingCart.jsx'
import Product from '../../Pages/Product.jsx'
import Buy from '../../Pages/Buy.jsx'
import ConnectedAccount from '../../Pages/ConnectedAccount.jsx'
import AdminHome from '../../Pages/AdminHome.jsx'
import {UserContextProvider} from '../UserContext.jsx'
import {UserAdminContextProvider} from '../UserAdminContext.jsx'
import EditProduct from '../../Pages/EditProduct.jsx'
import CreateProduct from '../../Pages/CreateProduct.jsx'
import ProductComments from '../../Pages/ProductComments.jsx'
import ReportedComments from '../../Pages/ReportedComments.jsx'
import Orders from "../../Pages/Orders.jsx"
import OrderShoppingCart from "../../Pages/OrderShoppingCart.jsx"
import UserOrders from '../../Pages/UserOrders.jsx'
import UserOrderDetails from '../../Pages/UserOrderDetails.jsx'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

  

function App(){

    return <Router>
            <UserAdminContextProvider>
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
                        <Route exact path="/api/connectedAccount">
                            <Header></Header>
                            <ConnectedAccount></ConnectedAccount>
                            <Footer></Footer>
                        </Route>
                        <Route exact path="/api/orders">
                            <Header></Header>
                            <UserOrders></UserOrders>
                            <Footer></Footer>
                        </Route>
                        <Route exact path="/api/order/:orderId/details">
                            <Header></Header>
                            <UserOrderDetails></UserOrderDetails>
                            <Footer></Footer>
                        </Route>

                        <Route exact path="/admin/product/:id/edit">
                            <EditProduct></EditProduct>
                        </Route>

                        <Route exact path="/admin/product/:id/comments">
                            <ProductComments></ProductComments>
                        </Route>
                        
                        <Route exact path="/admin/login">
                            <Header></Header>
                            <LoginAdmin></LoginAdmin>
                            <Footer></Footer>
                        </Route>

                        <Route exact path="/admin/comments/reported">
                            <ReportedComments></ReportedComments>
                        </Route>

                        <Route exact path="/admin/CreateProduct">
                            <CreateProduct></CreateProduct>
                        </Route>

                        <Route exact path="/admin/order/:orderId/cart">
                            <OrderShoppingCart></OrderShoppingCart>
                        </Route>

                        <Route path="/admin/orders">
                            <Orders></Orders>
                        </Route>

                        <Route path="/admin/home">
                            <AdminHome></AdminHome>
                        </Route>

                        

                        <Route path={["/products","/"]}>
                                <Header></Header>
                                <Home></Home>
                            <Footer></Footer>
                        </Route>
                    </Switch>
                </UserContextProvider>
            </UserAdminContextProvider>
    </Router>    
}

export  {App};
