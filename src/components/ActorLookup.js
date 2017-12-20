import React, { Component } from 'react';
import { Input, Label } from 'reactstrap';

class ActorLookup extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={this.props.className}>
                <Label for={this.props.name}>{this.props.name}</Label>
                <Input/>
            </div>
        )
    }
}

export default ActorLookup;