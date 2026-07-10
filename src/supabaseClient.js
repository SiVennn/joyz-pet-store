import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://buvpjozmcuehsrtwhehb.supabase.co'
const supabaseKey = 'sb_publishable_BWNLX_M5Sj... (dan seterusnya)'

export const supabase = createClient(supabaseUrl, supabaseKey)