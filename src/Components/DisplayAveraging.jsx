import React from 'react';
import {ProgressBar,Card} from 'react-bootstrap'

function DisplayAveraging ({children, rateNumber}) {
    const now = children;

    const progressInstance = <ProgressBar variant="success" animated={true} now={now} max={5}  label={`${now}/5`} />;


    return <Card className="mt-4">
    <Card.Body className="d-flex justify-content-center flex-column">
        <Card.Title className="text-center"> Note moyenne du Produit  </Card.Title>
        <p>Nombre de commentaires : {rateNumber}</p>

        <div className="d-flex">
            <div className="w-100">{progressInstance}</div>
        </div>
    </Card.Body>
    </Card>
    


}

export default DisplayAveraging;