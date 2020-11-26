import React, { useState} from 'react';
import Header from '../Header.jsx'
import Footer from '../Footer.jsx'
import Home from '../../Pages/Home.jsx'
import Login from '../../Pages/Login.jsx'
import Register from '../../Pages/Register.jsx'
import ShoppingCart from '../../Pages/ShoppingCart.jsx'
import Product from '../../Pages/Product.jsx'
import Buy from '../../Pages/Buy.jsx'
import ConnectedAccount from '../../Pages/ConnectedAccount.jsx'
import ModifiedLinksRouter from '../ModifiedLinksRouter.jsx'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";


const ThemeContext = React.createContext('');

function App(){
    // contenu du packageContext lorsque le localStorage n'est pas définit
    const [buttonValue, setButtonValue] = useState(<ModifiedLinksRouter color="black" to="/Login">Se Connecter</ModifiedLinksRouter>);
    const changeValue = function(){
        setButtonValue(<ModifiedLinksRouter color="black" to="/ConnectedAccount">Compte</ModifiedLinksRouter>)
    }

    const contextPackageLocalStorage = {
        buttonValue : <ModifiedLinksRouter color="black" to="/ConnectedAccount">Compte</ModifiedLinksRouter>,
        changeValue : changeValue
    }

    const contextPackage = {
        buttonValue : buttonValue,
        changeValue : changeValue
    }


    return <Router>
            <ThemeContext.Provider value={localStorage.getItem('connexion') ? contextPackageLocalStorage : contextPackage}>
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
            </ThemeContext.Provider>
    </Router>    
}

export {App,ThemeContext};