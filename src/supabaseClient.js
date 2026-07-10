import { createClient } from '@supabase/supabase-js'

// 1. Copy Project URL Anda dari gambar tersebut dan paste di sini:
const supabaseUrl = 'https://buvpjozmcuehsrtwhehb.supabase.co' 

// 2. Copy tulisan anon key (kunci panjang) dari gambar tersebut dan paste di sini:
const supabaseKey = 'sb_publishable_BWNLX_M5Sjl7Ie4bfHfkjA_JvXvIA6z' 

export const supabase = createClient(supabaseUrl, supabaseKey)