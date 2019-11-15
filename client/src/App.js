import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './components/Layout.js';
import TodoList from './components/todo_list/TodoList.js';
import LoginForm from './components/authentication/LoginForm.js'
import PrivateRoute from './components/authentication/PrivateRoute.js'
import TaskManager from './components/task_management/TaskManager.js'

import './App.css';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <LoginForm />
        </Route>
        <Layout>
          <PrivateRoute path='/taskmanager'>
            <TaskManager />
          </PrivateRoute>
          <PrivateRoute path='/todolist'>
            <TodoList />
          </PrivateRoute>
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
