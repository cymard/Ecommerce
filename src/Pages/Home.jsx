/** @jsxImportSource @emotion/react */
import React,{useState, useEffect, useCallback} from 'react';
import {Container,Image} from 'react-bootstrap';
import HomeCarousel from '../Components/HomeCarousel.jsx';
import axios from 'axios';
import FrontNavBarFilter from '../Components/FrontNavBarFilter.jsx';
import DisplayProductHome from '../Components/DisplayProductHome.jsx';
import PaginationProducts from '../Components/PaginationProducts.jsx';
import {css} from '@emotion/react';
import {
    useLocation,
    useHistory
  } from "react-router-dom";

function Home(){
    const [data, setData] = useState({status : false, data: "", filter: ""});
    const location = useLocation();
    const history = useHistory();




    const displayProductsWithCategory = useCallback(
        () => {
            axios.get(`https://127.0.0.1:8000${location.pathname}${location.search}`)
            .then(function (response){

                setData({
                    status: true, 
                    data: response.data.pageContent, 
                    filter: response.data.category, 
                    totalPageNumber: response.data.totalPageNumber,  
                    allProductsNumber: response.data.allProductsNumber
                })
                console.log(response);
            })
            .catch(function (error) {

                console.log(error);
                history.push("/products?category=all&page=1");
            })
        }
        ,[location,history]
    )


    const displayProductsWithSearch = useCallback(
        () => {
            axios.get(`https://127.0.0.1:8000${location.pathname}${location.search}`)
            .then(function(res){
                console.log(res.data);  

                if(res.status && res.data.data.length > 0){
                    console.log(res.data);
                    setData({
                        status: true, 
                        data: res.data.data, 
                        filter: res.data.search, 
                        totalPageNumber: res.data.totalPageNumber,  
                        allProductsNumber: res.data.allProductsNumber
                    })
                }else{
                    setData({
                        status: "nothing"
                    })
                }
            })
            .catch(function(err){
                console.log(err);
            })
        },[location]
    )
    
    const regexSearch = new RegExp('\\?search=[a-z]+&page=[0-9]+');
    const regexCategory = new RegExp('\\?category=[a-z]+&page=[0-9]+');

    useEffect(()=>{
      

        if(location.pathname === "/"){
            // redirection
            history.push("/products?category=all&page=1");

        }else if(regexCategory.test(location.search)){
            // Recherche de produit via les catégories    
            displayProductsWithCategory();
            
        }else if(regexSearch.test(location.search)){
            // Recherche des produits via le champs recherche 
            displayProductsWithSearch();
            
        }else{
            history.push("/products?category=all&page=1");
        }
        
    },[location,history,displayProductsWithCategory,displayProductsWithSearch])

    return <Container className="d-flex justify-content-around flex-wrap">
        <FrontNavBarFilter></FrontNavBarFilter>
        <HomeCarousel></HomeCarousel>
        { data.status === "nothing" ?
            <div
                css={css`
                    margin-top : 100px;
                    margin-bottom : 100px;
                `}
            >
                <h3>Aucun produit trouvé pour votre recherche...</h3> 
            </div>
        :
            
            <>
            <DisplayProductHome data={data}></DisplayProductHome>
            <PaginationProducts data={data}></PaginationProducts>
            </>
            
        }
    </Container>
        
}

export default Home;