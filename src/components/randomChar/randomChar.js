import React, {Component} from 'react';
import './randomChar.css';
import gotServisec from '../../servisec/gotServisec';
import Spinner from '../spinner/spiner';
import ErrorMessage from '../error';

export default class RandomChar extends Component {

    gotServisec = new gotServisec();
    componentDidMount() {
        this.updateChar();
        const timerId = setInterval(this.updateChar, 1500);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }
    
    state = {
        char: {},
        loading: true,
        error: false
    }

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false
        });
    }
    onError = (err) => {
        this.setState({           
            loading: false,
            error: true
        });
    }

    updateChar = () => {
       
        const id = Math.floor(Math.random() * 140 + 25); //Диапазон id от 25 до 140
        // const id = 9999999999999999999;
        this.gotServisec.getCharacter(id)
            .then( this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const {char, loading, error} = this.state;
        const err = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <Veiw char = {char}/> :  null;
        return (           
            <div className="random-block rounded">              
                {err}
                {spinner}
                {content}             
               
            </div>
        );
    }
}
const Veiw = ({char}) => {
    const {name, gender, born, died, culture} = char;


    return(
        <>
            <h4>Random Character: {name ? name : "no data:("}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender ? gender : "no data:("}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born ? born : "no data:("}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died ? died : "no data:("}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture ? culture : "no data:("}</span>
                </li>
            </ul>
        </>
    );
}