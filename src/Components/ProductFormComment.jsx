import React from 'react';
import {Form,Card,Container,Button} from 'react-bootstrap'


function ProductFormComment () {
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

            <Button type="submit" variant="primary" size="lg" block>
                Poster
            </Button>
        </Form>
    </Container> 
</Card>
    
    
}

export default ProductFormComment;