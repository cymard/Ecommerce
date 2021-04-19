import React, {useState} from 'react';
import {Form} from 'react-bootstrap';
import {useHistory,useLocation} from "react-router-dom";

function SearchCategoryFilter () {
    let history = useHistory();
    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    let search = encodeURIComponent(query.get('search'));
    let sorting = query.get('sorting');
    let category = query.get('category');

    // récupère la valeur de l'input
    if(category === "sports"){
      category = "sports/vetements"
    }else if(category === "informatique"){
        category = "informatique/high-tech";
    }
    
    const [value, setValue] = useState(category === null ? undefined : category);


    console.log(value);

    const handleChange = (e) => {
        console.log(e.target.value);
        // changer l'url
        if(e.target.value === "sports/vetements"){
            setValue("sports/vetements");
            history.push({
                pathname: '/admin/home',
                search: `?search=${search}&category=sports&page=1&sorting=${sorting}`
              })
        }else if(e.target.value === "informatique/high-tech"){
            setValue("informatique/high-tech");
            history.push({
                pathname: '/admin/home',
                search: `?search=${search}&category=informatique&page=1&sorting=${sorting}`
              })
        }else if(e.target.value === "Toutes"){
            setValue("Toutes");
            history.push({
                pathname: '/admin/home',
                search: `?search=${search}&category=all&page=1&sorting=${sorting}`
              })
        }else{
            setValue(e.target.value);
            history.push({
                pathname: '/admin/home',
                search: `?search=${search}&category=${e.target.value}&page=1&sorting=${sorting}`
              })
        }   
        
    }


    return <Form className="d-flex justify-content-around">
        <Form.Group>
            <Form.Label>nouvelle Catégorie :</Form.Label>
            <div className="d-flex">
                {/* erreur console value should not be null*/}
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

export default SearchCategoryFilter;