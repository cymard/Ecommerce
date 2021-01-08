/** @jsxImportSource @emotion/react */
import React, {useContext} from 'react';
import {Form,Card,Container,Button} from 'react-bootstrap'
import {UserContext} from './UserContext.jsx';
import {
    Link
  } from "react-router-dom";
import { css} from '@emotion/react';

function ProductFormComment () {

    const informationUser = useContext(UserContext);

    return <Card border="primary" className="mb-5 pt-3 pb-3">
    <Container>
        <Form>
            <Form.Group controlId="commentPseudo">
                <Form.Label>Pseudo </Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>

            <Form.Group controlId="commentContent">
                <Form.Label>Commentaire </Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
            {informationUser.email === null && informationUser.token === null?
                <Link to="/login"><Button  variant="primary" size="lg"
                    css={css`
                        width: 100%; 
                    `}
                >Poster</Button></Link>
            :
                <Button type="submit" variant="primary" size="lg" block>Poster</Button>
            }
            
        </Form>
    </Container> 
</Card>
    
    
}

export default ProductFormComment;