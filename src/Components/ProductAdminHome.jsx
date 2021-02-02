import React from 'react';
// import DropdownMenu from './DropdownMenu.jsx';
import {Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

function ProductAdminHome ({selectedIdProduct, data, setSelectedIdProduct}) {
    // probleme checked generale > checked specifique
    // activer le checked generale a un instant t
    console.log(data.data)
    const editIcon = <FontAwesomeIcon icon={faPencilAlt} />
    let idArray = []
    const selectAll = () => {
       
        console.log(selectedIdProduct.array)
        selectedIdProduct.array.map(id => idArray.push('' + id)) //idArray.push('' + id)
        // inserer un par les id dans idArray comme si on avait cliqué dessus
        console.log(idArray)
    }

    // selectedIdProduct.length != 0 ? selectAll():  idArray = selectedIdProduct
    selectedIdProduct.status ? selectAll():  idArray = selectedIdProduct.array
    

    const handleChange = (e) => {
        // modif du selectedIdProduct
        console.log(e.target)
        if(e.target.checked === true ){
            idArray.push(e.target.id)
        }else{
            const index = idArray.indexOf(e.target.id);
            if (index > -1) {
                idArray.splice(index, 1);
            }
        }

        if(selectedIdProduct.status !== true){
            // envoie du tableau dans le useState
            setSelectedIdProduct({array: idArray})
            console.log(selectedIdProduct.array)
        }
        
       

    }

    return <>
    {data.status ? 
        data.data.map(product => 
            <tr key={product.id}>
                <td>
                    <Form.Check
                        onChange={handleChange}
                        type="checkbox"
                        id={product.id}
                        checked={selectedIdProduct.status} // active quand l'id est dans le tableau
                        label=""
                        custom
                    />        
                </td>
                <td>{product.name}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td>{product.price}€</td>
                <td >
                    {/* <DropdownMenu></DropdownMenu> */}
                    <Link to={`/admin/edit/${product.id}`}><Button variant="secondary">{editIcon}</Button></Link>
                </td>

            </tr>
        
        )
        : 
        <p>Chargement ...</p>
                        
        }      
    </>
}

export default ProductAdminHome;