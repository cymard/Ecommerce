import React,{useState,useEffect} from 'react';
import {Container} from 'react-bootstrap';
import HomeCarousel from '../Components/HomeCarousel.jsx';
import axios from 'axios';
import FrontNavBarFilter from '../Components/FrontNavBarFilter.jsx';
import DisplayProductHome from '../Components/DisplayProductHome.jsx';
import PaginationProducts from '../Components/PaginationProducts.jsx';
import {
    useLocation,
    useHistory
  } from "react-router-dom";

function Home(){
    const [data, setData] = useState({status : false, data: "", filter: ""})
    const location = useLocation();
    const history = useHistory();
    console.log(location.pathname)

    useEffect(()=>{
        if(location.pathname === "/"){

            // redirection
            history.push("/all/1");

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
                history.push("/all/1");
            })
        }
        
    },[location,history])
    
    data.status ? console.log(data.data) : console.log("wait")

    return <>
        <Container className="d-flex justify-content-around flex-wrap">
            <FrontNavBarFilter></FrontNavBarFilter>
            <HomeCarousel></HomeCarousel>
            <DisplayProductHome data={data}></DisplayProductHome>
            <PaginationProducts data={data}></PaginationProducts>
        </Container>
    </>
}

export default Home;