/** @jsxImportSource @emotion/react */
import React,{useEffect,useState,useContext, useCallback} from 'react';
import {css} from '@emotion/react';
import {Table, Container, Form, Button, Row} from 'react-bootstrap';
import axios from 'axios';
import AdminNavBar from "../Components/AdminNavBar.jsx";
import CategoryFilter from '../Components/CategoryFilter.jsx';
import SearchCategoryFilter from '../Components/SearchCategoryFilter.jsx';
import SortPriceButtons from '../Components/SortPriceButtons.jsx';
import SearchSortPriceButtons from '../Components/SearchSortPriceButtons.jsx';
import ProductsListAdmin from '../Components/ProductsListAdmin.jsx';
import PaginationProductsAdmin from '../Components/PaginationProductsAdmin.jsx';
import SearchPaginationProductsAdmin from '../Components/SearchPaginationProductsAdmin.jsx';
import {UserAdminContext} from '../Components/UserAdminContext.jsx';
import {
    useLocation,
    useHistory,
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';


function AdminHome () {

    const itemPlus = <FontAwesomeIcon icon={faPlus} color="white" /> 
    const itemSearch = <FontAwesomeIcon icon={faSearch}  /> 

    const [data, setData] = useState({status: false, productsList: [], filter: "all"});

    // selectionner ou pas le checkbox selectAll
    const [checkedSelectAll, setCheckedSelectAll] = useState();
    
    // tableau pour la suppression
    const [selectedProducts, setSelectedProducts] = useState([])

    let history = useHistory();
    const location = useLocation();

    const userAdminInformation = useContext(UserAdminContext);
    const token = userAdminInformation.token

    const [searchValue, setSearchValue] = useState();

    useEffect(() => {
        // déclenchement du select all lorsque tous les checkbox sont séléctionnés
        setCheckedSelectAll(selectedProducts.length === data.productsList.length);
    }, [selectedProducts, data])
    
    // récuperation et séparation des valeurs de l'uri
    const query = new URLSearchParams(location.search);
    const querySearchValue = query.get('search');
    const queryCategoryValue = query.get('category');
    const queryPageValue = query.get('page');
    const querySortingValue = query.get('sorting');

    let encodedUri = "?search=" + encodeURIComponent(querySearchValue) +"&category=" + queryCategoryValue + "&page=" + queryPageValue + "&sorting=" + querySortingValue;
   

    useEffect(() => {
        // vérification si ROLE_ADMIN
            if(location.pathname === "/admin/home" && location.search === "" ){ // redirection en cas de mauvaise url
                history.push('/admin/home?category=all&page=1&sorting=default')
            }else{
                if(querySearchValue !== null && querySearchValue !== "" ){

                    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                    axios.get(`https://127.0.0.1:8000${location.pathname}${encodedUri}`) // encode location.search
                    .then(function (response){
                        if(response.data.pageContent.length > 0){
                            setData({status: true, productsList: response.data.pageContent, search: response.data.search, totalPageNumber: response.data.totalPageNumber,  allProductsNumber: response.data.allProductsNumber})
                        }else{
                            setData({status: "nothing"})
                        }
    
                    })
                    .catch(function (error) {
                        console.log(error);   
                    })

                }else if(querySearchValue === ""){
                    history.push('/admin/home?category=all&page=1&sorting=default')
                }else{
                    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                    axios.get(`https://127.0.0.1:8000${location.pathname}${location.search}`)
                    .then(function (response){
                        setData({status: true, 
                            productsList: response.data.pageContent, 
                            filter: response.data.category, 
                            totalPageNumber: response.data.totalPageNumber, 
                            allProductsNumber: response.data.allProductsNumber
                        })
    
                    })
                    .catch(function (error) {
                        console.log(error); 
                        history.push("/admin/login")
                    })
                }
               
    
            }
        
        
    }, [history,location,token,encodedUri,querySearchValue])

    const handleClickSelectAll = (e) => {
        if(e.target.checked === true){
            // séléctionner tous les checkboxs
            setSelectedProducts(data.productsList.map(product => product.id));
            setCheckedSelectAll(true)

        }else{
            setSelectedProducts([]);
            setCheckedSelectAll(false)
            
        }
    }
    

    const handleRemove = () => {
        axios.delete(`https://127.0.0.1:8000/admin/product`,)
        .then(function (response){
            // déselectionner checkbox
            setSelectedProducts([])
            history.push(`${location.pathname}${location.search}`)
        })
        .catch(function (error) {
            console.log(error); 
        })
    }


    const handleChangeSearch = useCallback(
        (e) => {
            setSearchValue(e.target.value);
        },
        [],
    )



    const handleClickSubmitSearch = useCallback(
        () => {
            history.push(`/admin/home?search=${encodeURIComponent(searchValue)}&category=all&page=1&sorting=default`);
        },
        [searchValue,history],
    )

    return <div     
    
    css={css`
        min-height: 90vh;
        display: flex;
    `}
    >
        <AdminNavBar/>

        <Container fluid>
            <h1 className="text-center mt-4 mb-5">Administration</h1>
            <Row className="d-flex justify-content-between mr-3">
                <Link to="/admin/CreateProduct" className="ml-3 mb-3 d-flex align-items-end"><Button> {itemPlus} Ajouter un Produit</Button></Link>
                <Form>
                    <Form.Group  controlId="search">
                        <Form.Label>Rechercher :</Form.Label>
                        <div className="d-flex">
                            <Form.Control className="mr-1" onChange={handleChangeSearch} type="text" value={searchValue}/>
                            <Button onClick={handleClickSubmitSearch}>{itemSearch}</Button>
                        </div>
                        
                    </Form.Group>
                </Form>

                {querySearchValue !== null ?
                    <SearchCategoryFilter></SearchCategoryFilter>
                :
                    <CategoryFilter></CategoryFilter> 
                }
               
                
                
            </Row>
           

            <Table className="text-center" hover>
                <thead>
                    <tr>
                        <th>
                            <Form.Check
                                type="checkbox"
                                id="selectAll"
                                onChange={handleClickSelectAll}
                                checked={checkedSelectAll || selectedProducts.length === 9}
                                label=""
                                custom
                            />        
                        </th>
                        <th>Nom du Produit</th>
                        <th>Stock</th>
                        <th>Catégorie</th>
                        <th>
                        {querySearchValue !== null ?
                            <SearchSortPriceButtons data={data} setData={setData}></SearchSortPriceButtons>
                        :
                            <SortPriceButtons data={data} setData={setData}></SortPriceButtons>
                        }
                            
                        </th>
                        <th>Commentaires</th>
                        <th>Modifier</th>
                    </tr>
                </thead>
                <tbody>
                    { data.status === "nothing" ?
                    
                        <td 
                            colSpan="7"
                            className="w-100 text-center"
                        >
                            <h3 
                                css={css`
                                    text-align: center;
                                    margin-top: 200px;
                                    margin-bottom: 200px;
                                `}
                            >
                                Aucun produit trouvé pour votre recherche...
                            </h3> 
                        </td>
                    
                    : 
                        <>
                        {data.productsList.length > 0 ?
                        
                        <ProductsListAdmin selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} data={data.productsList}></ProductsListAdmin>
                        :  <tr><th>Chargement ...</th></tr>
                        }
                        </>
                    }
                </tbody>
            </Table>
            <Button 
                variant="danger"
                onClick={handleRemove}
            >
                Supprimer
            </Button>
            
            {querySearchValue !== null ?
                <SearchPaginationProductsAdmin setData={setData}  data={data}></SearchPaginationProductsAdmin>
            :
                <PaginationProductsAdmin setData={setData}  data={data}></PaginationProductsAdmin>
            }
            
        </Container>
    </div>
   
}

export default AdminHome;