import { NextRequest, NextResponse } from 'next/server';
import { submitGeneralEnquiry } from '@/app/actions/contact';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const clientIp =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for') ||
      '127.0.0.1';

    const result = await submitGeneralEnquiry(body, clientIp);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[API /api/contact] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error processing enquiry.' },
      { status: 500 }
    );
  }
}
