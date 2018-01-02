import React from 'react'

export const Button = ({text, onButtonClick}) => (
    <div className="login-box">
        <button onClick={() => onButtonClick()}>
            {text}
        </button>
    </div>
);

export default Button