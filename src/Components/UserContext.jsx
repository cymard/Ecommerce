import React, { useState } from 'react';


// fonction qui va setLocalstorage
// const userInformations = {
//     "connection" : localStorage.getItem('email') ? true : false,
//     "email" : localStorage.getItem('email'),
//     "setEmail" : function(email){
//         localStorage.setItem('email', email);
//         this.connection = email ? true : false;
//         this.userInformations.email = email;
//     }
// }


const userDefaultInformation = {
    isConnected: localStorage.getItem('email') ? true : false,
    email: localStorage.getItem('email'),
    setEmail : function(email){
        localStorage.setItem('email', email);
    },
    deleteEmail : function(){
        localStorage.removeItem('email');
    }
}


const UserContext = React.createContext(userDefaultInformation);

function UserContextProvider({ children }) {
    const [userInformation, setUserInformation] = useState(userDefaultInformation);

    return <UserContext.Provider value={{ ...userInformation, setUserInformation }}>
        {children}
    </UserContext.Provider>
}

export { UserContext, UserContextProvider };