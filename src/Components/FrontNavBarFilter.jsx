import React from 'react';
import {Nav} from 'react-bootstrap';
import axios from 'axios';

function FrontNavBarFilter ({setData}) {
    // 
    const handleClick = (e) => {
        console.log(e.target.dataset.rbEventKey);
        if(e.target.dataset.rbEventKey === "sports/vetements"){
            axios.get('https://127.0.0.1:8000/products/sports/1')
        .then(function (response){
            // handle success
            setData({status: true, data: response.data, filter: "sports" })
            console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        }else if(e.target.dataset.rbEventKey === "livres"){
            axios.get('https://127.0.0.1:8000/products/livres/1')
            .then(function (response){
                // handle success
                setData({status: true, data: response.data, filter: "livres"})
                console.log(response.data);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
        }else if(e.target.dataset.rbEventKey === "maison"){
            axios.get('https://127.0.0.1:8000/products/maison/1')
            .then(function (response){
                // handle success
                setData({status: true, data: response.data, filter: "maison"})
                console.log(response.data);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
        }else if(e.target.dataset.rbEventKey === "informatique/high-tech"){
            axios.get('https://127.0.0.1:8000/products/informatique/1')
                .then(function (response){
                    // handle success
                    setData({status: true, data: response.data, filter: "informatique"})
                    console.log(response.data);
                })
                .catch(function (error) {
                  // handle error
                  console.log(error);
                })
        }else{
            axios.get('https://127.0.0.1:8000/products/all/1')
                .then(function (response){
                    // handle success
                    setData({status: true, data: response.data, filter: "all"})
                    console.log(response.data);
                })
                .catch(function (error) {
                  // handle error
                  console.log(error);
                })
        }   
    }

    return <Nav fill variant="tabs" defaultActiveKey="/home">
    <Nav.Item>
      <Nav.Link onClick={handleClick} eventKey="all">Toutes</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link onClick={handleClick} eventKey="sports/vetements">Sports/vêtements</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link onClick={handleClick} eventKey="informatique/high-tech">Informatique/High-Tech</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link onClick={handleClick} eventKey="maison">Maison</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link onClick={handleClick} eventKey="livres">Livres</Nav.Link>
    </Nav.Item>
  </Nav>
}

export default FrontNavBarFilter;