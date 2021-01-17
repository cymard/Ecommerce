/** @jsxImportSource @emotion/react */
import React,{useEffect, useState} from 'react';
import {Pagination} from 'react-bootstrap';
import axios from 'axios';
import {css} from '@emotion/react';
import ReturnPaginationButtons from "./ReturnPaginationButtons.jsx"

function PaginationProducts ({setData, data}) {

   

    const [pageNumber, setPageNumber] = useState({number: null})
    useEffect(()=>{
        axios.get(`https://127.0.0.1:8000/products/${data.filter}`)
        .then(function (response){
            // handle success
            setPageNumber({number: response.data})
            console.log(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    },[data])


    const handleClick = (e) => {

        console.log(data)
        let page = e.target.innerHTML ;
        axios.get(`https://127.0.0.1:8000/products/${data.filter}/${page}`)
        .then(function (response){
            console.log(response);
            setData({status: true, data: response.data, filter: data.filter  })
            // le contenu => response.data
            // le contenu est vide => response.data = []
        })
        .catch(function (error) {
          // handle error
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
        {/* <Pagination.First/>
        <Pagination.Prev/> */}
        {pageNumber.number !== null ? <ReturnPaginationButtons number={pageNumber.number} handleClick={handleClick}></ReturnPaginationButtons> : <></>}
            
        {/* <Pagination.Ellipsis/>
        <Pagination.Next/>
        <Pagination.Last/> */}
    </Pagination>
}

export default PaginationProducts;