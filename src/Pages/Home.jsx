import React,{useState,useEffect} from 'react';
import {Container} from 'react-bootstrap';
import HomeCarousel from '../Components/HomeCarousel.jsx';
import axios from 'axios';
import FrontNavBarFilter from '../Components/FrontNavBarFilter.jsx';
import DisplayProductHome from '../Components/DisplayProductHome.jsx';
import PaginationProducts from '../Components/PaginationProducts.jsx';
import {
    useLocation
  } from "react-router-dom";

function Home(){
    const [data, setData] = useState({status : false, data: "", filter: ""})
    const location = useLocation();
    
    console.log(location.pathname)

    useEffect(()=>{
        if(location.pathname === "/"){
            // afficher all/1 quand on arrive sur la page d'accueil 
            axios.get(`https://127.0.0.1:8000/products/all/1`)
            .then(function (response){
                // handle success
                console.log(response);
                setData({status: true, data: response.data.pageContent, filter: "all"})
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

        }else{
            axios.get(`https://127.0.0.1:8000/products${location.pathname}`)
            .then(function (response){
                // handle success

                setData({status: true, data: response.data.pageContent, filter: response.data.category, totalPageNumber: response.data.totalPageNumber,  allProductsNumber: response.data.allProductsNumber})
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        }
        
    },[location])
    
    data.status ? console.log(data.data) : console.log("wait")

    return <>
        <Container className="d-flex justify-content-around flex-wrap">
            <FrontNavBarFilter setData={setData} data={data} filter={data.filter}></FrontNavBarFilter>
            <HomeCarousel></HomeCarousel>
            <DisplayProductHome data={data}></DisplayProductHome>
            <PaginationProducts data={data}></PaginationProducts>
        </Container>
    </>
}

export default Home;