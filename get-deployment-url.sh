#!/bin/bash

# Get deployment URL from Nexlayer
# This script fetches the deployment URL for your Nexlayer application

set -e

# Configuration
NEXLAYER_API_BASE="${NEXLAYER_API_URL:-https://api.nexlayer.io}"
APPLICATION_NAME="${NEXLAYER_APP_NAME:-pulse-point-plaza}"
SESSION_TOKEN="${NEXLAYER_SESSION_TOKEN:-}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check for session token
if [ -z "$SESSION_TOKEN" ]; then
    echo -e "${RED}❌ Error: NEXLAYER_SESSION_TOKEN environment variable is required${NC}"
    echo "   Please set it with: export NEXLAYER_SESSION_TOKEN=your_token"
    exit 1
fi

echo "🔍 Fetching deployment information..."

# Make API request
RESPONSE=$(curl -s -w "\n%{http_code}" \
    -H "Authorization: Bearer $SESSION_TOKEN" \
    -H "Content-Type: application/json" \
    "${NEXLAYER_API_BASE}/api/v1/applications/${APPLICATION_NAME}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

# Check HTTP status
if [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 300 ]; then
    # Extract URL from response
    URL=$(echo "$BODY" | grep -o '"url":"[^"]*"' | cut -d'"' -f4 || echo "$BODY" | grep -o '"deploymentUrl":"[^"]*"' | cut -d'"' -f4)
    
    if [ -n "$URL" ]; then
        echo -e "\n${GREEN}✅ Deployment URL found:${NC}"
        echo "   $URL"
        echo ""
        
        # Save to file
        echo "$URL" > .nexlayer-url
        echo -e "${GREEN}📝 URL saved to: .nexlayer-url${NC}"
    else
        echo -e "${YELLOW}⚠️  Deployment URL not found in response${NC}"
        echo "Response: $BODY"
    fi
else
    echo -e "${RED}❌ Error: HTTP $HTTP_CODE${NC}"
    echo "Response: $BODY"
    exit 1
fi

