import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {NavBar,SearchBar,Button,Logo} from "./accueil/header.jsx"
import {Content,AProduct} from "./accueil/content.jsx"
import {Footer} from "./accueil/footer.jsx"
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <React.StrictMode>
    <NavBar></NavBar>
    <Content></Content>
    <Footer></Footer>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
