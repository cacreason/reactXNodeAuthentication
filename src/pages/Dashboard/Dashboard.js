//User dashboard for reactXNodeAuthentication template
// 6/25/19

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './styles.css';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard" id="dashboard">
      <Container fluid>
        <Row>
          <Col xs="12">
            <h2>Success! Private Route Accessed</h2><FontAwesomeIcon icon="thumbs-up" size="2x" className="my-auto mx-1"/>
          </Col>
        </Row>
      </Container>
      </div>
    )
  }
}
