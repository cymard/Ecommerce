/** @jsxImportSource @emotion/react */
import React, {useContext} from 'react';
import {Navbar} from 'react-bootstrap';
import {css} from '@emotion/react';
import {UserAdminContext} from './UserAdminContext.jsx';
import AdminNavBarTop from './AdminNavBarTop.jsx';
import AdminNavBarBottom from './AdminNavBarBottom.jsx';


function AdminNavBar () {
    const userAdminInformation = useContext(UserAdminContext);

    const disconnection = () => {
        userAdminInformation.setUserAdminInformation({
            email: null,
            token: null
        })
    }

    return <>  
    <Navbar 
        bg="dark"
        variant="dark"
        css={css`
            display: flex;
            height: 100vh;
            position: fixed;       
            padding: 20px;
        `} 
    >
        <div 
            css={css`
                height: 90vh;
                position: sticky;
                display: flex;
                flex-direction: column;
                max-width: 170px;
                justify-content: space-between;        
            `} 
        >
            <AdminNavBarTop/>
            <AdminNavBarBottom disconnection={disconnection}/>
        </div>
    </Navbar>
    <div 
        css={css`
            width: 250px;
        `}
    ></div>
    </>
}

export default AdminNavBar;
