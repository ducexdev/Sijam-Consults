import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { dbRepository } from '@/lib/db/repository';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-paystack-signature');
    const secret = process.env.PAYSTACK_SECRET_KEY;

    // 1. Verify Paystack Webhook Signature (if production secret configured)
    if (secret && signature) {
      const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
      if (hash !== signature) {
        console.error('[Paystack Webhook] Invalid signature verification.');
        return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const data = payload.data;

    if (event === 'charge.success') {
      const reference = data.reference;
      const amountKobo = data.amount;
      const amountNgn = amountKobo / 100;
      const customerEmail = data.customer?.email;
      const customerPhone = data.customer?.phone || data.metadata?.phone;
      const customerName = data.metadata?.custom_fields?.find(
        (f: any) => f.variable_name === 'customer_name'
      )?.value || customerEmail;

      // Log successful transaction to Audit Trail
      await dbRepository.recordAuditLog({
        action: 'payment.paystack_charge_success',
        entity_type: 'payment_transaction',
        entity_id: reference,
        details: {
          reference,
          amount_ngn: amountNgn,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          channel: data.channel,
          currency: data.currency,
          paid_at: data.paid_at,
        },
      });

      console.log(`[Paystack Webhook] Successfully processed ₦${amountNgn} for ${customerEmail} (Ref: ${reference})`);
    }

    return NextResponse.json({ success: true, message: 'Webhook processed' }, { status: 200 });
  } catch (error) {
    console.error('[API /api/webhooks/paystack] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Webhook processing error' },
      { status: 500 }
    );
  }
}
