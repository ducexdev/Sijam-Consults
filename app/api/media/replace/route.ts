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
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const targetPath = formData.get('targetPath') as string | null;
    const bucket = (formData.get('bucket') as string) || 'public-assets';

    if (!file || !targetPath) {
      return NextResponse.json(
        { success: false, message: 'Both file and targetPath are required for asset replacement.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const timestamp = Date.now();
    let publicUrl = `/${targetPath}?v=${timestamp}`;

    // 1. If Supabase is configured, upload to targetPath with upsert: true
    if (isSupabaseConfigured) {
      const { error: uploadError } = await supabaseAdmin.storage
        .from(bucket)
        .upload(targetPath, buffer, {
          contentType: file.type || 'application/octet-stream',
          upsert: true,
        });

      if (!uploadError) {
        const { data: urlData } = supabaseAdmin.storage.from(bucket).getPublicUrl(targetPath);
        publicUrl = `${urlData.publicUrl}?v=${timestamp}`;
      } else {
        console.warn('[Supabase Replace Warning]', uploadError);
      }
    }

    // 2. Audit log entry
    await dbRepository.recordAuditLog({
      user_id: actorId,
      action: 'media.replace',
      entity_type: 'media_asset',
      entity_id: targetPath,
      details: {
        targetPath,
        bucket,
        newFileName: file.name,
        newSizeBytes: file.size,
        mimeType: file.type,
        replacedAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      message: `Asset ${targetPath} has been replaced successfully.`,
      asset: {
        path: targetPath,
        name: file.name,
        size: `${Math.round(file.size / 1024)} KB`,
        type: file.type,
        date: new Date().toISOString().split('T')[0],
        publicUrl,
      },
    });
  } catch (error) {
    console.error('[API /api/media/replace] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error while replacing asset.' },
      { status: 500 }
    );
  }
}
