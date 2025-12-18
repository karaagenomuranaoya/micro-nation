import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "./settings-form";
import { TransactionForm } from "./transaction-form";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  // 1. ユーザー情報の取得
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // 2. プロフィール（国家設定）の取得
  const { data: profile } = await supabase
    .from("profiles")
    .select("country_name, ruler_title")
    .eq("id", user.id)
    .single();

  // 3. 支出履歴（最新5件）の取得
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <header className="flex flex-col gap-2 border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {profile?.country_name || "未設定国"}・中央官衙
        </h1>
        <p className="text-muted-foreground">
          ようこそ、{profile?.ruler_title || "元首"}。今日の国庫状況です。
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {/* 左側：入力エリア */}
        <div className="space-y-8">
          <TransactionForm />
          <SettingsForm 
            initialCountryName={profile?.country_name || ""} 
            initialRulerTitle={profile?.ruler_title || ""} 
          />
        </div>

        {/* 右側：履歴エリア */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">直近の予算執行記録</h2>
          <div className="space-y-2">
            {transactions?.length === 0 ? (
              <p className="text-muted-foreground italic text-sm">記録された公文書はありません。</p>
            ) : (
              transactions?.map((t) => (
                <div key={t.id} className="p-4 border rounded-lg bg-card shadow-sm flex justify-between items-start">
                  <div>
                    <p className="font-bold">{t.title}</p>
                    <p className="text-xs text-muted-foreground">{t.category} | {new Date(t.created_at).toLocaleDateString()}</p>
                    <p className="text-sm mt-2 text-blue-600 dark:text-blue-400 font-medium">「{t.ai_comment}」</p>
                  </div>
                  <p className="font-mono font-bold">¥{t.amount?.toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}