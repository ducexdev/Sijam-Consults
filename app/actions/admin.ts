'use server';

import { dbRepository } from '@/lib/db/repository';
import { emailService } from '@/lib/email/smtp';
import { AdminRole } from '@/lib/types/database';
import { getStaffSession } from '@/app/actions/auth';

export async function adminUpdateStaffRole(
  staffId: string,
  newRole: AdminRole
) {
  const { session } = await getStaffSession();
  if (!session) {
    throw new Error('Authentication required. Please sign in to the Operations Hub.');
  }
  const actorId = session.staffId;

  const updated = await dbRepository.updateStaffRole(staffId, newRole);
  if (updated) {
    await dbRepository.recordAuditLog({
      user_id: actorId,
      action: 'staff.role_change',
      entity_type: 'profile',
      entity_id: staffId,
      details: { new_role: newRole },
    });
  }
  return updated;
}

export async function adminCreateRedirect(
  sourcePath: string,
  destinationPath: string,
  statusCode: 301 | 302 | 307 | 308 = 308,
  notes?: string
) {
  const { session } = await getStaffSession();
  if (!session) {
    throw new Error('Authentication required. Please sign in to the Operations Hub.');
  }
  const actorId = session.staffId;

  const r = await dbRepository.createRedirect({
    source_path: sourcePath,
    destination_path: destinationPath,
    status_code: statusCode,
    is_active: true,
    notes,
  });

  await dbRepository.recordAuditLog({
    user_id: actorId,
    action: 'redirects.create',
    entity_type: 'redirect',
    entity_id: r.id,
    details: { source_path: sourcePath, destination_path: destinationPath },
  });

  return r;
}

export async function adminTestSmtp(
  targetEmail: string
) {
  const { session } = await getStaffSession();
  if (!session) {
    throw new Error('Authentication required. Please sign in to the Operations Hub.');
  }
  const actorId = session.staffId;

  console.log(`[SMTP Test] Sending test verification ping to ${targetEmail}`);
  try {
    await emailService.sendAdminStaffAlert({
      category: 'System',
      referenceCode: `SMTP-TEST-${Date.now()}`,
      applicantName: 'System Administrator',
      summary: `SMTP connectivity verification test dispatched to ${targetEmail}.`,
    });
  } catch (err) {
    console.error('[SMTP Test Error]:', err);
  }
  await dbRepository.recordAuditLog({
    user_id: actorId,
    action: 'smtp.test_dispatch',
    entity_type: 'system',
    entity_id: 'smtp_tester',
    details: { target_email: targetEmail },
  });
  return { success: true, message: `SMTP test message queued for ${targetEmail}.` };
}

/**
 * Admin Server Action: Get contact messages / general enquiries
 */
export async function adminGetContactMessages(filter?: { status?: string }) {
  const { session } = await getStaffSession();
  if (!session) {
    throw new Error('Authentication required. Please sign in to the Operations Hub.');
  }
  return dbRepository.getContactMessages(filter);
}

/**
 * Admin Server Action: Update contact message status with internal reply notes
 */
export async function adminUpdateContactMessageStatus(
  id: string,
  status: 'new' | 'in_progress' | 'replied' | 'closed',
  replyNotes?: string
) {
  const { session } = await getStaffSession();
  if (!session) {
    throw new Error('Authentication required. Please sign in to the Operations Hub.');
  }
  const actorId = session.staffId;

  const updated = await dbRepository.updateContactMessageStatus(id, status, replyNotes);
  if (updated) {
    await dbRepository.recordAuditLog({
      user_id: actorId,
      action: 'contact.status_update',
      entity_type: 'contact_message',
      entity_id: id,
      details: { status, has_reply_notes: Boolean(replyNotes) },
    });
  }
  return updated;
}

