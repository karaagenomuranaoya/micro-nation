import { type NextRequest } from 'next/server' 
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * 以下のパス*以外*にマッチさせる:
     * - _next/static, _next/image, favicon.ico
     * - auth フォルダ内の処理（← これを追加！）
     * - 画像などの静的ファイル
     */
    '/((?!_next/static|_next/image|favicon.ico|auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}