// src/components/UpdateUser.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const UpdateUser = () => {
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [role, setRole] = useState('');
  const [registration_date, setRegistrationDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/users/${id}`)
      .then(response => {
        setUsername(response.data.username);
        setEmail(response.data.email);
        setDescription(response.data.description);
        setRole(response.data.role);
        setRegistrationDate(response.data.registration_date);
      })
      .catch(error => console.error('Error fetching user:', error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:3001/users/${id}`, {
      username,
      email,
      description,
      role,
      registration_date
    })
    .then(response => {
      console.log('User updated:', response.data);
      navigate(`/users/${id}`);
    })
    .catch(error => console.error('Error updating user:', error));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Update User Details</h1>
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
      <Button type="submit">Save</Button>
    </Form>
  );
};

export default UpdateUser;
