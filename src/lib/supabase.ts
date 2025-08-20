import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://pctsfmsaxrfljpbscoou.supabase.co'
const supabaseAnonkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjdHNmbXNheHJmbGpwYnNjb291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyOTE2ODMsImV4cCI6MjA3MDg2NzY4M30.vz-Tj-S9fYMIenDRLYH5OW7e8yUrU3zNttwCpWXFaIU';
export const supabase = createClient(supabaseUrl, supabaseAnonkey)