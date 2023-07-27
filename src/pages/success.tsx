import { AdminInfo } from "@/utils/types";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function success() {
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);

  useEffect(() => {
    const adminInfo = localStorage.getItem("adminInfo");

    if (adminInfo) {
      setAdminInfo(JSON.parse(adminInfo));
    }
  });

  return (
    <main className="relative flex h-screen items-center justify-center text-center">
      <Button
        href={`/${adminInfo?.route}`}
        sx={{ position: "absolute", top: "1rem", left: "1rem" }}
      >
        Voltar para o início
      </Button>
      <div>
        <h1 className="text-3xl">Sucesso!</h1>
      </div>
    </main>
  );
}
