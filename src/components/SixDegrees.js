import React, { Component } from 'react'
import _ from 'lodash';

class SixDegrees extends Component {
    constructor(props){
        super(props);

        this.state = {
            show: true,
            degrees: []
        }

        this.handleMatch = this.handleMatch.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.endActor = nextProps.actor2;
        this.degrees =[];
        this.degrees.push({
            id: nextProps.actor1.id,
            name: nextProps.actor1.name,
            type: 'person'
        })
        this.firstTry = true;
        this.compareActors(nextProps.actor1, nextProps.actor2);
    }

    compareActors(actor1, actor2){
        this.currentActor = actor1;
        if(actor1 !== '' && actor2 !== '') {
            let sharedMovies =[];
            let movieList1 = _.keyBy(actor1.movies, (movie) => { return movie.id });
            let movieList2 = _.keyBy(actor2.movies, movie => { return movie.id });

            for(var key in movieList1){
                if(movieList2[key]){
                    sharedMovies.push(movieList2[key])
                }
            }

            this.evaluateSharedMovies(sharedMovies);
        }
    }

    evaluateSharedMovies(movies){
        if(movies.length > 0){
            this.handleMatch(movies)
        }
        else
        this.handleMismatch()
    }

    handleMismatch(){
        this.firstTry - false;
    }

    handleMatch(movies){
        console.log(movies);
        this.degrees.push({
            id: movies[0].id,
            name: movies[0].title,
            type: 'movie'
        })

        this.degrees.push({
            id: this.endActor.id,
            name: this.endActor.name,
            type: 'person'
        })

        console.log(this.degrees);
        this.setState({
            degrees: this.degrees
        })
    }

    endSearch(){

    }

    renderDegrees(degrees){
        if(degrees.length > 0){
            return degrees.map(degree => {
                return (
                    <li>{degree.name}</li>
                )
            })
        }
    }

    render(){
        return(
            <ul>
                {this.renderDegrees(this.state.degrees)}
            </ul>
        )
    }
}

export default SixDegrees;