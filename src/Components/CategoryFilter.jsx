import React, {useState} from 'react';
import {Form} from 'react-bootstrap';
import axios from 'axios';

function CategoryFilter ({data, setData}) {

    // récupère la valeur de l'input
    const [value, setValue] = useState();

    // const test = useMemo(() => {
    //     axios.get('https://127.0.0.1:8000/products/sports')
    //     .then(function (response){
    //         // handle success
    //         setData({...data, filter: response.data})
    //         console.log(response.data);
    //     })
    //     .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //     })
    // }, [data, setData])

    const handleChange = (e) => {
        console.log(e.target.value);
        if(e.target.value === "sports/vetements"){
            axios.get('https://127.0.0.1:8000/products/sports')
        .then(function (response){
            // handle success
            setData({...data, filter: response.data})
            console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        }else if(e.target.value === "livres"){
            axios.get('https://127.0.0.1:8000/products/livres')
            .then(function (response){
                // handle success
                setData({...data, filter: response.data})
                console.log(response.data);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
        }else if(e.target.value === "maison"){
            axios.get('https://127.0.0.1:8000/products/maison')
            .then(function (response){
                // handle success
                setData({...data, filter: response.data})
                console.log(response.data);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
        }else if(e.target.value === "informatique/high-tech"){
            axios.get('https://127.0.0.1:8000/products/informatique')
                .then(function (response){
                    // handle success
                    setData({...data, filter: response.data})
                    console.log(response.data);
                })
                .catch(function (error) {
                  // handle error
                  console.log(error);
                })
        }else{
            axios.get('https://127.0.0.1:8000/products')
                .then(function (response){
                    // handle success
                    setData({...data, filter: response.data})
                    console.log(response.data);
                })
                .catch(function (error) {
                  // handle error
                  console.log(error);
                })
        }   
        setValue(e.target.value); 
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