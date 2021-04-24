/** @jsxImportSource @emotion/react */
import React,{useState, useRef} from 'react';
import {Row, Image, Card,Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { css} from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import screen from '../images/screen.jpg';
import { faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';

function ProductImageDescription ({image, children}) {
    const refRow = useRef(null);

    const lessItem = <FontAwesomeIcon icon={faAngleUp}/>;
    const plusItem = <FontAwesomeIcon icon={faAngleDown}/>;

    const [showText, setShowText] = useState(false);

    const handleClick = () => {
        if(showText === true){
            setShowText(false)
        }else{
            setShowText(true)
        }
    }

    

    return <Row ref={refRow} className="d-flex justify-content-center mb-4">

        <div  className="col-lg-4 col-md-12 d-flex justify-content-center align-items-center ">
            <Image className="m-2" src={image !== null ? image : screen} rounded 
                css={css`
                    max-height: 318px;
                    max-width: 318px;
                `}
                
            />
        </div>
        
        <div className="col-lg-7 col-md-12">
            <Card>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    {children.length > 200 && refRow.current.clientWidth < 500 ?
                        showText === true ?
                            <>
                                {children.substr(0, 200)}...
                                <br/>
                                <Button className="mt-2" variant="secondary" onClick={handleClick}>{plusItem}</Button>
                            </>
                            :
                            <>
                                {children}
                                <br/>
                                <Button className="mt-2" variant="secondary" onClick={handleClick}>{lessItem}</Button>
                            </> 
                    :
                        children
                    }
                    
                </Card.Body>
            </Card>
        </div>
        
    </Row>
}


export default ProductImageDescription;

ProductImageDescription.propTypes = {
    image :  PropTypes.string,
    children : PropTypes.string
}