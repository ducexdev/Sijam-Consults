import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '@/lib/db/repository';
import { JobApplicationStatus } from '@/lib/types/database';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      newStatus,
      note,
      adminId = '00000000-0000-0000-0000-000000000001',
    } = body as {
      id: string;
      newStatus: JobApplicationStatus;
      note?: string;
      adminId?: string;
    };

    if (!id || !newStatus) {
      return NextResponse.json(
        { success: false, message: 'Application ID and new status are required.' },
        { status: 400 }
      );
    }

    const updated = await dbRepository.updateApplicationStatus(id, newStatus, note, adminId);
    if (updated) {
      await dbRepository.recordAuditLog({
        user_id: adminId,
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
