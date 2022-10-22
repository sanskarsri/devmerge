import React from 'react';

export default function Alert(props) {

    return (

        <div className='container' style={{ height: '50px' }}>
            {props.alert && <div className={`alert alert-success alert-dismissible fade show `} role="alert">
                {props.alert}
            </div>}
        </div>
    )
}
