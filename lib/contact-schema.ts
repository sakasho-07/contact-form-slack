
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "お名前を入力してください"),
  email: z
    .string()
    .trim()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスを入力してください"),
  message: z.string().trim().min(1, "お問い合わせ内容を入力してください"),
});
