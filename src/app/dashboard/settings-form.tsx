"use client";

import { useState } from "react";
import { updateProfile } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner"; // Phase 1で導入済みの通知ライブラリ

interface SettingsFormProps {
  initialCountryName: string;
  initialRulerTitle: string;
}

export function SettingsForm({ initialCountryName, initialRulerTitle }: SettingsFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await updateProfile(formData);
    setLoading(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("国家基本法が更新されました");
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>国家体制の設定</CardTitle>
        <CardDescription>
          あなたの国家の名前と、指導者としての称号を定めます。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="countryName">国名</Label>
            <Input
              id="countryName"
              name="countryName"
              defaultValue={initialCountryName}
              placeholder="例: 俺の帝国"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rulerTitle">元首の称号</Label>
            <Input
              id="rulerTitle"
              name="rulerTitle"
              defaultValue={initialRulerTitle}
              placeholder="例: 皇帝, 大統領, 将軍"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "布告中..." : "国号を改める"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}