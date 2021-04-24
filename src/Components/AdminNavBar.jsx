/** @jsxImportSource @emotion/react */
import React, {useContext} from 'react';
import {Navbar} from 'react-bootstrap';
import {css} from '@emotion/react';
import {UserAdminContext} from './UserAdminContext.jsx';
import LinkAdminNavBar from './LinkAdminNavBar.jsx';


function AdminNavBar () {
    const userAdminInformation = useContext(UserAdminContext);
    const handleClick = () => {
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
            <div 
                css={css`
                    display: flex;
                    flex-flow: column nowrap;

                `} 
            >
                <LinkAdminNavBar url="/admin/home">PRODUITS</LinkAdminNavBar>
                <LinkAdminNavBar url="/admin/orders">COMMANDES</LinkAdminNavBar>
                <LinkAdminNavBar url="/admin/comments/reported">COMMENTAIRES SIGNALÉS</LinkAdminNavBar>

            </div>
            <div
                css={css`
                    display: flex;
                    flex-direction: column;
                `} 
            >
                
                <LinkAdminNavBar url="/">ACCÉDER AU SITE</LinkAdminNavBar>
                <LinkAdminNavBar url="/" onClick={handleClick}>DÉCONNEXION</LinkAdminNavBar>
            </div>
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
