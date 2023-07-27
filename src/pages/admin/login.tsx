import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { api } from "@/utils/api";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";

export const adminFormSchema = z.object({
  email: z
    .string()
    .nonempty("O email é obrigatório.")
    .email("Email inválido")
    .toLowerCase(),
  password: z.string().nonempty("A senha é obrigatória."),
});

export type AdminFormData = z.infer<typeof adminFormSchema>;

export default function index() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminFormData>({
    resolver: zodResolver(adminFormSchema),
  });

  const router = useRouter();

  const { mutate: login } = api.auth.login.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      router.push("/admin/dashboard");
    },
  });

  function onSubmit(data: AdminFormData) {
    login({ ...data });
  }

  return (
    <>
      <Head>
        <title>Admin Login</title>
      </Head>
      <main className="flex h-screen flex-col items-center justify-center gap-2 bg-zinc-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-xs flex-col items-center gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="rounded-md px-3 py-1"
              {...register("email")}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="rounded-md px-3 py-1"
              {...register("password")}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <button
            type="submit"
            className="rounded-lg bg-teal-800 px-4 py-1 font-bold text-zinc-50"
          >
            Login
          </button>
        </form>
        <a
          href="/admin/signin"
          className="rounded-lg bg-teal-800 px-4 py-1 font-bold text-zinc-50"
        >
          Criar conta
        </a>
        <Toaster position="bottom-center" />
      </main>
    </>
  );
}
