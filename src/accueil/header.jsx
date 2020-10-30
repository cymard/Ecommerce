
function Logo({src, alt}){
    return <img src={src} alt={alt}/>
}

function Button({children}){
    return <button className='btn btn-success my-2 my-sm-0'>
        {children}
    </button>
}

function SearchBar({children}){
    return <input type="search" placeholder={children} className="form-control mr-sm-2" aria-label="Search"/>
   

}


function NavBar (){
    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Logo src="../../public/logo512.png" alt="le logo du site web"></Logo>
        <SearchBar>rechercher ...</SearchBar>
        <Button>Compte</Button>
        <Button>Panier</Button>
    </nav>
}

export default NavBar;