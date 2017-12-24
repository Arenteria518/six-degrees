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
            actorIDs: []
        }

        //bind methods
        this.getActorID = this.getActorID.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.movieLookup = this.movieLookup.bind(this);
    };

    handleSubmit(e){
        e.preventDefault();
        if(this.state.actorIDs.length >= 2 ){
            this.movieLookup();
        }
        else alert("please select an actor from the dropdown")
    }
        getActorID(name, id){
        var actorIDs = this.state.actorIDs.slice();
        actorIDs.push({
            name: name,
            id: id
        });
        this.setState({
            actorIDs: actorIDs
        })
    }

    movieLookup(){
        let actors = [];
        this.state.actorIDs.slice(Math.max(this.state.actorIDs.length - 2, 0)).forEach( (actorID) => {
            axios.get(`https://api.themoviedb.org/3/person/${actorID.id}/movie_credits?api_key=${API_KEY}&language=en-US`)
                .then((response) => {
                     let data = _.map(response.data.cast, _.partialRight(_.pick, ['id','character', 'title']));
                    actors.push({
                        name: actorID.name,
                        id: actorID.id,
                        movies: data
                    });
                    this.props.getActors(actors)
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        )
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <ActorLookup name="Actor One" getActorID={this.getActorID}/>
                <ActorLookup name="Actor Two" getActorID={this.getActorID} className="mt-2"/>
                <Button color='primary' type='submit' className='mt-2'>Submit</Button>
            </form>
        )
    }
}

export default ActorForm;