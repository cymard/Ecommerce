import React from 'react';

const UserContext = React.createContext('');

function UserContextProvider ({children}){
    
    const userInformations = {
        "connection" :  true ,
        "email" : localStorage.getItem('email')
    }

    const noConnection = {
        "connection" : false
    }

    return <UserContext.Provider value={localStorage.getItem('connection') ? userInformations : noConnection}>
        {children}
    </UserContext.Provider>
}

export  {UserContext,UserContextProvider};