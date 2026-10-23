import { NextRequest, NextResponse } from 'next/server';
import { submitPublicConsultation } from '@/app/actions/consultations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const clientIp =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for') ||
      '127.0.0.1';

    const result = await submitPublicConsultation(body, clientIp);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[API /api/consultation] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error processing consultation request.' },
      { status: 500 }
    );
  }
}
