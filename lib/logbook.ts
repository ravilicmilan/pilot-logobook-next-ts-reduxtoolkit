'use server';

import supabase from './db'; // stupid supabase
import { verifySession } from './session';
import {
  LogbookUpdateType,
  LogbookInsertType,
  LogbookRow,
  Database,
} from '@/types/database';

type LogbookTableInsert = Database['public']['Tables']['logbook']['Insert'];
type LogbookTableUpdate = Database['public']['Tables']['logbook']['Update'];

export const createNewRow = async (
  logdata: LogbookTableInsert
): Promise<LogbookRow[] | boolean> => {
  const session = await verifySession();
  if (!session) {
    return false;
  }

  delete logdata.id;

  const { data, error } = await supabase
    .from('logbook')
    .insert(logdata) // supabase debilana
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const getAllLogs = async (): Promise<LogbookRow[] | boolean> => {
  const session = await verifySession();
  if (!session) {
    return false;
  }

  const { data, error } = await supabase
    .from('logbook')
    .select('*')
    .order('date')
    .order('departure_time');

  if (error) throw new Error(error.message);
  return data;
};

export const updateLog = async (
  id: number,
  updates: LogbookTableUpdate
): Promise<LogbookRow[] | boolean> => {
  const session = await verifySession();
  if (!session) {
    return false;
  }

  const { data, error } = await supabase
    .from('logbook')
    .update(updates) // supabase debilana
    .eq('id', id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

// export const deleteLog = async (id) => {
//   const { error } = await supabase.from('logbook').delete().eq('id', id);

//   if (error) throw new Error(error.message);
//   return { success: true, message: 'Log deleted successfully' };
// };
