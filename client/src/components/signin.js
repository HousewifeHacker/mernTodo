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

export default class SignIn extends Component {
    state = {
        errorMessage: '',
        email: '',
        password: '',
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            errorMessage: '',
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const {password, email} = this.state;
        axios.post('api/sessions', {
            email: email,
            password: password
        })
        .then( (resp) => {
            const { data } = resp;
            if (data.success) {
                setInStorage('jessies_mern_todo', {token: data.token});
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
                    <FormText>{this.state.errorMessage}</FormText>
                    <Button>Submit</Button>
                </Form>
            </Container>
        )
    }
}
