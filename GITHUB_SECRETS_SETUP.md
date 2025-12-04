# How to Add NEXLAYER_SESSION_TOKEN to GitHub Secrets

## Step-by-Step Instructions

### 1. Get Your Nexlayer API Token

1. Visit [https://app.nexlayer.io](https://app.nexlayer.io)
2. Log in to your account
3. Navigate to **Settings** → **API Tokens**
4. Click **Generate New Token** or **Create Token**
5. Give it a descriptive name (e.g., "GitHub Actions CI/CD")
6. Copy the token immediately (you won't be able to see it again!)

### 2. Add Token to GitHub Repository Secrets

1. Go to your GitHub repository: `https://github.com/Amishmaqbool/pulse-point-plaza`
2. Click on **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Fill in:
   - **Name**: `NEXLAYER_SESSION_TOKEN`
   - **Secret**: Paste your Nexlayer API token
6. Click **Add secret**

### 3. Verify It's Added

You should now see `NEXLAYER_SESSION_TOKEN` in your list of secrets.

### 4. Test the Workflow

After adding the secret:
1. Push a commit to trigger the workflow, or
2. Manually trigger it from the **Actions** tab → **Deploy to Nexlayer** → **Run workflow**

The workflow will now automatically fetch and display your deployment URL!

## Additional Secrets (Optional)

If you also want to push images to the Nexlayer registry via GitHub Actions, you can add:

- **NEXLAYER_USERNAME**: Your Nexlayer username
- **NEXLAYER_TOKEN**: Your Nexlayer API token (same as above, or a different one with push permissions)

## Troubleshooting

### Token Not Working?
- Make sure you copied the entire token (no spaces)
- Check that the token hasn't expired
- Verify you're using the correct token type (API token, not session token)

### Can't Find API Tokens Section?
- Make sure you're logged in
- Check if your account has API access enabled
- Contact Nexlayer support if the option is missing

### Workflow Still Not Showing URL?
- Check the workflow logs for error messages
- Verify the application name matches: `pulse-point-plaza`
- Ensure the token has read permissions for your applications

