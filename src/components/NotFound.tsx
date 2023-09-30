import { api } from "@/utils/api";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export default function NotFound() {
  const router = useRouter();
  const { mutate: logout } = api.auth.logout.useMutation({
    onSuccess: async () => {
      await router.push("/admin");
    },
  });
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <span>Página não encontrada. Volte novamente mais tarde.</span>
      <Button
        onClick={() => {
          logout();
        }}
      >
        Sair
      </Button>
    </div>
  );
}
