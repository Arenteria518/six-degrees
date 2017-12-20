import React, { Component } from 'react';
import { Input, Label } from 'reactstrap';

import AutoComplete from './AutoComplete';

class ActorLookup extends Component {
    constructor(props){
        super(props);
        this.state = {
            isFocus: false
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }
    onFocus(){
        this.setState({
            isFocus: true
        })
    }

    onBlur(){
        this.setState({
            isFocus: false
        })
    }

    render(){
        return(
            <div className={`position-relative${this.props.className ? ' ' + this.props.className: ''}`}>
                <Label for={this.props.name}>{this.props.name}</Label>
                <Input onFocus={this.onFocus} onBlur={this.onBlur}/>
                <AutoComplete
                    show={this.state.isFocus}
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