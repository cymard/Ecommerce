import React, {useState} from 'react';
import {Form} from 'react-bootstrap';
import PropTypes from 'prop-types';

function CategoryFilter ({changeUri}) {

    const [value, setValue] = useState();

    const categories = new Map([
        ['sports/vetements', 'sports'],
        ["informatique/high-tech", 'informatique'],
        ['Toutes', 'all'],
        ['maison', 'maison'],
        ['livres', 'livres']
    ]);

    const handleChange = (e) => {
        const category = categories.get(e.target.value);
        setValue(e.target.value);
        changeUri(category)
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

CategoryFilter.propTypes = {
    changeUri : PropTypes.func.isRequired
}

export default CategoryFilter;