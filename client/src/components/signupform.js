import React, { Component } from 'react';
import axios from 'axios';
import {
    Button,
    Container,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
} from 'reactstrap';

export default class SignUpForm extends Component {
    state = {
        errorMessage: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            errorMessage: '',
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const {password, confirmPassword, email} = this.state;
        if (password !== confirmPassword) {
            this.setState({errorMessage: 'Passwords do not match'});
            return
        }
        axios.post('api/users', {
            email: email,
            password: password
        })
        .then( (resp) => {
            const { data } = resp;
            if (data.success) {
                // TODO contains token
                console.log(data);
                this.props.history.push('/');
            } else {
                this.setState({errorMessage: data.message});
            }
        });
    }
    render() {
        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.email} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.password} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Confirm Password</Label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            onChange={this.handleChange}
                            value={this.state.confirmPassword}/>
                    </FormGroup>
                    <FormText>{this.state.errorMessage}</FormText>
                    <Button>Submit</Button>
                </Form>
            </Container>
        )
    }
}
