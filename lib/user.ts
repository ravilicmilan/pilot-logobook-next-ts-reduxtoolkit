'use server';
import supabase from './db';
import { createSession, deleteSession } from './session'; // Import your custom session utility
import bcrypt from 'bcrypt';
import { Tables } from '@/types/database';
import { LoginResponse } from '@/types/login';

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  // 1. Find user in database
  const user = await findUser(email);

  if (!user) {
    return { success: false, message: 'User not found!' };
  }

  if (!user.password || !user.email) {
    return { success: false, message: 'Invalid credentials.' };
  }

  // 2. Compare passwords
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!user || !passwordMatch) {
    // Return an error object for the client component
    return { success: false, message: 'Invalid credentials.' };
  }

  // 3. Create a session and set a cookie
  await createSession(user.email);

  // 4. Redirect the user
  // redirect('/');
  return { success: true };
}

export const findUser = async (
  email: string
): Promise<Tables<'users'> | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export async function logout() {
  await deleteSession();
  // redirect('/login');
}
