import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // ログイン後に遷移させたいパス
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    // 認可コードをセッションに交換する（ここでログインが完了する）
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // エラーが発生した場合はログイン画面にリダイレクト
  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}