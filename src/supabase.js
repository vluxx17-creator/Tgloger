import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lyobddpccijkpqkbrdwq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5b2JkZHBjY2lqa3Bxa2JyZHdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NDY3MjUsImV4cCI6MjA5MjUyMjcyNX0.BU_rCvzlBcVy8jp22kc6OHJkxGGWOXGsZwEd-x8_6Rg'

export const supabase = createClient(supabaseUrl, supabaseKey)
