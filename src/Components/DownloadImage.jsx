import React, {useState, useEffect, useCallback, useRef} from 'react';
import axios from 'axios';
import {Form,Button,Image} from 'react-bootstrap';
const imageToBase64 = require('image-to-base64');
var fs = require('fs');


function DownloadImage ({setImageId}) {
    
    // clé / valeur
    const formRef = useRef(null);
    const imageRef = useRef(null);

    const [imageBase64, setImageBase64 ] = useState({
        status : false
    });

    const handleChange = (e) => {
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);

        fileReader.onload = (e) => {
            const informationFile = e.target.result

            // on récupère uniquement la base64 de l'image
            const base64 = informationFile.split(',');
           
            setImageBase64({
                status: true,
                data: base64[1]
            })             

        }
    }

    const handleSubmit = () => {
        // binary ou base64
        const bodyFormData = new FormData();
        bodyFormData.append("image",imageBase64.data)
        
        requestDownloadImage(bodyFormData);
    };

    const requestDownloadImage = useCallback(
        (data) => {
            axios({
                method: 'post',
                url: 'https://api.imgbb.com/1/upload?expiration=15552000&key=602552f9aeec55ba40e0e73f6ab60d8b',
                data:  data,
                headers: {'Content-Type': 'multipart/form-data' }
                })
                .then(function (response) {
                    //handle success
                    console.log(response);
                    setImageId({
                        status: true,
                        data: response.data.data.display_url
                    });
                    console.log(response.data.data.id);
                })
                .catch(function (error) {
                    //handle error
                    console.log(error);

                    //recuperer id
                });
        },
        [setImageId],
    );

    


    return <Form.Group ref={formRef}  className="d-flex justify-content-center" controlId="formulary">
            <Form.File 
                ref={imageRef}
                id="importImage"
                onChange={handleChange}
            />
            { 
            imageBase64.status ? 
                <Button onClick={handleSubmit}>Valider</Button>
            :
                <></>
            }
    
    </Form.Group>
}

export default DownloadImage;