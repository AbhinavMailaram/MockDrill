# Quick Start Guide - Clinic Appointment Management System

This guide will help you get the Clinic Appointment Management System up and running in minutes.

## Prerequisites Checklist

- [ ] Java 17 or higher installed
- [ ] Maven 3.6+ installed
- [ ] Node.js 14+ and npm installed
- [ ] PostgreSQL 12+ installed and running
- [ ] Git installed (for cloning the repository)

## Step-by-Step Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/AbhinavMailaram/MockDrill.git
cd MockDrill/clinic-appointment-system
```

### Step 2: Database Setup

#### 2.1 Start PostgreSQL Service

**Linux/Mac:**
```bash
sudo service postgresql start
# or
brew services start postgresql
```

**Windows:**
```bash
# PostgreSQL should be running as a Windows service
# Check in Services or use:
net start postgresql-x64-12
```

#### 2.2 Create Database

Open PostgreSQL command line:
```bash
psql -U postgres
```

Create the database:
```sql
CREATE DATABASE clinic_appointment_db;
\q
```

#### 2.3 Configure Database Credentials

Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/clinic_appointment_db
spring.datasource.username=your_postgres_username
spring.datasource.password=your_postgres_password
```

### Step 3: Backend Setup

#### 3.1 Navigate to Backend Directory
```bash
cd backend
```

#### 3.2 Install Dependencies and Build
```bash
mvn clean install
```

This will:
- Download all dependencies
- Compile the code
- Run tests (if any)
- Create a JAR file

#### 3.3 Start the Backend Server
```bash
mvn spring-boot:run
```

**Expected Output:**
```
Started AppointmentApplication in X.XXX seconds
Tomcat started on port(s): 8080
```

**Verify Backend:**
Open browser and go to: `http://localhost:8080/api/users`
You should see an empty array `[]` if successful.

### Step 4: Frontend Setup

Open a NEW terminal window (keep backend running).

#### 4.1 Navigate to Frontend Directory
```bash
cd clinic-appointment-system/frontend
```

#### 4.2 Install Dependencies
```bash
npm install
```

This will install:
- React
- React Router DOM
- Axios
- Other dependencies

#### 4.3 Start the Frontend Development Server
```bash
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view clinic-appointment-frontend in the browser.
  Local:            http://localhost:3000
```

The application should automatically open in your browser at `http://localhost:3000`.

## Using the Application

### 1. Register a New Account

1. Open `http://localhost:3000`
2. Click on "Register" tab
3. Fill in the registration form:
   - Username (min 3 characters)
   - Email (valid email format)
   - Password (min 6 characters)
   - Full Name (optional)
   - Phone Number (optional)
4. Click "Register"

### 2. Login

1. After registration, you'll be automatically logged in
2. Or click "Login" tab and enter:
   - Username
   - Password
3. Click "Login"

### 3. Book an Appointment

1. Click "Book Appointment" in the navigation
2. Fill in the form:
   - Patient Name (required)
   - Patient Phone
   - Appointment Date & Time (must be future)
   - Doctor Name (required)
   - Department (optional)
   - Reason for Visit (optional)
3. Click "Book Appointment"

### 4. View Appointments

1. Click "My Appointments" in the navigation
2. See all your appointments with status badges
3. Click "Cancel" button to cancel an appointment

### 5. Manage Profile

1. Click "Profile" in the navigation
2. View your profile information
3. Click "Edit" to update:
   - Full Name
   - Email
   - Phone Number
   - Address
   - Password (optional)
4. Click "Save Changes"

## Common Issues and Solutions

### Issue 1: Port 8080 Already in Use

**Solution:**
```bash
# Find and kill the process using port 8080
# Linux/Mac:
lsof -ti:8080 | xargs kill -9

# Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

Or change the port in `application.properties`:
```properties
server.port=8081
```

### Issue 2: Port 3000 Already in Use

**Solution:**
When prompted, press `Y` to run on a different port (3001), or:
```bash
# Kill process on port 3000
# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue 3: Database Connection Failed

