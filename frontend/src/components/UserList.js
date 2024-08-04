// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.padding};
  background-color: ${({ theme }) => theme.colors.light};
`;

const Input = styled.input`
  margin-bottom: ${({ theme }) => theme.spacing.margin};
  padding: ${({ theme }) => theme.spacing.padding};
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.padding};
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ListItem = styled.li`
  padding: ${({ theme }) => theme.spacing.padding};
  border-bottom: 1px solid #ccc;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    text-decoration: underline;
  }
`;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleSort = () => {
    const sortedUsers = [...users].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.username.localeCompare(b.username);
      } else {
        return b.username.localeCompare(a.username);
      }
    });
    setUsers(sortedUsers);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(filter.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <h1>Welcome to User Management Application!</h1><br></br>
      <h2>User List</h2>
      <h3>Following are user lists:-</h3><br></br>
      <LinkStyled to="/add-user">
        <Button>Create User</Button>
      </LinkStyled><br></br>
      <div>
        <Input
          type="text"
          placeholder="Filter by Username"
          value={filter}
          onChange={handleFilter}
        />
        <Button onClick={handleSort}>
          Sort by Username ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </Button>
      </div>
      <ul>
        {currentUsers.map(user => (
          <ListItem key={user.id}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Description: {user.description}</p>
            <LinkStyled to={`/users/${user.id}`}>View Details</LinkStyled><br></br>
            <Button onClick={() => handleDelete(user.id)}>Delete</Button>
          </ListItem>
        ))}
      </ul>
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={filteredUsers.length}
        paginate={paginate}
      />
    </Container>
  );
};

const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default UserList;
