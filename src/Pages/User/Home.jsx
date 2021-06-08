/** @jsxImportSource @emotion/react */
import React,{useState, useEffect, useCallback} from 'react';
import {Container} from 'react-bootstrap';
import axios from 'axios';
import FrontNavBarFilter from '../../Components/FrontOffice/FrontNavBarFilter.jsx';
import DisplayProductHome from '../../Components/FrontOffice/DisplayProductHome.jsx';
import {css} from '@emotion/react';
import Space from '../../Components/All/Space.jsx';
import {
    useLocation,
    useHistory,
  } from "react-router-dom";
import PaginationButtons from "../../Components/All/PaginationButtons.jsx"; 

function Home(){

    const [data, setData] = useState({status : false, data: ""});
    const location = useLocation();
    const history = useHistory();

    // récuperation et séparation des valeurs de l'uri
    const query = new URLSearchParams(location.search);
    const querySearchValue = query.get('search');
    const queryCategoryValue = query.get('category');
    const queryPageValue = query.get('page');

    const displayProducts = useCallback(
        (uriParam) => {
            axios.get(`https://127.0.0.1:8000/products?${uriParam}&page=${queryPageValue}`)
            .then(function (response){
                if(response.data.allProductsNumber === 0) {
                    setData({
                        status : "nothing"
                    })
                }else{
                    setData({
                        status: true, 
                        data: response.data.content, 
                        totalPageNumber: response.data.totalPageNumber,  
                        allProductsNumber: response.data.allProductsNumber
                    })
                }
                
            })
            .catch(function (error) {
                console.warn(error);
                history.push("/products?category=all&page=1");
            })
        },
        [queryPageValue, history],
    )

    useEffect(()=>{
        // if(queryCategoryValue === null && querySearchValue !== null &&  querySearchValue !== ''){
        //     // Recherche des produits via le champs recherche 
        //     displayProducts(`search=${querySearchValue}`);
        // }else{
        //     displayProducts(`category=${queryCategoryValue}`);
        // }
        
        // Pour faire l'appel il faut regarder si le location.pathname commence par "search" ou par "category" 
        if(querySearchValue === null && queryCategoryValue !== null){
            // Recherche de produit via les catégories
            displayProducts(`category=${queryCategoryValue}`);

        }else if(querySearchValue !== ''){
            // Recherche des produits via le champs recherche 
            displayProducts(`search=${querySearchValue}`);

        }else{
            history.push("/products?category=all&page=1");
        }
        
    },[querySearchValue, queryCategoryValue, history, displayProducts])


 
    const [allPageUris, setAllPageUris] = useState([])
    const [firstQueryParam, setFirstQueryParam] = useState();

    useEffect(() => {
        if(queryCategoryValue === null){
            setFirstQueryParam(`search=${querySearchValue}`);
        }else{
            setFirstQueryParam(`category=${queryCategoryValue}`);
        }
    }, [queryCategoryValue,querySearchValue])
        

    useEffect(() => {
        const uris = []

        for(let i = 1;i<=data.totalPageNumber; i++){
            uris.push({
                uri: `/products?${firstQueryParam}&page=${i}`,
                key: i
            })
        }

        setAllPageUris(uris)
    }, [data.totalPageNumber, firstQueryParam])


    const categories = [
        {category: "toutes", uri:`/products?category=all&page=1`},
        {category: "maison", uri:`/products?category=maison&page=1`},
        {category: "livres", uri:`/products?category=livres&page=1`},
        {category: "informatique", uri:`/products?category=informatique&page=1`},
        {category: "sports", uri:`/products?category=sports&page=1`}
    ]

    return<> 
    <Container 
        css={css`
            min-height: 90vh;
        `}
        className="d-flex justify-content-around flex-wrap"
    >
        <FrontNavBarFilter allCategories={categories}></FrontNavBarFilter>
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
            <DisplayProductHome isLoading={data.status} products={data.data}></DisplayProductHome>
        }
    </Container>

    { data.status !== "nothing"  &&
        <PaginationButtons 
            totalPageNumber={data.totalPageNumber} 
            allPageUris={allPageUris} 
            pageValue={queryPageValue}
        ></PaginationButtons>
    }
    </>
}

export default Home;