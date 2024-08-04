# User-Management-App

Overview

The User Management Application is a full-stack web application that allows users to manage a list of users. It features user listing, detailed user views, user addition, editing user and user removal. Built with a Node.js backend and a React frontend, the application offers a responsive design and a user-friendly interface.

Tech Stack

- Frontend: React, Axios, React Router DOM, Styled Components

- Backend: Node.js, Express, MySQL

- Database: MySQL

- Styling: CSS Modules or Styled Components

Setup and Initialization

1. Prerequisites
   
Before setting up the project, ensure you have the following installed:

- Node.js (version 14 or higher)

- npm (Node Package Manager)

- MySQL (version 8 or higher)

- Git (for version control)

2. Project Setup
   
2.1. Clone the Repository

git clone https://github.com/SKauvery/User-Management-App.git

cd User-Management-App

2.2. Initialize Backend

1. Navigate to the root directory:

cd user-management

2. Install Backend Dependencies:

npm install

3. Configure the Database:

- Ensure MySQL is running.

- Create a database named user_management.

CREATE DATABASE user_management;

- Run the provided SQL script (if available) to set up the Users table.

4. Set Up Environment Variables:

Create a .env file in the root directory with the following content:

DB_HOST=localhost

DB_USER=your_mysql_user

DB_PASSWORD=your_mysql_password

DB_NAME=user_management

PORT=3001

5. Start the Backend Server:

npm start
or
node server.js

The backend server will now be running on http://localhost:3001.

2.3. Initialize Frontend

1. Navigate to the frontend directory:

cd ../frontend

2. Install Frontend Dependencies:

npm install

3. Configure Environment Variables:

Create a .env file in the client directory with the following content:

REACT_APP_API_URL=http://localhost:3001

4. Start the Frontend Application:

npm start

The frontend application will now be running on http://localhost:3000.



Backend Development

1. Directory Structure
   
- user-management/

	- models/ – Contains database models.

	- routes/ – Contains API route handlers.

	- config/ – Contains configuration files.

	- server.js – Main entry point for the backend application.

2. Key Components
   
- Database Connection: Established using the mysql2 package.

- API Endpoints:

	- GET /users – Retrieve all users.

	- GET /users/:id – Retrieve user details by ID.

	- POST /users – Add a new user.
   
 	- PUT /users/ - Edit a user

	- DELETE /users/:id – Remove a user by ID.



Frontend Development

1. Directory Structure
   
- frontend/

	- src/

		- components/ – Contains React components.

		- utils/ – Contains utility functions and helpers.

		- App.js – Main application component with routing.

		- index.js – Entry point for the React application.

3. Key Components
   
- User List: Displays a list of users with some details and also with sorting, filtering, and pagination. Contains buttons to view more details and delete user.

- User Details: Shows detailed information about a selected user and a edit button to edit details.

- Add User Form: Allows adding new users with validation.

- Update User Form: Allows updating existing user details.



Integration

1. Connect Frontend to Backend:

- Use Axios to make HTTP requests from the React frontend to the Node.js backend.

- Ensure that the API URL in the .env file matches the backend server URL.

2. Data Flow:

- Fetch user data from the backend and display it in the user list component.

- Implement form submission to interact with the backend API for adding and updating users.

- Handle user deletions and refresh the user list accordingly.



Testing

1. Backend Testing
   
- Unit Tests: Write tests for individual functions and components using a testing framework like Mocha or Jest.

- Integration Tests: Test the integration of different components and API endpoints with Curl or Postman.

2. Frontend Testing
   
- Component Testing: Use tools like Jest and React Testing Library to test React components.

- End-to-End Testing: Implement end-to-end tests using tools like Cypress or Selenium to simulate user interactions.

Contact

For any questions or issues, please contact:

Email: kauverysingh@gmail.com


THANK YOU ... !!!
