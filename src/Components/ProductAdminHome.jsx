import React from 'react';
import DropdownMenu from './DropdownMenu.jsx';
import {Form } from 'react-bootstrap';

function ProductAdminHome ({data}) {

    return <>
    {data.status ? 
        data.data.map(product => 
            <tr key={product.id}>
                <td>
                    <Form.Check
                        type="checkbox"
                        id={product.id}
                        label=""
                        custom
                    />        
                </td>
                <td>{product.name}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td>{product.price}€</td>
                <td >
                    <DropdownMenu></DropdownMenu>
                </td>

            </tr>
        
        )
        : 
        <p>Chargement ...</p>
                        
        }      
    </>
}

export default ProductAdminHome;