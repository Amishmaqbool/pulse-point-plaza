# GitHub Container Registry (GHCR) Fix Guide

If you encounter issues with GitHub Container Registry (ghcr.io) instead of the Nexlayer registry, follow this guide.

## Issue

Sometimes deployments may reference `ghcr.io` instead of `registry.nexlayer.io`. This document explains how to fix this.

## Solution

### Option 1: Use Nexlayer Registry (Recommended)

Update your configuration to use the Nexlayer registry:

**In `nexlayer.yaml`:**
```yaml
pods:
  - name: frontend
    image: registry.nexlayer.io/pulse-point-plaza/frontend:latest
    # ... rest of config
```

**In `.github/workflows/deploy-nexlayer.yml`:**
```yaml
env:
  REGISTRY: registry.nexlayer.io
  IMAGE_NAME: pulse-point-plaza/frontend
```

### Option 2: Use GHCR (Alternative)

If you prefer to use GitHub Container Registry:

1. **Update GitHub Actions Workflow**

```yaml
env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}/frontend
```

2. **Update nexlayer.yaml**

```yaml
pods:
  - name: frontend
    image: ghcr.io/Amishmaqbool/pulse-point-plaza/frontend:latest
    # ... rest of config
```

3. **Configure GitHub Secrets**

Add to GitHub repository secrets:
- `GITHUB_TOKEN` (automatically available)
- Or create `GHCR_TOKEN` with a Personal Access Token with `write:packages` permission

4. **Update Login Step**

```yaml
- name: Log in to GitHub Container Registry
  uses: docker/login-action@v3
  with:
    registry: ghcr.io
    username: ${{ github.actor }}
    password: ${{ secrets.GITHUB_TOKEN }}
```

## Registry Comparison

### Nexlayer Registry
- ✅ **Pros**: Integrated with Nexlayer platform, simpler setup
- ❌ **Cons**: Requires Nexlayer account and token

### GitHub Container Registry
- ✅ **Pros**: Integrated with GitHub, uses GitHub tokens
- ❌ **Cons**: Requires public packages or organization setup for private

## Migration Steps

If you need to migrate from one registry to another:

1. **Build and push to new registry**
   ```bash
   docker build -t NEW_REGISTRY/pulse-point-plaza/frontend:latest .
   docker push NEW_REGISTRY/pulse-point-plaza/frontend:latest
   ```

2. **Update nexlayer.yaml**
   - Change image URL to new registry

3. **Update GitHub Actions** (if using)
   - Update REGISTRY and login steps

4. **Redeploy**
   - Deploy with updated configuration

## Verification

After fixing, verify:

1. **Image exists in registry**
   ```bash
   docker pull registry.nexlayer.io/pulse-point-plaza/frontend:latest
   # or
   docker pull ghcr.io/Amishmaqbool/pulse-point-plaza/frontend:latest
   ```

2. **nexlayer.yaml references correct registry**
   ```bash
   grep -i "image:" nexlayer.yaml
   ```

3. **GitHub Actions uses correct registry**
   ```bash
   grep -i "registry" .github/workflows/deploy-nexlayer.yml
   ```

## Troubleshooting

### Authentication Errors

**Nexlayer Registry:**
- Verify `NEXLAYER_TOKEN` is set correctly
- Check token has push permissions

**GHCR:**
- Verify `GITHUB_TOKEN` is available
- For private repos, ensure token has `write:packages` permission

### Image Not Found

- Verify image was pushed successfully
- Check image name matches exactly (case-sensitive)
- Ensure image tag is correct (`latest` or specific version)

### Build Fails

- Check Dockerfile syntax
- Verify build context is correct
- Review build logs for specific errors

## Best Practices

1. **Use consistent registry**: Stick with one registry (Nexlayer recommended)
2. **Tag images**: Use version tags, not just `latest`
3. **Test locally**: Build and test images before pushing
4. **Monitor builds**: Check GitHub Actions logs for issues

## Current Configuration

This project is configured to use:
- **Registry**: `registry.nexlayer.io`
- **Image**: `pulse-point-plaza/frontend:latest`
- **Authentication**: Nexlayer token via GitHub Secrets

If you need to change this, follow the steps above.

---

**Note**: The default configuration uses Nexlayer registry. Only change if you have a specific need for GHCR.

