'use server';

import crypto from 'node:crypto';
import { dbRepository } from '@/lib/db/repository';
import { getStaffSession } from './auth';
import { generateSalt, hashPassword } from '@/lib/auth/session';
import { AdminRole, ProfileRecord } from '@/lib/types/database';

/**
 * Server Action: Create a New Staff Member
 */
export async function adminCreateStaff(input: {
  fullName: string;
  email: string;
  password?: string;
  role: AdminRole;
  department?: string;
  phone?: string;
}): Promise<{ success: boolean; staff?: ProfileRecord; message?: string }> {
  const { session, profile: caller } = await getStaffSession();
  if (!session || !caller) {
    return { success: false, message: 'Unauthorized. Please sign in.' };
  }

  if (caller.role !== 'super_admin' && caller.role !== 'admin') {
    return { success: false, message: 'Forbidden. Only Super Administrators can provision staff accounts.' };
  }

  const email = (input.email || '').trim().toLowerCase();
  const fullName = (input.fullName || '').trim();

  if (!email || !fullName) {
    return { success: false, message: 'Full name and email address are required.' };
  }

  // Check uniqueness
  const existing = await dbRepository.getStaffByEmail(email);
  if (existing) {
    return { success: false, message: `A staff account with email ${email} already exists.` };
  }

  // Password handling: Use provided password or generate secure random temporary password
  const rawPassword =
    input.password && input.password.length >= 8
      ? input.password
      : crypto.randomBytes(8).toString('hex') + '!Aa1';
  const salt = generateSalt();
  const passwordHash = hashPassword(rawPassword, salt);

  try {
    const newStaff = await dbRepository.createStaff({
      email,
      full_name: fullName,
      role: input.role,
      department: input.department || 'Consular Operations',
      phone: input.phone || '+234 706 422 9556',
      is_active: true,
      password_hash: passwordHash,
      salt: salt,
      avatar_url: null,
    });

    await dbRepository.recordAuditLog({
      user_id: caller.id,
      action: 'staff.created',
      entity_type: 'staff_profile',
      entity_id: newStaff.id,
      details: {
        created_email: newStaff.email,
        role: newStaff.role,
        department: newStaff.department,
        created_by: caller.email,
      },
    });

    return { success: true, staff: newStaff, message: 'Staff member account created successfully.' };
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return { success: false, message: errMsg };
  }
}

/**
 * Server Action: Update Staff Member Details & Role
 */
export async function adminUpdateStaff(
  id: string,
  updates: {
    fullName?: string;
    role?: AdminRole;
    department?: string;
    phone?: string;
    isActive?: boolean;
  }
): Promise<{ success: boolean; message: string }> {
  const { profile: caller } = await getStaffSession();
  if (!caller || (caller.role !== 'super_admin' && caller.role !== 'admin')) {
    return { success: false, message: 'Unauthorized. Administrator privilege required.' };
  }

  const staff = await dbRepository.getStaffById(id);
  if (!staff) {
    return { success: false, message: 'Staff account not found.' };
  }

  // Prevent demoting the last super admin
  if (updates.role && updates.role !== 'super_admin' && staff.role === 'super_admin') {
    const allStaff = await dbRepository.getStaffProfiles();
    const superAdminCount = allStaff.filter((s) => s.role === 'super_admin' && s.is_active).length;
    if (superAdminCount <= 1) {
      return { success: false, message: 'Cannot demote the only remaining Super Administrator.' };
    }
  }

  const payload: Partial<ProfileRecord> = {};
  if (updates.fullName) payload.full_name = updates.fullName.trim();
  if (updates.role) payload.role = updates.role;
  if (updates.department !== undefined) payload.department = updates.department;
  if (updates.phone !== undefined) payload.phone = updates.phone;
  if (updates.isActive !== undefined) payload.is_active = updates.isActive;

  await dbRepository.updateStaff(id, payload);

  await dbRepository.recordAuditLog({
    user_id: caller.id,
    action: 'staff.updated',
    entity_type: 'staff_profile',
    entity_id: id,
    details: { target: staff.email, updates: payload },
  });

  return { success: true, message: 'Staff profile updated successfully.' };
}

