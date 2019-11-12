import React from 'react';
import TodoList from './components/todo_list/TodoList.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  function login() {
    const userArgs = { email: "foo@bar.com", password: "testing123" }
    fetch(`${window.location.origin}/api/v1/authentication`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: userArgs })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // localStorage.setItem('isLoggedIn', true)
    });
  }

  login();

  return (
    <TodoList />
  );
}

export default App;
