import React, {useState} from 'react';
import {Form} from 'react-bootstrap';

function CategoryFilter () {

    // récupère la valeur de l'input
    const [value, setValue] = useState();

    const handleChange = (e) => {
        if(e.target.value === "sports/vetements"){
            // requête pour sports/vetements
        }else if(e.target.value === "livres"){
            
        }else if(e.target.value === "maison"){
            
        }else if(e.target.value === "informatique/high-tech"){
            
        }else{
            
        }   
        setValue(e.target.value); 
    }


    return <Form className="d-flex justify-content-around">
        <Form.Group>
            <Form.Label>Catégorie :</Form.Label>
            <div className="d-flex">
                <Form.Control value={value} onChange={handleChange} as="select">
                    <option>Toutes</option>
                    <option>sports/vetements</option>
                    <option>livres</option>
                    <option>maison</option>
                    <option>informatique/high-tech</option>
                </Form.Control>
            </div>
        </Form.Group>
    </Form>
}

export default CategoryFilter;