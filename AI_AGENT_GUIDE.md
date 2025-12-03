# AI Agent Guide for Nexlayer Deployment

This guide helps AI agents understand how to deploy applications to Nexlayer using the MCP (Model Context Protocol) tools.

## Overview

The Nexlayer MCP provides tools for deploying containerized applications to the Nexlayer platform. This project is a React/Vite frontend application that requires specific deployment steps.

## Project Context

- **Type**: Frontend application (React + Vite)
- **Build Tool**: Vite
- **Package Manager**: npm
- **Port**: 8080 (development), 80 (production via nginx)
- **Framework**: React 18 with TypeScript

## Deployment Files

### Core Files
- `Dockerfile`: Multi-stage build (Node.js builder + Nginx production)
- `nginx.conf`: Nginx configuration for React SPA
- `nexlayer.yaml`: Nexlayer deployment configuration

### Helper Files
- `get-deployment-url.js`: Node.js script to fetch deployment URL
- `get-deployment-url.sh`: Shell script alternative
- `.github/workflows/deploy-nexlayer.yml`: GitHub Actions CI/CD

### Documentation
- `DEPLOYMENT_SETUP.md`: User-facing setup guide
- `NEXT_STEPS.md`: Post-setup instructions
- `nexlayer-deployment.md`: Technical deployment details

## Deployment Workflow for AI Agents

### Step 1: Verify Project Type
- ✅ This is a React/Vite frontend application
- ✅ Single service deployment (no backend)
- ✅ Static files served via Nginx

### Step 2: Check Git Repository
```bash
git status
git remote -v
```
- ✅ Repository exists: `https://github.com/Amishmaqbool/pulse-point-plaza.git`
- ✅ Has remote URL
- ✅ Use git deployment workflow

### Step 3: Dockerfile Analysis
The Dockerfile:
- Uses Node.js 20 Alpine for building
- Builds with `npm run build`
- Serves with Nginx Alpine
- Exposes port 80
- Includes nginx.conf for SPA routing

### Step 4: Nexlayer Configuration
The `nexlayer.yaml`:
- Pod name: `frontend`
- Image: `registry.nexlayer.io/pulse-point-plaza/frontend:latest`
- Port: 80
- Resources: 256Mi-512Mi memory, 100m-500m CPU

### Step 5: MCP Tool Usage Order

**CRITICAL**: Follow this exact order:

1. **Local Setup** (Steps 1-4)
   - ✅ Already in git repository
   - ✅ Dockerfile exists
   - Create `nexlayer-mcp` branch
   - Commit and push files

2. **MCP Tools** (Steps 5-11)
   - `nexlayer_clone_repo_for_build_system`: Clone repo to MCP build system
   - `nexlayer_build_images`: Build Docker image
   - `nexlayer_build_status`: Poll for build completion
   - `nexlayer_get_schema`: Get YAML schema
   - `nexlayer_validate_yaml`: Validate configuration
   - `nexlayer_deploy`: Deploy to Nexlayer

### Step 6: Important Notes for AI Agents

#### Image Building
- Service name: `frontend`
- Dockerfile path: `./Dockerfile`
- Port: 80
- Platform: `linux/amd64`

#### YAML Configuration
- Application name: `pulse-point-plaza`
- Environment: `production`
- Single pod: `frontend`
- No environment variables needed (static frontend)

#### Deployment
- Wait for build to complete before deploying
- Validate YAML before deployment
- Save session token and deployment URL

## Common AI Agent Mistakes to Avoid

1. ❌ **Skipping local git setup**: Must commit files before using MCP tools
2. ❌ **Wrong branch**: Use `nexlayer-mcp` branch, not `main`
3. ❌ **Missing Dockerfile**: Already exists, don't regenerate unnecessarily
4. ❌ **Wrong port**: Use 80 (nginx), not 8080 (dev server)
5. ❌ **Multiple pods**: This is a single frontend, no need for backend pod
6. ❌ **Environment variables**: Not needed for static frontend

## Quick Reference

### Repository Info
- **URL**: `https://github.com/Amishmaqbool/pulse-point-plaza.git`
- **Branch**: `nexlayer-mcp` (create if doesn't exist)
- **Application Name**: `pulse-point-plaza`

### Image Info
- **Registry**: `registry.nexlayer.io`
- **Image**: `pulse-point-plaza/frontend:latest`
- **Build Context**: Root directory
- **Dockerfile**: `./Dockerfile`

### Deployment Info
- **Pod Name**: `frontend`
- **Port**: 80
- **Resources**: 256Mi-512Mi memory, 100m-500m CPU

## Testing Deployment

After deployment:
1. Get deployment URL using `get-deployment-url.js`
2. Verify root path loads
3. Test React Router navigation
4. Check static assets load

## Troubleshooting for AI Agents

### Build Fails
- Check Dockerfile syntax
- Verify npm dependencies
- Check build logs

### Deployment Fails
- Validate nexlayer.yaml syntax
- Ensure image exists in registry
- Check token permissions

### Application Not Loading
- Verify nginx.conf is correct
- Check React Router configuration
- Review browser console errors

## Next Actions for AI Agents

When user asks to deploy:

1. ✅ Verify all files are committed
2. ✅ Create/checkout `nexlayer-mcp` branch
3. ✅ Push to remote
4. ✅ Use `nexlayer_clone_repo_for_build_system`
5. ✅ Use `nexlayer_build_images` with correct parameters
6. ✅ Poll with `nexlayer_build_status`
7. ✅ Get schema with `nexlayer_get_schema`
8. ✅ Validate with `nexlayer_validate_yaml`
9. ✅ Deploy with `nexlayer_deploy`
10. ✅ Get and display deployment URL

## Environment Variables

**None required** for this deployment. If adding API integration later:
- Use `<% URL %>` for frontend URL
- Use `<% URL %>/api` for backend API (if added)

---

**For AI Agents**: This is a straightforward single-service frontend deployment. Follow the git workflow, use the existing Dockerfile, and deploy with the MCP tools in order.

