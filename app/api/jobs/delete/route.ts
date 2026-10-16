import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '@/lib/db/repository';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      adminId = '00000000-0000-0000-0000-000000000001',
    } = body as { id: string; adminId?: string };

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Job ID is required.' },
        { status: 400 }
      );
    }

    const deleted = await dbRepository.deleteJob(id);
    if (deleted) {
      await dbRepository.recordAuditLog({
        user_id: adminId,
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
