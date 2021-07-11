import React from 'react';
import Home from '../Pages/User/Home.jsx'
import Login from '../Pages/User/Login.jsx'
import LoginAdmin from '../Pages/User/LoginAdmin.jsx'
import Register from '../Pages/User/Register.jsx'
import ShoppingCart from '../Pages/User/ShoppingCart.jsx'
import Product from '../Pages/User/Product.jsx'
import Buy from '../Pages/User/Buy.jsx'
import ConnectedAccount from '../Pages/User/ConnectedAccount.jsx'
import AdminHome from '../Pages/Admin/AdminHome.jsx'
import {UserContextProvider} from './Context/UserContext.jsx'
import {UserAdminContextProvider} from './Context/UserAdminContext.jsx'
import EditProduct from '../Pages/Admin/EditProduct.jsx'
import CreateProduct from '../Pages/Admin/CreateProduct.jsx'
import ProductComments from '../Pages/Admin/ProductComments.jsx'
import ReportedComments from '../Pages/Admin/ReportedComments.jsx'
import Orders from "../Pages/Admin/Orders.jsx"
import AdminOrderDetails from "../Pages/Admin/AdminOrderDetails.jsx"
import UserOrders from '../Pages/User/UserOrders.jsx'
import UserOrderDetails from '../Pages/User/UserOrderDetails.jsx'
import ChangePassword from '../Pages/User/ChangePassword.jsx'
import ChangeEmail from '../Pages/User/ChangeEmail.jsx'
import LegalNotice from "../Pages/Admin/LegalNotice.jsx"
import SaleConditions from "../Pages/User/SaleConditions.jsx"
import FrontOfficeLayout from './FrontOffice/FrontOfficeLayout.jsx'
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
                            <FrontOfficeLayout>
                                <Login/>
                            </FrontOfficeLayout>
                        </Route>
                        <Route exact path="/Register">
                            <FrontOfficeLayout>
                                <Register></Register>
                            </FrontOfficeLayout>
                        </Route>
                        <Route exact path="/ShoppingCart">
                            <FrontOfficeLayout>
                                <ShoppingCart></ShoppingCart>
                            </FrontOfficeLayout>
                        </Route>
                        <Route exact path="/Product/:id">
                            <FrontOfficeLayout>
                                <Product></Product>
                            </FrontOfficeLayout>
                        </Route>
                        <Route exact path="/Buy">
                            <FrontOfficeLayout>
                                <Buy></Buy> 
                            </FrontOfficeLayout>
                        </Route>
                        <Route exact path="/informations/mentions_legales">
                            <FrontOfficeLayout>
                                <LegalNotice></LegalNotice> 
                            </FrontOfficeLayout>
                        </Route>
                        <Route exact path="/informations/condition_de_vente">
                            <FrontOfficeLayout>
                                <SaleConditions></SaleConditions> 
                            </FrontOfficeLayout>
                        </Route>
                        <Route exact path="/connectedAccount">
                            <FrontOfficeLayout>
                                <ConnectedAccount></ConnectedAccount>
                            </FrontOfficeLayout>
                        </Route>
                        <Route exact path="/orders">
                            <FrontOfficeLayout>
                                <UserOrders></UserOrders>
                            </FrontOfficeLayout>
                        </Route>
                        <Route exact path="/order/:orderId/details">
                            <FrontOfficeLayout>
                                <UserOrderDetails></UserOrderDetails>
                            </FrontOfficeLayout>
                        </Route>
                        <Route exact path="/password/modify">
                            <FrontOfficeLayout>
                                <ChangePassword></ChangePassword>
                            </FrontOfficeLayout>
                        </Route>

                        <Route exact path="/email/modify">
                            <FrontOfficeLayout>
                                <ChangeEmail></ChangeEmail>
                            </FrontOfficeLayout>
                        </Route>

                        <Route exact path="/admin/product/:id/edit">
                            <EditProduct></EditProduct>
                        </Route>

                        <Route exact path="/admin/product/:id/comments">
                            <ProductComments></ProductComments>
                        </Route>
                        
                        <Route exact path="/admin/login">
                            <FrontOfficeLayout>
                                <LoginAdmin></LoginAdmin>
                            </FrontOfficeLayout>
                        </Route>

                        <Route exact path="/admin/comments/reported">
                            <ReportedComments></ReportedComments>
                        </Route>

                        <Route exact path="/admin/CreateProduct">
                            <CreateProduct></CreateProduct>
                        </Route>

                        <Route exact path="/admin/order/:orderId/cart">
                            <AdminOrderDetails></AdminOrderDetails>
                        </Route>

                        <Route path="/admin/orders">
                            <Orders></Orders>
                        </Route>

                        <Route path="/admin/home">
                            <AdminHome></AdminHome>
                        </Route>

                        <Route path={["/products","/"]}>
                            <FrontOfficeLayout>
                                <Home></Home>
                            </FrontOfficeLayout>
                        </Route>
                    </Switch>
                </UserContextProvider>
            </UserAdminContextProvider>
    </Router>    
}

export  {App};
