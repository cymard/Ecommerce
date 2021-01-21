/** @jsxImportSource @emotion/react */
import React,{useEffect, useState} from 'react';
import {Pagination} from 'react-bootstrap';
import axios from 'axios';
import {css} from '@emotion/react';
import ReturnPaginationButtons from "./ReturnPaginationButtons.jsx"

function PaginationProducts ({setData, data, backOffice}) {

    

    const [productNumberInCategory, setProductNumberInCategory] = useState({number: null})
    useEffect(()=>{
        axios.get(`https://127.0.0.1:8000/products/${data.filter}`)
        .then(function (response){
            // handle success
            setProductNumberInCategory({number: response.data})
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    },[data, backOffice])


    const handleClick = (e) => {
        // Récuperer le numéro de la page
        let page = e.target.innerHTML ; 

        // Récuperer le data de la page
        axios.get(`https://127.0.0.1:8000/products/${data.filter}/${page}`)
        .then(function (response){
            setData({status: true, data: response.data, filter: data.filter})
        })
        .catch(function (error) {
          console.log(error);
        })
    }


    // const number = data.data.length/9;


    return <Pagination
        css={css`
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 50px;
        `}
    >
        {productNumberInCategory.number !== null ? <ReturnPaginationButtons number={productNumberInCategory.number} handleClick={handleClick}></ReturnPaginationButtons> : <></>}      
    </Pagination>
}

export default PaginationProducts;