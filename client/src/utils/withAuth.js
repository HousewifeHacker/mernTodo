import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { getFromStorage } from './storage';

export default function withAuth(ProtectedComponent) {
    return class extends Component {
        state = {
            loading: true,
            redirect: false,
        };

        componentDidMount() {
            const authObj = getFromStorage('jessies_mern_todo');
            if (authObj && authObj.token) {
                const { token } = authObj;
                axios.get(`api/sessions/${token}`)
                    .then(res => {
                        const { data } = res;
                        console.log(data);
                        if (!data.success) {
                            this.setState({
                                redirect: true,
                                loading: false,
                            });
                        } else {
                            this.setState({
                                loading: false,
                            });
                        }
                    });
            } else {
                this.setState({
                    redirect: true,
                    loading: false,
                });
            }
        }

        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/signin" />
            }
            return (
                <Fragment>
                    <ProtectedComponent {...this.props} />
                </Fragment>
            );
        }
    }
}
