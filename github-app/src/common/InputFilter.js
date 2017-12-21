import React from 'react'

export const InputFilter = ({value, label, onChange, type, min, max}) => {

    return (
        <div className="filter">
            <label>{label}</label>
            <input type={type} min={min} max={max}
                   value={value}
                   onChange={e => onChange(e.target.value)}/>
            {type === 'range' &&
            <label> {value} </label>
            }
        </div>
    )
}

export default InputFilter