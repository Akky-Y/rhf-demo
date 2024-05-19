"use server";

import { type Monster, monsterSchema } from "@/schemas/monster";

export const createMonster = async (data: Monster) => {
  const result = monsterSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors,
    };
  }

  // ここでモンスターを作成する処理を書く
};
