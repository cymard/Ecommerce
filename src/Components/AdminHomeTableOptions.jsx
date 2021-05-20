import React from 'react';
import { Button, Row } from 'react-bootstrap';
import CategoryFilter from './CategoryFilter.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import SearchProductAdmin from './SearchProductAdmin.jsx';
import {useHistory,useLocation,Link} from "react-router-dom";

function AdminHomeTableOptions ({handleRemove, querySearchValue, children}) {
    let history = useHistory();

    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    let sorting = query.get('sorting');
    let search = query.get('search');

    const itemPlus = <FontAwesomeIcon icon={faPlus} color="white" /> 

    const searchChangeUri = (value) => {
        if(value === "sports"){
            history.push({
                pathname: '/admin/home',
                search: `?search=${search}&category=sports&page=1&sorting=${sorting}`
            })
        }else if(value === "informatique"){
            history.push({
                pathname: '/admin/home',
                search: `?search=${search}&category=informatique&page=1&sorting=${sorting}`
            })
        }else if(value === "all"){
            history.push({
                pathname: '/admin/home',
                search: `?search=${search}&category=all&page=1&sorting=${sorting}`
            })
        }else{
            history.push({
                pathname: '/admin/home',
                search: `?search=${search}&category=${value}&page=1&sorting=${sorting}`
            })
        }   
    }

    const changeUri = (value) => {
        if(value === "sports"){
            history.push({
                pathname: '/admin/home',
                search: `?category=sports&page=1&sorting=${sorting}`
              })
        }else if(value === "informatique"){
            history.push({
                pathname: '/admin/home',
                search: `?category=informatique&page=1&sorting=${sorting}`
              })
        }else if(value === "all"){
            history.push({
                pathname: '/admin/home',
                search: `?category=all&page=1&sorting=${sorting}`
              })
        }else{
            history.push({
                pathname: '/admin/home',
                search: `?category=${value}&page=1&sorting=${sorting}`
              })
        }   
    }


    return <div>
        <Row className="d-flex justify-content-between mr-3">
            <Link to="/admin/CreateProduct" className="ml-3 mb-3 d-flex align-items-end">
                <Button> {itemPlus} Ajouter un Produit</Button>
            </Link>
            <SearchProductAdmin></SearchProductAdmin>

            <CategoryFilter changeUri={querySearchValue !== null ? searchChangeUri : changeUri}></CategoryFilter>
        </Row>

        {children}
                   
        <Button 
            variant="danger"
            onClick={handleRemove}
        >
            Supprimer
        </Button>
    </div>
}

export default AdminHomeTableOptions;