import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';

import ActorForm from './ActorForm';
import MovieList from './MovieList';
import MovieCompare from './MovieCompare';

class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
            actors: []
        }

        this.getActors = this.getActors.bind(this);
        this.renderMovieList = this.renderMovieList.bind(this);
    }

    renderMovieList(){
        if(this.state.actors.length > 0){
           return this.state.actors.map((actor) => {
               return <Col key={actor.id}><MovieList  actor={actor}/></Col>
            })
        }
        return <div></div>

    }

    getActors(actors){
        this.setState({
            actors: actors
        })
    }

    getActorsForCompare(index){
        if(this.state.actors[index]){
            return this.state.actors[index]
        }
        else return '';
    }
    render(){
        return(
            <Container className="mt-3">
                <Row>
                    <Col lg={{size: 4, offset: 4}} md={{size: 6, offset: 3}}>
                        <ActorForm getActors={this.getActors}/>
                    </Col>
                </Row>
                <Row className='mt-5'>
                    <Col>
                    <MovieCompare actor1={this.getActorsForCompare(0)} actor2={this.getActorsForCompare(1)}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home;