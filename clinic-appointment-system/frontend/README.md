# Clinic Appointment System - Frontend

## Overview
Modern React-based frontend for the Clinic Appointment Management System with glassmorphic design and smooth animations.

## Technology Stack
- **Framework**: React 18.2.0
- **Routing**: React Router DOM 6.16.0
- **HTTP Client**: Axios 1.5.1
- **Styling**: TailwindCSS (via CDN) + Custom CSS
- **Build Tool**: Create React App

## Features
- Glassmorphic UI design with dark theme
- Smooth animations and transitions
- User authentication (login/register)
- Appointment booking and management
- User profile management
- Responsive design
- Real-time form validation

## Prerequisites
- Node.js 14+
- npm or yarn

## Installation

```bash
cd frontend
npm install
```

## Running the Application

### Development Mode
```bash
npm start
```

The application will start on `http://localhost:3000`

### Production Build
```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Environment Variables

Create a `.env` file in the frontend directory:

```
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar/
│   │   ├── AppointmentForm/
│   │   ├── CancellationForm/
│   │   ├── GlassCard/
│   │   ├── AnimatedButton/
│   │   └── UserProfileCard/
│   ├── services/            # API service layer
│   │   ├── api.js
│   │   ├── appointmentService.js
│   │   └── userService.js
│   ├── pages/               # Page components
│   │   ├── Home.js
│   │   ├── BookAppointment.js
│   │   ├── CancelAppointment.js
│   │   ├── ViewAppointments.js
│   │   └── UserProfile.js
│   ├── styles/              # Global styles
│   │   ├── animations.css
│   │   └── glassmorphism.css
│   ├── utils/               # Utility functions
│   │   └── validation.js
│   ├── context/             # React Context
│   │   └── UserContext.js
│   ├── App.js               # Main app component
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Key Components

### Pages
- **Home**: Login and registration page
- **BookAppointment**: Form to book new appointments
- **ViewAppointments**: List of user's appointments
- **CancelAppointment**: Cancel appointment by ID
- **UserProfile**: View and edit user profile

### Components
- **Navbar**: Navigation bar with glassmorphic effect
- **GlassCard**: Reusable glass card component
- **AnimatedButton**: Button with hover animations
- **AppointmentForm**: Form for booking appointments
- **CancellationForm**: Form for cancelling appointments
- **UserProfileCard**: Display user information

### Services
- **api.js**: Axios instance with interceptors
- **userService.js**: User-related API calls
- **appointmentService.js**: Appointment-related API calls

## Design Features

### Glassmorphism
- Transparent backgrounds with backdrop blur
- Subtle borders and shadows
- Layered visual hierarchy

### Animations
- Fade-in animations on page load
- Hover effects on interactive elements
- Floating background shapes
- Smooth transitions

### Color Scheme
- Primary: Indigo/Purple gradient
- Background: Dark gradient (gray-900 to indigo-900)
- Glass elements: Semi-transparent white/dark

## Routing

- `/` - Home (Login/Register)
- `/book-appointment` - Book new appointment
- `/view-appointments` - View user appointments
- `/cancel-appointment` - Cancel appointment
- `/profile` - User profile

All routes except Home are protected and require authentication.

## API Integration

The frontend communicates with the backend API at `http://localhost:8080/api`

### User Endpoints
- `POST /users/register` - Register new user
- `POST /users/login` - Login user
- `GET /users/{id}` - Get user by ID
- `PUT /users/{id}` - Update user profile

### Appointment Endpoints
- `POST /appointments` - Create appointment
- `GET /appointments/user/{userId}` - Get user appointments
- `PUT /appointments/{id}/cancel` - Cancel appointment

## Development Tips

1. Make sure the backend is running before starting the frontend
2. Check browser console for any errors
3. Use React Developer Tools for debugging
4. Test responsive design on different screen sizes

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License
MIT License
