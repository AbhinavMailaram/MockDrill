# Clinic Appointment Management System - Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USER INTERFACE                              │
│                    (React Frontend - Port 3000)                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │     Home     │  │    Profile   │  │ Appointments │              │
│  │ (Login/Reg)  │  │   Management │  │  Management  │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│          │                  │                  │                     │
│          └──────────────────┴──────────────────┘                     │
│                              │                                       │
│                    ┌─────────▼─────────┐                            │
│                    │   React Router    │                            │
│                    └─────────┬─────────┘                            │
│                              │                                       │
│          ┌───────────────────┼───────────────────┐                  │
│          │                   │                   │                  │
│  ┌───────▼────────┐  ┌──────▼──────┐  ┌────────▼────────┐         │
│  │  UserContext   │  │   Services   │  │   Components    │         │
│  │  (State Mgmt)  │  │  (API Layer) │  │ (UI Elements)   │         │
│  └────────────────┘  └──────┬───────┘  └─────────────────┘         │
│                              │                                       │
└──────────────────────────────┼───────────────────────────────────────┘
                               │
                        HTTP/REST API
                               │
┌──────────────────────────────▼───────────────────────────────────────┐
│                        API GATEWAY                                    │
│                   (Spring Boot - Port 8080)                           │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                    SECURITY LAYER                              │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │  │
│  │  │    CORS      │  │   BCrypt     │  │     JWT      │        │  │
│  │  │    Config    │  │   Password   │  │  (Ready)     │        │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘        │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                              │                                        │
│  ┌──────────────────────────▼──────────────────────────┐            │
│  │              CONTROLLERS (REST Endpoints)            │            │
│  │  ┌──────────────────┐      ┌──────────────────────┐ │            │
│  │  │  UserController  │      │ AppointmentController│ │            │
│  │  │                  │      │                      │ │            │
│  │  │  - Register      │      │  - Create           │ │            │
│  │  │  - Login         │      │  - Read             │ │            │
│  │  │  - Get/Update    │      │  - Update           │ │            │
│  │  │  - Delete        │      │  - Delete           │ │            │
│  │  └────────┬─────────┘      └──────────┬───────────┘ │            │
│  └───────────┼────────────────────────────┼─────────────┘            │
│              │                            │                          │
│  ┌───────────▼────────────────────────────▼─────────────┐            │
│  │               SERVICE LAYER (Business Logic)          │            │
│  │  ┌────────────────┐      ┌──────────────────────────┐│            │
│  │  │  UserService   │      │  AppointmentService      ││            │
│  │  │                │      │                          ││            │
│  │  │  - Validation  │      │  - Conflict Detection   ││            │
│  │  │  - Encryption  │      │  - Status Management    ││            │
│  │  │  - CRUD Logic  │      │  - CRUD Logic           ││            │
│  │  └────────┬───────┘      └──────────┬───────────────┘│            │
│  └───────────┼────────────────────────────┼─────────────┘            │
│              │                            │                          │
│  ┌───────────▼────────────────────────────▼─────────────┐            │
│  │           REPOSITORY LAYER (Data Access)              │            │
│  │  ┌──────────────────┐      ┌────────────────────────┐│            │
│  │  │ UserRepository   │      │ AppointmentRepository  ││            │
│  │  │ (JPA Interface)  │      │  (JPA Interface)       ││            │
│  │  └────────┬─────────┘      └──────────┬─────────────┘│            │
│  └───────────┼────────────────────────────┼─────────────┘            │
│              │                            │                          │
│  ┌───────────▼────────────────────────────▼─────────────┐            │
│  │                  MODEL LAYER (Entities)               │            │
│  │  ┌──────────────┐              ┌──────────────────┐  │            │
│  │  │  User        │              │  Appointment     │  │            │
│  │  │  - id        │  1        N  │  - id            │  │            │
│  │  │  - username  │──────────────│  - userId (FK)   │  │            │
│  │  │  - email     │              │  - patientName   │  │            │
│  │  │  - password  │              │  - doctorName    │  │            │
│  │  │  - ...       │              │  - status        │  │            │
│  │  └──────────────┘              └──────────────────┘  │            │
│  └─────────────────────────────────────────────────────┘            │
│                              │                                        │
│  ┌──────────────────────────▼──────────────────────────┐            │
│  │              UTILITY LAYER                           │            │
│  │  ┌────────────────┐  ┌──────────────────────────┐   │            │
│  │  │   Exception    │  │   Scheduler              │   │            │
│  │  │   Handler      │  │   - Daily Cleanup        │   │            │
│  │  └────────────────┘  │   - Old Data Removal     │   │            │
│  │                      └──────────────────────────┘   │            │
│  └─────────────────────────────────────────────────────┘            │
│                              │                                        │
└──────────────────────────────┼────────────────────────────────────────┘
                               │
                         JPA/Hibernate
                               │
