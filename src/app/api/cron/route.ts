import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization');
  
  // Check for secret token to prevent unauthorized revalidations
  if (token !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
  
  // Revalidate the home page
  revalidatePath('/');
  
  return NextResponse.json({ 
    revalidated: true,
    message: 'Revalidation triggered successfully',
    timestamp: new Date().toISOString(),
  });
} 