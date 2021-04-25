import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import ErrorMessage from '../error';
import gotServisec from '../../servisec/gotServisec';
import RowBlock from '../rowBlock';

import './characterPage.css';

export default class CharacterPage extends Component {
    gotServisec = new gotServisec();
    state = {
        selectedChar: 130,
        error: false
    }

        //Обработка ошибок
    componentDidCatch(){        
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {        
        this.setState({
            selectedChar: id
        })        
    }
    
    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (            
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData = {this.gotServisec.getCharacters}
                renderItem = {({name, gender}) => `${name} (${gender})`}
                //Аналогия
                // renderItem = {(item) => `${item.name} (${item.gender})`}
            />           
        );
        const charDetails = (            
            <CharDetails charId = {this.state.selectedChar} > 
                <Field field="gender" lable = 'Gender'/>
                <Field field="born" lable = 'Born'/>
            </CharDetails>
        );
        return(           
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}