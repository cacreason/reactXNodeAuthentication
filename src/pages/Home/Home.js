//Home Page for React X Node Project Structure Template
// 6/24/19

import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import Header from '../../components/Header/Header';
import './styles.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Insert State Object Params
    };
  }
  render() {
    return (
      <div className="home" id="home">
      <Header/>
      <Container fluid>
        <Row>
          <Col xs="12" className="m-4">
            <h3>Woo!  It works, start coding!</h3><FontAwesomeIcon icon="thumbs-up" size="2x" className="my-auto mx-1"/><hr/>
          </Col>
        </Row>
      </Container>
      </div>
    )
  }
}
