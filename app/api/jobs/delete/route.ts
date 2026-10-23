import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '@/lib/db/repository';
import { requireAdminSession } from '@/lib/auth/require-admin';

export async function POST(request: NextRequest) {
  // ── Authentication Guard ────────────────────────────────────────────────
  const auth = await requireAdminSession(request);
  if (auth.error) return auth.error;
  const actorId = auth.staffId;

  try {
    const body = await request.json();
    const { id } = body as { id: string };

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Job ID is required.' },
        { status: 400 }
      );
    }

    const deleted = await dbRepository.deleteJob(id);
    if (deleted) {
      await dbRepository.recordAuditLog({
        user_id: actorId,
        action: 'jobs.delete',
        entity_type: 'job',
        entity_id: id,
        details: { deleted_job_id: id },
      });
    }

    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error('[API /api/jobs/delete] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete job listing.' },
      { status: 500 }
    );
  }
}
