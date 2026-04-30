const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function joinWaitlist({ name, email, company, goal, source = 'landing' }) {
  const normalizedEmail = email.trim().toLowerCase();

  const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify({
      name: name.trim(),
      email: normalizedEmail,
      company: company.trim(),
      goal: goal.trim(),
      source,
      status: 'new',
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error('Supabase insert failed:', res.status, body);
    throw new Error(body || 'Failed to join waitlist');
  }

  const rows = await res.json();
  return rows[0]?.id;
}
