#!/usr/bin/env node

/**
 * Get deployment URL from Nexlayer
 * This script fetches the deployment URL for your Nexlayer application
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const NEXLAYER_API_BASE = process.env.NEXLAYER_API_URL || 'https://api.nexlayer.io';
const APPLICATION_NAME = process.env.NEXLAYER_APP_NAME || 'pulse-point-plaza';
const SESSION_TOKEN = process.env.NEXLAYER_SESSION_TOKEN || '';

if (!SESSION_TOKEN) {
  console.error('❌ Error: NEXLAYER_SESSION_TOKEN environment variable is required');
  console.error('   Please set it with: export NEXLAYER_SESSION_TOKEN=your_token');
  process.exit(1);
}

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${parsed.message || body}`));
          }
        } catch (e) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(body);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${body}`));
          }
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function getDeploymentURL() {
  try {
    console.log('🔍 Fetching deployment information...');
    
    const options = {
      hostname: new URL(NEXLAYER_API_BASE).hostname,
      port: 443,
      path: `/api/v1/applications/${APPLICATION_NAME}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SESSION_TOKEN}`,
        'Content-Type': 'application/json',
      },
    };
    
    const response = await makeRequest(options);
    
    if (response.url || response.deploymentUrl) {
      const url = response.url || response.deploymentUrl;
      console.log('\n✅ Deployment URL found:');
      console.log(`   ${url}\n`);
      
      // Save to file
      const urlFile = path.join(process.cwd(), '.nexlayer-url');
      fs.writeFileSync(urlFile, url);
      console.log(`📝 URL saved to: ${urlFile}`);
      
      return url;
    } else {
      console.log('⚠️  Deployment URL not found in response');
      console.log('Response:', JSON.stringify(response, null, 2));
      return null;
    }
  } catch (error) {
    console.error('❌ Error fetching deployment URL:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  getDeploymentURL();
}

module.exports = { getDeploymentURL };

