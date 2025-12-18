"use server"; // ここが最重要です

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * 国家設定（国名と元首の肩書）を更新する
 */
export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  const countryName = formData.get("countryName") as string;
  const rulerTitle = formData.get("rulerTitle") as string;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("認証が必要です");

  const { error } = await supabase
    .from("profiles")
    .update({
      country_name: countryName,
      ruler_title: rulerTitle,
    })
    .eq("id", user.id);

  if (error) {
    console.error("Update error:", error);
    return { error: "設定の更新に失敗しました" };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

/**
 * 予算執行（支出）を新規登録する
 */
export async function createTransaction(formData: FormData) {
  const supabase = await createClient();

  const amount = parseInt(formData.get("amount") as string);
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("認証が必要です");

  const { error } = await supabase
    .from("transactions")
    .insert({
      user_id: user.id,
      amount,
      title,
      category,
      ai_comment: "官僚が書類を確認中...", // 次のフェーズでAI生成に置き換えます
    });

  if (error) {
    console.error("Insert error:", error);
    return { error: "予算執行の記録に失敗しました" };
  }

  revalidatePath("/dashboard");
  return { success: true };
}