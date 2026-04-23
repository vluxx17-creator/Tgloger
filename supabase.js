import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lyobddpccijkpqkbrdwq.supabase.co/Mess' // https://supabase.co
const supabaseKey = 'sb_publishable_Xhyr775MXFE_PM1tRkQMxA_dQbKOpUd'

export const supabase = createClient(supabaseUrl, supabaseKey)
