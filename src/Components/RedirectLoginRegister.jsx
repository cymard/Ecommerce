/** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from '@emotion/react';
import {Button, Row ,Col} from 'react-bootstrap';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'; // ES6

function RedirectLoginRegister ({children}) {
    return <div
            css={css`
               display: flex;
               justify-content: center;
               width: 100%;
               flex-direction: column;
               background-color: #c5cdc7;
               padding: 30px 0;
               border-radius: 5px;
            `}
        >
            <div
                css={css`
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    flex-direction: row;
                `}
            
            >
                <h2 className="mb-5 text-center"> {children} </h2>
            </div>
            <Row
                css={css`
                    display: flex;
                    justify-content: space-around;
                    width: 100%;
                    margin: 0;
                `}
            >
                <Col sm={12} lg={6}>
                    <Link  to="/Login"><Button className="mb-2 w-100" variant="success">Connectez-vous à votre compte</Button></Link>
                </Col>
                <Col sm={12} lg={6}>
                    <Link  to="/Register"><Button className="w-100" variant="warning">Inscrivez-vous maintenant</Button></Link>
                </Col>

            </Row>

        </div>
        
}

RedirectLoginRegister.propTypes = {
    children : PropTypes.string
}

RedirectLoginRegister.defaultProps = {
    children: 'Pour accéder à votre panier vous devez être connecté'
};

export default RedirectLoginRegister;