import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseKey } from './Keez';

export const supabase = createClient(supabaseUrl, supabaseKey); 