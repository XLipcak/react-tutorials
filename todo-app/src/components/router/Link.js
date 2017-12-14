import React from "react";

export class Link extends React.Component {

    handleClick = (evt) => {
        evt.preventDefault()
        window.history.pushState(null, '', this.props.to)
    }

    render() {
        return <a href="#" onClick={this.handleClick}>{this.props.children}</a>
    }
}
