import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/require-admin';
import {
  fetchLiveGscTelemetry,
  getGscAuthStatus,
  getValidGscToken,
} from '@/lib/integrations/google-search-console';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // 1. Edge-compatible JWT Session Verification
  const authResult = await requireAdminSession(req);
  if (authResult.error) {
    return authResult.error;
  }

  const { searchParams } = new URL(req.url);
  const range = (searchParams.get('range') || '28d') as '7d' | '28d' | '90d';

  try {
    // Validate token availability (Edge-compatible JWT token exchange via Web Crypto)
    const token = await getValidGscToken();
    const telemetry = await fetchLiveGscTelemetry(range);

    return NextResponse.json({
      success: true,
      data: {
        ...telemetry,
        tokenAvailable: telemetry.tokenAvailable || Boolean(token),
      },
    });
  } catch (error) {
    console.error('[API /api/admin/seo/gsc Error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve Google Search Console telemetry',
        status: getGscAuthStatus(),
      },
      { status: 500 }
    );
  }
}
