import React, { useState } from 'react';
// isConnected: localStorage.getItem('email') ? true : false,
const userDefaultInformation = {
    email: localStorage.getItem('email')
}

const UserContext = React.createContext(userDefaultInformation);

function UserContextProvider({ children }) {
    const [userInformation, setUserInformation] = useState(userDefaultInformation);

    // set le localStorage si l'email est remplie, ou le supprime
    const setUserInformationData = (userInformationData) => {
        // set le localStorage
        if (userInformationData.email) {
            localStorage.setItem('email', userInformationData.email);
        } else {
            localStorage.removeItem('email');
        }

        // remplace le userDefaultInformation
        setUserInformation(userInformationData); // ne s'applique pas

    }; //useMemo
    

    return <UserContext.Provider value={{ ...userInformation, setUserInformation: setUserInformationData }}> 
        {children}
    </UserContext.Provider>
}

export { UserContext, UserContextProvider };