import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const LinkStyled = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
`;

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/users/${id}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>User not found</p>;

  return (
    <Container>
      <h1>User Details</h1>
      <h2>Following are the user details:-</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Description: {user.description}</p>
      <p>Role: {user.role}</p>
      <p>Registration Date: {user.registration_date}</p>
      <LinkStyled to={`/users/update/${user.id}`}>Edit User</LinkStyled>
    </Container>
  );
};

export default UserDetails;
