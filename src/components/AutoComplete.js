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
    &:hover{
        background: #f6f6f6;
    }
`;

class  AutoComplete extends Component {
    renderList(items){
        return items.map((item) =>{
            return <ListItem key={item}>{item}</ListItem>
            }
        )
    }
    render() {
        return (
            <List show={this.props.show}>
                {this.renderList(this.props.items)}
            </List>
        )
    }
}

export default AutoComplete;