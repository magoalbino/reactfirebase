import React from 'react';
import './navbar.css';
// import firebase from '../../config/firebase';
// import 'firebase/auth';
// import Loader from '../../componentes/basicos/Loader';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg">
            <span className="navbar-brand text-white font-weight-bold" href="#">Eventos</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars text-white"></i>
                <FontAwesomeIcon icon={faBars} color='white' />
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to='/' className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to='novousuario' className="nav-link">Cadastrar</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to='login' className="nav-link">Login</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar