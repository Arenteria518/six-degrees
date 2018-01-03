import React, {Component} from 'react';
import {Input, Label} from 'reactstrap';
import axios from 'axios';
import _ from 'lodash';
import {API_KEY} from "../config/keys";

import AutoComplete from './AutoComplete';

class ActorLookup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocus: false,
            value: '',
            keepFocus: false,
            data: [],
            index: -1
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
        this.handleDropdownHover = this.handleDropdownHover.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeFocus = this.removeFocus.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    actorSearch(term) {
        this.setState({
            index: -1
        });
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

    onFocus() {
        this.setState({
            isFocus: true
        })
    }

    onBlur() {
        let $this = this;
        if (this.state.keepFocus) {
            return;
        }
        window.setTimeout(function () {
            $this.removeFocus();
        }, 200)
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        if (event.target.value.length > 0) {
            this.actorSearch(event.target.value);
        }
        if (event.target.value < 1) {
            this.setState({data: []});
        }
    }

    handleDropdownClick(name) {
        this.setState({
            value: name,
            keepFocus: true
        });
        this.setState({
            keepFocus: false
        });
    }

    handleDropdownHover(index) {
        this.setState({
            index: index
        })
    }

    handleKeyDown(e) {
        let index = this.state.index;

        if (e.key === 'ArrowDown') {
            if (index < this.state.data.length - 1) {
                index = index + 1;
                this.child.handleScroll(this.state.index);
            }
        } else if (e.key === 'ArrowUp') {
            if (index >= 0) {
                index = index - 1;
                this.child.handleScroll(this.state.index - 1);
            }
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
            this.child.handleListClick(this.state.index);
            this.removeFocus();
        }
        else if (e.key === 'Tab') {
            this.child.handleListClick(this.state.index);
            this.removeFocus();
        }

        this.setState({
            index: index
        })
    }

    removeFocus() {
        this.setState({
            isFocus: false,
        })
    }

    render() {
        return (
            <div className={`position-relative${this.props.className ? ' ' + this.props.className : ''}`}>
                <Label for={this.props.name}>{this.props.name}</Label>
                <Input onFocus={this.onFocus} onBlur={this.onBlur} value={this.state.value}
                       onKeyDown={this.handleKeyDown} onChange={this.handleChange}/>
                <AutoComplete
                    show={this.state.isFocus}
                    handleDropdownClick={this.handleDropdownClick}
                    handleDropdownHover={this.handleDropdownHover}
                    getID={this.props.getActorID}
                    items={this.state.data}
                    index={this.state.index}
                    ref={instance => {
                        this.child = instance
                    }}

                />
            </div>
        )
    }
}

export default ActorLookup;