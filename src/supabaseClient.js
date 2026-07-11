import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://buvpjozmcuehsrtwhehb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dnBqb3ptY3VlaHNydHdoZWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2NTY5OTgsImV4cCI6MjA5OTIzMjk5OH0.z6krP3FQ69HNxuFIXty69gUgwobj9vFGfUntKz-Rn2U'

export const supabase = createClient(supabaseUrl, supabaseKey)