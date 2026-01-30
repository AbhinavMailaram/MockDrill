# Clinic Appointment System - Backend

## Overview
This is the backend service for the Clinic Appointment Management System, built with Spring Boot and PostgreSQL.

## Technology Stack
- **Framework**: Spring Boot 3.1.5
- **Language**: Java 17
- **Database**: PostgreSQL
- **Security**: Spring Security with JWT support
- **Build Tool**: Maven

## Features
- User registration and authentication
- Appointment booking and management
- RESTful API endpoints
- Database scheduling and cleanup
- CORS configuration for frontend integration

## Prerequisites
- Java 17 or higher
- Maven 3.6+
- PostgreSQL 12+

## Database Setup
1. Install PostgreSQL
2. Create a database named `clinic_appointment_db`
3. Update `application.properties` with your database credentials

```sql
CREATE DATABASE clinic_appointment_db;
```

## Running the Application

### Using Maven
```bash
mvn clean install
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## API Endpoints

### User Management
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/username/{username}` - Get user by username
- `GET /api/users` - Get all users
- `PUT /api/users/{id}` - Update user profile
- `DELETE /api/users/{id}` - Delete user

### Appointment Management
- `POST /api/appointments` - Create a new appointment
- `GET /api/appointments/{id}` - Get appointment by ID
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/user/{userId}` - Get user appointments
- `GET /api/appointments/status/{status}` - Get appointments by status
- `PUT /api/appointments/{id}` - Update appointment
- `PUT /api/appointments/{id}/cancel` - Cancel appointment
- `DELETE /api/appointments/{id}` - Delete appointment

## Configuration
Main configuration file: `src/main/resources/application.properties`

Key configurations:
- Database connection settings
- Server port
- JPA/Hibernate settings
- JWT secret (for future implementation)

## Project Structure
```
backend/
├── src/main/java/com/clinic/appointment/
│   ├── controller/          # REST Controllers
│   ├── service/             # Business Logic
│   ├── repository/          # Data Access Layer
│   ├── model/               # Entity Classes
│   ├── dto/                 # Data Transfer Objects
│   ├── config/              # Configuration Classes
│   ├── scheduler/           # Scheduled Tasks
│   ├── exception/           # Exception Handlers
│   └── AppointmentApplication.java
└── src/main/resources/
    ├── application.properties
    └── schema.sql
```

## Scheduled Tasks
- **Appointment Cleanup**: Runs daily at 2:00 AM to mark past appointments as NO_SHOW
- **Old Data Cleanup**: Runs every 6 hours to remove cancelled appointments older than 90 days

## Security
- Password encryption using BCrypt
- CORS enabled for frontend integration
- JWT token support (ready for implementation)

## Development
To run in development mode with hot reload:
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

## Testing
Run tests with:
```bash
mvn test
```

## License
MIT License
