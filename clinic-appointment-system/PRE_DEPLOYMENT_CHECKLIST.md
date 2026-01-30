# Pre-Deployment Checklist

Use this checklist before deploying to production to ensure everything is configured correctly.

## ✅ Frontend Checklist

- [ ] **Environment Variables**
  - [ ] Created `.env.production` with correct `REACT_APP_API_BASE_URL`
  - [ ] Verified API URL points to production backend
  - [ ] No hardcoded localhost URLs in code

- [ ] **Build Testing**
  - [ ] Run `npm install` successfully
  - [ ] Run `npm run build` successfully
  - [ ] Test built app locally with `serve -s build`
  - [ ] Verified all routes work
  - [ ] Checked browser console for errors

- [ ] **Security**
  - [ ] No sensitive data in frontend code
  - [ ] No console.log statements in production code
  - [ ] HTTPS enabled on hosting platform

## ✅ Backend Checklist

- [ ] **Environment Variables**
  - [ ] Set `DATABASE_URL` to production database
  - [ ] Set `DATABASE_USERNAME` with production credentials
  - [ ] Set `DATABASE_PASSWORD` with production credentials
  - [ ] Set `JWT_SECRET` to a strong, unique value (min 256 bits)
  - [ ] Set `SPRING_PROFILES_ACTIVE=production`
  - [ ] Set `HIBERNATE_DDL_AUTO=validate` (not update or create-drop)

- [ ] **Database Setup**
  - [ ] Production database created
  - [ ] Schema initialized (run schema.sql if needed)
  - [ ] Database accessible from backend server
  - [ ] Connection pooling configured
  - [ ] Database backups enabled

- [ ] **Build Testing**
  - [ ] Run `mvn clean install` successfully
  - [ ] All tests pass: `mvn test`
  - [ ] JAR file generated in target/
  - [ ] Test JAR locally: `java -jar target/*.jar`

- [ ] **Security**
  - [ ] Changed default JWT secret
  - [ ] Changed default database password
  - [ ] CORS configured for production frontend URL
  - [ ] HTTPS/SSL enabled
  - [ ] Firewall rules configured

## ✅ General Checklist

- [ ] **Documentation**
  - [ ] Reviewed DEPLOYMENT.md
  - [ ] Reviewed ENV_VARS.md
  - [ ] Updated any custom deployment instructions
  - [ ] Documented any platform-specific configurations

- [ ] **Testing**
  - [ ] Tested user registration
  - [ ] Tested user login
  - [ ] Tested appointment booking
  - [ ] Tested appointment viewing
  - [ ] Tested appointment cancellation
  - [ ] Tested profile management

- [ ] **Monitoring & Logs**
  - [ ] Application logging configured
  - [ ] Error tracking set up (optional: Sentry, etc.)
  - [ ] Health check endpoints working
  - [ ] Monitoring alerts configured

- [ ] **Backup & Recovery**
  - [ ] Database backup strategy in place
  - [ ] Tested database restore procedure
  - [ ] Code repository backed up
  - [ ] Deployment rollback plan documented

## ✅ Docker Deployment (if applicable)

- [ ] **Docker Configuration**
  - [ ] Dockerfiles tested locally
  - [ ] docker-compose.yml configured correctly
  - [ ] Environment variables set in docker-compose or .env
  - [ ] Volumes configured for data persistence
  - [ ] Networks configured properly

- [ ] **Container Testing**
  - [ ] Run `docker-compose up` successfully
  - [ ] All containers start without errors
  - [ ] Application accessible at expected ports
  - [ ] Database persistence working (restart test)

## ✅ CI/CD (if applicable)

- [ ] **GitHub Actions / CI Pipeline**
  - [ ] Workflow file (.github/workflows/ci-cd.yml) configured
  - [ ] All jobs passing
  - [ ] Deployment secrets configured
  - [ ] Automatic deployment tested

## 🚀 Deployment Day

- [ ] **Pre-deployment**
  - [ ] All checklist items above completed
  - [ ] Team notified of deployment
  - [ ] Maintenance window scheduled (if needed)
  - [ ] Rollback plan ready

- [ ] **Deployment**
  - [ ] Backend deployed first
  - [ ] Verify backend health check passes
  - [ ] Frontend deployed second
  - [ ] Verify frontend can reach backend
  - [ ] DNS/domain configured (if needed)

- [ ] **Post-deployment**
  - [ ] Smoke tests passed
  - [ ] Monitor logs for errors
  - [ ] Check application performance
  - [ ] Verify all features working
  - [ ] User acceptance testing
  - [ ] Document any issues encountered

## 📝 Notes

Add any environment-specific notes or special instructions here:

```
[Your notes here]
```

## 🆘 Emergency Contacts

- DevOps: [Contact info]
- DBA: [Contact info]
- Backend Lead: [Contact info]
- Frontend Lead: [Contact info]

## 🔄 Rollback Procedure

If critical issues occur:

1. **Frontend**: Revert to previous deployment or restore previous build
2. **Backend**: Stop current JAR, start previous version JAR
3. **Database**: If schema changed, restore from backup
4. **Notify team** of rollback
5. **Document root cause** for post-mortem

---

**Last Updated**: [Date]  
**Deployment Version**: [Version number]  
**Deployed By**: [Name]
