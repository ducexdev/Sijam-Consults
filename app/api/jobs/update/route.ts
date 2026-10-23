import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '@/lib/db/repository';
import { JobRecord } from '@/lib/types/database';
import { requireAdminSession } from '@/lib/auth/require-admin';

export async function POST(request: NextRequest) {
  // ── Authentication Guard ────────────────────────────────────────────────
  const auth = await requireAdminSession(request);
  if (auth.error) return auth.error;
  const actorId = auth.staffId;

  try {
    const body = await request.json();
    const {
      id,
      updates,
    } = body as {
      id: string;
      updates: Partial<JobRecord>;
    };

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Job ID is required.' },
        { status: 400 }
      );
    }

    const updated = await dbRepository.updateJob(id, updates);
    if (updated) {
      await dbRepository.recordAuditLog({
        user_id: actorId,
        action: 'jobs.update',
        entity_type: 'job',
        entity_id: id,
        details: updates,
      });
    }

    return NextResponse.json({ success: true, job: updated });
  } catch (error) {
    console.error('[API /api/jobs/update] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update job listing.' },
      { status: 500 }
    );
  }
}
