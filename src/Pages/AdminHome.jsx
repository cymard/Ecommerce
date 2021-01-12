/** @jsxImportSource @emotion/react */
import React,{useEffect,useState} from 'react'
import {css} from '@emotion/react';
import {Table, Container, Button, Form, Dropdown} from 'react-bootstrap'
import axios from 'axios'
import {Link} from "react-router-dom";
import AdminNavBar from "../Components/AdminNavBar.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faCog, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';



function AdminHome () {
    //  icones
    const editIcon = <FontAwesomeIcon icon={faPencilAlt} />
    const deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />
    const parameterIcon = <FontAwesomeIcon icon={faCog} />
    const arrowUpIcon = <FontAwesomeIcon icon={faAngleUp} />
    const arrowDownIcon = <FontAwesomeIcon icon={faAngleDown} />

    
    const [data, setData] = useState({status : false, data : null, filter : null});

    // requête, pour récuperer l'ensemble des produits
    useEffect(() => {
        axios.get('https://127.0.0.1:8000/products')
        .then(function (response) {
            // handle success
            setData({status : true, data : response.data, filter : response.data})
            console.log(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }, [])

   
   

    // les filtres
    // filtrer le data en fonction d'une catégorie et retourner le nouveau data
    const displayInformatiqueHighTech = function(data){
        let InformatiqueHighTechData = [];
        data.forEach(product => {
            if(product.category === "informatique/high-tech"){InformatiqueHighTechData.push(product)}
        });
        console.log(InformatiqueHighTechData)
        return InformatiqueHighTechData;
    }

    const displayLivres = function(data){
        let livresData = [];
        data.forEach(product => {
            if(product.category === "livres"){livresData.push(product)}
        });
        console.log(livresData)
        return livresData;
    }

    const displayMaison = function(data){
        let maisonData = [];
        data.forEach(product => {
            if(product.category === "maison"){maisonData.push(product)}
        });
        console.log(maisonData)
        return maisonData;
    }

    const displaySportsVetements = function(data){
        let sportsVetementsData = [];
        data.forEach(product => {
            if(product.category === "sports/vetements"){sportsVetementsData.push(product)}
        });
        console.log(sportsVetementsData)
        return sportsVetementsData;
    }

    // récupère la valeur de l'input
    const [value, setValue] = useState();

    const handleChange = (e) => {
        setValue(e.target.value); 
    }

    // on choisit le data à envoyer en fonction de la valeur de l'input
    const handleClickFilter = (e) => {
        // e.target.value est egal à la valeur de l'input
        if(e.target.value === "sports/vetements"){
            setData({...data, filter: displaySportsVetements(data.data)})
        }else if(e.target.value === "livres"){
            setData({...data, filter: displayLivres(data.data)})
        }else if(e.target.value === "maison"){
            setData({...data, filter: displayMaison(data.data)})
        }else if(e.target.value === "informatique/high-tech"){
            setData({...data, filter: displayInformatiqueHighTech(data.data)})
        }else{
            setData({...data, filter: data.data})
        }   
    }

    // boutons arrowUp et arrowDown
    const handleClickArrowUp = () =>  {
        
        // organiser de façon décroissante
        let newData = data.filter.sort(function (a, b) {
            return b.price - a.price;
         });

        setData({...data, filter: newData})
        // faire un setData avec le nouveau tableau pour changer le filter 
    }

    const handleClickArrowDown = () =>  {
        
        // organiser de façon décroissante
        let newData = data.filter.sort(function (a, b) {
            return a.price - b.price;
         });

        setData({...data, filter: newData})
        // faire un setData avec le nouveau tableau pour changer le filter 
    }



    return <div     
        css={css`
            min-height: calc(100vh - 64px);
            display: flex;
        `}
    >
        <AdminNavBar/>

        <Container fluid>
            <h1 className="text-center mt-4 mb-5">Administration</h1>
            <Form className="d-flex justify-content-around">
                <Form.Group >
                    <Form.Label>Action groupée :</Form.Label>
                    <div className="d-flex">
                        <Form.Control as="select" >
                            <option>Aucune action</option>
                            <option>Action 1</option>
                            <option>Action 2</option>
                            <option>Action 3</option>
                        </Form.Control>
                        <Button className="ml-2" variant="secondary">Valider</Button>
                    </div>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Filtres :</Form.Label>
                    <div className="d-flex">
                        <Form.Control onChange={handleChange} as="select">
                            <option>All</option>
                            <option>sports/vetements</option>
                            <option>livres</option>
                            <option>maison</option>
                            <option>informatique/high-tech</option>
                        </Form.Control>
                        <Button onClick={handleClickFilter} value={value}  className="ml-2" variant="secondary">Appliquer</Button>
                    </div>
                </Form.Group>
            </Form>

            <Table className="mb-5 text-center" hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Nom du Produit</th>
                        <th>Catégorie</th>
                        <th>
                            <div className="d-flex justify-content-center align-items-center">
                                Prix
                                <div className="ml-2 d-flex flex-column">
                                    <Button onClick={handleClickArrowUp} variant="secondary" className="p-0 pl-1 pr-1 rounded-0"
                                        css={css`
                                            background-color: white;
                                            border: 1px black solid;
                                            color: black;
                                        `}
                                    >{arrowUpIcon}</Button>
                                    <Button onClick={handleClickArrowDown}  variant="secondary" className="p-0 pl-1 pr-1 rounded-0"
                                        css={css`
                                            background-color: white;
                                            border: 1px black solid;
                                            color: black;
                                        `}
                                    >{arrowDownIcon}</Button>
                                </div>
                            </div>
                        </th>
                        <th>Paramètres</th>
                    </tr>
                </thead>


                <tbody>
                    {data.status ? 
                    data.filter.map(product => 
                        <tr key={product.id}>
                            <td>
                                <Form.Check
                                    type="checkbox"
                                    id={product.id}
                                    label=""
                                    custom
                                />        
                            </td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.price}€</td>
                            <td>
                                <Link to="#">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            {parameterIcon}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">{editIcon} Modifier</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">{deleteIcon} Supprimer</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Link>
                            </td>

                        </tr>
                    
                    )
                    : 
                    <p>Chargement ...</p>
                    
                    }      
                </tbody>
        </Table>
    </Container>
  </div>
}

export default AdminHome;