import React, {useState} from 'react';
import {Form, FormControl, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {
    useHistory
} from "react-router-dom";

function SearchBar () {
    
    let history = useHistory();


    const searchItem = <FontAwesomeIcon icon={faSearch}/>;

    const [searchValue, setSearchValue] = useState('');

    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }

    const handleClearSearch = () => {
        history.push({
            pathname: '/admin/orders',
            search: `?page=1&search=default`
        })
        setSearchValue('');
    }

    const handleSubmit = (e) => {
        if(searchValue === ""){
            history.push({
                pathname: '/admin/orders',
                search: `?page=1&search=default`
            })
        }else{
            history.push({
                pathname: '/admin/orders',
                search: `?page=1&search=${searchValue}`
            })
        }
    }

    return <Form className="d-flex justify-content-around">
    <Form.Group className="d-flex justify-content-center">
        <div className="d-flex ">
            <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                Rechercher...
            </Form.Label>
            <FormControl onChange={handleChange} value={searchValue} id="inlineFormInputGroupUsername" placeholder="Email" />
        </div>
        <Button onClick={handleClearSearch} className=" mr-1" variant="outline-dark">X</Button>
        <Button onClick={handleSubmit}>{searchItem}</Button>
    </Form.Group>
</Form>
}

export default SearchBar;