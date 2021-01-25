/** @jsxImportSource @emotion/react */
import React,{useState, useEffect} from 'react';
import {Pagination} from 'react-bootstrap';
import {css} from '@emotion/react';
import ReturnPaginationButtonsAdmin from "./ReturnPaginationButtonsAdmin.jsx"
import {useParams} from "react-router-dom";

function PaginationProducts ({data}) {

    const [test, setTest] = useState(1)
    let {page} = useParams(); //recupere l'id

    useEffect(()=>{
        // focus le bouton qui correpond a l'id 
        setTest(parseInt(page))
       
    },[setTest,page])

    // console.log(typeof page)

    const handleFocus = (e) => {
        // Récuperer le numéro de la page
        let page = e.target.innerHTML ; 
        // mettre test = page pour activer le focus sur le bouton
        setTest(page)
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
        data.status === true 
        ? 
        <ReturnPaginationButtonsAdmin totalPageNumber={data.totalPageNumber} handleFocus={handleFocus} test={test}></ReturnPaginationButtonsAdmin>
        : 
        <></>
        }
    </Pagination>
}

export default PaginationProducts;