import React, { Component} from 'react';
import styled from 'styled-components';

const List = styled.ul `
    position: absolute;
    display: ${props => props.show ? 'block': 'none'};
    background: white;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 100;
    margin-top: 8px;
    padding: 8px 0;
    border: 1px solid #ced4da;
    border-radius: 0.25rem
`;

const ListItem = styled.li`
    list-style: none;
    padding: 4px 8px;
    cursor: pointer;
    &:hover{
        background: #cecece;
    }
`;

class  AutoComplete extends Component {
    constructor(props){
        super(props)

        this.onClick = this.onClick.bind(this);
    }
    renderList(items){
        return( items.map((item) =>{
            return <ListItem onClick={this.onClick} key={item.id} data-key={item.name} data-id={item.id}>{item.name}</ListItem>
            }
        )
        )
    }

    onClick(e){
        let el = e.target;
        this.props.handleDropdownClick(el.dataset.key);
        this.props.getID(el.dataset.key, el.dataset.id)
    }
    render() {
        return (
            <List show={this.props.show && this.props.items.length > 0}>
                {this.renderList(this.props.items)}
            </List>
        )
    }
}

export default AutoComplete;