import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './evento-card.css';
import firebase from '../../config/firebase'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

function EventoCard({id, img, titulo, detalhes, visualizacoes}){

    const [urlImagem, setUrlImagem] = useState()

    useEffect(() => {
        firebase.storage().ref(`imagens/${img}`).getDownloadURL()
            .then( url => setUrlImagem(url))
            .catch(erro => {
                setUrlImagem('https://via.placeholder.com/100x50')
                return false;
            }, [])
    })

    return(
        <div className='col-md-3 col sm-12'>
            <img src={urlImagem} className='card-img-top img-cartao' alt='Imagem do Evento' />

            <div className='card-body'>
                <h5>{titulo}</h5>
                <p className='card-text text-justify'>{detalhes}</p>

                <div className='row rodape-card d-flex align-items-center'>

                    <div className='col-6'>
                        <Link to ={'/eventodetalhes/' + id} className='btn btn-sm btn-detalhes'>+ Detalhes</Link>
                    </div>

                    <div className='col-6 text-right'>
                        <FontAwesomeIcon icon={faEye} /><span> {visualizacoes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventoCard;