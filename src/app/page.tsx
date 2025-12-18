import { redirect } from 'next/navigation'

export default function RootPage() {
  // アクセスされたら即座にログイン画面へリダイレクト
  redirect('/login')
}