import React, {Component} from 'react';
import {Input, Label} from 'reactstrap';

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
            this.setState({ index: -1});
            this.props.getActors(event.target.value, (data) => {
                this.setState({ data:data });
            })


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
            e.preventDefault();
            if (index < this.state.data.length - 1) {
                index = index + 1;
                this.child.handleScroll(index);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (index > 0) {
                index = index - 1;
                this.child.handleScroll(index);
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