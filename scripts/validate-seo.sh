#!/bin/bash
# Quick SEO validation script
# Checks sitemap accessibility, meta tags, and structured data

echo "🔍 SEO Validation Checklist"
echo "============================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="${1:-http://localhost:3000}"

echo "Testing base URL: $BASE_URL"
echo ""

# 1. Check sitemap
echo "1️⃣  Checking sitemap..."
SITEMAP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/sitemap.xml")
if [ "$SITEMAP_STATUS" = "200" ]; then
  echo -e "${GREEN}✓${NC} Sitemap accessible at $BASE_URL/sitemap.xml"
  SITEMAP_COUNT=$(curl -s "$BASE_URL/sitemap.xml" | grep -c "<url>")
  echo "   Found $SITEMAP_COUNT URLs in sitemap"
else
  echo -e "${RED}✗${NC} Sitemap not accessible (HTTP $SITEMAP_STATUS)"
fi
echo ""

# 2. Check robots.txt
echo "2️⃣  Checking robots.txt..."
ROBOTS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/robots.txt")
if [ "$ROBOTS_STATUS" = "200" ]; then
  echo -e "${GREEN}✓${NC} robots.txt accessible"
  if curl -s "$BASE_URL/robots.txt" | grep -q "sitemap.xml"; then
    echo -e "${GREEN}✓${NC} Sitemap reference found in robots.txt"
  else
    echo -e "${YELLOW}⚠${NC} Sitemap not referenced in robots.txt"
  fi
else
  echo -e "${RED}✗${NC} robots.txt not accessible"
fi
echo ""

# 3. Check homepage meta tags
echo "3️⃣  Checking homepage meta tags..."
PAGE=$(curl -s "$BASE_URL")

# Title
if echo "$PAGE" | grep -q "<title>"; then
  TITLE=$(echo "$PAGE" | grep -o "<title>[^<]*" | sed 's/<title>//')
  TITLE_LEN=${#TITLE}
  if [ $TITLE_LEN -ge 30 ] && [ $TITLE_LEN -le 60 ]; then
    echo -e "${GREEN}✓${NC} Title length optimal: $TITLE_LEN chars"
  else
    echo -e "${YELLOW}⚠${NC} Title length: $TITLE_LEN chars (optimal: 30-60)"
  fi
  echo "   Title: $TITLE"
else
  echo -e "${RED}✗${NC} No title tag found"
fi

# Description
if echo "$PAGE" | grep -q 'name="description"'; then
  DESC=$(echo "$PAGE" | grep -o 'name="description" content="[^"]*"' | sed 's/name="description" content="//' | sed 's/"$//')
  DESC_LEN=${#DESC}
  if [ $DESC_LEN -ge 120 ] && [ $DESC_LEN -le 160 ]; then
    echo -e "${GREEN}✓${NC} Description length optimal: $DESC_LEN chars"
  else
    echo -e "${YELLOW}⚠${NC} Description length: $DESC_LEN chars (optimal: 120-160)"
  fi
else
  echo -e "${RED}✗${NC} No meta description found"
fi

# Viewport
if echo "$PAGE" | grep -q 'name="viewport"'; then
  echo -e "${GREEN}✓${NC} Viewport meta tag present"
else
  echo -e "${RED}✗${NC} Viewport meta tag missing"
fi

# Canonical
if echo "$PAGE" | grep -q 'rel="canonical"'; then
  echo -e "${GREEN}✓${NC} Canonical URL present"
else
  echo -e "${YELLOW}⚠${NC} Canonical URL missing"
fi
echo ""

# 4. Check Open Graph tags
echo "4️⃣  Checking Open Graph tags..."
OG_COUNT=$(echo "$PAGE" | grep -c 'property="og:')
if [ $OG_COUNT -ge 4 ]; then
  echo -e "${GREEN}✓${NC} Found $OG_COUNT Open Graph tags"
  echo "$PAGE" | grep 'property="og:' | grep -o 'property="og:[^"]*"' | sed 's/property="/   - /' | sed 's/"$//'
else
  echo -e "${YELLOW}⚠${NC} Only $OG_COUNT Open Graph tags (need at least 4)"
fi
echo ""

# 5. Check Twitter Card tags
echo "5️⃣  Checking Twitter Card tags..."
TWITTER_COUNT=$(echo "$PAGE" | grep -c 'name="twitter:')
if [ $TWITTER_COUNT -ge 2 ]; then
  echo -e "${GREEN}✓${NC} Found $TWITTER_COUNT Twitter Card tags"
else
  echo -e "${YELLOW}⚠${NC} Only $TWITTER_COUNT Twitter Card tags"
fi
echo ""

# 6. Check structured data (JSON-LD)
echo "6️⃣  Checking structured data..."
JSONLD_COUNT=$(echo "$PAGE" | grep -c 'application/ld+json')
if [ $JSONLD_COUNT -gt 0 ]; then
  echo -e "${GREEN}✓${NC} Found $JSONLD_COUNT JSON-LD schema(s)"
  echo "$PAGE" | grep -A 3 'application/ld+json' | grep '@type' | sed 's/.*"@type":/   Type:/' | sed 's/[",]//g'
else
  echo -e "${RED}✗${NC} No structured data found"
fi
echo ""

# 7. Check language attributes
echo "7️⃣  Checking language attributes..."
if echo "$PAGE" | grep -q '<html lang='; then
  LANG=$(echo "$PAGE" | grep -o '<html lang="[^"]*"' | sed 's/<html lang="//' | sed 's/"$//')
  echo -e "${GREEN}✓${NC} HTML lang attribute: $LANG"
else
  echo -e "${RED}✗${NC} No lang attribute on <html>"
fi

if echo "$PAGE" | grep -q 'rel="alternate" hreflang='; then
  HREFLANG_COUNT=$(echo "$PAGE" | grep -c 'rel="alternate" hreflang=')
  echo -e "${GREEN}✓${NC} Found $HREFLANG_COUNT hreflang tag(s)"
else
  echo -e "${YELLOW}⚠${NC} No hreflang tags (ok if single language)"
fi
echo ""

echo "============================"
echo "✅ Validation complete!"
echo ""
echo "Next steps:"
echo "  1. Run Lighthouse in Chrome DevTools (F12 → Lighthouse → SEO)"
echo "  2. Test structured data: https://search.google.com/test/rich-results"
echo "  3. Test social cards: https://cards-dev.twitter.com/validator"
echo "  4. Check sitemap: $BASE_URL/sitemap.xml"
