# Environment Variables Configuration Guide

This document lists all environment variables used by the Clinic Appointment Management System.

## Frontend Environment Variables

The frontend uses environment variables prefixed with `REACT_APP_` as required by Create React App.

### Required Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `REACT_APP_API_BASE_URL` | Backend API base URL | `http://localhost:8080/api` | `https://api.example.com/api` |

### Configuration Files

- **Development**: Create `.env.local` or `.env.development.local`
- **Production**: Create `.env.production` or `.env.production.local`
- **Template**: See `.env.example` for reference

### Example: `.env.production`

```env
REACT_APP_API_BASE_URL=https://your-backend.herokuapp.com/api
```

## Backend Environment Variables

The backend Spring Boot application supports environment variables with sensible defaults.

### Database Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | JDBC connection URL | `jdbc:postgresql://localhost:5432/clinic_appointment_db` | Yes (production) |
| `DATABASE_USERNAME` | Database username | `postgres` | Yes (production) |
| `DATABASE_PASSWORD` | Database password | `postgres` | Yes (production) |

### Server Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `8080` | No |
| `SPRING_PROFILES_ACTIVE` | Active Spring profile | none | No |

### JPA/Hibernate Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `HIBERNATE_DDL_AUTO` | Hibernate DDL mode | `update` | No |
| `JPA_SHOW_SQL` | Show SQL in logs | `true` | No |
| `JPA_FORMAT_SQL` | Format SQL in logs | `true` | No |

**Important**: In production, set `HIBERNATE_DDL_AUTO=validate` to prevent automatic schema changes.

### JWT Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `JWT_SECRET` | JWT signing secret | (default insecure value) | **Yes (production)** |
| `JWT_EXPIRATION` | Token expiration (ms) | `86400000` (24h) | No |

**Security Warning**: The default JWT secret is insecure. **ALWAYS** set a strong secret in production:
```bash
# Generate a strong secret (example)
openssl rand -base64 64
```

### Logging Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `LOG_LEVEL_ROOT` | Root logging level | `INFO` | No |
| `LOG_LEVEL_APP` | Application logging level | `DEBUG` | No |
| `LOG_LEVEL_SECURITY` | Security logging level | `DEBUG` | No |

## Environment-Specific Configurations

### Development Environment

**Frontend** (`.env.local`):
```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

**Backend** (No extra config needed - uses defaults)

### Production Environment

**Frontend** (`.env.production`):
```env
REACT_APP_API_BASE_URL=https://api.yoursite.com/api
```

**Backend** (Environment variables or system properties):
```bash
export SPRING_PROFILES_ACTIVE=production
export DATABASE_URL=jdbc:postgresql://prod-db.example.com:5432/clinic_db
export DATABASE_USERNAME=clinic_user
export DATABASE_PASSWORD=super_secure_password
export JWT_SECRET=your_256_bit_secret_key_here
export HIBERNATE_DDL_AUTO=validate
export LOG_LEVEL_ROOT=WARN
export LOG_LEVEL_APP=INFO
export LOG_LEVEL_SECURITY=WARN
```

## Platform-Specific Setup

### Heroku

Set config vars:
```bash
heroku config:set DATABASE_URL="postgresql://..."
heroku config:set JWT_SECRET="your_secret"
heroku config:set SPRING_PROFILES_ACTIVE=production
heroku config:set HIBERNATE_DDL_AUTO=validate
```

Frontend:
```bash
heroku config:set REACT_APP_API_BASE_URL="https://your-backend.herokuapp.com/api"
```

### AWS Elastic Beanstalk

Add environment properties in `.ebextensions/` config or in the EB console.

### Docker / Docker Compose

Set in `docker-compose.yml`:
```yaml
environment:
  - DATABASE_URL=jdbc:postgresql://db:5432/clinic_db
  - JWT_SECRET=${JWT_SECRET}
```

Or use `.env` file with docker-compose:
```env
DATABASE_URL=jdbc:postgresql://db:5432/clinic_db
JWT_SECRET=your_secret_here
```

### Kubernetes

Create a Secret:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: clinic-secrets
type: Opaque
data:
  jwt-secret: <base64-encoded-secret>
  db-password: <base64-encoded-password>
```

Reference in Deployment:
```yaml
env:
  - name: JWT_SECRET
    valueFrom:
      secretKeyRef:
        name: clinic-secrets
        key: jwt-secret
```

## Security Best Practices

1. **Never commit sensitive values** to version control
2. **Use strong, random secrets** for JWT_SECRET (minimum 256 bits)
3. **Rotate secrets regularly** in production
4. **Use secret management** services (AWS Secrets Manager, HashiCorp Vault, etc.)
5. **Set restrictive permissions** on environment files
6. **Different secrets** for each environment (dev, staging, production)
7. **Use HIBERNATE_DDL_AUTO=validate** in production

## Validating Configuration

### Check Frontend Configuration

```bash
# In browser console
console.log(process.env.REACT_APP_API_BASE_URL)
```

### Check Backend Configuration

```bash
# View active configuration
curl http://localhost:8080/actuator/env
# (Note: This endpoint may need to be enabled in application.properties)
```

Or check logs on startup:
```
...
Database URL: jdbc:postgresql://...
Active profiles: production
...
```

## Troubleshooting

### Frontend can't connect to backend
- Verify `REACT_APP_API_BASE_URL` is set correctly
- Check CORS configuration in backend
- Ensure backend is accessible from frontend's network

### Backend database connection fails
- Verify `DATABASE_URL` format is correct
- Check database credentials
- Ensure database server is reachable
- Check firewall rules

### JWT token issues
- Ensure `JWT_SECRET` is the same across all backend instances
- Check token expiration settings
- Verify token is being sent in requests

## Getting Help

If you encounter issues:
1. Check application logs
2. Verify all required environment variables are set
3. Test with default values in development first
4. Review the deployment guide (DEPLOYMENT.md)
