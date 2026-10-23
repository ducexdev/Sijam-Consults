import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '@/lib/db/repository';
import { JobApplicationStatus } from '@/lib/types/database';
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
      newStatus,
      note,
    } = body as {
      id: string;
      newStatus: JobApplicationStatus;
      note?: string;
    };

    if (!id || !newStatus) {
      return NextResponse.json(
        { success: false, message: 'Application ID and new status are required.' },
        { status: 400 }
      );
    }

    const updated = await dbRepository.updateApplicationStatus(id, newStatus, note, actorId);
    if (updated) {
      await dbRepository.recordAuditLog({
        user_id: actorId,
        action: 'applications.status_change',
        entity_type: 'job_application',
        entity_id: id,
        details: { to_status: newStatus, internal_note: note },
      });
    }

    return NextResponse.json({ success: true, application: updated });
  } catch (error) {
    console.error('[API /api/jobs/application-status] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update application status.' },
      { status: 500 }
    );
  }
}
