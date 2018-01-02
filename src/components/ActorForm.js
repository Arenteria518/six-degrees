import React, { Component } from 'react'
import { Button } from 'reactstrap';
import axios from 'axios';
import _ from 'lodash';

import ActorLookup from './ActorLookup'
import {API_KEY} from "../config/keys";

class ActorForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            actor1: {},
            actor2: {}
        }

        //bind methods
        this.setActor1 = this.setActor1.bind(this);
        this.setActor2 = this.setActor2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.movieLookup = this.movieLookup.bind(this);
    };

    handleSubmit(e){
        e.preventDefault();
        if(Object.getOwnPropertyNames(this.state.actor1).length !== 0 && Object.getOwnPropertyNames(this.state.actor2).length !== 0){
            this.movieLookup();
            this.setState({
                actorIDs: []
            })
        }
        else alert("please select an actor from the dropdown")
    }

    setActor1(name, id){
        this.setState({
            actor1: {
                name: name,
                id: id
            }

        })
    }

    setActor2(name, id){
        this.setState({
            actor2: {
                name: name,
                id: id
            }

        })
    }

    movieLookup(){
        let actors = [];
        axios.get(`https://api.themoviedb.org/3/person/${this.state.actor1.id}/movie_credits?api_key=${API_KEY}&language=en-US`)
            .then((response) => {
                 let data = _.map(response.data.cast, _.partialRight(_.pick, ['id','character', 'title']));
                actors.push({
                    name: this.state.actor1.name,
                    id: this.state.actor1.id,
                    movies: data
                });

                axios.get(`https://api.themoviedb.org/3/person/${this.state.actor2.id}/movie_credits?api_key=${API_KEY}&language=en-US`)
                    .then((response) => {
                        let data = _.map(response.data.cast, _.partialRight(_.pick, ['id','character', 'title']));
                        actors.push({
                            name: this.state.actor2.name,
                            id: this.state.actor2.id,
                            movies: data
                        });
                        this.setState({
                            actors: actors
                        });
                        this.props.getActors(this.state.actors);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
            })
    }



    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <ActorLookup name="Actor One" getActorID={this.setActor1}/>
                <ActorLookup name="Actor Two" getActorID={this.setActor2} className="mt-2"/>
                <Button color='primary' type='submit' className='mt-2'>Submit</Button>
            </form>
        )
    }
}

export default ActorForm;