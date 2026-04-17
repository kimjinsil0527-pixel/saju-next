import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 서버 전용 (API 라우트에서만 사용)
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export type Payment = {
  id: string
  order_id: string
  payment_key: string
  amount: number
  plan: string
  status: string
  customer_name: string
  customer_email: string
  created_at: string
}

export type PageView = {
  id: string
  path: string
  referrer: string | null
  created_at: string
}
