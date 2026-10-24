import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/require-admin';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { dbRepository } from '@/lib/db/repository';

export async function POST(request: NextRequest) {
  // 1. Authenticate Staff
  const auth = await requireAdminSession(request);
  if (auth.error) return auth.error;
  const actorId = auth.staffId;

  try {
    const { path, bucket = 'applicant-documents', expiresIn = 900 } = await request.json();

    if (!path) {
      return NextResponse.json(
        { success: false, message: 'File path is required.' },
        { status: 400 }
      );
    }

    if (bucket !== 'applicant-documents' && bucket !== 'public-assets') {
      return NextResponse.json(
        { success: false, message: 'Invalid bucket.' },
        { status: 400 }
      );
    }

    let signedUrl = '';

    if (isSupabaseConfigured) {
      const { data, error } = await supabaseAdmin.storage
        .from(bucket)
        .createSignedUrl(path, expiresIn);

      if (error || !data) {
        console.error('[Signed URL Error]', error);
        return NextResponse.json(
          { success: false, message: error?.message || 'Could not generate signed URL.' },
          { status: 500 }
        );
      }
      signedUrl = data.signedUrl;
    } else {
      // Local fallback placeholder
      signedUrl = `/api/media/download-mock?path=${encodeURIComponent(path)}`;
    }

    // Audit Log for access to confidential candidate documents
    await dbRepository.recordAuditLog({
      user_id: actorId,
      action: 'media.signed_url_generated',
      entity_type: 'applicant_document',
      entity_id: path,
      details: {
        bucket,
        storagePath: path,
        expiresInSeconds: expiresIn,
      },
    });

    return NextResponse.json({
      success: true,
      signedUrl,
      expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(),
    });
  } catch (error) {
    console.error('[API /api/media/signed-url] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate signed download link.' },
      { status: 500 }
    );
  }
}
