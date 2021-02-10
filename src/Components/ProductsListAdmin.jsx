import React,{useState} from 'react';
// import DropdownMenu from './DropdownMenu.jsx';
import {Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

function ProductsListAdmin ({data,setSelectedProducts,selectedProducts}) {

    // quand l'id d'un produit est dans le tableau il est selectionné

    // ajout de l'id dans le tableau est instantané
    // le changement de valeur de checked est instantané 
    // le selectedIdProduct ne se met pas à jour dans le return 
    // solution faire un render pour chaque clique
    
    const editIcon = <FontAwesomeIcon icon={faPencilAlt} />

    // let idArray = selectedIdProduct

    // const [value, setValue] = useState() // provoque le render


    const handleChange = (e) => {
        const productId = parseInt(e.target.id, 10);
        
        if (isNaN(productId)) {
            return;
        }
        
        if(e.target.checked === true ){
            console.log(e.target.id)
            setSelectedProducts([...selectedProducts, productId])
            // on ajoute sa valeur dans le tableau
            // idArray.push(e.target.id)
            // setValue(e.target.id +=2)
            
        }else{
            // on cherche son index et l'enleve du tableau
            const index = selectedProducts.indexOf(productId);
            if (index > -1) {
                const newSelectedProducts = [...selectedProducts];
                newSelectedProducts.splice(index, 1);
                setSelectedProducts(newSelectedProducts);
                console.log(newSelectedProducts)

            }
            // setValue(e.target.id --)
        }
        // setSelectedProducts(idArray) 
        // return le tableau avec tous les id des produits selectionnés
        
        console.log(selectedProducts)
    }

 

    return <>
    {data.map(product => 
            <tr key={product.id}>
                <td>
                    <Form.Check
                        onChange={handleChange}
                        type="checkbox"
                        id={product.id}
                        // si son id est dans le tableau check
                        // selectedIdProduct.indexOf(product.id.toString()) === -1 ? false : true
                        checked={selectedProducts.indexOf(product.id) !== -1} 
                        // key={value}
                        custom
                    />        
                </td>
                <td>{product.name}  </td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td>{product.price}€</td>
                <td >
                    <Link to={`/admin/product/${product.id}/edit`}><Button variant="secondary">{editIcon}</Button></Link>
                </td>

            </tr>
        
        )}      
    </>
}

export default ProductsListAdmin;