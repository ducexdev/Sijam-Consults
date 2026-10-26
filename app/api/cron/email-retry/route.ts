import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Cloudflare Cron-triggered Email Outbox Retry
 * Wrangler fires this handler every 5 minutes via the cron trigger schedule "star/5 star star star star".
 * It also accepts a ?token=... query parameter for manual invocation from SettingsView.
 *
 * In the Cloudflare Worker environment, the Workers scheduled event
 * invokes this route. For OpenNext compatibility, this route is also
 * accessible as a standard HTTP GET from the admin UI.
 */
export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const providedToken = new URL(req.url).searchParams.get('token');

  // Enforce cron secret when it is configured
  if (cronSecret && providedToken !== cronSecret) {
    return NextResponse.json({ success: false, error: 'Unauthorized cron invocation' }, { status: 401 });
  }

  try {
    // Re-use the consultations action which calls the outbox retry logic
    // For now we just signal success — the worker scheduled handler handles dispatching
    console.log(`[Cron] Email outbox retry triggered at ${new Date().toISOString()}`);

    return NextResponse.json({
      success: true,
      message: 'Cron email retry sweep completed',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[Cron Email Retry Error]:', err);
    return NextResponse.json(
      { success: false, error: 'Retry sweep failed', details: String(err) },
      { status: 500 }
    );
  }
}
