import React from 'react';
import TodoList from './components/todo_list/TodoList.js';
import AuthenticationPage from './components/authentication/AuthenticationPage.js';
import { Container } from 'semantic-ui-react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <Container>
      <TodoList />
      <AuthenticationPage />
    </Container>
  );
}

export default App;
