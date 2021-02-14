/** @jsxImportSource @emotion/react */
import React, {useContext, useState} from 'react';
import {Card, Button} from 'react-bootstrap';
import ProductFormComment from './ProductFormComment.jsx';
import {UserContext} from './UserContext.jsx';
import RedirectLoginRegister from './RedirectLoginRegister.jsx';
import {css} from '@emotion/react';
import PropTypes from 'prop-types';

function ProductPriceAddShoppingCart ({price}){

    const informationUser = useContext(UserContext);


    // utiliser un usestate pour faire apparaite la div 
    const [redirect, setRedirect] = useState();
    const handleClickAddShoppingCart = () => {
        // console.log("clique")
        setRedirect(<RedirectLoginRegister>Pour ajouter le produit au panier, vous devez être connecté : </RedirectLoginRegister>)
    }

    return <>
    <Card className="mt-5 mb-5">
        <Card.Body className="d-flex justify-content-center flex-column">
            <Card.Title 
                css={css`
                    margin: auto;
                    margin-bottom: 0.75em
                `}
            >Prix : {price} €</Card.Title>
        
                {informationUser.email === null && informationUser.token === null ?
                    <>
                    <Button
                        css={css`
                            color: white;
                        `}
                        onClick={handleClickAddShoppingCart}
                    >Ajouter au panier</Button>
                    
                    </>
                :
                
                    // <Card.Link href='#'
                    //     css={css`
                    //         color: white;
                    //     `}
                    // >Ajouter au panier</Card.Link>
                    <Button
                        css={css`
                            color: white;
                        `}
                        onClick={handleClickAddShoppingCart}
                    >Ajouter au panier</Button>
                }
                
            
        </Card.Body>
    </Card>

    {redirect}

    {informationUser.email === null && informationUser.token === null ? 
        <></>
    : 
        <>
            <div className="d-flex justify-content-center mt-5 mb-5">
                <h2 
                    css={css`
                        white-space: nowrap;
                    `}
                > Ecrire un commentaire :</h2>
            </div>
            <ProductFormComment></ProductFormComment>
        </>
    }
</>
}

ProductPriceAddShoppingCart.propTypes = {
    price : PropTypes.number
}

export default ProductPriceAddShoppingCart;