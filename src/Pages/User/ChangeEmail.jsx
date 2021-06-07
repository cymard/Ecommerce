/** @jsxImportSource @emotion/react */
import React, {useContext, useState, useCallback} from 'react';
import { UserContext } from '../../Components/Context/UserContext';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import ChangeEmailForm from '../../Components/FrontOffice/ChangeEmailForm.jsx';


function ChangeEmail () {

    let history = useHistory();

    const informationUser = useContext(UserContext);
    const token = informationUser.token;

    const [changeEmail, setChangeEmail] = useState({})

    const modifyEmail = useCallback(
        (dataPassword) => {
            axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}
            axios.put('https://127.0.0.1:8000/api/modify/email', dataPassword)
            .then(function(response) {
                setChangeEmail({
                    message: response.data.message
                })

                // se déconnecter du compte
                informationUser.setUserInformation({
                    email: null,
                    token: null
                });

                // redirection vers la page de connexion
                history.push('/login');

            })
            .catch(function(error) {
                console.warn(error);
                setChangeEmail({
                    message: error.response.data.message
                })
            })
        },[token, history,informationUser]
    )



    return <ChangeEmailForm 
        request={modifyEmail} 
        changeEmail={changeEmail}
    ></ChangeEmailForm>
}


export default ChangeEmail; 