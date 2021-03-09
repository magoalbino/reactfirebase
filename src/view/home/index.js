import React from 'react';
import './home.css';
// import firebase from '../../config/firebase';
// import 'firebase/auth';
// import Loader from '../../componentes/basicos/Loader';
// import {Link} from 'react-router-dom'
import Navbar from '../../componentes/navbar/'

import { useSelector } from 'react-redux'

function Home(){
    return(
        <>
        <Navbar />
        <h1>{useSelector(state => state.usuarioEmail)}</h1>
        <h1>{useSelector(state => state.usuarioLogado)}</h1>
        </>
    )
}

export default Home