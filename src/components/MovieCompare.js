import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import _ from 'lodash';

class MovieCompare extends Component {

    compareMovies(actor1, actor2) {
        if(actor2 !== '') {
            let movieList1 = _.keyBy(actor1.movies, (movie) => {
                return movie.id
            });
            let movieList2 = _.keyBy(actor2.movies, movie => {
                return movie.id
            });

            for(var key in movieList1){
                if(movieList2[key]){
                    return(
                        <div>
                            <Alert color='success' className='text-center'>
                                <p style={{margin:0}}><strong>{actor1.name}</strong> and <strong>{actor2.name}</strong> both appear in <strong>{movieList2[key].title}</strong></p>
                            </Alert>
                        </div>
                    );
                }
            }
            return <div>
                    <Alert color='danger' className='text-center'>
                        <p style={{margin:0}}><strong>{actor1.name}</strong> and <strong>{actor2.name}</strong> do not appear in any movies together</p>
                    </Alert>
                </div>
        }
    }


    render(){
        return(
            <div>
                {this.compareMovies(this.props.actor1, this.props.actor2)}
            </div>
        )}
}

export default MovieCompare;