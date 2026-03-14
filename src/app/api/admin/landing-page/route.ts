import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const content = await prisma.landingPageContent.upsert({
      where: { id: 'singleton' },
      update: {
        heroTitle: body.heroTitle,
        heroSub: body.heroSub,
        stats_users: body.stats_users,
        stats_rate: body.stats_rate,
      },
      create: {
        id: 'singleton',
        heroTitle: body.heroTitle,
        heroSub: body.heroSub,
        stats_users: body.stats_users,
        stats_rate: body.stats_rate,
      },
    });
    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    console.error('API Error (Admin Landing Page Update):', error);
    return NextResponse.json({ success: false, error: 'Failed to update content' }, { status: 500 });
  }
}
