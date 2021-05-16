/** @jsxImportSource @emotion/react */
import React,{useState, useEffect} from 'react';
import {Pagination} from 'react-bootstrap';
import {css} from '@emotion/react';
import ReturnPaginationButtonsOrdersUser from "./ReturnPaginationButtonsOrdersUser.jsx"
import {useLocation} from "react-router-dom";
import ReturnPaginationButtonsOrders from "./ReturnPaginationButtonsOrders.jsx";
import ReturnPaginationButtons from "./ReturnPaginationButtons.jsx"
import ReturnPaginationButtonsAdmin from "./ReturnPaginationButtonsAdmin.jsx"
import SearchReturnPaginationButtonsAdmin from './SearchReturnPaginationButtonsAdmin.jsx';

function PaginationButtons ({isOrder, isAdmin, isSearch = false, data}) {

    const [test, setTest] = useState(1)

    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    let page = query.get("page")

    useEffect(()=>{
        // focus le bouton qui correpond a l'id 
        setTest(parseInt(page))
    },[setTest,page])

    const handleFocus = (e) => {
        // Récuperer le numéro de la page
        let page = e.target.innerHTML ; 
        // activer le focus sur le bouton
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
              
        {data.status === true ? 

            // queryName={queryName}
                isOrder === true ?
                    isAdmin === true ?
                        <ReturnPaginationButtonsOrders  totalPageNumber={data.totalPageNumber} handleFocus={handleFocus} test={test}></ReturnPaginationButtonsOrders>
                    :
                        <ReturnPaginationButtonsOrdersUser  totalPageNumber={data.totalPageNumber} handleFocus={handleFocus} test={test}></ReturnPaginationButtonsOrdersUser>
                :
                    isAdmin === true ?
                        isSearch === true ?
                            <SearchReturnPaginationButtonsAdmin totalPageNumber={data.totalPageNumber} handleFocus={handleFocus} test={test}></SearchReturnPaginationButtonsAdmin>
                        :
                            <ReturnPaginationButtonsAdmin  totalPageNumber={data.totalPageNumber} handleFocus={handleFocus} test={test}></ReturnPaginationButtonsAdmin>
                    
                    :
                        <ReturnPaginationButtons  totalPageNumber={data.totalPageNumber} handleFocus={handleFocus} test={test}></ReturnPaginationButtons>
                
            : 
                <></>
        }
    </Pagination>
}

export default PaginationButtons;