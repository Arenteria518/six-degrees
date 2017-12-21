import React, { Component } from 'react';
import { Input, Label } from 'reactstrap';

import AutoComplete from './AutoComplete';

class ActorLookup extends Component {
    constructor(props){
        super(props);
        this.state = {
            isFocus: false,
            value: '',
            keepFocus: false
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
            $this.setState({
                isFocus: false,
            })
        }, 200)
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleDropdownClick(key){
        this.setState({
            value: key,
            keepFocus: true
        })
        this.onBlur()
        this.setState({
            keepFocus: false
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
                    items={[
                        "hello",
                        "world",
                        "Some",
                        "more",
                        "stuff"
                    ]}
                />
            </div>
        )
    }
}

export default ActorLookup;