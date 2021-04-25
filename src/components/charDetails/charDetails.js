import React, {Component} from 'react';
import './charDetails.css';
import gotServisec from '../../servisec/gotServisec';

const Field = ({char, field, lable}) => {
    return(
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{lable}</span>
            <span>{char[field]}</span>
        </li>
    );
}

export {Field};

export default class CharDetails extends Component {
   

    state = {
        char: null
    }
    gotServisec = new gotServisec();
    componentDidMount() {
        this.updateChar();
    }
    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }
    updateChar() {
        
        const {charId} = this.props;
        if(!charId) {
            return;
        } else {
            this.gotServisec.getCharacter(charId)
                .then((char) => {this.setState({char}) })
        }
        // this.foo.bar = 0;
    }

    render() {
        if(!this.state.char) {
            return(
                <span className="select-error">Please selecte a cheracter</span>
            )
        }
        const {char} = this.state
        const {name} = char;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
            
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {char});
                        })
                    }
                </ul>
            </div>
        );
    }
}