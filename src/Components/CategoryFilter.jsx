import React, {useState} from 'react';
import {Form} from 'react-bootstrap';
import {useHistory,useParams} from "react-router-dom";

function CategoryFilter () {
    let history = useHistory();
    let { sort, } = useParams();
    let { category } = useParams();
    // récupère la valeur de l'input
    if(category === "sports"){
      category = "sports/vetements"
    }else if(category === "informatique"){
        category = "informatique/high-tech";
    }
    
    const [value, setValue] = useState(category);
    
    console.log(value);

    const handleChange = (e) => {
        console.log(e.target.value);
        // changer l'url
        if(e.target.value === "sports/vetements"){
            setValue("sports/vetements");
            history.push(`/admin/home/sports/1/${sort}`);
        }else if(e.target.value === "informatique/high-tech"){
            setValue("informatique/high-tech");
            history.push(`/admin/home/informatique/1/${sort}`);
        }else if(e.target.value === "Toutes"){
            setValue("Toutes");
            history.push(`/admin/home/all/1/${sort}`);
        }else{
            setValue(e.target.value);
            history.push(`/admin/home/${e.target.value}/1/${sort}`);
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