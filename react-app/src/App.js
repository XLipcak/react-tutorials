import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';


class App extends React.Component {
    constructor(){
        super();
        this.state = {
            red: 0
        }
        this.update = this.update.bind(this)
    }
    update(e){
        this.setState({
            red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value
        })
    }
    render(){
        return (
            <div>
                <NumInput
                    ref="red"
                    min={0}
                    max={255}
                    step={0.01}
                    val={+this.state.red}
                    label="Red"
                    update={this.update} />
            </div>
        );
    }
}

class NumInput extends React.Component {
    render(){
        let label = this.props.label !== '' ?
            <label>{this.props.label} -  {this.props.val}</label> : ''
        return (
            <div>
                <input ref="inp"
                       type={this.props.type}
                       min={this.props.min}
                       max={this.props.max}
                       step={this.props.step}
                       defaultValue={this.props.val}
                       onChange={this.props.update} />
                {label}
            </div>
        );
    }
}

NumInput.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    val: PropTypes.number,
    label: PropTypes.string,
    update: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['number', 'range'])
};

NumInput.defaultProps = {
    min: 0,
    max: 0,
    step: 1,
    val: 0,
    label: '',
    type: 'range'
}



class AppChap19 extends React.Component {
    render() {
        return (
            <Parent>
                <div className="childA"></div>
                <div className="childB"></div>
            </Parent>
        )
    }
}

class Parent extends React.Component {
    render() {
        //React.Children.only(), React.copy()...
        let items = React.Children.forEach(this.props.children, child => console.log(child.props.className));
        console.log(items)
        return null
    }
}

class AppCompiler extends React.Component {
    constructor() {
        super();
        this.state = {
            input: '/* add your jsx here */',
            output: '',
            err: ''
        }
    }

    update(e) {
        let code = e.target.value;
        try {
            this.setState({
                output: window.Babel
                    .transform(code, {presets: ['es2015', 'react']})
                    .code,
                err: ''
            })
        }
        catch (err) {
            this.setState({err: err.message})
        }
    }

    render() {
        return (
            <div>
                <header>{this.state.err}</header>
                <div className="container">
          <textarea
              onChange={this.update.bind(this)}
              defaultValue={this.state.input}/>
                    <pre>
            {this.state.output}
          </pre>
                </div>
            </div>
        )
    }
}

const HOC = (InnerComponent) => class extends React.Component {

    constructor() {
        super();
        this.state = {count: 0}
    }

    update() {
        this.setState({count: this.state.count + 1});
    }

    componentWillMount() {
        console.log('HOC mount')
    }

    render() {
        return (
            <InnerComponent
                {...this.props}
                {...this.state}
                update={this.update.bind(this)}
            />
        )
    }

}

class AppChap16 extends React.Component {

    render() {
        return (
            <div>
                <Button> button </Button>
                <hr/>
                <LabelHOC>label</LabelHOC>
            </div>
        )
    }

}

const Button = HOC((props) => <button onClick={props.update}>{props.children} - {props.count}</button>)

class Label extends React.Component {

    componentWillMount() {
        console.log('Label mount')
    }

    render() {
        return (
            <label onMouseMove={this.props.update}>{this.props.children} - {this.props.count}</label>
        )
    }
}

const LabelHOC = HOC(Label)

class AppFilter extends React.Component {

    constructor() {
        super()
        this.state = {items: []}
    }

    componentWillMount() {
        fetch('http://swapi.co/api/people/?format=json')
            .then(response => response.json())
            .then(({results: items}) => this.setState({items}))
    }

    filter(e) {
        this.setState({filter: e.target.value})
    }

    render() {
        let items = this.state.items;
        if (this.state.filter) {
            items = items.filter(item => item.name.toLowerCase().includes(this.state.filter.toLowerCase()))
        }
        return (
            <div>
                <input type="text" onChange={this.filter.bind(this)}/>
                {items.map(item => <Person key={item.name} person={item}/>)}
            </div>
        )
    }

}

const Person = (props) => <h4>{props.person.name}</h4>

class AppZ extends React.Component {

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

    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps.val + ' ' + prevState.val);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({increasing: nextProps.val > this.props.val})
    }

    render() {
        console.log(this.state.increasing);
        return (
            <button onClick={this.update.bind(this)}>
                {this.props.val}
            </button>
        )
    }
}


// App.defaultProps = {val: 0}


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