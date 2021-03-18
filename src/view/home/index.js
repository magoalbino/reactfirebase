import React, {useState, useEffect } from 'react';
import './home.css';
import firebase from '../../config/firebase';
import Navbar from '../../componentes/navbar/'
import EventoCard from '../../componentes/evento-card'
import { useSelector } from 'react-redux';

function Home({match}) {

    const [eventos, setEventos] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const listaEventos = [];
    const usuarioEmail = useSelector(state => state.usuarioEmail)
    

    useEffect( () => {

        if(match.params.parametro){
            firebase.firestore().collection('eventos').where('usuario', '==', usuarioEmail).get().then( async (resultado) => {
                await resultado.docs.forEach(doc => {
    
                    listaEventos.push({
                        id: doc.id,
                        ...doc.data()
                    })
                    
                })
    
                setEventos(listaEventos);
            })
        }else{
            firebase.firestore().collection('eventos').get().then( async (resultado) => {
                await resultado.docs.forEach(doc => {
    
                    listaEventos.push({
                        id: doc.id,
                        ...doc.data()
                    })
                    
                })
    
                setEventos(listaEventos);
            })
        }
        
    }, [])

    return (
        <>
            <Navbar />

            <div className='row p-4'>
                <h3 className='mx-auto p-5'>Eventos Publicados</h3>
                <input onChange={(e) => setPesquisa(e.target.value)} type='text' className='form-control text-center' placeholder='Pesquisar evento pelo título' />
            </div>

            <div className='row p-3'>
                
                {
                    eventos.map( item => {
                        // toLowerCase para as letras maiúsculas. mas como pesquisar ignorando os acentos?
                        if(pesquisa === '' || item.titulo.toLowerCase().indexOf(pesquisa) >= 0){
                            return <EventoCard key={item.id}
                                        id={item.id} 
                                        img={item.foto} 
                                        titulo={item.titulo}
                                        detalhes={item.detalhes}
                                        visualizacoes={item.visualizacoes}
                            />
                        }
                        return null;

                        }
                    )
                }

            </div>
        </>
    )
}

export default Home