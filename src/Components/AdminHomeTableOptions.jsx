import React from 'react';
import { Button, Row } from 'react-bootstrap';
import CategoryFilter from './CategoryFilter.jsx';
import SearchCategoryFilter from './SearchCategoryFilter.jsx';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import SearchProductAdmin from './SearchProductAdmin.jsx';

function AdminHomeTableOptions ({handleRemove, querySearchValue, children}) {

    const itemPlus = <FontAwesomeIcon icon={faPlus} color="white" /> 


    return <div>
        <Row className="d-flex justify-content-between mr-3">
            <Link to="/admin/CreateProduct" className="ml-3 mb-3 d-flex align-items-end">
                <Button> {itemPlus} Ajouter un Produit</Button>
            </Link>
            <SearchProductAdmin></SearchProductAdmin>

            {querySearchValue !== null ?
                <SearchCategoryFilter></SearchCategoryFilter>
            :
                <CategoryFilter></CategoryFilter> 
            }
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