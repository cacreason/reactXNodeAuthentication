// Creason Media Login Page

import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Card, CardHeader, CardFooter, CardBody  } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onUserCreate = this.onUserCreate.bind(this);
    this.state = {
      formData: {
        fName: '',
        lName: '',
        email: '',
        password: '',
        repassword: ''
      },
      response: "",
      isCreated: ""
    };
  }
  onUserCreate(response, status) {
    this.setState({response: response});
    if (status === "success") this.setState({isCreated:true});
  }
  handleSubmit(event) {
    let formData = this.state.formData;
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

  callApi = async (data) => {
    let headers = {headers: {'Content-Type' : 'application/json'}};
    axios.post("/register", data, headers)
    .then((response) => {
      console.log(response);
      if (response.status === 200){
        this.setState({response: "User Account Created - Log In!", isCreated: true});
      }
    })
    .catch((error) => {
      if(error.response.status >= 500){
        this.setState({response: "Server error - please try later.", isCreated: false});
      }
      else{
        this.setState({response: "Username/Email already exists", isCreated: false});
      }
    });
  };

  render() {
    return (
      <div className="register" id="register">
      <Container fluid>
      <Col xs={{size: 10, offset: 1}} className="my-4">
      <div>
        <Card className="text-left">
          <CardHeader>Create Account:</CardHeader>
          <CardBody>
            <Form method="post" onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label for="fName" sm={2}>First Name</Label>
              <Col sm={10}>
                <Input type="text" name="fName" id="fName" placeholder="First Name" value={this.state.fName} onChange={this.handleInputChange} required/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="lName" sm={2}>Last Name</Label>
              <Col sm={10}>
                <Input type="text" name="lName" id="lName" placeholder="Last Name" value={this.state.lName} onChange={this.handleInputChange} required/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="email" sm={2}>Email</Label>
              <Col sm={10}>
                <Input type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} required/>
              </Col>
            </FormGroup>
            <Row form>
              <Col sm={6}>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} required/>
                </FormGroup>
              </Col>
              <Col sm={6}>
                <FormGroup>
                  <Label for="repassword">Re-enter Password</Label>
                  <Input type="password" name="repassword" id="repassword" placeholder="Re-enter Password" value={this.state.repassword} onChange={this.handleInputChange} required/>
                </FormGroup>
              </Col>
            </Row>
            <Button type="submit" className="w-75 mx-auto d-block" color="success">Submit</Button>
            </Form>
            <div>{this.state.isCreated ? <p className="text-success mt-3">{this.state.response}</p> : <p className="text-danger mt-3">{this.state.response}</p>}</div>
          </CardBody>
          <CardFooter>Already have an account? <Link to="/login">Login</Link></CardFooter>
        </Card>
      </div>
      </Col>
      </Container>
      </div>
    )
  }
}
