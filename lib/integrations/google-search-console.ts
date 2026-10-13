/**
 * Google Search Console Integration Stub
 *
 * This module provides the skeleton for a future Google Search Console (GSC)
 * OAuth integration. It DOES NOT connect to GSC until:
 *
 * 1. A Google Cloud project is created with the Search Console API enabled
 * 2. OAuth 2.0 credentials are configured (client_id, client_secret)
 * 3. A user has completed the OAuth flow and stored a valid refresh_token
 * 4. The environment variables below are set
 *
 * DO NOT claim this integration is active until all steps are verified.
 * DO NOT scrape private account data without proper OAuth authorization.
 */

const REQUIRED_ENV = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_REFRESH_TOKEN',
] as const;

function isGscConfigured(): boolean {
  return REQUIRED_ENV.every((key) => Boolean(process.env[key]));
}

export interface GscSearchQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GscStatus {
  connected: boolean;
  missingEnvVars: string[];
  message: string;
}

/**
 * Returns the configuration status of the GSC integration.
 * Call this from admin UIs to show the user what's missing.
 */
export function getGscStatus(): GscStatus {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);

  if (missing.length === 0) {
    return {
      connected: true,
      missingEnvVars: [],
      message: 'Google Search Console credentials are configured. Activate by completing OAuth flow.',
    };
  }

  return {
    connected: false,
    missingEnvVars: missing,
    message: `Google Search Console is not connected. Missing environment variables: ${missing.join(', ')}`,
  };
}

/**
 * Placeholder: Fetch top search queries from GSC.
 * Returns empty array and logs a warning if not configured.
 *
 * Replace the body with actual GSC API calls once OAuth is complete.
 * Reference: https://developers.google.com/webmaster-tools/search-console-api
 */
export async function fetchTopSearchQueries(
  _siteUrl: string,
  _days: number = 28
): Promise<GscSearchQuery[]> {
  if (!isGscConfigured()) {
    console.warn('[GSC] Integration not configured. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN.');
    return [];
  }

  // TODO: Implement OAuth token refresh and GSC Search Analytics API call
  // POST https://searchconsole.googleapis.com/webmasters/v3/sites/{siteUrl}/searchAnalytics/query
  console.warn('[GSC] Stub: fetchTopSearchQueries not yet implemented. Complete OAuth flow first.');
  return [];
}
