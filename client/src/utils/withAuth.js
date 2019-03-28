import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { getFromStorage } from './storage';

export default function withAuth(ProtectedComponent) {
    return class extends Component {
        state = {
            isLoading: true,
            isLoggedIn: false,
        };

        componentDidMount() {
            const authObj = getFromStorage('jessies_mern_todo');
            if (authObj && authObj.token) {
                const { token } = authObj;
                axios.get(`api/sessions/${token}`)
                    .then(res => {
                        const { data } = res;
                        if (!data.success) {
                            this.setState({
                                isLoading: false,
                            });
                        } else {
                            this.setState({
                                isLoading: false,
                                isLoggedIn: true,
                            });
                        }
                    });
            } else {
                this.setState({
                    isLoading: false,
                });
            }
        }

        render() {
            const { isLoading, isLoggedIn } = this.state;
            if (isLoading) {
                return null;
            }
            return (
                <Fragment>
                    <ProtectedComponent {...this.props} isLoggedIn={isLoggedIn} />
                </Fragment>
            );
        }
    }
}
