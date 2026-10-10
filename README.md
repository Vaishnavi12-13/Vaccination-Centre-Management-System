# Vaccination Centre Management System

A web-based application designed to manage vaccination centres, patient registrations, centre requests, and vaccination appointments.

## Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- HTML
- CSS

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Maven

### Database
- MySQL

## Project Structure

```text
Vaccination-Centre-Management-System/
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── mvnw
│
├── database/
│   └── vaccination_db_backup.sql
│
└── README.md
```

## Main Features

- Patient registration and login
- Patient dashboard
- Vaccination centre directory
- Vaccination centre request management
- Appointment management
- Admin dashboard
- Patient management
- Centre management
- Patient profile and settings

## Prerequisites

Install the following software before running the project:

- Node.js and npm
- Java JDK compatible with the Spring Boot version
- MySQL Server
- Git

## Database Setup

1. Start your MySQL Server.
2. Create a database named `vaccination_db`.
3. Import `database/vaccination_db_backup.sql` using MySQL Workbench.
4. Configure the database username and password using environment variables.

Example environment variables for PowerShell:

```powershell
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_mysql_password"
```

Replace the example password with your local MySQL password.

## Run the Backend

Open a terminal in the `backend` folder.

Configure the database environment variables, then run:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend normally runs at:

http://localhost:8080

## Run the Frontend

Open another terminal in the `frontend` folder.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

http://localhost:5173

## API Configuration

The frontend API configuration is located in:

`frontend/src/services/api.js`

For local development, the backend API base URL is:

`http://localhost:8080/api`

## Important Notes

- The frontend and backend must both be running for the complete application to work.
- Database credentials should not be committed to GitHub.
- The database backup should contain only test or demonstration data.
- This project is intended for educational and demonstration purposes. Review authentication, authorization, and data protection before production use.

## Author

Vaccination Centre Management System Project
