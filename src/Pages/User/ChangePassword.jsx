/** @jsxImportSource @emotion/react */
import React, {useContext, useState, useCallback} from 'react';
import { UserContext } from '../../Components/Context/UserContext';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import ChangePasswordForm from '../../Components/FrontOffice/ChangePasswordForm.jsx';
import UserAlert from '../../Components/All/UserAlert.jsx';



function ChangePassword () {
    let history = useHistory();
    const informationUser = useContext(UserContext);
    const token = informationUser.token;

    const [changePassword, setChangePassword] = useState({})
    const [alertState, setAlertState] = useState({
        isOpen: false,
        text: undefined,
        variant: undefined
    })

    const closeAlert = useCallback(
        () => {
            setTimeout(()=>{
                setAlertState({
                    isOpen: false,
                    text: undefined,
                    variant: undefined
                });
            }, 3000)
        },[]
    )


    const modifyPassword = useCallback(
        (dataPassword) => {
            axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}
            axios.put('https://protected-taiga-91617.herokuapp.com/api/modify/password',dataPassword )
            .then(function(response) {
                setChangePassword({
                    message: response.data.message
                })
                setAlertState({
                    isOpen: true,
                    text: "Mot de passe modifié.",
                    variant: "success"
                });
                closeAlert();

                history.push('/home')
            })
            .catch(function(error) {
                console.warn(error);

                setAlertState({
                    isOpen: true,
                    text: "Une erreur est survenue dans la modification du mot de passe.",
                    variant: "danger"
                });

                setChangePassword({
                    message: error.response.data.message
                })

            })
        },[token, history, closeAlert]
    )


    return <>
    <UserAlert
        variant={alertState.variant}
        isOpen={alertState.isOpen}
    >
        {alertState.text}
    </UserAlert>
    <ChangePasswordForm 
        request={modifyPassword} 
        changePassword={changePassword}
    ></ChangePasswordForm>
    </>
}

export default ChangePassword;