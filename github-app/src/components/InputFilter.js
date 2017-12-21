import React from 'react'

class InputFilter extends React.Component {

    render() {
        const actualFilter = this.props.filter[this.props.keyProp];
        return (
            <div className="filter">
                <label>{actualFilter.label}</label>
                <input type={this.props.type} min={this.props.min} max={this.props.max}
                       value={actualFilter.value}
                       onChange={e => this.props.onChange(e.target.value, this.props.keyProp)}/>
                {this.props.type === 'range' &&
                <label> {actualFilter.value} </label>
                }
            </div>
        )
    }
}

export default InputFilter