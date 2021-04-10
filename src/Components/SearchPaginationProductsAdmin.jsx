/** @jsxImportSource @emotion/react */
import React,{useState, useEffect} from 'react';
import {Pagination} from 'react-bootstrap';
import {css} from '@emotion/react';
import SearchReturnPaginationButtonsAdmin from "./SearchReturnPaginationButtonsAdmin.jsx"
import {useLocation} from "react-router-dom";

function SearchPaginationProductsAdmin ({data}) {

    const [test, setTest] = useState(1)
    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    let page = query.get("page")

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
        <SearchReturnPaginationButtonsAdmin totalPageNumber={data.totalPageNumber} handleFocus={handleFocus} test={test}></SearchReturnPaginationButtonsAdmin>
        : 
        <></>
        }
    </Pagination>
}

export default SearchPaginationProductsAdmin;