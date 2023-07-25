import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@mui/joy";

const adminFormSchema = z.object({
  email: z.string().nonempty("O email é obrigatório.").email("Email inválido"),
  password: z.string(),
});

export default function index() {
  return (
    <main className="flex h-screen items-center justify-center gap-4 bg-zinc-100">
      <Link href="/admin/dashboard/reservations">Reservas</Link>
      <Link href="/admin/dashboard/options">Opções</Link>
    </main>
  );
}
