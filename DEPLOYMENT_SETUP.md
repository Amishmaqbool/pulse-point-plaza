# Nexlayer Deployment Setup Guide

This guide will help you deploy your Pulse Point Plaza application to Nexlayer.

## Prerequisites

1. **Nexlayer Account**: Sign up at [app.nexlayer.io](https://app.nexlayer.io)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Docker**: Understanding of Docker containers (helpful but not required)
4. **Nexlayer Token**: Get your API token from the Nexlayer dashboard

## Quick Start

### 1. Get Your Nexlayer Token

1. Log in to [app.nexlayer.io](https://app.nexlayer.io)
2. Navigate to Settings → API Tokens
3. Generate a new token
4. Copy the token (you'll need it later)

### 2. Set Up Environment Variables

```bash
export NEXLAYER_SESSION_TOKEN=your_token_here
export NEXLAYER_APP_NAME=pulse-point-plaza
```

### 3. Build and Push Docker Image

The application includes a GitHub Actions workflow that automatically builds and pushes your Docker image when you push to the `main` or `nexlayer-mcp` branch.

Alternatively, you can build locally:

```bash
# Build the Docker image
docker build -t registry.nexlayer.io/pulse-point-plaza/frontend:latest .

# Login to Nexlayer registry
docker login registry.nexlayer.io

# Push the image
docker push registry.nexlayer.io/pulse-point-plaza/frontend:latest
```

### 4. Deploy Using Nexlayer MCP

If you're using the Nexlayer MCP tools, follow the 11-step deployment workflow:

1. Clone repository locally
2. Check for existing Dockerfiles
3. Generate/update Dockerfiles
4. Create and push `nexlayer-mcp` branch
5. Use MCP tool to clone repository for build system
6. Build and push images
7. Poll for build status
8. Get YAML schema
9. Create Nexlayer configuration
10. Validate YAML configuration
11. Deploy to Nexlayer

### 5. Get Deployment URL

After deployment, get your deployment URL:

```bash
# Using Node.js script
node get-deployment-url.js

# Or using shell script
chmod +x get-deployment-url.sh
./get-deployment-url.sh
```

## Project Structure

```
pulse-point-plaza/
├── Dockerfile              # Docker configuration
├── nginx.conf             # Nginx server configuration
├── nexlayer.yaml          # Nexlayer deployment configuration
├── .github/
│   └── workflows/
│       └── deploy-nexlayer.yml  # GitHub Actions workflow
├── get-deployment-url.js  # Node.js script to get deployment URL
├── get-deployment-url.sh  # Shell script to get deployment URL
└── src/
    └── components/
        └── DeploymentStatus.tsx  # React component for deployment status
```

## Configuration Files

### Dockerfile

Multi-stage build that:
1. Builds the React/Vite application
2. Serves it using Nginx

### nexlayer.yaml

Defines your Nexlayer deployment:
- Pod name: `frontend`
- Port: `80` (internal)
- Resources: Memory and CPU limits

### nginx.conf

Nginx configuration for serving the React SPA with:
- Gzip compression
- Security headers
- React Router support
- Static asset caching

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Verify Dockerfile syntax
- Check build logs in GitHub Actions

### Deployment Fails

- Verify `nexlayer.yaml` syntax
- Check that the Docker image exists in the registry
- Ensure your Nexlayer token is valid

### Can't Get Deployment URL

- Verify `NEXLAYER_SESSION_TOKEN` is set
- Check that the application name matches your deployment
- Ensure the deployment completed successfully

## Next Steps

After successful deployment:

1. **Test Your Application**: Visit the deployment URL
2. **Set Up Custom Domain**: Configure a custom domain in Nexlayer dashboard
3. **Monitor Logs**: Use Nexlayer dashboard to monitor application logs
4. **Scale Resources**: Adjust resources in `nexlayer.yaml` if needed

## Support

For issues or questions:
- Check [Nexlayer Documentation](https://docs.nexlayer.io)
- Contact Nexlayer support
- Review deployment logs in the Nexlayer dashboard

