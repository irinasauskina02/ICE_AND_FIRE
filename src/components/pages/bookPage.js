import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../error';
import gotServisec from '../../servisec/gotServisec';
import RowBlock from '../rowBlock';

import './pages.css';

export default class BookPage extends Component { 
    gotService = new gotServisec();

    state = {
        selectedBook: 1,
        error: false
    }
    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        });
        console.log(id);     
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getBooks}
                renderItem={({name}) => name}/>
        )

        const itemDetails = (
            <ItemDetails
            itemId = {this.state.selectedBook}
            getData = {this.gotService.getBook} >
                <Field field='numberOfPages' label='NumberOfPages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>               
            </ItemDetails>
        )

        return (
            <>  
                <h2 className="row-h2">Books</h2>  
                <RowBlock left={itemList} right={itemDetails} />
            </>
        )
    }

}