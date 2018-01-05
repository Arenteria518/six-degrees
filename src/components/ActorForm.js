import React, { Component } from 'react'
import { Button } from 'reactstrap';

import ActorLookup from './ActorLookup'

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
            this.movieLookup(this.state.actor1, this.state.actor2);
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

    movieLookup(actor1, actor2){
        let actors = [];
        this.props.getMovies(actor1, (data) =>{
            actors.push({
                name: actor1.name,
                id: actor1.id,
                movies: data
            });

            this.props.getMovies(actor2, data => {
                actors.push({
                    name: actor2.name,
                    id: actor2.id,
                    movies: data
                });

                this.props.setActorsState(actors);
            })
        })

    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <ActorLookup name="Actor One" getActors={this.props.getActors} getActorID={this.setActor1}/>
                <ActorLookup name="Actor Two" getActors={this.props.getActors} getActorID={this.setActor2} className="mt-2"/>
                <Button color='primary' type='submit' className='mt-2'>Submit</Button>
            </form>
        )
    }
}

export default ActorForm;