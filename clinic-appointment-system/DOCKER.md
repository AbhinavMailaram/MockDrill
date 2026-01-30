# Docker Deployment Guide

This guide explains how to deploy the Clinic Appointment Management System using Docker and Docker Compose.

## Prerequisites

- Docker 20.10+
- Docker Compose 2.0+

## Quick Start with Docker Compose

**IMPORTANT**: Before starting, configure your environment variables for security.

### 1. Configure Environment Variables

```bash
cd clinic-appointment-system
cp .env.example .env
```

Edit the `.env` file and set secure values:
- `POSTGRES_PASSWORD`: Your database password
- `JWT_SECRET`: A strong secret key (generate with `openssl rand -base64 64`)

### 2. Start the Application

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Backend API on port 8080
- Frontend web app on port 80

Access the application at `http://localhost`

### Stop the application

```bash
docker-compose down
```

### Stop and remove volumes (WARNING: This will delete all data)

```bash
docker-compose down -v
```

## Individual Container Deployment

### 1. Database Container

```bash
docker run -d \
  --name clinic-db \
  -e POSTGRES_DB=clinic_appointment_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:15-alpine
```

### 2. Backend Container

Build the backend image:

```bash
cd clinic-appointment-system/backend
docker build -t clinic-backend:latest .
```

Run the backend container:

```bash
docker run -d \
  --name clinic-backend \
  --link clinic-db:db \
  -e SPRING_PROFILES_ACTIVE=production \
  -e DATABASE_URL=jdbc:postgresql://db:5432/clinic_appointment_db \
  -e DATABASE_USERNAME=postgres \
  -e DATABASE_PASSWORD=postgres \
  -e JWT_SECRET=your_strong_secret_key \
  -p 8080:8080 \
  clinic-backend:latest
```

### 3. Frontend Container

Build the frontend image:

```bash
cd clinic-appointment-system/frontend
docker build -t clinic-frontend:latest .
```

Run the frontend container:

```bash
docker run -d \
  --name clinic-frontend \
  --link clinic-backend:backend \
  -p 80:80 \
  clinic-frontend:latest
```

## Production Deployment with Docker

### Using Docker Swarm

1. Initialize Docker Swarm:
```bash
docker swarm init
```

2. Deploy the stack:
```bash
docker stack deploy -c docker-compose.yml clinic-app
```

### Using Kubernetes

Convert the docker-compose.yml to Kubernetes manifests:

```bash
# Install kompose
curl -L https://github.com/kubernetes/kompose/releases/download/v1.26.0/kompose-linux-amd64 -o kompose
chmod +x kompose
sudo mv ./kompose /usr/local/bin/kompose

# Convert
kompose convert -f docker-compose.yml
```

Then apply the manifests:
```bash
kubectl apply -f .
```

## Environment Variables for Production

### Backend Environment Variables

```bash
SPRING_PROFILES_ACTIVE=production
DATABASE_URL=jdbc:postgresql://your-db-host:5432/your_database
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
JWT_SECRET=your_very_strong_secret_key_minimum_256_bits
JWT_EXPIRATION=86400000
HIBERNATE_DDL_AUTO=validate
PORT=8080
```

### Frontend Environment Variables

Build-time environment variable:
```bash
REACT_APP_API_BASE_URL=https://your-backend-domain.com/api
```

To use environment variables at build time:
```bash
docker build --build-arg REACT_APP_API_BASE_URL=https://api.yoursite.com/api -t clinic-frontend:latest .
```

## Container Registry

### Push to Docker Hub

```bash
# Tag images
docker tag clinic-backend:latest yourusername/clinic-backend:latest
docker tag clinic-frontend:latest yourusername/clinic-frontend:latest

# Push to Docker Hub
docker push yourusername/clinic-backend:latest
docker push yourusername/clinic-frontend:latest
```

### Push to AWS ECR

```bash
# Authenticate
aws ecr get-login-password --region region | docker login --username AWS --password-stdin aws_account_id.dkr.ecr.region.amazonaws.com

# Tag and push
docker tag clinic-backend:latest aws_account_id.dkr.ecr.region.amazonaws.com/clinic-backend:latest
docker push aws_account_id.dkr.ecr.region.amazonaws.com/clinic-backend:latest
```

## Health Checks

The containers include health checks:

### Backend Health Check
```bash
curl http://localhost:8080/actuator/health
```

### Check container health status
```bash
docker ps
```

## Logs

View container logs:

```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend

# Follow logs
docker-compose logs -f backend
```

## Database Backup

### Create a backup

```bash
docker exec clinic-db pg_dump -U postgres clinic_appointment_db > backup.sql
```

### Restore from backup

```bash
docker exec -i clinic-db psql -U postgres clinic_appointment_db < backup.sql
```

## Troubleshooting

### Container won't start

Check logs:
```bash
docker logs clinic-backend
docker logs clinic-frontend
docker logs clinic-db
```

### Database connection issues

1. Ensure database container is healthy:
```bash
docker ps
docker exec clinic-db pg_isready -U postgres
```

2. Check network connectivity:
```bash
docker network inspect clinic-appointment-system_default
```

### Port conflicts

If ports 80, 8080, or 5432 are already in use, modify the port mappings in docker-compose.yml:

```yaml
ports:
  - "8081:8080"  # Map to different host port
```

## Performance Optimization

### Resource Limits

Add resource limits in docker-compose.yml:

```yaml
services:
  backend:
    # ...
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
```

### Build Optimization

Use multi-stage builds (already implemented) to reduce image sizes.

### Volume Optimization

For better I/O performance in production, use specific volume drivers or bind mounts.

## Security Best Practices

1. **Don't use default passwords**: Change all default credentials
2. **Use secrets management**: For production, use Docker secrets or environment variable injection
3. **Keep images updated**: Regularly update base images
4. **Scan for vulnerabilities**: Use `docker scan clinic-backend:latest`
5. **Run as non-root**: Containers already configured to run as non-root users
6. **Network isolation**: Use custom networks to isolate services

## Monitoring

Set up container monitoring:

```bash
# Using cAdvisor
docker run -d \
  --name=cadvisor \
  -p 8081:8080 \
  -v /:/rootfs:ro \
  -v /var/run:/var/run:ro \
  -v /sys:/sys:ro \
  -v /var/lib/docker/:/var/lib/docker:ro \
  google/cadvisor:latest
```

Access cAdvisor at `http://localhost:8081`

## Support

For issues or questions:
- Check container logs: `docker-compose logs`
- Verify container health: `docker ps`
- Review Docker documentation: https://docs.docker.com/
