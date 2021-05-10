/** @jsxImportSource @emotion/react */
import React,{useState, useEffect, useCallback} from 'react';
import {Container} from 'react-bootstrap';
import axios from 'axios';
import FrontNavBarFilter from '../Components/FrontNavBarFilter.jsx';
import DisplayProductHome from '../Components/DisplayProductHome.jsx';
import PaginationProducts from '../Components/PaginationProducts.jsx';
import {css} from '@emotion/react';
import Space from '../Components/Space.jsx';
import {
    useLocation,
    useHistory,
  } from "react-router-dom";

function Home(){

    const [data, setData] = useState({status : false, data: "", filter: ""});
    const location = useLocation();
    const history = useHistory();

    // récuperation et séparation des valeurs de l'uri
    const query = new URLSearchParams(location.search);
    const searchValue = query.get('search');
    const categoryValue = query.get('category');
    const pageValue = query.get('page');

    // encoder la recherche
    let encodedUri = "?search=" + encodeURIComponent(searchValue) + "&page=" + pageValue;

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
            axios.get(`https://127.0.0.1:8000${location.pathname}${encodedUri}`)
            .then(function(res){
                if(res.status && res.data.data.length > 0){
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
        },[location,encodedUri]
    )


    useEffect(()=>{
        // Pour faire l'appel il faut regarder si le location.pathname commence par "search" ou par "category" 
        if(location.pathname === "/"){
            history.push("/products?category=all&page=1");
        
        }else if(searchValue === null && categoryValue !== null){
            // Recherche de produit via les catégories
            displayProductsWithCategory();

        }else if(categoryValue === null && searchValue !== null &&  searchValue !== ''){
            // Recherche des produits via le champs recherche 
            displayProductsWithSearch();
        
        }else{
            history.push("/products?category=all&page=1");
        }
        
    },[location, pageValue, searchValue, categoryValue,history,displayProductsWithCategory,displayProductsWithSearch])



    return <Container 
        css={css`
            min-height: 90vh;
        `}
        className="d-flex justify-content-around flex-wrap"
    >
        <FrontNavBarFilter></FrontNavBarFilter>
        <Space></Space>

        { data.status === "nothing" ?
            <div
                css={css`
                    margin-top : 100px;
                    margin-bottom : 100px;
                `}
            >
                <h3 className="text-center">Aucun produit trouvé pour votre recherche...</h3> 
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