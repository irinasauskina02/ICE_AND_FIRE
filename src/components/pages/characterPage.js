import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../error';
import gotServisec from '../../servisec/gotServisec';
import RowBlock from '../rowBlock';



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
        console.log(id);       
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
            <ItemDetails 
                itemId = {this.state.selectedChar} 
                getData = {this.gotServisec.getCharacter}
            > 
                <Field field="gender" label = 'Gender'/>
                <Field field="born" label = 'Born'/>
                <Field field="died" label = 'Died'/>
                <Field field="culture" label = 'Culture'/>
            </ItemDetails>
        );
        return(           
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}