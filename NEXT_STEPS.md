# 🚀 Next Steps for Nexlayer Deployment

Now that your deployment files are set up, follow these steps to deploy your application.

## Step 1: Get Your Nexlayer Token

1. Visit [app.nexlayer.io](https://app.nexlayer.io)
2. Sign up or log in
3. Navigate to **Settings** → **API Tokens**
4. Generate a new token
5. Copy the token (you'll need it for the next steps)

## Step 2: Configure GitHub Secrets (Optional)

If you're using GitHub Actions for automated builds:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets:
   - `NEXLAYER_USERNAME`: Your Nexlayer username
   - `NEXLAYER_TOKEN`: Your Nexlayer API token

## Step 3: Create nexlayer-mcp Branch

```bash
# Create and switch to the new branch
git checkout -b nexlayer-mcp

# Add all deployment files
git add .

# Commit the changes
git commit -m "Add Nexlayer deployment configuration"

# Push to remote
git push origin nexlayer-mcp
```

## Step 4: Deploy Using Nexlayer MCP

If you're using Nexlayer MCP tools, follow the deployment workflow:

1. **Clone Repository for Build System**
   - Use `nexlayer_clone_repo_for_build_system` with your repository URL
   - Specify branch: `nexlayer-mcp`

2. **Build Images**
   - Use `nexlayer_build_images` to build your Docker image
   - Wait for build completion (may take a few minutes)

3. **Get YAML Schema**
   - Use `nexlayer_get_schema` to get the latest schema

4. **Validate Configuration**
   - Use `nexlayer_validate_yaml` to validate your `nexlayer.yaml`

5. **Deploy**
   - Use `nexlayer_deploy` to deploy your application
   - Save the session token and deployment URL

## Step 5: Get Your Deployment URL

After deployment, retrieve your deployment URL:

```bash
# Set your session token
export NEXLAYER_SESSION_TOKEN=your_session_token_here

# Get the URL (Node.js)
node get-deployment-url.js

# Or using shell script
chmod +x get-deployment-url.sh
./get-deployment-url.sh
```

The URL will be saved to `.nexlayer-url` file.

## Step 6: Test Your Deployment

1. Visit your deployment URL
2. Verify all pages load correctly
3. Test React Router navigation
4. Check that static assets load properly

## Step 7: Monitor Your Deployment

- **View Logs**: Use the Nexlayer dashboard to view application logs
- **Monitor Resources**: Check CPU and memory usage
- **Set Up Alerts**: Configure alerts for errors or resource limits

## Step 8: Optional Enhancements

### Custom Domain
1. Go to Nexlayer dashboard
2. Navigate to your application
3. Configure a custom domain

### Environment Variables
Add environment variables to `nexlayer.yaml`:
```yaml
env:
  - name: API_URL
    value: "https://api.example.com"
```

### Scaling
Adjust resources in `nexlayer.yaml`:
```yaml
resources:
  requests:
    memory: "512Mi"
    cpu: "200m"
  limits:
    memory: "1Gi"
    cpu: "1000m"
```

## Troubleshooting

### Build Issues
- Check Dockerfile syntax
- Verify all dependencies are in package.json
- Review build logs in GitHub Actions

### Deployment Issues
- Validate `nexlayer.yaml` syntax
- Ensure Docker image exists in registry
- Check Nexlayer dashboard for error messages

### Runtime Issues
- Check application logs in Nexlayer dashboard
- Verify environment variables are set correctly
- Ensure port configuration matches (80 for nginx)

## Support Resources

- **Documentation**: [docs.nexlayer.io](https://docs.nexlayer.io)
- **Dashboard**: [app.nexlayer.io](https://app.nexlayer.io)
- **GitHub Issues**: Check your repository for known issues

## Quick Reference Commands

```bash
# Build locally
docker build -t registry.nexlayer.io/pulse-point-plaza/frontend:latest .

# Push to registry
docker push registry.nexlayer.io/pulse-point-plaza/frontend:latest

# Get deployment URL
export NEXLAYER_SESSION_TOKEN=your_token
node get-deployment-url.js

# Check deployment status
curl -H "Authorization: Bearer $NEXLAYER_SESSION_TOKEN" \
  https://api.nexlayer.io/api/v1/applications/pulse-point-plaza
```

---

**You're all set!** 🎉 Follow these steps to deploy your application to Nexlayer.

