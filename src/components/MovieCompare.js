import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import _ from 'lodash';
import styled from 'styled-components';

import List from './List';

const MoviesToggle = styled.strong`
    white-space: nowrap;
    text-decoration: underline;
    cursor: pointer;
    -webkit-user-select: none; /* Chrome/Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
    
    /* Rules below not implemented in browsers yet */
    -o-user-select: none;
    user-select: none;
`;

class MovieCompare extends Component {
    constructor(props){
        super(props);

        this.state ={
            show: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    compareMovies(actor1, actor2) {
        if(actor2 !== '') {
            let sharedMovies =[];
            let movieList1 = _.keyBy(actor1.movies, (movie) => { return movie.id });
            let movieList2 = _.keyBy(actor2.movies, movie => { return movie.id });

            for(var key in movieList1){
                if(movieList2[key]){
                    sharedMovies.push(movieList2[key].title)
                }
            }
            return this.renderSharedMovies(sharedMovies, actor1, actor2);
        }
    }

    renderSharedMovies(movies, actor1, actor2){
        if(movies.length >0){
            if(movies.length > 1) {
                //return number of movies appeared in together
                return (
                    <div>
                        <Alert color='success' className='text-center'>
                            <p style={{margin: 0}}><strong>{actor1.name}</strong> and <strong>{actor2.name}</strong> both appear in <MoviesToggle onClick={this.handleClick}>{movies.length} movies together</MoviesToggle></p>
                            <List show={this.state.show} items={movies}/>
                        </Alert>
                    </div>
                )
            }
            //return if only share one movie together
            return(
                <div>
                    <Alert color='success' className='text-center'>
                        <p style={{margin:0}}><strong>{actor1.name}</strong> and <strong>{actor2.name}</strong> both appear in <strong>{movies[0]}</strong></p>
                    </Alert>
                </div>
            )
        }

        //return if no movies together
        return(
            <div>
                <Alert color='danger' className='text-center'>
                    <p style={{margin:0}}><strong>{actor1.name}</strong> and <strong>{actor2.name}</strong> do not appear in any movies together</p>
                </Alert>
            </div>
        )
    }

    handleClick(){
        let show = !this.state.show;
        this.setState({
            show: show
        })
    }


    render(){
        return(
            <div>
                {this.compareMovies(this.props.actor1, this.props.actor2)}
            </div>
        )}
}

export default MovieCompare;