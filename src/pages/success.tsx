import Button from "@/components/Button";
import { AdminInfo } from "@/utils/types";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function success() {
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);

  const router = useRouter();

  const query = router.query as { name: string; date: string };

  return (
    <main className="relative flex h-screen items-center justify-center text-center">
      <Button
        className="absolute left-4 top-4 font-bold"
        variant="ghost"
        onClick={() => router.push(`/${query.name}`)}
      >
        Voltar para o início
      </Button>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl">Sucesso!</h1>
        <p>Seu horário foi agendado com sucesso.</p>
        <p className="font-bold">
          {format(new Date(query.date), "dd/MM - HH:mm")}
        </p>
      </div>
    </main>
  );
}
