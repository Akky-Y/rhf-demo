import { z } from "zod";

export const monsterSchema = z.object({
  name: z
    .string()
    .min(1, "必須入力です")
    .max(10, "名前は10文字以内で入力してください"),
  attack: z.coerce
    .number()
    .min(1, "必須入力です")
    .max(100, "攻撃力は100以下で入力してください"),
  defense: z.coerce
    .number()
    .min(1, "必須入力です")
    .max(100, "防御力は100以下で入力してください"),
  hp: z.coerce
    .number()
    .min(1, "必須入力です")
    .max(100, "体力は100以下で入力してください"),
  skills: z.array(
    z.object({
      name: z.string(),
      power: z.coerce.number().min(1, "必須入力です"),
    }),
  ),
});

export type Monster = z.infer<typeof monsterSchema>;