/**
 * Server Action: Delete Staff Account
 */
export async function adminDeleteStaff(id: string): Promise<{ success: boolean; message: string }> {
  const { profile: caller } = await getStaffSession();
  if (!caller || caller.role !== 'super_admin') {
    return { success: false, message: 'Forbidden. Only Super Administrators can delete staff accounts.' };
  }

  if (caller.id === id) {
    return { success: false, message: 'You cannot delete your own active administrator account.' };
  }

  const staff = await dbRepository.getStaffById(id);
  if (!staff) {
    return { success: false, message: 'Staff profile not found.' };
  }

  if (staff.role === 'super_admin') {
    const allStaff = await dbRepository.getStaffProfiles();
    const superAdminCount = allStaff.filter((s) => s.role === 'super_admin').length;
    if (superAdminCount <= 1) {
      return { success: false, message: 'Cannot delete the sole Super Administrator.' };
    }
  }

  const removed = await dbRepository.deleteStaff(id);
  if (!removed) {
    return { success: false, message: 'Failed to delete staff member.' };
  }

  await dbRepository.recordAuditLog({
    user_id: caller.id,
    action: 'staff.deleted',
    entity_type: 'staff_profile',
    entity_id: id,
    details: { deleted_email: staff.email, deleted_name: staff.full_name },
  });

  return { success: true, message: `Staff member ${staff.full_name} (${staff.email}) has been removed.` };
}

/**
 * Server Action: Administrative Password Reset for a Staff Member
 */
export async function adminResetStaffPassword(
  staffId: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  const { profile: caller } = await getStaffSession();
  if (!caller || (caller.role !== 'super_admin' && caller.role !== 'admin')) {
    return { success: false, message: 'Unauthorized. Administrator privilege required.' };
  }

  if (!newPassword || newPassword.length < 8) {
    return { success: false, message: 'Password must be at least 8 characters long.' };
  }

  const staff = await dbRepository.getStaffById(staffId);
  if (!staff) {
    return { success: false, message: 'Staff profile not found.' };
  }

  const freshSalt = generateSalt();
  const freshHash = hashPassword(newPassword, freshSalt);

  await dbRepository.updateStaffPassword(staffId, freshHash, freshSalt);

  await dbRepository.recordAuditLog({
    user_id: caller.id,
    action: 'staff.password_reset_by_admin',
    entity_type: 'staff_profile',
    entity_id: staffId,
    details: { target: staff.email, performed_by: caller.email },
  });

  return { success: true, message: `Password for ${staff.full_name} updated successfully.` };
}

/**
 * Server Action: Toggle Staff Active Status (Suspend/Reactivate)
 */
export async function adminToggleStaffStatus(
  staffId: string
): Promise<{ success: boolean; newStatus: boolean; message: string }> {
  const { profile: caller } = await getStaffSession();
  if (!caller || caller.role !== 'super_admin') {
    return { success: false, newStatus: false, message: 'Unauthorized. Super Admin privilege required.' };
  }

  if (caller.id === staffId) {
    return { success: false, newStatus: true, message: 'You cannot suspend your own account.' };
  }

  const staff = await dbRepository.getStaffById(staffId);
  if (!staff) {
    return { success: false, newStatus: false, message: 'Staff profile not found.' };
  }

  const nextStatus = !staff.is_active;
  await dbRepository.updateStaff(staffId, { is_active: nextStatus });

  await dbRepository.recordAuditLog({
    user_id: caller.id,
    action: nextStatus ? 'staff.reactivated' : 'staff.suspended',
    entity_type: 'staff_profile',
    entity_id: staffId,
    details: { target: staff.email, new_status: nextStatus },
  });

  return {
    success: true,
    newStatus: nextStatus,
    message: nextStatus ? `Account for ${staff.full_name} is now active.` : `Account for ${staff.full_name} has been suspended.`,
  };
}
