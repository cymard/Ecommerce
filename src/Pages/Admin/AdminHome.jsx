/** @jsxImportSource @emotion/react */
import React,{useEffect,useState,useContext} from 'react';
import {css} from '@emotion/react';
import {Container} from 'react-bootstrap';
import axios from 'axios';
import AdminNavBar from "../../Components/BackOffice/AdminNavBar.jsx";
import {UserAdminContext} from '../../Components/Context/UserAdminContext.jsx';
import {
    useLocation,
    useHistory,
    Link
} from "react-router-dom";
import AdminHomeTable from '../../Components/BackOffice/AdminHomeTable.jsx';
import AdminHomeTableOptions from '../../Components/BackOffice/AdminHomeTableOptions.jsx';
import ReturnPaginationButtons from '../../Components/All/ReturnPaginationButtons.jsx';


function AdminHome () {

    const [data, setData] = useState({status: false, productsList: [], filter: "all"});
    const [isSelectAllChecked, setSelectAllChecked] = useState(); // sélectionner ou pas le checkbox selectAll
    const [selectedProducts, setSelectedProducts] = useState([]); // les produits sélectionnés

    let history = useHistory();

    const userAdminInformation = useContext(UserAdminContext);
    const token = userAdminInformation.token

    useEffect(() => {
        // déclenchement du select all lorsque tous les checkbox sont séléctionnés
        data.status === "nothing" ?
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

    let encodedUri = "?search=" + encodeURIComponent(querySearchValue) +"&category=" + queryCategoryValue + "&page=" + queryPageValue + "&sorting=" + querySortingValue;
   

    useEffect(() => {
        // vérification si ROLE_ADMIN
            if((location.pathname === "/admin/home" && location.search === "" ) || querySearchValue === ""){ // redirection en cas de mauvaise url
                history.push('/admin/home?category=all&page=1&sorting=default');
            }else{
                axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

                if(querySearchValue !== null){ // Requête avec la barre de recherche
                    axios.get(`https://127.0.0.1:8000${location.pathname}${encodedUri}`) // encode location.search car on retrouve la valeur de la recherche dans l'uri
                    .then(function (response){
                        // existe t-il de la data pour cette recherche ?
                        if(response.data.pageContent.length > 0){
                            setData({
                                status: true,
                                productsList: response.data.pageContent,
                                search: response.data.search,
                                totalPageNumber: response.data.totalPageNumber,
                                allProductsNumber: response.data.allProductsNumber
                            })
                        }else{
                            setData({status: "nothing"})
                        }
    
                    })
                    .catch(function (error) {
                        console.log(error);   
                    })

                }else{  // Affichage des données avec les filtres
                    axios.get(`https://127.0.0.1:8000${location.pathname}${location.search}`)
                    .then(function (response){
                        setData({
                            status: true, 
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

    
    const handleRemove = () => {
        axios.delete(`https://127.0.0.1:8000/admin/product`,{
            data:{
                selectedProducts
            }
        })
        .then(function (response){
            // déselectionner checkbox
            setSelectedProducts([])
            history.push(`${location.pathname}${location.search}`)
        })
        .catch(function (error) {
            console.log(error); 
        })
    }


    const [allLinks, setAllLinks] = useState([])
    const [firstQueryParam, setFirstQueryParam] = useState();

    useEffect(() => {
        if(queryCategoryValue === null){
            setFirstQueryParam(`search=${querySearchValue}`);
        }else{
            setFirstQueryParam(`category=${queryCategoryValue}`);
        }

        const links = []

        for(let i = 1;i<=data.totalPageNumber; i++){
            // changer l'id dans l'url
            links.push(<Link key={i} to={`/admin/home?${firstQueryParam}&page=${i}&sorting=${querySortingValue}`}></Link>)
        }

        setAllLinks(links)
    }, [firstQueryParam, queryCategoryValue, querySortingValue, data.totalPageNumber, querySearchValue])

    


    return <div     
        css={css`
            min-height: 90vh;
            display: flex;
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
                    data={data} setData={setData} 
                ></AdminHomeTable>

            </AdminHomeTableOptions>
            
            <ReturnPaginationButtons  
                totalPageNumber={data.totalPageNumber} 
                allLinks={allLinks}
            ></ReturnPaginationButtons>
            
        </Container>
    </div>
   
}

export default AdminHome;