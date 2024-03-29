/** @jsxImportSource @emotion/react */
import React, {useState, useCallback, useContext} from 'react';
import { Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {css} from '@emotion/react';
import axios from 'axios';
import {UserContext} from '../Context/UserContext.jsx';
import ShoppingCartProductImage from './ShoppingCartProductImage.jsx';
import ShoppingCartProductInformations from './ShoppingCartProductInformations.jsx';


function ShoppingCartProduct ({reFetch, image, title, price, quantity, id, closeAlert, setAlertState}) {
    
    const [quantityToBuy, setQuantityToBuy] = useState(quantity)

    const quantityToBuyChange = (e) => {
        setQuantityToBuy(e.target.value)
    }

    const {token} = useContext(UserContext);

    const updateQuantity = useCallback(
        (e) => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.put(`https://protected-taiga-91617.herokuapp.com/api/cart/product/${id}/quantity`,{
                "quantity" : quantityToBuy
            })
            .then(function (response){
                if(response.data.message){
                    setAlertState({
                        isOpen: true,
                        text: "Panier mis à jour.",
                        variant: "success"
                    })
                    closeAlert()
                   
                }else{
                    setAlertState({
                        isOpen: true,
                        text: "Impossible d'éffectuer cette action, La quantité demandée est supérieure au stock disponibles.",
                        variant: "danger"
                    })
                    setQuantityToBuy(response.data.number);
                }
                reFetch();

                
            })
            .catch(function (error) {
                console.warn(error); 
                setAlertState({
                    isOpen: true,
                    text: "Une erreur est survenue lors de la mise à jour du panier.",
                    variant: "danger"
                })
            })
        },
        [token,quantityToBuy,id,reFetch,closeAlert,setAlertState]
    )

    const handleClickDelete = useCallback(
        (e) => {
            axios.delete(`https://protected-taiga-91617.herokuapp.com/api/cart/product/${id}/delete`,{
                headers:{'Authorization': `Bearer ${token}`}
            })
            .then(function (response){
                setAlertState({
                    isOpen: true,
                    text: "Panier mis à jour.",
                    variant: "success"
                })
                closeAlert()
                reFetch()
            })
            .catch(function (error) {
                console.warn(error); 
                setAlertState({
                    isOpen: true,
                    text: "Une erreur est survenue lors de la mise à jour du panier.",
                    variant: "danger"
                })
            })
        },
        [token,id,reFetch,closeAlert,setAlertState],
    )


    return <div 
        className="d-flex mb-5" 
        css={css`
            width: 100%;
        `}
    >
        <Row
            css={css`
                height: 100%;
                width: 100%;
                margin: 0;
            `}
        >
            <ShoppingCartProductImage image={image} />
            
            <Col  
                css = {css`
                    height: 20px;
                `}
                sm={12}
                md={12}
                lg={1}
            ></Col>

            <ShoppingCartProductInformations
                title={title} 
                price={price} 
                quantityToBuy={quantityToBuy} 
                quantityToBuyChange={quantityToBuyChange} 
                updateQuantity={updateQuantity} 
                handleClickDelete={handleClickDelete}
            ></ShoppingCartProductInformations>
        </Row>
    </div>
}

ShoppingCartProduct.propTypes = {
    image : PropTypes.string,
    title : PropTypes.string,
    price : PropTypes.number,
    quantity : PropTypes.number,
    id : PropTypes.number,
    setAlertState : PropTypes.func,
    closeAlert : PropTypes.func

}

ShoppingCartProduct.defaultProps = {
    image : "holder.js/100px160",
    title : "Titre du produit",
    price : 10
}

export default ShoppingCartProduct;