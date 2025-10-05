require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabase() {
  try {
    const { data, error } = await supabase.from('User').select('*').limit(1);
    if (error) {
      console.error('Error fetching users:', error);
    } else {
      console.log('Successfully connected to Supabase and fetched data:', data);
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
}

testSupabase();
