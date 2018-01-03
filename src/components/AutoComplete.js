import React, { Component} from 'react';
import styled from 'styled-components';

const List = styled.ul `
    position: absolute;
    display: ${props => props.show ? 'block': 'none'};
    background: white;
    height: 50vh;
    overflow-y: auto;
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
    &.active{
        background: #cecece;
    }
`;

class  AutoComplete extends Component {
    constructor(props){
        super(props)

        this.onClick = this.onClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleListClick = this.handleListClick.bind(this);
    }

    onClick(e){
        let el = e.target;
        this.props.handleDropdownClick(el.dataset.name);
        this.props.getID(el.dataset.name, el.dataset.id)
    }

    handleMouseEnter(e){
        e.target.classList.add('active');
        this.props.handleDropdownHover(parseInt(e.target.dataset.index))
    }

    handleMouseLeave(e){
        e.target.classList.remove('active');
    }

    handleListClick(index){
        if(index != -1) {
            let name = this.data[index].props['data-name'];
            let id = this.data[index].props['data-id'];

            this.props.handleDropdownClick(name);
            this.props.getID(name, id);
        }
    }

    renderList(items){
        this.data = items.map((item, i) =>{
                return (
                    <ListItem
                        className={`${this.props.index === i ? 'active' : ''}`}
                        onClick={this.onClick}
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave ={this.handleMouseLeave}
                        key={item.id}
                        data-id={item.id}
                        data-index={i}
                        data-name={item.name}
                    >
                        {item.name}
                    </ListItem>
                )
            }
        );
        return(this.data)
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