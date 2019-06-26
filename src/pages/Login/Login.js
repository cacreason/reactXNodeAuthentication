//Login Page for reactXNodeAuth Template
// 6/25/19

import React from 'react';
import { Container, Card, CardHeader, CardFooter, CardBody, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './styles.css';
const axios = require('axios');

export default class ALogin extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.state = {
      formData: {
        username: "",
        password: ""
      },
      response: " "
    };
  }

  handleSubmit(event) {
    var formData = {...this.state.formData};
    event.preventDefault();
    this.callApi(formData);
  }

  handleInputChange(event) {
    let formData = {...this.state.formData};
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    formData[name] = value;

    this.setState({
      formData: formData
    });
  }

  handleResponse(data) {
    this.setState({response: data});
  }

  callApi = async (data) => {
    let headers = {headers: {'Content-Type' : 'application/json'}};
    axios.post("/login", data, headers)
    .then((response) => {
      console.log(response);
      this.handleResponse(response.data.message);
      if (response.status === 200){
        this.props.history.push("/");
      }
    })
    .catch((error) => {
      console.log(error);
      this.handleResponse("Invalid Username/Email or Password.");
    });
  };

  render() {
    return (
      <div className="login" id="login">
      <Container fluid>
      <Col xs={{size: 10, offset: 1}} sm={{size: 6, offset: 3}} lg={{size: 4, offset: 4}} >
      <div className="my-5">
      <Card className="text-left">
        <CardHeader>MERN User Login:</CardHeader>
        <CardBody>
          <Form method="post" onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="username">Email</Label>
            <Input type="text" name="username" id="username" placeholder="Email" value={this.state.username} onChange={this.handleInputChange} required/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} required/>
          </FormGroup>
          <Button type="submit" className="w-100" color="success">Submit</Button>
          </Form>
          <div><p className="text-danger mt-3">{this.state.response}</p></div>
        </CardBody>
        <CardFooter>New User? <Link to="/register">Create Account</Link></CardFooter>
      </Card>
      </div>
      </Col>
      </Container>
      </div>
    )
  }
}
