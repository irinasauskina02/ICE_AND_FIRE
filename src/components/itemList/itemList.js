import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner/spiner';
export default class ItemList extends Component {  

    state = {
        itemList: null,
       
    }
    componentDidMount() {

        const {getData} = this.props;       
        getData()
            .then((itemList) => {
                this.setState( {
                    itemList
                })
            })
    }

    renderItems(arr) {
        return arr.map((item) => {
             const {id} = item;
             const lable = this.props.renderItem(item);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                    >
                    {lable}
                </li>
                
            )
        })
    }

   
    render() {
        const {itemList} = this.state;        

        if(!itemList){
            return <Spinner/>
        }
        const item = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {item}
            </ul>
        );
    }
}