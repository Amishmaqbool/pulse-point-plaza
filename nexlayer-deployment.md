# Nexlayer Deployment Documentation

## Overview

This document provides comprehensive information about deploying Pulse Point Plaza to Nexlayer.

## Architecture

### Application Stack
- **Frontend**: React 18 with Vite
- **UI Framework**: shadcn-ui components
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: TanStack Query

### Deployment Stack
- **Container**: Docker (multi-stage build)
- **Web Server**: Nginx (Alpine)
- **Platform**: Nexlayer Kubernetes

## Container Configuration

### Dockerfile Stages

1. **Builder Stage**
   - Base: `node:20-alpine`
   - Installs dependencies
   - Builds production bundle

2. **Production Stage**
   - Base: `nginx:alpine`
   - Serves static files
   - Configured for React Router

### Nginx Configuration

- **Port**: 80 (internal)
- **SPA Support**: All routes fallback to `index.html`
- **Compression**: Gzip enabled
- **Caching**: Static assets cached for 1 year
- **Security**: X-Frame-Options, X-Content-Type-Options headers

## Deployment Configuration

### Pod Configuration

```yaml
name: frontend
image: registry.nexlayer.io/pulse-point-plaza/frontend:latest
ports:
  - containerPort: 80
resources:
  requests:
    memory: 256Mi
    cpu: 100m
  limits:
    memory: 512Mi
    cpu: 500m
```

### Resource Requirements

- **Minimum**: 256Mi memory, 100m CPU
- **Maximum**: 512Mi memory, 500m CPU
- **Scaling**: Can be adjusted in `nexlayer.yaml`

## Build Process

### Local Build

```bash
# Build Docker image
docker build -t registry.nexlayer.io/pulse-point-plaza/frontend:latest .

# Test locally
docker run -p 8080:80 registry.nexlayer.io/pulse-point-plaza/frontend:latest
```

### CI/CD Build

GitHub Actions workflow:
1. Checks out code
2. Sets up Docker Buildx
3. Logs in to Nexlayer registry
4. Builds and pushes image
5. Tags with branch name and SHA

## Deployment Workflow

### Using MCP Tools

1. Clone repository for build system
2. Build container images
3. Poll for build status
4. Get YAML schema
5. Create/validate configuration
6. Deploy to Nexlayer

### Manual Deployment

1. Build and push image to registry
2. Update `nexlayer.yaml` if needed
3. Deploy using Nexlayer CLI or dashboard
4. Retrieve deployment URL

## Environment Variables

Currently, no environment variables are required. If needed, add to `nexlayer.yaml`:

```yaml
env:
  - name: VITE_API_URL
    value: "<% URL %>/api"
```

## Networking

- **Internal Port**: 80
- **External Access**: Via Nexlayer reverse proxy
- **Service Discovery**: Not required (single pod)

## Monitoring

### Health Checks

- **Path**: `/` (root)
- **Method**: HTTP GET
- **Expected**: 200 OK

### Logs

Access logs via:
- Nexlayer dashboard
- Nexlayer CLI
- API endpoints

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Dockerfile syntax
   - Verify all dependencies
   - Review build logs

2. **Deployment Fails**
   - Validate `nexlayer.yaml`
   - Check image exists in registry
   - Verify token permissions

3. **Application Errors**
   - Check browser console
   - Review application logs
   - Verify routing configuration

### Debug Commands

```bash
# Check image exists
docker pull registry.nexlayer.io/pulse-point-plaza/frontend:latest

# Test nginx config
docker run --rm -v $(pwd)/nginx.conf:/etc/nginx/conf.d/default.conf:ro nginx:alpine nginx -t

# View container logs
# (via Nexlayer dashboard or CLI)
```

## Updates and Rollbacks

### Updating Deployment

1. Make code changes
2. Build new image
3. Push to registry
4. Update deployment (Nexlayer handles rolling update)

### Rollback

Use Nexlayer dashboard to rollback to previous image version.

## Security Considerations

- **HTTPS**: Handled by Nexlayer reverse proxy
- **Headers**: Security headers in nginx.conf
- **Secrets**: Store in Nexlayer secrets management
- **Registry**: Private registry access required

## Performance Optimization

- **Image Size**: Multi-stage build reduces final image size
- **Caching**: Static assets cached for 1 year
- **Compression**: Gzip enabled for all text assets
- **Resources**: Adjust based on actual usage

## Cost Optimization

- **Resource Limits**: Set appropriate limits
- **Scaling**: Scale down during low usage
- **Image Caching**: Leverage Docker layer caching

## Support

For deployment issues:
1. Check Nexlayer dashboard logs
2. Review GitHub Actions build logs
3. Consult Nexlayer documentation
4. Contact Nexlayer support

---

**Last Updated**: $(date)
**Version**: 1.0.0

