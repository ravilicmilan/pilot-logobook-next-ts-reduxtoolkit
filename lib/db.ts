// 'use server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

const supabase: SupabaseClient<Database> = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default supabase;

// import { createServerClient } from '@supabase/ssr';
// import { cookies } from 'next/headers';
// import { Database } from '@/types/database'; // Your generated types

// export async function createServerClientFromCookies() {
//   const cookieStore = await cookies();
//   return createServerClient<Database>(
//     process.env.SUPABASE_URL!,
//     process.env.SUPABASE_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll();
//         },
//         setAll(cookiesToSet) {
//           try {
//             cookiesToSet.forEach(({ name, value, options }) => {
//               cookieStore.set(name, value, options);
//             });
//           } catch (e) {
//             // The `setAll` method was called from a Server Component.
//             // This can be ignored if you have middleware set up your auth flow.
//           }
//         },
//       },
//     }
//   );
// }
