import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userId, problemId, code } = await request.json();

    // Save submission
    const { data, error } = await supabase
      .from('submissions')
      .insert({
        user_id: userId,
        problem_id: problemId,
        code,
        passed: false, // We'll add AI checking later
        feedback: 'Code submitted successfully!',
      })
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, submission: data[0] }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}