import React, { useState } from 'react';
import PropTypes from 'prop-types';

const userAdminDefaultInformation = {
    email: localStorage.getItem('email_admin'),
    token: localStorage.getItem('token_admin')
}

const UserAdminContext = React.createContext(userAdminDefaultInformation);

function UserAdminContextProvider({ children }) {
    const [userAdminInformation, setUserAdminInformation] = useState(userAdminDefaultInformation);

    // set le localStorage si l'email est remplie, ou le supprime
    const setUserAdminInformationData = (userAdminInformationData) => {
        // email dans le localstorage
        if (userAdminInformationData.email) {
            localStorage.setItem('email_admin', userAdminInformationData.email);
        } else {
            localStorage.removeItem('email_admin');
        }

        // token dans le localstorage
        if (userAdminInformationData.token) {
            localStorage.setItem('token_admin', userAdminInformationData.token);
        } else {
            // redirection vers /admin/login
            localStorage.removeItem('token_admin');
        }

        // remplace le userAdminDefaultInformation
        setUserAdminInformation(userAdminInformationData); 

    };
    

    return <UserAdminContext.Provider value={{ ...userAdminInformation, setUserAdminInformation: setUserAdminInformationData }}> 
        {children}
    </UserAdminContext.Provider>
}

UserAdminContext.propTypes = {
    children : PropTypes.element.isRequired
}

export { UserAdminContext, UserAdminContextProvider };