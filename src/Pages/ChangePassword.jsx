/** @jsxImportSource @emotion/react */
import React, {useContext, useState, useCallback} from 'react';
import { UserContext } from '../Components/UserContext';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import ChangePasswordForm from '../Components/ChangePasswordForm.jsx';



function ChangePassword () {
    let history = useHistory();
    // Context
    const informationUser = useContext(UserContext);
    const token = informationUser.token;

    // state
    const [changePassword, setChangePassword] = useState({})


    // requete verif mdp
    const modifyPassword = useCallback(
        (dataPassword) => {
            axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}
            axios.post('https://127.0.0.1:8000/api/modify/password',
                dataPassword 
            )
            .then(function(response) {
                console.log(response);
                setChangePassword({
                    message: response.data.message
                })
                history.push('/home')

            })
            .catch(function(error) {
                console.log(error);
                setChangePassword({
                    message: error.response.data.message
                })
            })
        },
        [token, history]
    )


    return <ChangePasswordForm request={modifyPassword} changePassword={changePassword}></ChangePasswordForm>
}

export default ChangePassword;