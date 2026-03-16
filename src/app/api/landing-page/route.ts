import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await prisma.landingPageContent.findUnique({
      where: { id: 'singleton' },
    });
    console.log('Fetched Landing Page Content:', content);
    return NextResponse.json({ success: true, data: content }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      }
    });
  } catch (error) {
    console.error('API Error (Landing Page Fetch):', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch content', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
