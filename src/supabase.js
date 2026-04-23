import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'ССЫЛКА_ИЗ_SUPABASE' // https://supabase.co
const supabaseKey = 'sb_publishable_Xhyr775MXFE_PM1tRkQMxA_dQbKOpUd'

export const supabase = createClient(supabaseUrl, supabaseKey)
