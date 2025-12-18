'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    // Googleログインを開始します
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // ログインが終わった後に戻ってくるURLを指定します
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight">
            マイクロ・ネイション
          </CardTitle>
          <CardDescription className="text-base">
            俺の国家予算へようこそ、閣下。
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                建国手続き
              </span>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full py-6 text-lg font-semibold border-2 hover:bg-zinc-100 transition-all"
            onClick={handleGoogleLogin}
          >
            Googleでログイン
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            ※ ログインすると自動的に「未設定国」が建国されます
          </p>
        </CardContent>
      </Card>
    </div>
  )
}