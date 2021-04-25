import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import './app.css';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage';
import gotServisec from '../../servisec/gotServisec';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../error';


export default class App extends Component {
    gotServisec = new gotServisec();
    state = {
        showRandomChar: true,
      
        error: false
    }
    //Обработка ошибок
    componentDidCatch(){
        console.log('Error');
        this.setState({
            error: true
        })
    }

    toggleRandom = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }             
           
        })
    }

    render() {
        
     
       const toggle = this.state.showRandomChar ? <RandomChar/> : null;
       if(this.state.error) {
           return <ErrorMessage/>
       }

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {toggle}
                            <button 
                                className = "toggle-btn"
                                onClick = {this.toggleRandom}
                            >Toggle random character</button>
                            
                        </Col>
                    </Row>
                   <CharacterPage/>
                   <Row>
                        <Col md='6'>
                            <ItemList 
                                onItemSelected={this.onItemSelected}
                                getData = {this.gotServisec.getBooks}
                                renderItem = {(item) => `${item.name} (${item.numberOfPages})`}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId = {this.state.selectedChar} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                                onItemSelected = {this.onItemSelected}
                                getData = {this.gotServisec.getHouses}
                                renderItem = {(item) => item.name}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId = {this.state.selectedChar} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }    
};

