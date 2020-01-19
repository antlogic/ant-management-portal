import React from 'react'
import "./CardDetails.scss"

const CardDetails = (props) => {
    return (
        <div className="card-square">
            <label className="item-title">
                {props.title}
            </label>
            <p className="item-info">
                {props.data}
            </p>
        </div>
    )
}

export default CardDetails