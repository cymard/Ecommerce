import React from 'react';
import Header from './FrontOffice/Header.jsx'
import Footer from './All/Footer.jsx'
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
import FooterSmallPage from './All/FooterSmallPage.jsx'
import LegalNotice from "../Pages/Admin/LegalNotice.jsx"
import SaleConditions from "../Pages/User/SaleConditions.jsx"
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
                            <FooterSmallPage></FooterSmallPage>
                        </Route>
                        <Route exact path="/Register">
                            <Header></Header>
                            <Register></Register>
                            <FooterSmallPage></FooterSmallPage>
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
                        <Route exact path="/informations/mentions_legales">
                            <Header></Header>
                            <LegalNotice></LegalNotice> 
                            <Footer></Footer>
                        </Route>
                        <Route exact path="/informations/condition_de_vente">
                            <Header></Header>
                            <SaleConditions></SaleConditions> 
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
                        <Route exact path="/api/modify/password">
                            <Header></Header>
                            <ChangePassword></ChangePassword>
                            <FooterSmallPage></FooterSmallPage>
                        </Route>

                        <Route exact path="/api/modify/email">
                            <Header></Header>
                            <ChangeEmail></ChangeEmail>
                            <FooterSmallPage></FooterSmallPage>
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
                            <FooterSmallPage></FooterSmallPage>
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
