/** @jsxImportSource @emotion/react */
import React from 'react'
import { Button} from 'react-bootstrap';
import {css} from '@emotion/react';
import ProductComment from './ProductComment.jsx';



function ProductCommentCard({comment,handleRemove}){
    return <div key={comment.id}>
        <ProductComment
            key={comment.id}
            pseudo={comment.username} 
            content={comment.content} 
            note={comment.note} 
            date={comment.date} 
            title={comment.title}
            buttons={<Button className="w-100" id={comment.id} variant="danger" onClick={handleRemove}>Supprimer</Button>}
        ></ProductComment>
        <div 
            key={comment.id +10}
            css={css`
                height : 20px;
            `}
        ></div>
    </div>
}

export default ProductCommentCard;