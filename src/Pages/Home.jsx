import React,{useState,useEffect} from 'react';
import HomeProduct from '../Components/HomeProduct.jsx'
import {Container} from 'react-bootstrap';
import HomeCarousel from '../Components/HomeCarousel.jsx'
import axios from 'axios';

function Home(){
    const [data, setData] = useState({status : false, data: ""})

    // equivalent de componentDidMount
    useEffect(()=>{
        axios.get(`https://127.0.0.1:8000/products`).then(response => {setData({status: true, data : response.data})})
    },[])
    
    data.status ? console.log(data.data) : console.log("wait")

    return <>
        <Container className="d-flex justify-content-around flex-wrap">
            <HomeCarousel></HomeCarousel>
            {data.status ?
            data.data.map(product =><HomeProduct key={product.id} title={product.name} id={product.id}></HomeProduct>)
            :
            <p>Chargement ...</p>
            }
        </Container>
    </>
}

export default Home;