

function AProduct({children = "titre de l'objet"}){
    return <div className="card col-4">
        <h3>{children}</h3>
            
            {/* <img className="card-img-top" src="..." alt="Card image cap"> */}
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>

    </div>

}

function Content(){
    return <div className="container d-flex">

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
}

export default  Content;