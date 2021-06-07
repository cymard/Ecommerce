import React from 'react';
import { Button, Row } from 'react-bootstrap';
import CategoryFilter from './CategoryFilter.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import SearchProductAdmin from './SearchProductAdmin.jsx';
import {useHistory,useLocation,Link} from "react-router-dom";
import PropTypes from 'prop-types';


function AdminHomeTableOptions ({handleRemove, querySearchValue, children}) {
    let history = useHistory();

    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    let sorting = query.get('sorting');
    let search = query.get('search');

    const itemPlus = <FontAwesomeIcon icon={faPlus} color="white" /> 


    const changeUri = (value) => {
        let searchQuery = `?page=1&sorting=${sorting}&category=${value}`;

        if (querySearchValue) {
            searchQuery += `&search=${search}`
        }

        history.push({
            pathname: '/admin/home',
            search: searchQuery
        })  
    }


    return <div>
        <Row className="d-flex justify-content-between mr-3">
            <Link to="/admin/CreateProduct" className="ml-3 mb-3 d-flex align-items-end">
                <Button> {itemPlus} Ajouter un Produit</Button>
            </Link>
            <SearchProductAdmin></SearchProductAdmin>

            <CategoryFilter changeUri={changeUri}></CategoryFilter>
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

AdminHomeTableOptions.propTypes = {
    handleRemove : PropTypes.func.isRequired,
    querySearchValue : PropTypes.string,
    children : PropTypes.element.isRequired
}

export default AdminHomeTableOptions;