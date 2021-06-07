import React, { useState } from 'react';
import PropTypes from 'prop-types';

const userDefaultInformation = {
    email: localStorage.getItem('email'),
    token: localStorage.getItem('token')
}

const UserContext = React.createContext(userDefaultInformation);

function UserContextProvider({ children }) {
    const [userInformation, setUserInformation] = useState(userDefaultInformation);

    // set le localStorage si l'email est remplie, ou le supprime
    const setUserInformationData = (userInformationData) => {
        // email dans le localstorage
        if (userInformationData.email) {
            localStorage.setItem('email', userInformationData.email);
        } else {
            localStorage.removeItem('email');
        }

        // token dans le localstorage
        if (userInformationData.token) {
            localStorage.setItem('token', userInformationData.token);
        } else {
            localStorage.removeItem('token');
        }

        // remplace le userDefaultInformation
        setUserInformation(userInformationData);

    }; 

    return <UserContext.Provider value={{ ...userInformation, setUserInformation: setUserInformationData }}> 
        {children}
    </UserContext.Provider>
}

UserContext.propTypes = {
    children : PropTypes.element.isRequired
}

export { UserContext, UserContextProvider };