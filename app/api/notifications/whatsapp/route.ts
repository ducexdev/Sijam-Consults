import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/require-admin';
import { dbRepository } from '@/lib/db/repository';

export async function POST(request: NextRequest) {
  // 1. Verify Administrative Staff Authorization
  const auth = await requireAdminSession(request);
  if (auth.error) return auth.error;
  const actorId = auth.staffId;

  try {
    const { phone, clientName, referenceCode, templateKey, message } = await request.json();

    if (!phone || !message) {
      return NextResponse.json(
        { success: false, message: 'Recipient phone and message body are required.' },
        { status: 400 }
      );
    }

    // 2. Check for WhatsApp Cloud API environment variables (if configured)
    const waToken = process.env.WHATSAPP_CLOUD_API_TOKEN;
    const waPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    let externalMessageId: string | null = null;
    let dispatchMode = 'fallback_simulated';

    if (waToken && waPhoneId) {
      try {
        const response = await fetch(`https://graph.facebook.com/v19.0/${waPhoneId}/messages`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${waToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: phone,
            type: 'text',
            text: { preview_url: false, body: message },
          }),
        });
        const waData = await response.json();
        if (response.ok && waData.messages?.[0]?.id) {
          externalMessageId = waData.messages[0].id;
          dispatchMode = 'cloud_api_delivered';
        }
      } catch (cloudErr) {
        console.error('[WhatsApp Cloud API Error]:', cloudErr);
      }
    }

    if (!externalMessageId) {
      externalMessageId = `WA-SIM-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    }

    // 3. Audit Log Dispatch Event
    await dbRepository.recordAuditLog({
      user_id: actorId,
      action: 'notification.whatsapp_dispatched',
      entity_type: 'whatsapp_notification',
      entity_id: referenceCode || phone,
      details: {
        recipient_phone: phone,
        recipient_name: clientName,
        template: templateKey,
        dispatch_mode: dispatchMode,
        external_id: externalMessageId,
      },
    });

    return NextResponse.json({
      success: true,
      messageId: externalMessageId,
      dispatchMode,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API /api/notifications/whatsapp] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to dispatch WhatsApp notification.' },
      { status: 500 }
    );
  }
}
