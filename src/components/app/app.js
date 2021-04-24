import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import './app.css';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage';
import ErrorMessage from '../error';


export default class App extends Component {

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
                </Container>
            </>
        );
    }    
};