┌──────────────────────────────▼───────────────────────────────────────┐
│                         DATABASE LAYER                                │
│                      (PostgreSQL Database)                            │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌────────────────────┐          ┌──────────────────────────┐        │
│  │   users TABLE      │          │  appointments TABLE      │        │
│  ├────────────────────┤          ├──────────────────────────┤        │
│  │ PK: id             │          │ PK: id                   │        │
│  │ UK: username       │          │ FK: user_id              │        │
│  │ UK: email          │    1:N   │     patient_name         │        │
│  │     password       │──────────│     doctor_name          │        │
│  │     full_name      │          │     appointment_date     │        │
│  │     phone_number   │          │     status               │        │
│  │     address        │          │     department           │        │
│  │     role           │          │     ...                  │        │
│  │     created_at     │          │     created_at           │        │
│  │     updated_at     │          │     updated_at           │        │
│  └────────────────────┘          └──────────────────────────┘        │
│                                                                       │
│  Indexes:                        Indexes:                            │
│  - idx_email                     - idx_user_id                       │
│  - idx_username                  - idx_appointment_date              │
│                                  - idx_status                        │
└───────────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Registration Flow
```
Browser → Home Page → UserService.register()
  → UserController.registerUser() → UserService.createUser()
  → Password Encrypted → UserRepository.save()
  → PostgreSQL users table → Response → Login
```

### 2. Appointment Booking Flow
```
Browser → BookAppointment Page → AppointmentService.createAppointment()
  → AppointmentController.createAppointment()
  → Validate Date → Check Conflicts → AppointmentService.createAppointment()
  → AppointmentRepository.save() → PostgreSQL appointments table
  → Response → ViewAppointments Page
```

### 3. View Appointments Flow
```
Browser → ViewAppointments Page
  → AppointmentService.getUserAppointments(userId)
  → AppointmentController.getAppointmentsByUser()
  → AppointmentService.getAppointmentsByUser()
  → AppointmentRepository.findByUserOrderByAppointmentDateDesc()
  → PostgreSQL Query → List of Appointments → Display
```

### 4. Cancel Appointment Flow
```
Browser → Cancel Button Click
  → AppointmentService.cancelAppointment(id)
  → AppointmentController.cancelAppointment()
  → AppointmentService.cancelAppointment()
  → Update Status to CANCELLED → AppointmentRepository.save()
  → PostgreSQL Update → Refresh List
```

## Technology Stack Details

### Frontend Technologies
```
React 18.2.0
  ├── react-router-dom (Routing)
  ├── axios (HTTP Client)
  ├── TailwindCSS (Styling)
  └── Custom CSS (Animations, Glassmorphism)
```

### Backend Technologies
```
Spring Boot 3.1.5
  ├── Spring Web (REST API)
  ├── Spring Data JPA (ORM)
  ├── Spring Security (Authentication)
  ├── Spring Validation (Input Validation)
  ├── PostgreSQL Driver
  ├── Lombok (Boilerplate Reduction)
  └── JWT (Token Management - Ready)
```

### Database
```
PostgreSQL 12+
  ├── Tables (users, appointments)
  ├── Indexes (Performance)
  ├── Foreign Keys (Referential Integrity)
  └── Constraints (Data Validation)
```

## Security Architecture

```
┌─────────────────────────────────────────────┐
│           Security Layers                   │
├─────────────────────────────────────────────┤
│  1. CORS Configuration                      │
│     - Allow localhost origins               │
│     - Credentials support                   │
├─────────────────────────────────────────────┤
│  2. Password Encryption                     │
│     - BCrypt algorithm                      │
│     - Salt generation                       │
├─────────────────────────────────────────────┤
│  3. Input Validation                        │
│     - Frontend validation                   │
│     - Backend validation                    │
│     - Bean Validation annotations           │
├─────────────────────────────────────────────┤
│  4. SQL Injection Prevention                │
│     - JPA Prepared Statements               │
│     - Parameterized queries                 │
├─────────────────────────────────────────────┤
│  5. JWT Structure (Ready)                   │
│     - Token generation                      │
│     - Token validation                      │
│     - Refresh mechanism                     │
└─────────────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────┐
│            Production Setup                 │
├─────────────────────────────────────────────┤
│  Frontend (React)                           │
│  └─> Build → Static Files → Nginx/Apache   │
│      URL: https://cliniccare.com            │
├─────────────────────────────────────────────┤
│  Backend (Spring Boot)                      │
│  └─> JAR File → Java Runtime → Port 8080   │
│      URL: https://api.cliniccare.com        │
├─────────────────────────────────────────────┤
│  Database (PostgreSQL)                      │
│  └─> Managed Service (AWS RDS, etc.)        │
│      URL: Internal/Private endpoint         │
└─────────────────────────────────────────────┘
```

## Key Features Implementation

### 1. Glassmorphic UI
- Backdrop blur filters
- Semi-transparent backgrounds
- Subtle borders and shadows
- Floating gradient shapes

### 2. Appointment Conflict Detection
- Check doctor availability
- Prevent double booking
- Time slot validation

### 3. Scheduled Cleanup
- Daily NO_SHOW marking (Cron: 0 0 2 * * ?)
- Periodic old data cleanup (Cron: 0 0 */6 * * ?)

### 4. Real-time Validation
- Email format validation
- Phone number validation
- Password strength checking
- Date/time validation

### 5. State Management
- React Context for user state
- Local storage for persistence
- Session management
- Route protection

This architecture provides a scalable, secure, and maintainable solution for clinic appointment management with modern design patterns and best practices.
