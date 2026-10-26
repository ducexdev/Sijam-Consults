import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/require-admin';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { ALL_STATIC_ASSETS } from '@/lib/data/static-assets';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const auth = await requireAdminSession(req);
  if (auth.error) return auth.error;

  const bucket = new URL(req.url).searchParams.get('bucket');
  if (!bucket || !['public-assets', 'applicant-documents'].includes(bucket)) {
    return NextResponse.json({ success: false, error: 'Invalid bucket' }, { status: 400 });
  }

  // 1. Applicant Documents Bucket
  if (bucket === 'applicant-documents') {
    if (!isSupabaseConfigured) {
      return NextResponse.json({ success: true, files: [], source: 'local_fallback' });
    }

    try {
      const { data, error } = await supabaseAdmin.storage.from(bucket).list('', {
        limit: 200,
        sortBy: { column: 'created_at', order: 'desc' },
      });

      if (error) {
        console.error('[Media List Error]:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      const files = (data || [])
        .filter((f) => f.name && !f.name.endsWith('/'))
        .map((f) => ({
          name: f.name,
          path: f.name,
          size: f.metadata?.size ? `${Math.round(f.metadata.size / 1024)} KB` : 'Unknown',
          type: f.metadata?.mimetype || 'application/octet-stream',
          date: f.updated_at ? f.updated_at.split('T')[0] : new Date().toISOString().split('T')[0],
          status: 'Encrypted',
        }));

      return NextResponse.json({ success: true, files, source: 'supabase_storage', bucket });
    } catch (err) {
      console.error('[Media List Error]:', err);
      return NextResponse.json({ success: false, error: 'Storage list failed' }, { status: 500 });
    }
  }

  // 2. Public Assets Bucket - start with all 141+ website assets
  let files = [...ALL_STATIC_ASSETS];

  if (isSupabaseConfigured) {
    try {
      const { data } = await supabaseAdmin.storage.from(bucket).list('', {
        limit: 200,
        sortBy: { column: 'created_at', order: 'desc' },
      });

      if (data && data.length > 0) {
        const existingPaths = new Set(files.map((f) => f.path));
        for (const f of data) {
          if (!f.name || f.name.endsWith('/')) continue;
          if (!existingPaths.has(f.name)) {
            const { data: urlData } = supabaseAdmin.storage.from(bucket).getPublicUrl(f.name);
            files.unshift({
              name: f.name,
              path: f.name,
              size: f.metadata?.size ? `${Math.round(f.metadata.size / 1024)} KB` : 'Unknown',
              type: f.metadata?.mimetype || 'image/png',
              date: f.updated_at ? f.updated_at.split('T')[0] : new Date().toISOString().split('T')[0],
              publicUrl: urlData?.publicUrl || `/${f.name}`,
              category: 'other',
              altText: f.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
              title: f.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
              caption: 'Uploaded asset in Cloudflare / Supabase Storage vault.',
              keywords: ['Upload', 'Vault', f.name],
              dimensions: 'Variable',
            });
            existingPaths.add(f.name);
          }
        }
      }
    } catch (err) {
      console.warn('[Media List Supabase Merge Warning]', err);
    }
  }

  return NextResponse.json({ success: true, files, count: files.length, source: 'unified_vault', bucket });
}
