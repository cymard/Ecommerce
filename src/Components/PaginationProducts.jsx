/** @jsxImportSource @emotion/react */
import React,{useEffect, useState} from 'react';
import {Pagination} from 'react-bootstrap';
import axios from 'axios';
import {css} from '@emotion/react';
import ReturnPaginationButtons from "./ReturnPaginationButtons.jsx"

function PaginationProducts ({setData, data, backOffice}) {

    const [productNumberInCategory, setProductNumberInCategory] = useState({number: null})
    const [test, setTest] = useState(1)

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


    const handleFocus = (e) => {
        // Récuperer le numéro de la page
        let page = e.target.innerHTML ; 

        setTest(parseInt(page));
        // Récuperer le data de la page
        axios.get(`https://127.0.0.1:8000/products/${data.filter}/${page}`)
        .then(function (response){
            setData({status: true, data: response.data, filter: data.filter})
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    return <Pagination
        css={css`
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 50px;
        `}
    >
              
        {
        productNumberInCategory.number !== null 
        ? 
        <ReturnPaginationButtons productNumber={productNumberInCategory.number} handleFocus={handleFocus} test={test} setTest={setTest}></ReturnPaginationButtons> 
        : 
        <></>
        }
    </Pagination>
}

export default PaginationProducts;