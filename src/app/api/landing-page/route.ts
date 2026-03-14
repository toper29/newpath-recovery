import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const content = await prisma.landingPageContent.findUnique({
      where: { id: 'singleton' },
    });
    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    console.error('API Error (Landing Page Fetch):', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch content' }, { status: 500 });
  }
}
