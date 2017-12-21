import React from "react";
import InputFilter from "../common/InputFilter";


class UserListContainer extends React.Component {

    onFilterChange = (value, name) => {
        const {value:filter, onChange} = this.props

        onChange({...filter, [name]: value});
    }

    render() {
        return (
            <div>
                <InputFilter value={this.props.value['name']} label={'Name: '}
                             onChange={e => this.onFilterChange(e, 'name')}/>

                <InputFilter value={this.props.value['repos']} label={'Min. repos: '}
                             onChange={e => this.onFilterChange(e, 'repos')}
                             type={'range'} min={1} max={100}/>
            </div>
        )
    }
}

export default UserListContainer;