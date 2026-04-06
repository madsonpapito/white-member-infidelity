import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('--- PERFECTPAY WEBHOOK RECEIVED ---');
    console.log(JSON.stringify(body, null, 2));

    const { 
        token, 
        email, 
        customer_name, 
        sale_status_enum, // 1 = Aprovado
        sale_code 
    } = body;

    // 1. Validate Token
    if (token !== process.env.PERFECTPAY_WEBHOOK_TOKEN) {
      console.error('Invalid PerfectPay token');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Process only Approved sales
    // Note: sale_status_enum 1 is usually "Approved"
    if (sale_status_enum === 1 || sale_status_enum === '1') {
      console.log(`Processing approved sale for ${email}`);

      // We attempt to create the user directly. 
      // If the user already exists, we catch the error and proceed successfully.
      const password = `${sale_code}!`;
      
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: customer_name,
          sale_code: sale_code,
          source: 'perfectpay'
        }
      });

      if (createError) {
        // If the error is that the user already exists, we ignore it and return success
        if (createError.message.toLowerCase().includes('already registered') || 
            createError.message.toLowerCase().includes('already exists')) {
          console.log(`User ${email} already exists. Skipping creation.`);
        } else {
          console.error('Error creating user:', createError.message);
          return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
        }
      } else {
        console.log(`User created successfully for ${email}`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook Error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
