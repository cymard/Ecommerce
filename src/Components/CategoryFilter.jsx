import React, {useState} from 'react';
import {Form} from 'react-bootstrap';
import {useHistory,useLocation} from "react-router-dom";

function CategoryFilter () {
    let history = useHistory();
    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    let sorting = query.get('sorting');
    let category = query.get('category');

    if(category === "sports"){
      category = "sports/vetements"
    }else if(category === "informatique"){
        category = "informatique/high-tech";
    }
    
    const [value, setValue] = useState(category === null ? undefined : category);

    const handleChange = (e) => {
        // changer l'url
        if(e.target.value === "sports/vetements"){
            setValue("sports/vetements");
            history.push({
                pathname: '/admin/home',
                search: `?category=sports&page=1&sorting=${sorting}`
              })
        }else if(e.target.value === "informatique/high-tech"){
            setValue("informatique/high-tech");
            history.push({
                pathname: '/admin/home',
                search: `?category=informatique&page=1&sorting=${sorting}`
              })
        }else if(e.target.value === "Toutes"){
            setValue("Toutes");
            history.push({
                pathname: '/admin/home',
                search: `?category=all&page=1&sorting=${sorting}`
              })
        }else{
            setValue(e.target.value);
            history.push({
                pathname: '/admin/home',
                search: `?category=${e.target.value}&page=1&sorting=${sorting}`
              })
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