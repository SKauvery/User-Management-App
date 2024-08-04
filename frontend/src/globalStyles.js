// src/globalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
  }
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    padding: ${({ theme }) => theme.spacing.padding};
    cursor: pointer;
    border-radius: 4px;
  }
  button:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;
