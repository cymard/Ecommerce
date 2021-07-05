/** @jsxImportSource @emotion/react */
import Header from './Header.jsx';
import Footer from '../All/Footer.jsx';

function FrontOfficeLayout ({children}){
    return <>
        <Header></Header>
        {children}
        <Footer></Footer>
    </>
}

export default FrontOfficeLayout;