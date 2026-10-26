import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/require-admin';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { dbRepository } from '@/lib/db/repository';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const auth = await requireAdminSession(request);
  if (auth.error) return auth.error;
  const actorId = auth.staffId;

  try {
    const body = await request.json();
    const { path, bucket = 'public-assets' } = body;

    if (!path) {
      return NextResponse.json(
        { success: false, message: 'Asset path is required.' },
        { status: 400 }
      );
    }

    // 1. Delete from Supabase Storage if configured
    if (isSupabaseConfigured) {
      try {
        await supabaseAdmin.storage.from(bucket).remove([path]);
      } catch (err) {
        console.warn('[Storage Delete Warning]', err);
      }
    }

    // 2. Audit log entry
    await dbRepository.recordAuditLog({
      user_id: actorId,
      action: 'media.delete',
      entity_type: 'media_asset',
      entity_id: path,
      details: {
        path,
        bucket,
        deletedAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      message: `Asset ${path} was successfully deleted.`,
      path,
    });
  } catch (error) {
    console.error('[API /api/media/delete] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error while deleting asset.' },
      { status: 500 }
    );
  }
}
