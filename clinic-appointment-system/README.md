# Clinic Appointment Management System

A full-stack web application for managing clinic appointments with a modern glassmorphic UI design, built with React, Spring Boot, and PostgreSQL.

## 🌟 Features

### User Management
- User registration and authentication
- Secure password encryption with BCrypt
- User profile management (CRUD operations)
- Password update functionality
- Role-based access control

### Appointment Management
- Book appointments with doctors
- View all appointments
- Cancel appointments
- Appointment conflict detection
- Status tracking (SCHEDULED, CONFIRMED, COMPLETED, CANCELLED, NO_SHOW)
- Automatic cleanup of old appointments

### Modern UI/UX
- **Glassmorphic Design** - Transparent glass-like elements with backdrop blur
- **Dark Theme** - Beautiful gradient backgrounds
- **Smooth Animations** - Fade-ins, hover effects, floating elements
- **Responsive Design** - Works on all screen sizes
- **Interactive Forms** - Real-time validation and feedback

## 🛠 Technology Stack

### Frontend
- **React 18.2.0** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **TailwindCSS** - Utility-first CSS framework
- **Custom CSS** - Glassmorphism and animations

### Backend
- **Spring Boot 3.1.5** - Java framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database operations
- **PostgreSQL** - Relational database
- **JWT** - Token-based authentication (ready for implementation)
- **Maven** - Dependency management

### Database
- **PostgreSQL 12+** - Production database
- Indexed tables for optimal performance
- Foreign key constraints for data integrity
- Scheduled cleanup tasks

## 📁 Project Structure

```
clinic-appointment-system/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/clinic/appointment/
│   │       ├── controller/  # REST endpoints
│   │       ├── service/     # Business logic
│   │       ├── repository/  # Data access
│   │       ├── model/       # Entity classes
│   │       ├── dto/         # Data transfer objects
│   │       ├── config/      # Configuration
│   │       ├── scheduler/   # Scheduled tasks
│   │       └── exception/   # Exception handling
│   └── src/main/resources/
│       ├── application.properties
│       └── schema.sql
├── frontend/                # React frontend
│   ├── public/
│   └── src/
│       ├── components/      # Reusable components
│       ├── pages/           # Page components
│       ├── services/        # API services
│       ├── context/         # React context
│       ├── utils/           # Utilities
│       └── styles/          # CSS files
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 14+ and npm
- PostgreSQL 12+
- Maven 3.6+

### Database Setup

1. Install PostgreSQL
2. Create a database:
```sql
CREATE DATABASE clinic_appointment_db;
```

3. Update database credentials in `backend/src/main/resources/application.properties`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies and run:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## 📋 API Documentation

### User Endpoints
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/username/{username}` - Get user by username
- `GET /api/users` - Get all users
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Appointment Endpoints
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/{id}` - Get appointment by ID
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/user/{userId}` - Get user appointments
- `GET /api/appointments/status/{status}` - Get appointments by status
- `PUT /api/appointments/{id}` - Update appointment
- `PUT /api/appointments/{id}/cancel` - Cancel appointment
- `DELETE /api/appointments/{id}` - Delete appointment

## 🎨 Design Features

### Glassmorphism
- Semi-transparent backgrounds
- Backdrop blur effects
- Subtle borders and shadows
- Layered visual hierarchy

### Animations
- Fade-in effects on page load
- Hover animations on buttons and cards
- Floating background shapes
- Smooth transitions
- Gradient text effects

### Color Palette
- Primary: Indigo (#6366f1) to Purple (#764ba2)
- Secondary: Pink (#f093fb) to Red (#f5576c)
- Background: Dark gradient (Gray-900 to Indigo-900)
- Accent: Cyan (#4facfe) to Turquoise (#00f2fe)

## 🔒 Security Features

- Password encryption using BCrypt
- CORS configuration for frontend integration
- JWT token support (ready for implementation)
- SQL injection prevention through JPA
- Input validation on both frontend and backend
- XSS protection

## ⏰ Scheduled Tasks

- **Daily Cleanup (2:00 AM)**: Marks past scheduled appointments as NO_SHOW
- **Periodic Cleanup (Every 6 hours)**: Removes cancelled appointments older than 90 days

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📱 Screenshots

### Home Page (Login/Register)
- Glassmorphic login/register forms
- Animated background shapes
- Smooth transitions between forms

### Book Appointment
- User-friendly form with validation
- Department selection
- Date/time picker
- Real-time feedback

### View Appointments
- List of all user appointments
- Status badges with color coding
- Cancel appointment functionality
- Detailed appointment information

### User Profile
- Profile information display
- Edit profile capability
- Password change functionality
- Glassmorphic design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Spring Boot documentation
- React documentation
- TailwindCSS
- PostgreSQL community
- Glassmorphism design inspiration

## 📞 Support

For support, email support@cliniccare.com or open an issue in the repository.

## 🔮 Future Enhancements

- [ ] JWT authentication implementation
- [ ] Email notifications for appointments
- [ ] SMS reminders
- [ ] Doctor availability calendar
- [ ] Payment integration
- [ ] Medical records management
- [ ] Prescription management
- [ ] Video consultation feature
- [ ] Multi-language support
- [ ] Mobile app (React Native)

---

**Made with ❤️ for better healthcare management**
