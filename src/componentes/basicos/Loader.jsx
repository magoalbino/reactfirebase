import React from 'react'

export default function Loader(props) {

    const cor = props.cor || 'danger';

    return (
        <div className='text-center'>
            <div className={'spinner-border text-' + cor} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}