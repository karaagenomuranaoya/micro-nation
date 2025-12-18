"use client";

import { useState } from "react";
import { createTransaction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// 省庁（カテゴリ）の定義
const MINISTRIES = [
  { id: "食糧庁", label: "食糧庁（食費）" },
  { id: "文化省", label: "文化省（娯楽・趣味）" },
  { id: "厚生省", label: "厚生省（健康・日用品）" },
  { id: "国土交通省", label: "国土交通省（交通・居住）" },
  { id: "外務省", label: "外務省（交際費）" },
  { id: "宮内庁", label: "宮内庁（自分へのご褒美）" },
  { id: "財務省", label: "財務省（その他）" },
];

export function TransactionForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await createTransaction(formData);
    setLoading(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("予算が執行されました！官僚が査定を始めました。");
      // フォームをリセット（簡易的）
      (document.getElementById("transaction-form") as HTMLFormElement).reset();
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>予算執行（支出入力）</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="transaction-form" action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">案件名（項目名）</Label>
            <Input id="title" name="title" placeholder="例: 伝説の高級牛丼" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">予算額（金額）</Label>
              <Input id="amount" name="amount" type="number" placeholder="¥" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">管轄省庁</Label>
              <select
                id="category"
                name="category"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              >
                {MINISTRIES.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button type="submit" className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={loading}>
            {loading ? "承認手続き中..." : "予算を執行する"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}