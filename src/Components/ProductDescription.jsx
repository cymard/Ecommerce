/** @jsxImportSource @emotion/react */
import React,{useState} from 'react';
import {Card,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';


function ProductDescription ({children, refRow}) {

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

    return <div className="col-lg-7 col-md-12">
        <Card>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                {children.length > 200 && refRow.current.clientWidth < 500 ?
                    showText === true ?
                        <>
                            {children}
                            <br/>
                            <Button className="mt-2" variant="secondary" onClick={handleClick}>{lessItem}</Button>
                        </> 
                    :
                        <>
                            {children.substr(0, 200)}...
                            <br/>
                            <Button className="mt-2" variant="secondary" onClick={handleClick}>{plusItem}</Button>
                        </>
                :
                    children
                }
            </Card.Body>
        </Card>
    </div>
}

export default ProductDescription;