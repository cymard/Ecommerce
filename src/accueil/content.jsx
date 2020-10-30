import {NavBar,SearchBar,Button,Logo} from "./header.jsx"

function AProduct({children = "titre de l'objet"}){
    return <div className="card col-sm-11 col-md-5 col-lg-3  m-3">
        <h3>{children}</h3>
            <img className="card-img-top" src="../../public/logo512.png" />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <Button>clique</Button>
            </div>
        

    </div>

}

function Content(){
    return <div className="container-fluid">
        
        <div className="row d-flex justify-content-center">
            <AProduct></AProduct>
            <AProduct></AProduct>
            <AProduct></AProduct>
            <AProduct></AProduct>
            <AProduct></AProduct>
            <AProduct></AProduct>
            <AProduct></AProduct>
            <AProduct></AProduct>
            <AProduct></AProduct>
            <AProduct></AProduct>
            <AProduct></AProduct>
            <AProduct></AProduct>
        </div>

    </div>
}

export {Content,AProduct};