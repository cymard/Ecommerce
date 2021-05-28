/** @jsxImportSource @emotion/react */
import React, {useContext, useState, useCallback} from 'react';
import { UserContext } from '../../Components/Context/UserContext';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import ChangePasswordForm from '../../Components/FrontOffice/ChangePasswordForm.jsx';



function ChangePassword () {
    let history = useHistory();
    const informationUser = useContext(UserContext);
    const token = informationUser.token;

    const [changePassword, setChangePassword] = useState({})


    const modifyPassword = useCallback(
        (dataPassword) => {
            axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}
            axios.put('https://127.0.0.1:8000/api/modify/password',
                dataPassword 
            )
            .then(function(response) {
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