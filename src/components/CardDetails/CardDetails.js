import React from 'react'
import "./CardDetails.scss"

const CardDetails = (props) => {
    const updatedDate = props.isDate ? props.data : "";
    const updated = new Date(Date.parse(updatedDate.split("T")[0]));

    const displayDate = ( ( updated.getMonth() + 1 ) + "/" + updated.getDate() + "/" + updated.getFullYear() );
    return (
        <div className="card-square">
            <label className="item-title">
                {props.title}
            </label>
            <p className="item-info">
                {props.isDate ? displayDate : props.data}
            </p>
        </div>
    )
}

export default CardDetails