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
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const bucket = (formData.get('bucket') as string) || 'public-assets';
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided.' },
        { status: 400 }
      );
    }

    if (bucket !== 'public-assets' && bucket !== 'applicant-documents') {
      return NextResponse.json(
        { success: false, message: 'Invalid storage bucket requested.' },
        { status: 400 }
      );
    }

    // Sanitize filename
    const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const timestamp = Date.now();
    const storagePath = `${folder}/${timestamp}_${cleanName}`;

    // Read file bytes
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let publicUrl = '';

    if (isSupabaseConfigured) {
      // Upload to Supabase Storage via service role
      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from(bucket)
        .upload(storagePath, buffer, {
          contentType: file.type || 'application/octet-stream',
          upsert: true,
        });

      if (uploadError) {
        console.error('[Storage Upload Error]', uploadError);
        return NextResponse.json(
          { success: false, message: `Storage upload failed: ${uploadError.message}` },
          { status: 500 }
        );
      }

      if (bucket === 'public-assets') {
        const { data: urlData } = supabaseAdmin.storage
          .from(bucket)
          .getPublicUrl(storagePath);
        publicUrl = urlData.publicUrl;
      }
    } else {
      // Fallback url for non-Supabase environments
      publicUrl = `/uploads/${cleanName}`;
    }

    // Record in audit log
    await dbRepository.recordAuditLog({
      user_id: actorId,
      action: 'media.upload',
      entity_type: 'media_asset',
      entity_id: storagePath,
      details: {
        bucket,
        storagePath,
        fileName: file.name,
        sizeBytes: file.size,
        mimeType: file.type,
      },
    });

    return NextResponse.json({
      success: true,
      asset: {
        name: file.name,
        path: storagePath,
        size: `${Math.round(file.size / 1024)} KB`,
        type: file.type,
        date: new Date().toISOString().split('T')[0],
        bucket,
        publicUrl: publicUrl || null,
      },
    });
  } catch (error) {
    console.error('[API /api/media/upload] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Unexpected error processing file upload.' },
      { status: 500 }
    );
  }
}
