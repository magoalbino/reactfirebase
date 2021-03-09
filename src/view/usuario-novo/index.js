import React, { useState } from 'react';
import firebase from '../../config/firebase';
import 'firebase/auth';
import './usuario-novo.css';
import Loader from '../../componentes/basicos/Loader';

function NovoUsuario() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();

    function cadastrar() {
        setMsgTipo(null);

        setCarregando(1);

        if (!email || !senha) {
            setCarregando(0);
            setMsgTipo('erro');
            setMsg('Você precisa informar o email e a senha!');
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, senha).then(resultado => {
            setCarregando(0);
            setMsgTipo('sucesso');
        }).catch(erro => {
            setCarregando(0);
            setMsgTipo('erro');
            switch (erro.code) {
                case 'auth/weak-password':
                    setMsg('A senha deve ter pelo menos 6 caracteres!');
                    break;
                case 'auth/user-disabled':
                    setMsg('Este usuário foi desabilitado');
                    break;
                case 'auth/email-already-in-use':
                    setMsg('Este email já está sendo usado por outro usuário!');
                    break;
                case 'auth/invalid-email':
                    setMsg('O formato do email é inválido!');
                    break;
                default:
                    setMsg(erro.message);
                    break;
            }
        });
    }

    return (
        <div className='form-cadastro'>
            <form className='text-center form-login mx-auto mt-5'>
                <h1 className='h3 mb-3 text-black font-weight-bold'> Cadastros </h1>

                <input onChange={(e) => setEmail(e.target.value)} type='email' className='form-control my-2' placeholder='Email' />
                <input onChange={(e) => setSenha(e.target.value)} type='password' className='form-control my-2' placeholder='Senha' />

                {
                    carregando ? <Loader />
                    : <button onClick={cadastrar} type='button' className='btn btn-lg btn-block mt-3 mb-5 btn-cadastro'> Cadastrar </button>
                }

                <div className='msg-login text-center my-5'>
                    {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Usuário cadastrado com sucesso!</span>}
                    {msgTipo === 'erro' && <span><strong>Ops!</strong> {msg} </span>}
                </div>

            </form>
        </div>
    )
}

export default NovoUsuario;