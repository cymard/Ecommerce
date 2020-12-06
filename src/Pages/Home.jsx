import React,{useState,useEffect} from 'react';
import HomeProduct from '../Components/HomeProduct.jsx'
import {Container} from 'react-bootstrap';
import HomeCarousel from '../Components/HomeCarousel.jsx'
import axios from 'axios';

function Home(){
    const [data, setData] = useState({status : false, data: ""})

    // equivalent de componentDidMount
    useEffect(()=>{
        axios.get(`https://127.0.0.1:8000/users`).then(response => {setData({status: true, data : response.data})})
    },[])
    
    data.status ? console.log(data.data) : console.log("wait")

    return <>
        <Container className="d-flex justify-content-around flex-wrap">
        
        {data.status ?
        data.data.map(cool => <p key={cool.id}>{cool.email}</p>)
        :
        <p>wait...</p>
        }
            <HomeCarousel></HomeCarousel>
            <HomeProduct></HomeProduct>
            <HomeProduct></HomeProduct>
            <HomeProduct></HomeProduct>
            <HomeProduct></HomeProduct>
            <HomeProduct></HomeProduct>
            <HomeProduct></HomeProduct>
        </Container>
    </>
}

export default Home;