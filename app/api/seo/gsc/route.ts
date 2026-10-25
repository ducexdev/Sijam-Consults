import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/require-admin';
import { fetchLiveGscTelemetry, getGscAuthStatus } from '@/lib/integrations/google-search-console';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const authResult = await requireAdminSession(req);
  if (authResult.error) {
    return authResult.error;
  }

  const { searchParams } = new URL(req.url);
  const range = (searchParams.get('range') || '28d') as '7d' | '28d' | '90d';

  try {
    const telemetry = await fetchLiveGscTelemetry(range);

    return NextResponse.json({
      success: true,
      data: telemetry,
    });
  } catch (error) {
    console.error('[API /api/seo/gsc Error]:', error);
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
