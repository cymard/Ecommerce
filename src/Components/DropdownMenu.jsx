import React,{useContext} from 'react';
import {Dropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faCog} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {UserContext} from "./UserContext.jsx";

function DropdownMenu () {
    const editIcon = <FontAwesomeIcon icon={faPencilAlt} />
    const deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />
    const parameterIcon = <FontAwesomeIcon icon={faCog} />

    const userInformation = useContext(UserContext);
    const token  = userInformation.token

    const handleClickDelete = (e) => {
        axios.delete(`https://127.0.0.1:8000/admin/product/${e.target.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
      
    }

    return <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {parameterIcon}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item >{editIcon} Modifier</Dropdown.Item>
            <Dropdown.Item onClick={handleClickDelete}>{deleteIcon} Supprimer</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
}

export default DropdownMenu;