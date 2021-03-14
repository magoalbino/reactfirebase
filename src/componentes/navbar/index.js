import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSmileWink } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from 'react-redux'

function Navbar() {

    const dispatch = useDispatch();

    return (
        <nav className="navbar navbar-expand-lg">
            {/* <span className="navbar-brand text-white font-weight-bold" href="#">Eventos</span> */}
            <FontAwesomeIcon icon={faSmileWink} color='white' size='2x'/>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <FontAwesomeIcon icon={faBars} color='white' />
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to='/' className="nav-link ml-2">Home</Link>
                    </li>

                {
                    useSelector(state => state.usuarioLogado) > 0 ?
                    <>                
                    <li className="nav-item active">
                        <Link to='eventocadastro' className="nav-link">Publicar Evento</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to='' className="nav-link">Meus Eventos</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" onClick={() => dispatch({type: 'LOG_OUT'})}>Sair</Link>
                    </li>
                    </>
                    :
                    <>
                    <li className="nav-item active">
                        <Link to='novousuario' className="nav-link">Cadastrar</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to='login' className="nav-link">Login</Link>
                    </li>
                    </>
                }
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