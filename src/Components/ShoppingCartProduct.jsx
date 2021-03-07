/** @jsxImportSource @emotion/react */
import React, {useState, useCallback, useContext} from 'react';
import { Card, Button ,Row, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {css} from '@emotion/react';
import axios from 'axios';
import {UserContext} from './UserContext.jsx'




function ShoppingCartProduct ({reFetch, image, title, price, quantity, id}) {
    
    const [quantityToBuy, setQuantityToBuy] = useState(quantity)

    const quantityToBuyChange = (e) => {
        setQuantityToBuy(e.target.value)
    }


    const informationUser = useContext(UserContext);
    const token = informationUser.token;
    const email = informationUser.email;


    const updateQuantity = useCallback(
        (e) => {
            // axios pour changer la quantité
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.put(`https://127.0.0.1:8000/api/cart/product/${id}/quantity`,{
                "quantity" : quantityToBuy
            })
            .then(function (response){
                // handle success
                console.log(response.data);
                reFetch()
            })
            .catch(function (error) {
                // handle error
                console.log(error); 
            })
        },
        [token,email,quantityToBuy,id],
    )

    const handleClickDelete = useCallback(
        (e) => {
            axios.delete(`https://127.0.0.1:8000/api/cart/product/${id}/delete`,{
                headers:{'Authorization': `Bearer ${token}`}
            })
            .then(function (response){
                // handle success
                console.log(response.data);
                reFetch()
            })
            .catch(function (error) {
                // handle error
                console.log(error); 
            })
        },
        [token,email,id],
    )

    

    return <Card className="d-flex mb-5" 
        css={css`
            width: 100%;
            height : 318px;
        `}
    >
        <Row 
            css={css`
                margin-right : 0;
                margin-left : 0;
                height: 100%;
            `}
        >
            <div 
                css={css`
                    width: 318px;
                `}
            >
                <Card.Img image={image} 
                    css={css`
                        height: 318px;
                        width: 318px;
                    `}
                />
            </div>
            <div 
                css={css`
                    width: calc(100% - 318px);
                `}
            >
                <Row className="d-flex justify-content-between" 
                css={css`
                    margin-right : 0;
                    margin-left : 0;
                    height: 70%;
                `}
                >
                    
                    <div className="p-4 d-flex flex-column align-items-center justify-content-between">
                        <h2>{title}</h2>
                        <Form 
                            css={css`
                                width: 100%;
                            `}
                        >
                            <Form.Group  className="d-flex"
                                css={css`
                                    width: 100%;
                                `}
                            >
                                <Form.Label 
                                    css={css`
                                        fontSize : 1.2em;
                                    `}
                                >
                                    Quantité : 
                                </Form.Label>
                                <Form.Control id="quantityToBuy" value={quantityToBuy} onChange={quantityToBuyChange} className="ml-3 mr-3" type="text" 
                                    css={css`
                                        width: 60px;
                                    `}
                                    
                                />
                                <Button onClick={updateQuantity}>Mettre à jour</Button>
                            </Form.Group>
                        </Form>
                    </div>

                    <div className="p-4">
                        <p>Prix : {price} €</p>
                    </div>
                </Row>
                <Row className="p-4 d-flex justify-content-end align-items-end" 
                    css={css`
                        marginRight : 0;
                        marginLeft : 0;
                        height: 30%;
                    `}
                >
                    <Button 
                        variant="danger" 
                        css={css`
                            height : 40px;
                        `}
                        onClick={handleClickDelete}
                    >
                        Supprimer
                    </Button>
                </Row>
            </div>
        </Row>
    </Card>

}

ShoppingCartProduct.propTypes = {
    image : PropTypes.string,
    title : PropTypes.string,
    price : PropTypes.number
}

ShoppingCartProduct.defaultProps = {
    image : "holder.js/100px160",
    title : "Titre du produit",
    price : 10
}

export default ShoppingCartProduct;