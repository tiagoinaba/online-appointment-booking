import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { api } from "@/utils/api";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";

const createAdminFormSchema = z.object({
  name: z.string().nonempty("Nome obrigatório."),
  email: z
    .string()
    .nonempty("O email é obrigatório.")
    .email("Email inválido")
    .toLowerCase(),
  password: z.string().nonempty("A senha é obrigatória."),
});

type CreateAdminFormData = z.infer<typeof createAdminFormSchema>;

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAdminFormData>({
    resolver: zodResolver(createAdminFormSchema),
  });

  const router = useRouter();

  const { mutate: createAdmin } = api.auth.createAdmin.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: async () => {
      await router.push("/admin/dashboard");
    },
  });

  function onSubmit(data: CreateAdminFormData) {
    createAdmin({ ...data });
  }
  return (
    <>
      <Head>
        <title>Create Admin</title>
      </Head>
      <main className="flex h-screen flex-col items-center justify-center gap-2 bg-zinc-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-xs flex-col items-center gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Nome</label>
            <input
              type="name"
              className="rounded-md px-3 py-1"
              {...register("name")}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
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
            Sign in
          </button>
        </form>
        <button
          className="rounded-lg bg-teal-800 px-4 py-1 font-bold text-zinc-50"
          onClick={async () => {
            await router.push("/admin/login");
          }}
        >
          Ir para login
        </button>
        <Toaster position="bottom-center" />
      </main>
    </>
  );
}
