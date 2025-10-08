export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.4';
  };
  public: {
    Tables: {
      logbook: {
        Row: {
          aircraft_model: string | null;
          aircraft_registration: string | null;
          co_pilot_time: string | null;
          date: string | null;
          departure_airport: string | null;
          departure_time: string | null;
          destination_airport: string | null;
          destination_time: string | null;
          dual_time: string | null;
          id: number;
          instructor_time: string | null;
          landings_day: number | null;
          landings_night: number | null;
          multi_engine_time: string | null;
          multi_pilot_time: string | null;
          operational_ifr_time: string | null;
          operational_night_time: string | null;
          page_num: number | null;
          pic_name: string | null;
          pic_time: string | null;
          remarks: string | null;
          route: string | null;
          simulator_date: string | null;
          simulator_time: string | null;
          simulator_type: string | null;
          single_engine_time: string | null;
          total_flight_time: string | null;
          type_of_flight: string | null;
        };
        Insert: {
          aircraft_model?: string | null;
          aircraft_registration?: string | null;
          co_pilot_time?: string | null;
          date?: string | null;
          departure_airport?: string | null;
          departure_time?: string | null;
          destination_airport?: string | null;
          destination_time?: string | null;
          dual_time?: string | null;
          id?: number;
          instructor_time?: string | null;
          landings_day?: number | null;
          landings_night?: number | null;
          multi_engine_time?: string | null;
          multi_pilot_time?: string | null;
          operational_ifr_time?: string | null;
          operational_night_time?: string | null;
          page_num?: number | null;
          pic_name?: string | null;
          pic_time?: string | null;
          remarks?: string | null;
          route?: string | null;
          simulator_date?: string | null;
          simulator_time?: string | null;
          simulator_type?: string | null;
          single_engine_time?: string | null;
          total_flight_time?: string | null;
          type_of_flight?: string | null;
        };
        Update: {
          aircraft_model?: string | null;
          aircraft_registration?: string | null;
          co_pilot_time?: string | null;
          date?: string | null;
          departure_airport?: string | null;
          departure_time?: string | null;
          destination_airport?: string | null;
          destination_time?: string | null;
          dual_time?: string | null;
          id?: number;
          instructor_time?: string | null;
          landings_day?: number | null;
          landings_night?: number | null;
          multi_engine_time?: string | null;
          multi_pilot_time?: string | null;
          operational_ifr_time?: string | null;
          operational_night_time?: string | null;
          page_num?: number | null;
          pic_name?: string | null;
          pic_time?: string | null;
          remarks?: string | null;
          route?: string | null;
          simulator_date?: string | null;
          simulator_time?: string | null;
          simulator_type?: string | null;
          single_engine_time?: string | null;
          total_flight_time?: string | null;
          type_of_flight?: string | null;
        };
        Relationships: [];
      };
      type_of_flight_enum: {
        Row: {
          id: string;
        };
        Insert: {
          id: string;
        };
        Update: {
          id?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string;
          email: string | null;
          id: number;
          name: string | null;
          password: string | null;
          token: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: number;
          name?: string | null;
          password?: string | null;
          token?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: number;
          name?: string | null;
          password?: string | null;
          token?: string | null;
        };
        Relationships: [];
      };
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type UserType = Tables<'users'>;
export type LogbookType = Tables<'logbook'>;

export type LogbookInsertType =
  Database['public']['Tables']['logbook']['Insert'];
export type LogbookRow = Database['public']['Tables']['logbook']['Row'];
export type LogbookUpdateType =
  Database['public']['Tables']['logbook']['Update'];
export type LogbookKey = keyof Tables<'logbook'>;
export type TableColumnConfig = {
  [K in keyof Tables<'logbook'>]: { [P in K]: string };
}[keyof Tables<'logbook'>];

export type TotalsType = {
  single_engine_time?: string;
  multi_engine_time?: string;
  multi_pilot_time?: string;
  total_flight_time?: string;
  landings_day?: number;
  landings_night?: number;
  operational_night_time?: string;
  operational_ifr_time?: string;
  pic_time?: string;
  co_pilot_time?: string;
  dual_time?: string;
  instructor_time?: string;
  simulator_time?: string;
};

export type LogbookTotals = {
  dataForSubtotal: TotalsType;
  dataForTotal: TotalsType;
};

export type NumericKeys = 'id' | 'landings_day' | 'landings_night' | 'page_num';
export const LogbookKeys: (keyof LogbookType)[] = [
  'aircraft_model',
  'aircraft_registration',
  'co_pilot_time',
  'date',
  'departure_airport',
  'departure_time',
  'destination_airport',
  'destination_time',
  'dual_time',
  'id',
  'instructor_time',
  'landings_day',
  'landings_night',
  'multi_engine_time',
  'multi_pilot_time',
  'operational_ifr_time',
  'operational_night_time',
  'page_num',
  'pic_name',
  'pic_time',
  'remarks',
  'route',
  'simulator_date',
  'simulator_time',
  'simulator_type',
  'single_engine_time',
  'total_flight_time',
  'type_of_flight',
];
