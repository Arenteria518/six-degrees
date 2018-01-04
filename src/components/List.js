import React, { Component } from 'react'

import styled from 'styled-components';

const UL = styled.ul `
    display: ${props => props.show ? 'block': 'none'};
    margin-top: 8px;
    margin-bottom: 0;
    padding-left: 0;
`;

const ListItem = styled.li`
    list-style: none;
    padding: 4px 8px;
`;

class List extends Component {

    renderList(items){
        return items.map((item, i) => {
            return <ListItem key={i}>{item}</ListItem>
        })
    }

    render(){
        if(this.props.items.length > 0){
            return(
                <UL show={this.props.show}>
                    {this.renderList(this.props.items)}
                </UL>
            )
        }

        return '';
    }
}

export default List