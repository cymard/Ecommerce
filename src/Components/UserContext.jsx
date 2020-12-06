import React from 'react';


// fonction qui va setLocalstorage
const userInformations = {
    "connection" : localStorage.getItem('email') ? true : false,
    "email" : undefined,
    "setEmail" : function(email){
        localStorage.setItem('email', email);
        this.userInformations.email = email;
    }
}


const UserContext = React.createContext(userInformations);

function UserContextProvider ({children}){
    return <UserContext.Provider value={userInformations}>
        {children}
    </UserContext.Provider>
}

export  {UserContext,UserContextProvider};