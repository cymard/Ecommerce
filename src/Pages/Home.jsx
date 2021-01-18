import React,{useState,useEffect} from 'react';
import {Container} from 'react-bootstrap';
import HomeCarousel from '../Components/HomeCarousel.jsx';
import axios from 'axios';
import FrontNavBarFilter from '../Components/FrontNavBarFilter.jsx';
import DisplayProductHome from '../Components/DisplayProductHome.jsx';
import PaginationProducts from '../Components/PaginationProducts.jsx';

function Home(){
    const [data, setData] = useState({status : false, data: "", filter: ""})

    // equivalent de componentDidMount
    useEffect(()=>{
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
    },[])
    
    data.status ? console.log(data.data) : console.log("wait")

    return <>
        <Container className="d-flex justify-content-around flex-wrap">
            <FrontNavBarFilter setData={setData}></FrontNavBarFilter>
            <HomeCarousel></HomeCarousel>
            <DisplayProductHome data={data}></DisplayProductHome>
            <PaginationProducts setData={setData} data={data}></PaginationProducts>
        </Container>
    </>
}

export default Home;