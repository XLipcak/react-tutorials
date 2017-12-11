import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom'

class App extends React.Component {

    constructor() {
        super();
        this.state = {increasing: false}
    }

    update() {
        ReactDOM.render(<App val={this.props.val + 1}/>, document.getElementById('root'))
    }


    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.val % 5 === 0;
    }

    componentDidUpdate(prevProps, prevState){
        console.log(prevProps.val + ' ' + prevState.val);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({increasing: nextProps.val > this.props.val})
    }

    render() {
        console.log(this.state.increasing)
        return (
            <button onClick={this.update.bind(this)}>
                {this.props.val}
            </button>
        )
    }
}


App.defaultProps = {val: 0}


class AppY extends React.Component {

    constructor() {
        super();
        this.state = {val: 0};
        this.update = this.update.bind(this);
    }

    componentWillMount() {
        console.log('componentWillMount');
        this.setState({
            m: 2
        });
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.inc = setInterval(this.update, 500)
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
        clearInterval(this.inc)
    }

    update() {
        this.setState(
            {val: this.state.val + 1}
        )
    }

    render() {
        console.log('render')
        return <button onClick={this.update}>{this.state.val * this.state.m}</button>
    }
}

class Wrapper extends React.Component {

    mount() {
        ReactDOM.render(<App/>, document.getElementById('a'))
    }

    unmount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('a'))
    }

    render() {
        return (
            <div>
                <button onClick={this.mount.bind(this)}>Mount</button>
                <button onClick={this.unmount.bind(this)}>UnMount</button>
                <div id="a"></div>
            </div>
        )
    }
}

class AppX extends React.Component {
    constructor() {
        super();
        this.state = {
            a: ''
        }
    }

    update() {
        this.setState({
            a: this.a.refs.input.value,
            b: this.refs.b.value
        })
    }

    render() {
        return (
            <div>
                <Input
                    ref={component => this.a = component}
                    update={this.update.bind(this)}
                />
                {this.state.a}

                <hr/>

                <input
                    ref="b"
                    type="text"
                    onChange={this.update.bind(this)}
                />
                {this.state.b}

            </div>
        )
    }
}

class Input extends React.Component {

    render() {
        return (
            <div>
                <input ref="input" type="text" onChange={this.props.update}/>
            </div>
        )
    }
}


const Title = (props) => <h1> Title: {props.text}</h1>

const Button = (props) => <button>{props.children}</button>

class Heart extends React.Component {

    render() {
        return <span> &hearts; </span>
    }
}

const Widget = (props) =>
    <input type="text"
           onChange={props.update}/>

// const App = () =>  <h1> Hello </h1>

Title.propTypes = {
    text(props, propName, component) {
        if (!(propName in props)) {
            return new Error('missing ' + propName)
        }
        if (props[propName].length < 6) {
            return new Error(propName + ' was too short')
        }
    }
}

export default App