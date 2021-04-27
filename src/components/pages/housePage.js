import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../error';
import gotServisec from '../../servisec/gotServisec';
import RowBlock from '../rowBlock';

import './pages.css';

export default class HousesPage extends Component {
    gotService = new gotServisec();
    state = {
        selectedHouse: 1,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        });
       
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
                getData={this.gotService.getHouses}
                renderItem={({name}) => name}/>
        )

        const itemDetails = (
            <ItemDetails
            itemId = {this.state.selectedHouse}
            getData = {this.gotService.getHouse} >
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                {/* <Field field='titles' label='Titles'/>
                <Field field='ancestralWeapons' label='Ancestral Weapons'/> */}
            </ItemDetails>
        )

        return (
            <>
                <h2 className="row-h2">Houses</h2>  
                <RowBlock left={itemList} right={itemDetails} />
           </>
        )
    }
}