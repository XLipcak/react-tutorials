import React from "react";


class Button extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button onClick={() => this.props.history.push('/hello')}>
                Click me!
            </button>
        )
    }
}

export default Button