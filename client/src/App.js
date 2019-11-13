import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TodoList from './components/todo_list/TodoList.js';
import LoginForm from './components/authentication/LoginForm.js'
import LogoutButton from './components/authentication/LogoutButton.js'
import PrivateRoute from './components/authentication/PrivateRoute.js'

import './App.css';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <LoginForm />
        </Route>
        <PrivateRoute path='/'>
          <div>
            <TodoList />
            <LogoutButton />
          </div>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
