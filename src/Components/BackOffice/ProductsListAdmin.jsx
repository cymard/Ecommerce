import React from 'react';
import {Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt,faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';


function ProductsListAdmin ({data,setSelectedProducts,selectedProducts}) {

    const editIcon = <FontAwesomeIcon icon={faPencilAlt} />
    const commentIcon = <FontAwesomeIcon icon={faCommentAlt} />

    const handleChange = (e) => {
        const productId = parseInt(e.target.id, 10);
        
        if (isNaN(productId)) {
            return;
        }
        
        if(e.target.checked === true ){
            // on ajoute la valeur de l'id dans le tableau
            setSelectedProducts([...selectedProducts, productId])
        }else{
            // on cherche son index et l'enleve du tableau
            const index = selectedProducts.indexOf(productId);
            if (index > -1) {
                const newSelectedProducts = [...selectedProducts];
                newSelectedProducts.splice(index, 1);
                setSelectedProducts(newSelectedProducts);
            }
        }
    }

 

    return <>
    {data.map(product => 
            <tr key={product.id}>
                <td>
                    <Form.Check
                        onChange={handleChange}
                        type="checkbox"
                        id={product.id}
                        checked={selectedProducts.indexOf(product.id) !== -1} 
                        custom
                    />        
                </td>
                <td>{product.name}  </td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td>{product.price}€</td>
                <td>
                    <Link to={`/admin/product/${product.id}/comments`}><Button variant="secondary">{commentIcon}</Button></Link>
                </td>
                <td>
                    <Link to={`/admin/product/${product.id}/edit`}><Button variant="secondary">{editIcon}</Button></Link>
                </td>
            </tr>
        )}      
    </>
}

ProductsListAdmin.propTypes = {
    data : PropTypes.array.isRequired,
    setSelectedProducts : PropTypes.func.isRequired,
    selectedProducts : PropTypes.array.isRequired
}

export default ProductsListAdmin;