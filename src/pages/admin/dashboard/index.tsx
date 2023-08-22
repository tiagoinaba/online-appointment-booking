import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@mui/joy";
import { Button } from "@mui/material";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCookie } from "cookies-next";
import NotFound from "@/components/NotFound";

const adminFormSchema = z.object({
  email: z.string().nonempty("O email é obrigatório.").email("Email inválido"),
  password: z.string(),
});

export default function index({
  notFound,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { mutate: logout } = api.auth.logout.useMutation({
    onSuccess: () => {
      router.push("/admin");
    },
  });
  return notFound ? (
    <NotFound />
  ) : (
    <main className="flex h-screen items-center justify-center gap-16 bg-zinc-100">
      <Button
        sx={{ position: "absolute", top: "1rem", left: "1rem" }}
        onClick={() => {
          logout();
        }}
      >
        Sair
      </Button>
      <Link href="/admin/dashboard/reservations">Reservas</Link>
      <Link href="/admin/dashboard/services">Serviços</Link>
      <Link href="/admin/dashboard/closedDays">Datas</Link>
      <Link href="/admin/dashboard/options">Opções</Link>
    </main>
  );
}

export const getServerSideProps = ({ req, res }: GetServerSidePropsContext) => {
  const adminCookie = getCookie("admin-name", { req, res });

  if (!adminCookie) {
    return { props: { notFound: true } };
  }

  return { props: { notFound: false } };
};
