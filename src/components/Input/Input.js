import React from 'react';

const Input = (props) => {
    let inputElement = null;

    switch(props.elementType){
        case ('input'):
            inputElement = <input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                required={props.isRequired}/>
            break;
        case ('textarea'):
            inputElement = <textarea {...props.elementConfig} required={props.isRequired}/>
            break;
        default:
            inputElement = <input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                required={props.isRequired}/>
            break;
    }

    return inputElement !== null ? inputElement : '';
}

export default Input