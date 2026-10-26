'use server';

import { revalidatePath } from 'next/cache';
import { dbRepository } from '@/lib/db/repository';
import { getStaffSession } from '@/app/actions/auth';
import { ServiceItem, CorporatePartner } from '@/lib/types';

export async function adminUpdateService(
  slug: string,
  updates: Partial<ServiceItem>
): Promise<{ success: boolean; message: string; service?: ServiceItem }> {
  const { session, profile } = await getStaffSession();
  if (!session || !profile) {
    return { success: false, message: 'Unauthorized staff session required.' };
  }

  try {
    const updated = await dbRepository.updateService(slug, updates);
    if (!updated) {
      return { success: false, message: 'Service not found.' };
    }

    await dbRepository.recordAuditLog({
      user_id: profile.id,
      action: 'service.updated',
      entity_type: 'service',
      entity_id: slug,
      details: { slug, updates },
    });

    revalidatePath('/services');
    revalidatePath(`/services/${slug}`);
    revalidatePath('/admin');
    return { success: true, message: 'Service catalog item updated successfully.', service: updated };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update service';
    return { success: false, message };
  }
}

export async function adminCreatePartner(
  partner: Omit<CorporatePartner, 'id'>
): Promise<{ success: boolean; message: string; partner?: CorporatePartner }> {
  const { session, profile } = await getStaffSession();
  if (!session || !profile) {
    return { success: false, message: 'Unauthorized staff session required.' };
  }

  if (!partner.name || !partner.country || !partner.description) {
    return { success: false, message: 'Partner name, country, and description are required.' };
  }

  try {
    const created = await dbRepository.createPartner(partner);

    await dbRepository.recordAuditLog({
      user_id: profile.id,
      action: 'partner.created',
      entity_type: 'partner',
      entity_id: created.name,
      details: { name: partner.name, country: partner.country },
    });

    revalidatePath('/partners');
    revalidatePath('/admin');
    return { success: true, message: 'Corporate partner registered successfully.', partner: created };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to register partner';
    return { success: false, message };
  }
}

export async function adminUpdatePartner(
  nameOrId: string,
  updates: Partial<CorporatePartner>
): Promise<{ success: boolean; message: string; partner?: CorporatePartner }> {
  const { session, profile } = await getStaffSession();
  if (!session || !profile) {
    return { success: false, message: 'Unauthorized staff session required.' };
  }

  try {
    const updated = await dbRepository.updatePartner(nameOrId, updates);
    if (!updated) {
      return { success: false, message: 'Partner record not found.' };
    }

    await dbRepository.recordAuditLog({
      user_id: profile.id,
      action: 'partner.updated',
      entity_type: 'partner',
      entity_id: nameOrId,
      details: { nameOrId, updates },
    });

    revalidatePath('/partners');
    revalidatePath('/admin');
    return { success: true, message: 'Partner record updated.', partner: updated };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update partner';
    return { success: false, message };
  }
}

export async function adminDeletePartner(
  nameOrId: string
): Promise<{ success: boolean; message: string }> {
  const { session, profile } = await getStaffSession();
  if (!session || !profile) {
    return { success: false, message: 'Unauthorized staff session required.' };
  }

  try {
    await dbRepository.deletePartner(nameOrId);

    await dbRepository.recordAuditLog({
      user_id: profile.id,
      action: 'partner.deleted',
      entity_type: 'partner',
      entity_id: nameOrId,
      details: { nameOrId },
    });

    revalidatePath('/partners');
    revalidatePath('/admin');
    return { success: true, message: 'Partner record archived.' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete partner';
    return { success: false, message };
  }
}
