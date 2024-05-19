import MonsterForm from "@/components/monster-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form",
  description: "Form page",
};

export default function Home() {
  return (
    <div className="container mt-8">
      <MonsterForm />
    </div>
  );
}
