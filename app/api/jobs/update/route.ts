import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '@/lib/db/repository';
import { JobRecord } from '@/lib/types/database';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      updates,
      adminId = '00000000-0000-0000-0000-000000000001',
    } = body as {
      id: string;
      updates: Partial<JobRecord>;
      adminId?: string;
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
        user_id: adminId,
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
