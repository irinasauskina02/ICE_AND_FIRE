import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
// import CharacterPage, BookPage from '../pages/characterPage';
import gotServisec from '../../servisec/gotServisec';

import {HousesPage, BookPage, CharacterPage} from '../pages';
import ErrorMessage from '../error';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css';

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
            <Router>
                <div className="app"> 
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
                        {/* персонажи */}
                        {/* ищет все совпадения а не точный адрес */}
                        <Route path='/characters' component={CharacterPage}/>                        
                        {/* дома    */}
                        <Route path='/houses' component={HousesPage}/>                       
                        {/* книги */}
                        <Route path='/books' component={BookPage}/>                        
                    
                    </Container>
                </div>
            </Router>
            
        );
    }    
};

