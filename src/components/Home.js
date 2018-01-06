import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import axios from "axios/index";
import _ from 'lodash';
import {API_KEY} from "../config/keys";

import ActorForm from './ActorForm';
import MovieList from './MovieList';
import MovieCompare from './MovieCompare';
import SixDegrees from './SixDegrees';


class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            actors: []
        }

        this.setActorsState = this.setActorsState.bind(this);
        this.renderMovieList = this.renderMovieList.bind(this);
    }

    /*** ajax requests ***/
    //Actor search request by string
    getActors(term, callback) {
        axios.get(`https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&language=en-US&query=${term}&page=1&include_adult=false`)
            .then((response) => {
                let data = _.map(response.data.results, _.partialRight(_.pick, ['name', 'id']));
                if(callback) callback(data);
            })
            .catch((error) => {
                console.log(error)
            })
    }


    //Movie request by id
    getMovies(actor, callback){
        axios.get(`https://api.themoviedb.org/3/person/${actor.id}/movie_credits?api_key=${API_KEY}&language=en-US`)
            .then((response) => {
                let data = _.map(response.data.cast, _.partialRight(_.pick, ['id','character', 'title']));
                if(callback) callback(data);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getCast(movieID, callback){
        axios.get(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${API_KEY}`)
            .then((response) => {
                let data = _.map(response.data.cast, _.partialRight(_.pick, ['id','name']));
                if(callback) callback(data);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //Get movie cast by movie id



    renderMovieList() {
        if (this.state.actors.length > 0) {
            return this.state.actors.map((actor) => {
                return <Col key={actor.id}><MovieList actor={actor}/></Col>
            })
        }
        return <div></div>
    }

    renderSixDegree(){

    }

    setActorsState(actors) {
        this.setState({
            actors: actors
        })
    }

    getActorsForCompare(index) {
        if (this.state.actors[index]) {
            return this.state.actors[index]
        }
        else return '';
    }

    render() {
        return (
            <Container className="mt-3">
                <Row>
                    <Col lg={{size: 4, offset: 4}} md={{size: 6, offset: 3}}>
                        <ActorForm getMovies={this.getMovies} getActors={this.getActors} setActorsState={this.setActorsState}/>
                    </Col>
                </Row>
                <Row className='mt-5'>
                    <Col>
                        <SixDegrees actor1={this.getActorsForCompare(0)} actor2={this.getActorsForCompare(1)} />
                        {/*<MovieCompare actor1={this.getActorsForCompare(0)} actor2={this.getActorsForCompare(1)}/>*/}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home;