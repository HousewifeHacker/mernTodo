import React from 'react';
import { MemoryRouter } from 'react-router';
import { shallow, mount } from 'enzyme';
import { AuthContext } from '../utils/AuthContext';
import AuthButtons from './authbuttons';

describe('<AuthButtons />', () => {
    it("renders without crashing", () => {
        shallow(<AuthButtons />); 
    });

    it("can pass in authtoken context", () => {
        const context = {
            authToken: 'testing',
            logout: null,
        };
        const wrapper = mount(
            <MemoryRouter>
                <AuthContext.Provider value={context}>
                    <AuthButtons />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(wrapper.find('button').text()).toEqual('Logout');
    });

    it("shows sign in and sign up buttons without authtoken", () => {
        const context = {
            authToken: null,
            logout: null,
        };
        const wrapper = mount(
            <MemoryRouter>
                <AuthContext.Provider value={context}>
                    <AuthButtons />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(wrapper.find('a').at(0).text()).toEqual('Sign In');
        expect(wrapper.find('a').at(1).text()).toEqual('Sign Up');
    });

    it("triggers logout function when logout button is clicked", () => {
        const logoutFunc = jest.fn();
        const context = {
            authToken: 'testing',
            logout: logoutFunc,
        };
        const wrapper = mount(
            <MemoryRouter>
                <AuthContext.Provider value={context}>
                    <AuthButtons />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        wrapper.find('button').simulate('click');
        expect(logoutFunc).toHaveBeenCalled();

    });
});
