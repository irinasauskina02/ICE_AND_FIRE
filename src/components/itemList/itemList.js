import React, {Component} from 'react';
import './itemList.css';
import gotServisec from '../../servisec/gotServisec';
import Spinner from '../spinner/spiner';
export default class ItemList extends Component {
    gotServisec = new gotServisec();

    state = {
        charList: null,
       
    }

    componentDidMount() {
        this.gotServisec.getCharacters()
            .then((charList) => {
                this.setState( {
                    charList
                })
            })
    }
    renderItems(arr) {
        return arr.map((item, i) => {
            // const {id, name} = item;
            return (
                // <li
                //     key={id}
                //     className="list-group-item"
                //     onClick={() => this.props.onCharSelected(id)}
                //     >
                //     {name}
                // </li>
                <li
                    key={i}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(i)}
                    >
                    {item.name}
                </li>
            )
        })
    }

   
    render() {
        const {charList} = this.state;        

        if(!charList){
            return <Spinner/>
        }
        const item = this.renderItems(charList);

        return (
            <ul className="item-list list-group">
                {item}
            </ul>
        );
    }
}