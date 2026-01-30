# Deployment Guide

This guide provides step-by-step instructions for deploying the Clinic Appointment Management System to production.

## Prerequisites

- Node.js 14+ and npm
- Java 17 or higher
- Maven 3.6+
- PostgreSQL 12+
- A deployment platform (e.g., Heroku, AWS, Azure, DigitalOcean, Vercel, Netlify)

## Environment Variables

### Frontend Environment Variables

Create a `.env.production` file in the `frontend/` directory:

```env
REACT_APP_API_BASE_URL=https://your-backend-domain.com/api
```

### Backend Environment Variables

Set the following environment variables for your backend deployment:

```env
# Database Configuration
DATABASE_URL=jdbc:postgresql://your-db-host:5432/your_database_name
DATABASE_USERNAME=your_db_username
DATABASE_PASSWORD=your_db_password

# Server Configuration
PORT=8080

# JPA Configuration (use 'validate' in production)
HIBERNATE_DDL_AUTO=validate

# JWT Configuration (IMPORTANT: Use a strong secret in production)
JWT_SECRET=your_strong_jwt_secret_key_here_at_least_256_bits
JWT_EXPIRATION=86400000

# Spring Profile
SPRING_PROFILES_ACTIVE=production
```

## Building for Production

### Frontend Build

1. Navigate to the frontend directory:
```bash
cd clinic-appointment-system/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create production environment file:
```bash
cp .env.example .env.production
# Edit .env.production with your backend URL
```

4. Build the production bundle:
```bash
npm run build
```

The build output will be in the `build/` directory.

### Backend Build

1. Navigate to the backend directory:
```bash
cd clinic-appointment-system/backend
```

2. Build the JAR file:
```bash
mvn clean package -DskipTests
```

The JAR file will be in the `target/` directory: `target/appointment-system-1.0.0.jar`

## Deployment Options

### Option 1: Deploy to Heroku

#### Backend Deployment

1. Create a new Heroku app:
```bash
heroku create your-backend-app-name
```

2. Add PostgreSQL addon:
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

3. Set environment variables:
```bash
heroku config:set SPRING_PROFILES_ACTIVE=production
heroku config:set JWT_SECRET=your_strong_secret_key
```

4. Deploy:
```bash
git subtree push --prefix clinic-appointment-system/backend heroku main
```

#### Frontend Deployment

1. For frontend, you can use Vercel or Netlify (recommended for React apps)
2. Or deploy to Heroku:
```bash
heroku create your-frontend-app-name
cd frontend
heroku buildpacks:set mars/create-react-app
git push heroku main
```

### Option 2: Deploy to AWS

#### Backend (EC2)

1. Create an EC2 instance (Ubuntu recommended)
2. Install Java 17:
```bash
sudo apt update
sudo apt install openjdk-17-jdk
```

3. Transfer your JAR file to the server
4. Create a systemd service for automatic startup
5. Run the application:
```bash
java -jar appointment-system-1.0.0.jar --spring.profiles.active=production
```

#### Frontend (S3 + CloudFront)

1. Build the frontend
2. Create an S3 bucket
3. Upload the `build/` directory contents to S3
4. Enable static website hosting
5. (Optional) Set up CloudFront for CDN

### Option 3: Deploy to DigitalOcean

1. Create a Droplet
2. Install required software (Java, Node.js, PostgreSQL)
3. Set up PostgreSQL database
4. Deploy backend JAR file
5. Build and deploy frontend (use Nginx to serve static files)

### Option 4: Deploy Frontend to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to frontend directory and deploy:
```bash
cd clinic-appointment-system/frontend
vercel --prod
```

3. Set environment variables in Vercel dashboard

### Option 5: Deploy Frontend to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build and deploy:
```bash
cd clinic-appointment-system/frontend
npm run build
netlify deploy --prod --dir=build
```

## Docker Deployment

See `DOCKER.md` for containerized deployment instructions.

## Database Setup for Production

1. Create the production database:
```sql
CREATE DATABASE clinic_appointment_db;
```

2. Run the schema initialization script:
```sql
-- Run the contents of backend/src/main/resources/schema.sql
```

3. Update the `application-production.properties` or environment variables with database credentials

## Post-Deployment Steps

1. **Security Checklist**:
   - [ ] Update JWT secret to a strong, random value
   - [ ] Enable HTTPS/SSL
   - [ ] Configure CORS properly for your frontend domain
   - [ ] Update database credentials
   - [ ] Set up database backups
   - [ ] Enable firewall rules

2. **Monitoring**:
   - Set up application monitoring (e.g., New Relic, Datadog)
   - Configure log aggregation
   - Set up uptime monitoring
   - Configure alerts for errors

3. **Performance**:
   - Enable gzip compression
   - Set up CDN for frontend assets
   - Configure database connection pooling
   - Enable caching where appropriate

## Troubleshooting

### Build Failures

**Frontend build fails with ESLint errors:**
- The build is configured to disable ESLint in production
- Use `npm run build` which automatically sets `DISABLE_ESLINT_PLUGIN=true`

**Backend build fails:**
- Ensure Java 17 is installed: `java -version`
- Check Maven is configured: `mvn -version`

### Runtime Issues

**CORS errors:**
- Update `WebConfig.java` in backend to allow your frontend domain
- Add your frontend URL to allowed origins

**Database connection errors:**
- Verify DATABASE_URL format is correct
- Check database credentials
- Ensure database is accessible from your server

**Port conflicts:**
- Backend default port is 8080
- Change with `PORT` environment variable or in application.properties

## Support

For issues or questions:
- Check the main README.md
- Review application logs
- Open an issue in the repository

## Rollback Procedure

If deployment fails:
1. Keep previous version running
2. Revert to previous git commit
3. Rebuild and redeploy
4. Check database migrations weren't partially applied
