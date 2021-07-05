import React from 'react';
import {Form, FormControl, Button} from 'react-bootstrap';import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';


function SearchBar ({searchValue, handleClearSearch, handleSubmit, changeSearchValue}) {
    const searchItem = <FontAwesomeIcon icon={faSearch}/>;

    return <Form className="d-flex justify-content-around">
    <Form.Group className="d-flex justify-content-center">
        <div className="d-flex ">
            <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                Rechercher...
            </Form.Label>
            <FormControl onChange={changeSearchValue} value={searchValue} id="inlineFormInputGroupUsername" placeholder="Email" />
        </div>
        <Button onClick={handleClearSearch} className=" mr-1" variant="outline-dark">X</Button>
        <Button type="submit" onClick={handleSubmit}>{searchItem}</Button>
    </Form.Group>
</Form>
}

SearchBar.propTypes = {
    searchValue : PropTypes.string.isRequired, 
    handleClearSearch : PropTypes.func.isRequired, 
    handleSubmit : PropTypes.func.isRequired, 
    changeSearchValue : PropTypes.func.isRequired
}

export default SearchBar;