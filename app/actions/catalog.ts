'use server';

import { revalidatePath } from 'next/cache';
import { dbRepository } from '@/lib/db/repository';
import { getStaffSession } from '@/app/actions/auth';
import { ServiceItem, CorporatePartner } from '@/lib/types';
import { RetainerDealRecord, RetainerStage } from '@/lib/types/database';

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

// ─── Commercial Retainer Pipeline Server Actions ──────────────────────────────

export async function adminCreateRetainerDeal(
  dealData: Omit<RetainerDealRecord, 'id' | 'created_at' | 'updated_at'>
): Promise<{ success: boolean; message: string; deal?: RetainerDealRecord }> {
  const { session, profile } = await getStaffSession();
  if (!session || !profile) {
    return { success: false, message: 'Unauthorized staff session required.' };
  }

  try {
    const created = await dbRepository.createRetainerDeal({
      ...dealData,
      assigned_officer_id: dealData.assigned_officer_id || profile.id,
      assigned_officer_name: dealData.assigned_officer_name || profile.full_name,
    });

    await dbRepository.recordAuditLog({
      user_id: profile.id,
      action: 'retainer_deal.created',
      entity_type: 'retainer_deal',
      entity_id: created.id,
      details: { reference_code: created.reference_code, client_name: created.client_name, deal_value_usd: created.deal_value_usd },
    });

    revalidatePath('/admin');
    return { success: true, message: 'Retainer deal created successfully.', deal: created };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create deal';
    return { success: false, message };
  }
}

export async function adminUpdateRetainerDealStage(
  dealId: string,
  newStage: RetainerStage
): Promise<{ success: boolean; message: string; deal?: RetainerDealRecord }> {
  const { session, profile } = await getStaffSession();
  if (!session || !profile) {
    return { success: false, message: 'Unauthorized staff session required.' };
  }

  try {
    const updates: Partial<RetainerDealRecord> = { stage: newStage };
    if (newStage !== 'initial_assessment') {
      updates.consultation_fee_paid = true;
    }
    if (newStage === 'retainer_signed' && !updates.contract_signed_at) {
      updates.contract_signed_at = new Date().toISOString();
    }
    if (newStage === 'document_filing' && !updates.filing_date) {
      updates.filing_date = new Date().toISOString();
    }
    if (newStage === 'commission_released') {
      updates.decision_outcome = 'approved';
    }

    const updated = await dbRepository.updateRetainerDeal(dealId, updates);
    if (!updated) {
      return { success: false, message: 'Deal not found.' };
    }

    await dbRepository.recordAuditLog({
      user_id: profile.id,
      action: 'retainer_deal.stage_advanced',
      entity_type: 'retainer_deal',
      entity_id: dealId,
      details: { newStage, client_name: updated.client_name },
    });

    revalidatePath('/admin');
    return { success: true, message: `Deal advanced to ${newStage}.`, deal: updated };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update deal stage';
    return { success: false, message };
  }
}

export async function adminDeleteRetainerDeal(
  dealId: string
): Promise<{ success: boolean; message: string }> {
  const { session, profile } = await getStaffSession();
  if (!session || !profile) {
    return { success: false, message: 'Unauthorized staff session required.' };
  }

  try {
    await dbRepository.deleteRetainerDeal(dealId);

    await dbRepository.recordAuditLog({
      user_id: profile.id,
      action: 'retainer_deal.deleted',
      entity_type: 'retainer_deal',
      entity_id: dealId,
      details: { dealId },
    });

    revalidatePath('/admin');
    return { success: true, message: 'Retainer deal removed.' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete deal';
    return { success: false, message };
  }
}
