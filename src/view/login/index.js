import React, { useState } from 'react';
import './login.css';
import firebase from '../../config/firebase';
import 'firebase/auth';
import Loader from '../../componentes/basicos/Loader';
import {Link, Redirect} from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmileWink } from '@fortawesome/free-solid-svg-icons'

function Login() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [carregando, setCarregando] = useState();

    const dispatch = useDispatch()

    function logar() {
        setCarregando(1);

        if (!email || !senha) {
            setCarregando(0);
            setMsgTipo('erro');
            // setMsg('Você precisa informar o email e a senha!');
            return false;
        }

        firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado => {
            setCarregando(0);
            setMsgTipo('sucesso');
            // setTimeout(() => {
                dispatch({type: 'LOG_IN', usuarioEmail: email})
            // }, 2000)
            
        }).catch(erro => {
            setCarregando(0);
            setMsgTipo('erro');
            console.log(erro.message);
        });

    }

    return (
        <div className='login-content d-flex align-items-center'>

            {
                useSelector(state => state.usuarioLogado) > 0 ? <Redirect to='/' /> : null
            }

            <form className="form-signin mx-auto">
                <div className="text-center mb-4">
                    <FontAwesomeIcon icon={faSmileWink} color='white' size='5x'/>
                    <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold">Login</h1>
                </div>

                <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="Email" />
                <input onChange={(e) => setSenha(e.target.value)} type="password" id="inputPassword" className="form-control my-2" placeholder="Senha" />

                
                {
                    carregando ? <Loader cor='light' />
                    : <button onClick={logar} className="btn btn-lg btn-login btn-block" type="button">Logar</button>
                }

                <div className='msg-login text-white text-center my-5'>
                   { msgTipo === 'sucesso' && <span><strong>WoW!</strong> Você está conectado!</span> }
                   { msgTipo === 'erro' && <span><strong>Ops!</strong> Verifique se a senha ou usuário estão corretos!</span> }
                </div>

                <div className="opcoes-login mt-5">
                    <Link to='usuariorecuperarsenha' className='mx-2'>Recuperar Senha</Link>
                    <Link to='novousuario' className='mx-2'>Quero Cadastrar</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;