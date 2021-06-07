/** @jsxImportSource @emotion/react */
import React,{useEffect,useState,useContext,useCallback} from 'react';
import {css} from '@emotion/react';
import {Container, Alert} from 'react-bootstrap';
import axios from 'axios';
import AdminNavBar from "../../Components/BackOffice/AdminNavBar.jsx";
import {UserAdminContext} from '../../Components/Context/UserAdminContext.jsx';
import {
    useLocation,
    useHistory
} from "react-router-dom";
import AdminHomeTable from '../../Components/BackOffice/AdminHomeTable.jsx';
import AdminHomeTableOptions from '../../Components/BackOffice/AdminHomeTableOptions.jsx';
import PaginationButtons from '../../Components/All/PaginationButtons.jsx';


function AdminHome () {

    const [data, setData] = useState({status: false, productsList: [], filter: "all"});
    const [isSelectAllChecked, setSelectAllChecked] = useState(); // sélectionner ou pas le checkbox selectAll
    const [selectedProducts, setSelectedProducts] = useState([]); // les produits sélectionnés
    const [alertState, setAlertState] = useState({
        isOpen: false,
        text: undefined,
        variant: undefined
    })

    let history = useHistory();

    const {token} = useContext(UserAdminContext);

    useEffect(() => {
        // déclenchement du select all lorsque tous les checkbox sont séléctionnés
        data.status === "noData" ?
            setSelectAllChecked(selectedProducts.length === 0)
        :
            setSelectAllChecked(selectedProducts.length === data.productsList.length)
    }, [selectedProducts, data])
    
    // récuperation et séparation des valeurs de l'uri
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const querySearchValue = query.get('search');
    const queryCategoryValue = query.get('category');
    const queryPageValue = query.get('page');
    const querySortingValue = query.get('sorting');
 

    useEffect(() => {
        // vérification si ROLE_ADMIN
            if((location.pathname === "/admin/home" && location.search === "" ) || querySearchValue === ""){ // redirection en cas de mauvaise url
                history.push('/admin/home?category=all&page=1&sorting=default');
            }else{
                axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                let isSearching = querySearchValue !== null ? `search=${encodeURIComponent(querySearchValue)}&` : ""
                let url = `https://relaxed-sammet-0deed4.netlify.app/admin/home?`+isSearching+`category=${queryCategoryValue}&page=${queryPageValue}&sorting=${querySortingValue}`;

                axios.get(url)
                .then(function (response){
                    // existe t-il de la data pour cette recherche ?
                    if(response.data.pageContent.length > 0){
                        setData({
                            status: true,
                            productsList: response.data.pageContent,
                            totalPageNumber: response.data.totalPageNumber,
                            allProductsNumber: response.data.allProductsNumber
                        })
                    }else{
                        setData({status: "noData"})
                    }

                })
                .catch(function (error) {
                    console.warn(error);   
                    history.push("/admin/login");
                }) 
            }   
    }, [history,location,token,querySearchValue,queryCategoryValue,queryPageValue,querySortingValue])

    
    const handleRemove = () => {
        axios.delete(`https://relaxed-sammet-0deed4.netlify.app/admin/product`,{
            data:{
                selectedProducts
            }
        })
        .then(function (response){
            // déselectionner checkbox
            setSelectedProducts([])
            setAlertState({
                isOpen: true,
                text: "Produit(s) supprimé(s).",
                variant: "success"
            });
            closeAlert();
            history.push('/admin/home')
            
        })
        .catch(function (error) {
            console.warn(error); 
            setAlertState({
                isOpen: true,
                text: "Une erreur est survenue lors de la suppression de produit.",
                variant: "danger"
            });
            closeAlert();
        })
    }


    const [allPageUris, setAllPageUris] = useState([])
    const [firstQueryParam, setFirstQueryParam] = useState();

    useEffect(() => {
        if(queryCategoryValue === null){
            setFirstQueryParam(`search=${querySearchValue}`);
        }else{
            setFirstQueryParam(`category=${queryCategoryValue}`);
        }

        const uris = []

        for(let i = 1;i<=data.totalPageNumber; i++){
            // changer l'id dans l'url
            uris.push({
                uri: `/admin/home?${firstQueryParam}&page=${i}&sorting=${querySortingValue}`,
                key: i
            })
        }

        setAllPageUris(uris)
    }, [firstQueryParam, queryCategoryValue, querySortingValue, data.totalPageNumber, querySearchValue])

    
    const closeAlert = useCallback(
        () => {
            setTimeout(()=>{
                setAlertState({
                    isOpen: false,
                    text: undefined,
                    variant: undefined
                });
            }, 3000)
        },[]
    )

    return <>
        <Alert 
            variant={alertState.variant}
            show={alertState.isOpen}
            css={css`
                position: sticky; 
                top: 100px;
                left: 300px;  
                text-align: center;
                min-width: 10px;              
                max-width: 400px;
                z-index: 1;
                box-shadow: 1px 1px 1px black;
            `}
        >
            {alertState.text}
        </Alert>
        <div     
            css={css`
                display: flex;
                min-height: 90vh;  
            `}
        >
            <AdminNavBar/>

            <Container fluid>
                <h1 className="text-center mt-4 mb-5">Administration</h1>

                <AdminHomeTableOptions
                    querySearchValue={querySearchValue}
                    handleRemove={handleRemove}
                >
                    <AdminHomeTable 
                        querySearchValue={querySearchValue}
                        isSelectAllChecked={isSelectAllChecked}
                        setSelectAllChecked={setSelectAllChecked}
                        setSelectedProducts={setSelectedProducts} 
                        selectedProducts={selectedProducts}
                        data={data} 
                        setData={setData} 
                    ></AdminHomeTable>
                </AdminHomeTableOptions>
                
                <PaginationButtons  
                    totalPageNumber={data.totalPageNumber} 
                    allPageUris={allPageUris}
                    pageValue={queryPageValue}
                ></PaginationButtons>
                
            </Container>
        </div>
    </>

   
}

export default AdminHome;