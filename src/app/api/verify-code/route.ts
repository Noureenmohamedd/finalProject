import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resetCode } = body;

    if (!resetCode) {
      return NextResponse.json(
        { error: 'Reset code is required' },
        { status: 400 }
      );
    }

   
    const response = await axios.post(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      { resetCode }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Verify code error:', error);
    
    if (error.response) {
      return NextResponse.json(
        { error: error.response.data.message || 'Invalid verification code' },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
