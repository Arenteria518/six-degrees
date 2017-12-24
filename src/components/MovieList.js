import React, { Component } from 'react'
import _ from 'lodash';

class MovieList extends Component{


    renderList(actor){
        let movies = _.uniqBy(actor.movies, 'id');
        return movies.map((movie) => {
            return <li key={movie.title}>{movie.title}</li>
        })
    }

    render(){
        return(
            <div>
                <h3>{this.props.actor.name}</h3>
                <ul>
                    {this.renderList(this.props.actor)}
                </ul>
            </div>
        )
    }
}

export default MovieList;