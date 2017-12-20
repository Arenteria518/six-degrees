import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import ActorLookup from './ActorLookup';

class Home extends Component {

    render(){
        return(
            <Container className="mt-3">
                <Row>
                    <Col lg={{size: 4, offset: 4}} md={{size: 6, offset: 3}}>
                        <ActorLookup name="Actor One"/>
                        <ActorLookup name="Actor Two" className="mt-2"/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home;