import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App.js';
import LoginForm from '../components/authentication/LoginForm.js';
import PrivateRoute from '../components/authentication/PrivateRoute.js';
import TodoList from '../components/todo_list/TodoList.js';
import TodoRow from '../components/todo_list/todo_rows/TodoRow.js';
import { expect } from 'chai';
import { mount } from 'enzyme';

describe('<App />', () => {
  it('renders a <LoginForm /> component if not logged in', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(LoginForm)).to.have.lengthOf(1);
    expect(wrapper.find(TodoList)).to.have.lengthOf(0);
  });

  it.skip('renders a <TodoList /> if logged in', () => {
    // TODO: Need to mock the localStorage check for isLoggedIn
    const wrapper = mount(<App />);
    expect(wrapper.find(LoginForm)).to.have.lengthOf(0);
    expect(wrapper.find(TodoList)).to.have.lengthOf(1);
  });
});
