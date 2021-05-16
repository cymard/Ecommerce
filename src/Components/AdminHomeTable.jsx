/** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from '@emotion/react';
import {Table,Form} from 'react-bootstrap';
import SortPriceButtons from './SortPriceButtons.jsx';
import SearchSortPriceButtons from './SearchSortPriceButtons.jsx';
import ProductsListAdmin from './ProductsListAdmin.jsx';


function AdminHomeTable ({data, querySearchValue, setData, setSelectAllChecked, isSelectAllChecked, setSelectedProducts, selectedProducts}) {

    const handleClickSelectAll = (e) => {
        if(e.target.checked === true){
            // séléctionner tous les checkboxs
            setSelectedProducts(data.productsList.map(product => product.id));
            setSelectAllChecked(true)
        }else{
            setSelectedProducts([]);
            setSelectAllChecked(false)
        }
    }

    return <Table className="text-center" hover>
    <thead>
        <tr>
            <th>
                <Form.Check
                    type="checkbox"
                    id="selectAll"
                    onChange={handleClickSelectAll}
                    checked={isSelectAllChecked || selectedProducts.length === 9}
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
                <ProductsListAdmin 
                    selectedProducts={selectedProducts} 
                    setSelectedProducts={setSelectedProducts} 
                    data={data.productsList}
                ></ProductsListAdmin>
            :  
                <tr><th>Chargement ...</th></tr>
            }
            </>
        }
    </tbody>
</Table>
}

export default AdminHomeTable;