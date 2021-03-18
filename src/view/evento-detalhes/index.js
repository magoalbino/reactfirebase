import React, { useState, useEffect } from 'react';
import './evento-detalhes.css';
import firebase from '../../config/firebase';
import Loader from '../../componentes/basicos/Loader';
import {Link} from 'react-router-dom'
import Navbar from '../../componentes/navbar/'

import { useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicketAlt, faCalendarAlt, faClock, faPenSquare, faEye } from '@fortawesome/free-solid-svg-icons'

function EventoDetalhes(props){

    const [evento, setEvento] = useState({});
    const [urlImg, setUrlImg] = useState({});
    const usuario = useSelector(state => state.usuarioEmail)
    const [carregando, setCarregando] = useState(1)

    useEffect( () => {
        if(carregando){
            firebase.firestore().collection('eventos').doc(props.match.params.id).get().then(
                resultado => {
                    setEvento(resultado.data())
                    firebase.firestore().collection('eventos').doc(props.match.params.id).update('visualizacoes', parseInt(resultado.data().visualizacoes) + 1)
                    firebase.storage().ref(`imagens/${resultado.data().foto}`).getDownloadURL().then( url => { 
                        setUrlImg(url)
                        setCarregando(0)   
                    })
                }
            )
        }else{
            firebase.storage().ref(`imagens/${evento.foto}`).getDownloadURL().then( url => { 
                setUrlImg(url) 
            })
        }
    }, [])

    return(
        <>
        <Navbar />

{
    carregando ? <div className='mt-5'><Loader /></div> :
        <div className='container-fluid'>
            <div className='row'>
                <img src={urlImg} className='img-banner' alt='banner' />

                <div className='col-12 text-right mt-1 visualizacoes'>
                    <FontAwesomeIcon icon={faEye} /> <span>{evento.visualizacoes + 1}</span>
                </div>

                <h3 className='mx-auto mt-5 titulo'><strong>{evento.titulo}</strong></h3>
            </div>
            <div className='row mt-5 d-flex justify-content-around'>
                <div className='col-md-3 col-sm-12 box-info p-3 my-2'>
                    <FontAwesomeIcon icon={faTicketAlt} size='2x' />
                    <h5><strong>Tipo</strong></h5>
                    <span className='mt-3'>{evento.tipo}</span>
                </div>

                <div className='col-md-3 col-sm-12 box-info p-3 my-2'>
                    <FontAwesomeIcon icon={faCalendarAlt} size='2x' />
                    <h5><strong>Data</strong></h5>
                    <span className='mt-3'>{evento.data}</span>
                </div>

                <div className='col-md-3 col-sm-12 box-info p-3 my-2'>
                    <FontAwesomeIcon icon={faClock} size='2x' />
                    <h5><strong>Hora</strong></h5>
                    <span className='mt-3'>{evento.hora}</span>
                </div>
            </div>

            <div className='row box-detalhes mt-5'>
                <div className='col-12 text-center'>
                    <h5><strong>Detalhes do Evento</strong></h5>
                </div>
                <div className='col-12 text-center'>
                    <p> {evento.detalhes} </p>
                </div>
                
            </div>

            {
                usuario === evento.usuario ?
                <Link to={`/editarevento/${props.match.params.id}`} className='btn-editar'>
                    <FontAwesomeIcon icon={faPenSquare} size='3x' />
                </Link>
                : ''
            }

        </div>
}

        </>
    )
}


export default EventoDetalhes;