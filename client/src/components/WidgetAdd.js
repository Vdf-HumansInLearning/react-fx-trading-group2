import React from 'react';
import '../styles/style-index.css'

function WidgetAdd({ addPickWidget }) {

    return (
        <div className='col'>
            <div className="card--add p-0 border-0">
                <button className="btn btn-light btn-add" onClick={addPickWidget}>
                    <i className="fas fa-plus"></i>
                </button>
            </div>
        </div>
    )
}

export default WidgetAdd;