**Error:** `Connection refused` or `Authentication failed`

**Solution:**
1. Verify PostgreSQL is running:
   ```bash
   sudo service postgresql status
   ```

2. Check credentials in `application.properties`

3. Test connection:
   ```bash
   psql -U postgres -d clinic_appointment_db
   ```

### Issue 4: Maven Build Fails

**Solution:**
```bash
# Clear Maven cache
mvn clean

# Update dependencies
mvn clean install -U

# Skip tests if needed
mvn clean install -DskipTests
```

### Issue 5: npm Install Fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 6: CORS Errors in Browser

**Solution:**
The backend is configured to allow `localhost:3000` and `localhost:3001`.

If using a different port, update `CorsConfig.java`:
```java
configuration.setAllowedOrigins(List.of(
    "http://localhost:3000", 
    "http://localhost:3001",
    "http://localhost:YOUR_PORT"
));
```

## Testing the API with cURL

### Register a User
```bash
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### Create Appointment
```bash
curl -X POST http://localhost:8080/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "patientName": "John Doe",
    "appointmentDate": "2024-12-31T10:00:00",
    "doctorName": "Dr. Smith",
    "department": "Cardiology"
  }'
```

### Get User Appointments
```bash
curl http://localhost:8080/api/appointments/user/1
```

## Environment Variables (Optional)

### Backend (.env or application.properties)
```properties
# Database
DB_URL=jdbc:postgresql://localhost:5432/clinic_appointment_db
DB_USERNAME=postgres
DB_PASSWORD=yourpassword

# JWT (for future use)
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000

# Server
SERVER_PORT=8080
```

### Frontend (.env)
```
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

## Production Build

### Backend
```bash
cd backend
mvn clean package
java -jar target/appointment-system-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
# Serve the build folder with any static server
npx serve -s build
```

## Stopping the Application

### Stop Backend
Press `Ctrl + C` in the terminal running the backend

### Stop Frontend
Press `Ctrl + C` in the terminal running the frontend

### Stop PostgreSQL (if needed)
```bash
# Linux/Mac
sudo service postgresql stop

# Windows
net stop postgresql-x64-12
```

## Next Steps

1. **Customize the Application**
   - Update branding and colors
   - Add more departments
   - Modify appointment fields

2. **Add Features**
   - Email notifications
   - SMS reminders
   - Payment integration
   - Doctor availability calendar

3. **Deploy to Production**
   - Choose a hosting provider
   - Set up CI/CD pipeline
   - Configure domain and SSL
   - Set up monitoring

4. **Improve Security**
   - Implement JWT authentication
   - Add rate limiting
   - Set up logging
   - Regular security audits

## Support

- Check the main README.md for detailed documentation
- Review ARCHITECTURE.md for system design
- See IMPLEMENTATION_SUMMARY.md for complete feature list

## Useful Commands Reference

```bash
# Backend
mvn clean install          # Build project
mvn spring-boot:run        # Run application
mvn test                   # Run tests
mvn clean package          # Create JAR file

# Frontend
npm install                # Install dependencies
npm start                  # Start dev server
npm run build             # Create production build
npm test                  # Run tests

# Database
psql -U postgres          # Connect to PostgreSQL
\l                        # List databases
\c clinic_appointment_db  # Connect to database
\dt                       # List tables
\d users                  # Describe users table

# Git
git status                # Check status
git log --oneline         # View commit history
git branch               # List branches
```

## Success Checklist

- [ ] PostgreSQL database created
- [ ] Backend running on port 8080
- [ ] Frontend running on port 3000
- [ ] Can register a new user
- [ ] Can login with credentials
- [ ] Can book an appointment
- [ ] Can view appointments
- [ ] Can cancel an appointment
- [ ] Can update profile

Congratulations! Your Clinic Appointment Management System is now running! 🎉
