import { Button } from "@mui/material";
import React from "react";

export default function AdminBackButton() {
  return (
    <Button
      href={`/admin/dashboard`}
      sx={{ position: "absolute", top: "1rem", left: "1rem" }}
    >
      Voltar
    </Button>
  );
}
