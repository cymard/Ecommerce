import React, {useState} from 'react';
import {Form} from 'react-bootstrap';
import {useHistory} from "react-router-dom";

function CategoryFilter () {
    let history = useHistory();
    // récupère la valeur de l'input
    const [value, setValue] = useState();

    const handleChange = (e) => {
        console.log(e.target.value);
        // changer l'url
        if(e.target.value === "sports/vetements"){
            setValue("sports");
            history.push(`/admin/home/sports/1`);
        }else if(e.target.value === "informatique/high-tech"){
            setValue("informatique");
            history.push(`/admin/home/informatique/1`);
        }else if(e.target.value === "Toutes"){
            setValue("informatique");
            history.push(`/admin/home/all/1`);
        }else{
            setValue(e.target.value);
            history.push(`/admin/home/${e.target.value}/1`);
        }   
        
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