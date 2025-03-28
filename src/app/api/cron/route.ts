import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0; // No caching

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

export async function POST() {
  try {
    // Your existing cron logic
    // ...
    
    return NextResponse.json(
      { success: true, message: "Cron job executed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cron job failed:", error);
    return NextResponse.json(
      { success: false, message: "Cron job failed", error: String(error) },
      { status: 500 }
    );
  }
} 