// src/App.js
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './globalStyles';
import { theme } from './theme';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser';
import UserDetails from './components/UserDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/users/update/:id" element={<UpdateUser />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
