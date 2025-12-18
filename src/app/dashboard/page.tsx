import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const supabase = await createClient()

  // セッションを確認
  const { data: { user } } = await supabase.auth.getUser()

  // ログインしていなければログイン画面へ
  if (!user) {
    redirect('/login')
  }

  // プロフィール（国名など）を取得
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold">
            {profile?.country_name || '未設定国'} 予算管理本部
          </h1>
          <p className="text-muted-foreground">
            ようこそ、{profile?.ruler_title || '元首'} 閣下
          </p>
        </div>
        
        {/* ログアウトは今後のステップで実装しますが、ボタンだけ置いておきます */}
        <Button variant="outline">設定</Button>
      </header>

      <div className="grid gap-6">
        <div className="p-12 border-2 border-dashed rounded-lg text-center bg-zinc-50/50">
          <p className="text-lg text-muted-foreground font-medium">
            国家予算、執行準備完了。
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Phase 2 で支出入力機能を実装します。
          </p>
        </div>
      </div>
    </div>
  )
}