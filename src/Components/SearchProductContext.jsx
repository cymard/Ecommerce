import React,{useState} from 'react';

const initialContent = {
    status: false
}

const SearchProductContext = React.createContext(initialContent);

function SearchProductContextProvider ({children}) {
   
    const [data, setData] = useState(initialContent);

    const changeContextContent = (newContent) => {
        setData(newContent);
    }
    
    return <SearchProductContext.Provider value={{...data, changeContextContent : changeContextContent}}>
        {children}
    </SearchProductContext.Provider>

}

export {SearchProductContext, SearchProductContextProvider};