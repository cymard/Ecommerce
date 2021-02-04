import React from 'react';
// import DropdownMenu from './DropdownMenu.jsx';
import {Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

function ProductsListAdmin ({data,setSelectedIdProduct,selectedIdProduct}) {


    const editIcon = <FontAwesomeIcon icon={faPencilAlt} />
    let idArray = selectedIdProduct



    //Tous les products recus dans ce tableau doivent etre checked


    const handleChange = (e) => {
        // modif du selectedIdProduct
        if(e.target.checked === true ){
            idArray.push(e.target.id)

        }else{
            const index = idArray.indexOf(e.target.id);
            if (index > -1) {
                idArray.splice(index, 1);
            }
        }
        setSelectedIdProduct(idArray)
        console.log(selectedIdProduct)
    }

    // donner une ref ou useState a chaque checkbox pour pouvoir les activer sans cliquer dessus

 

    return <>
    {data.map(product => 
            <tr key={product.id}>
                <td>
                    <Form.Check
                        onChange={handleChange}
                        type="checkbox"
                        id={product.id}
                        // ref={product.id}
                        // checked={} // active quand l'id est dans le tableau
                        label=""
                        custom
                    />        
                </td>
                <td>{product.name}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td>{product.price}€</td>
                <td >
                    <Link to={`/admin/edit/${product.id}`}><Button variant="secondary">{editIcon}</Button></Link>
                </td>

            </tr>
        
        )}      
    </>
}

export default ProductsListAdmin;