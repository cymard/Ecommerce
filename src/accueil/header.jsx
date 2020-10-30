

function Logo({src, alt = null}){
    return <img src={src} alt={alt}/>
}

function Button({children}){
    return <a href="#" className="btn btn-primary">
        {children}
    </a>


}

function SearchBar({children}){
    return <input type="search" placeholder={children} className="form-control" aria-label="Search"/>

}


function NavBar (){


    
    return <nav id="navbar">
        <Logo src="../../public/logo512.png" ></Logo>
        <SearchBar>Rechercher ...</SearchBar>
        <Button>Compte</Button>
        <Button>Panier</Button>
    </nav>
}

export {NavBar,SearchBar,Button,Logo};