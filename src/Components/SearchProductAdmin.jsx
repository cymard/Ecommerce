import React,{useState, useCallback} from 'react';
import {Form, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import {
    useHistory
} from "react-router-dom";

function SearchProductAdmin (){
    const itemSearch = <FontAwesomeIcon icon={faSearch}  /> 

    const [searchValue, setSearchValue] = useState();
    let history = useHistory();
    const handleChangeSearch = useCallback(
        (e) => {
            setSearchValue(e.target.value);
        },
        [],
    )

    const handleClickSubmitSearch = useCallback(
        () => {
            history.push(`/admin/home?search=${encodeURIComponent(searchValue)}&category=all&page=1&sorting=default`);
        },
        [searchValue,history],
    )


    return <Form>
    <Form.Group  controlId="search">
        <Form.Label>Rechercher :</Form.Label>
        <div className="d-flex">
            <Form.Control className="mr-1" onChange={handleChangeSearch} type="text" value={searchValue}/>
            <Button onClick={handleClickSubmitSearch}>{itemSearch}</Button>
        </div>
    </Form.Group>
</Form>
}

export default SearchProductAdmin;