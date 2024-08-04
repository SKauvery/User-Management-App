// src/components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 80%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  margin: 10px 0;
  padding: 10px;
  width: 80%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [role, setRole] = useState('');
  const [registration_date, setRegistrationDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3001/users', {
      username,
      email,
      description,
      role,
      registration_date: new Date().toISOString().split('T')[0],
    })
    .then(response => {
      console.log('User added:', response.data);
      setUsername('');
      setEmail('');
      setDescription('');
      setRole('');
      setRegistrationDate('');
      navigate('/');
    })
    .catch(error => {
      console.error('Error adding user:', error);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Create User</h1>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <Input
        type="date"
        placeholder="Registration Date"
        value={registration_date}
        onChange={(e) => setRegistrationDate(e.target.value)}
      />
      <Button type="submit">Add User</Button>
    </Form>
  );
};

export default AddUser;
