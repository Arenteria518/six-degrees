import React, { Component } from 'react';
import { Input, Label } from 'reactstrap';
import axios from 'axios';
import _ from 'lodash';

import AutoComplete from './AutoComplete';



class ActorLookup extends Component {
    constructor(props){
        super(props);
        this.state = {
            isFocus: false,
            value: '',
            keepFocus: false,
            data: []
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeFocus = this.removeFocus.bind(this);
    }

    actorSearch(term){
        axios.get(`https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&language=en-US&query=${term}&page=1&include_adult=false`)
            .then((response) => {
                let data = _.map(response.data.results, _.partialRight(_.pick, ['name', 'id']));
                this.setState({
                    data: data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    onFocus(){
        this.setState({
            isFocus: true
        })
    }
    onBlur(){
        let $this = this;
        if (this.state.keepFocus) {
            return;
        }
        window.setTimeout(function () {
            $this.removeFocus();
        }, 200)
    }

    handleChange(event){
        this.setState({value: event.target.value});
        if(event.target.value.length > 0) {
            this.actorSearch(event.target.value);
        }
        if(event.target.value < 1){
            this.setState({data: []});
        }
    }

    handleDropdownClick(key){
        this.setState({
            value: key,
            keepFocus: true
        })
        this.setState({
            keepFocus: false
        })
    }

    removeFocus(){
        this.setState({
            isFocus: false,
        })
    }

    render(){
        return(
            <div className={`position-relative${this.props.className ? ' ' + this.props.className: ''}`}>
                <Label for={this.props.name}>{this.props.name}</Label>
                <Input onFocus={this.onFocus} onBlur={this.onBlur} value={this.state.value} onChange={this.handleChange}/>
                <AutoComplete
                    show={this.state.isFocus}
                    handleDropdownClick={this.handleDropdownClick}
                    items={this.state.data}

                />
            </div>
        )
    }
}

export default ActorLookup;