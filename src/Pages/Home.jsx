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
    useHistory,
    useParams
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
    // encode URI sur toute l'url avec encodeURI ou juste la recherche avec encodeURIComponent
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
            axios.get(`https://127.0.0.1:8000${location.pathname}${encodedUri}`)
            .then(function(res){
                console.log(res.data);  
                console.log("encodedUri value : "+ encodedUri)
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
        },[location,encodedUri]
    )
    
    // const regexSearch = new RegExp('\\?search=[a-z]+&page=[0-9]+');
    // const regexSearch = new RegExp('\\?search=[a-zA-Zéèàç]+&page=[0-9]+');
    // const regexCategory = new RegExp('\\?category=[a-zA-Zéèàç]+&page=[0-9]+');



    useEffect(()=>{
        // Pour faire l'appel il faut regarder si le location.pathname commence par "search" ou par "category"
        // en fonction de ça on va appeler labonne méthode
        console.log("search value : " + "?search=" +searchValue + "&page=" + pageValue);
        console.log("resultat recherché: "+ location.search)
        
        if(location.pathname === "/"){
            history.push("/products?category=all&page=1");
        
        }else if(searchValue === null && categoryValue !== null){
            // Recherche de produit via les catégories
            displayProductsWithCategory();

        }else if(categoryValue === null && searchValue !== null){
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
        <div css={css`width: 100%; height: 20px;`}></div>
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