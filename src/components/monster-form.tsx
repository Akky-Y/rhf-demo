"use client";

import { createMonster } from "@/actions/monster";
import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { type Monster, monsterSchema } from "@/schemas/monster";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldErrors, useFieldArray, useForm } from "react-hook-form";

export default function MonsterForm() {
  const { toast } = useToast();
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Monster>({
    resolver: zodResolver(monsterSchema),
    defaultValues: {
      name: "",
      attack: 1,
      defense: 1,
      hp: 1,
      skills: [
        {
          name: "",
          power: 1,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "skills",
    control,
  });

  /**
   * handleSubmitの第一引数
   * registerされてるものに問題なければ実行する
   *
   * @param {Monster} data - The data submitted in the form.
   * @return {Promise<void>} A promise that resolves when the submission is complete.
   */
  const onSubmit = async (data: Monster) => {
    console.log(data);
  };

  /**
   * handleSubmitの第二引数
   * 送信処理に問題(バリデーションなど)があればこちらが実行される
   *
   * @param {FieldErrors} data - The field errors to be logged.
   * @return {void} This function does not return anything.
   */ const handleError = (data: FieldErrors) => {
    console.log(data);
  };

  if (isSubmitSuccessful) {
    return (
      <div>
        <h2>入力内容の確認</h2>
        <p>名前: {getValues("name")}</p>
        <p>攻撃力: {getValues("attack")}</p>
        <p>防御力: {getValues("defense")}</p>
        <p>体力: {getValues("hp")}</p>
        {fields.map((field, index) => (
          <div key={field.id}>
            <p>わざの名前: {getValues(`skills.${index}.name`)}</p>
            <p>わざの威力: {getValues(`skills.${index}.power`)}</p>
          </div>
        ))}
        <Button
          onClick={() => {
            createMonster(getValues()).then(() => {
              toast({
                title: "モンスターを作成しました",
                description: "大事に育ててね",
              });
            });
          }}
        >
          作成
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            reset(undefined, { keepValues: true });
          }}
        >
          戻る
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, handleError)} className="space-y-6">
      <FormItem>
        <Label>名前</Label>
        <Input {...register("name")} type="text" autoComplete="off" />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </FormItem>
      <FormItem>
        <Label>攻撃力</Label>
        <Input {...register("attack")} type="number" />
        {errors.attack && (
          <span className="text-red-500">{errors.attack.message}</span>
        )}
      </FormItem>
      <FormItem>
        <Label>防御力</Label>
        <Input {...register("defense")} type="number" />
        {errors.defense && (
          <span className="text-red-500">{errors.defense.message}</span>
        )}
      </FormItem>
      <FormItem>
        <Label>体力</Label>
        <Input {...register("hp")} type="number" />
        {errors.hp && <span className="text-red-500">{errors.hp.message}</span>}
      </FormItem>
      <h2>わざ</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-6 p-4 border">
          <FormItem>
            <Label>わざの名前</Label>
            <Input {...register(`skills.${index}.name`)} autoComplete="off" />
          </FormItem>
          <FormItem>
            <Label>わざの威力</Label>
            <Input {...register(`skills.${index}.power`)} />
          </FormItem>
          {fields.length > 1 && (
            <Button
              type="button"
              onClick={() => remove(index)}
              variant="outline"
            >
              削除
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        onClick={() =>
          append({
            name: "",
            power: 1,
          })
        }
        variant="outline"
      >
        わざを追加
      </Button>

      <div className="flex gap-3">
        <Button>モンスター作成</Button>
        <Button
          variant="outline"
          onClick={() => {
            reset();
          }}
        >
          リセット
        </Button>
      </div>
    </form>
  );
}
