import React, {useCallback, useState} from 'react';
// header

function Logo({src, alt = null}){
    return <img src={src} alt={alt}/>
}

function Button({children}){
    return <a href="#" className="btn btn-primary">
        {children}
    </a>
}

function SearchBar({children,value,onChange}){
    return <input type="search" value={value} onChange={onChange} placeholder={children} className="form-control" aria-label="Search"/>
    
}


function NavBar ({value, onChange}){

    return <nav id="navbar">
        <Logo src="../../public/logo512.png" ></Logo>
        <SearchBar value={value}  onChange={onChange}>Rechercher ...</SearchBar>
        <Button>Compte</Button>
        <Button>Panier</Button>
    </nav>
}



function AProduct({children}){
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


function Content({Display}){

    return <div className="container-fluid">
        
        <div className="row d-flex justify-content-center">
            {Display} 
        </div>

    </div>
}



function Footer(){
    return <div id="footer">
        Footer
    </div>
}


function Home (){
    //change valeur de l'input


    
    const [value, setValue] = useState("")

    const handleChange = useCallback(function (e){
        setValue(e.target.value)
        test(e.target.value)
    },[value])
    

    // affiche les objets



    const objects = [
        <AProduct key="cuillère">cuillère</AProduct>,
        <AProduct key="couteau">couteau</AProduct>,
        <AProduct key="voiture">voiture</AProduct>,
        <AProduct key="avion">avion</AProduct>,
        <AProduct key="clavier">clavier</AProduct>,
        <AProduct key="zèbre">zèbre</AProduct>,
        <AProduct key="mangue">mangue</AProduct>,
        <AProduct key="ognion">ognion</AProduct>,
        <AProduct key="verre">verre</AProduct>,
        <AProduct key="jean">jean</AProduct>,
        <AProduct key="tee-shirt">tee-shirt</AProduct>,
        <AProduct key="chaussure">chaussure</AProduct>
    ];

    const [arrayValue, setArrayValue] = useState(objects)
    const displayObjects = [arrayValue]


    // Chaque fois que j'appuie sur une touche on lance la fonction test
    const test = useCallback(function(searchValue){
        setArrayValue("Aucun résultat trouvé pour votre recherche"); // réinitialise le tableau
        const contentRegEx = "^"+searchValue; // mise en place de l'xpression de la reg ex avec la variable searchValue
        const regex = new RegExp(contentRegEx); 
        const testArray = [] // tableau contenant tous les objets renvoyés par la reg ex du search

        for(let i= 0; i < objects.length; i++){
            // console.log(searchValue + " " + objects[i].props.children)

            if(objects[i].props.children === searchValue){
                return setArrayValue(objects[i])
                
            }else if(searchValue === ""){
               return setArrayValue(objects);
            
            }else if(objects[i].props.children.match(regex)){
                // pouvoir remplir le tableau avec plusieurs objets
                console.log("ca a matché incroyable : " + objects[i].props.children)
                testArray.push(objects[i])
                console.log(testArray)
                setArrayValue(testArray)
            }
        }
        //  objects[i].props.children.match(/searchValue/)
        // objects[1].props.children  => avoir le children de l'objet
    },[value])

    // relation NavBar et Content disponnible ici
    return <React.StrictMode>
        <NavBar value={value} onChange={handleChange}></NavBar>
        <Content Display={displayObjects}></Content>
        {console.log(displayObjects)}
        <Footer></Footer>
    </React.StrictMode>
}

export {Home}; //NavBar,SearchBar,Button,Logo,Content,AProduct,Context,Footer,Home