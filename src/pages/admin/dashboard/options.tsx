import { prisma } from "@/server/db";
import { AdminPreferences } from "@/types";
import { api } from "@/utils/api";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";

type FormType = {
  requirePayment: boolean;
};

export default function options({
  adminPreferences,
  notFound,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { mutate: updatePreferences } =
    api.auth.updatePreferences.useMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: { requirePayment: adminPreferences?.requirePayment },
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    toast(JSON.stringify(data));
    updatePreferences(data);
  };

  return (
    <>
      <Head>
        <title>Admin - Opções</title>
      </Head>
      <main className="flex h-screen flex-col items-center justify-center">
        {notFound ? (
          <span>Página não encontrada. Volte novamente mais tarde.</span>
        ) : (
          <div className="flex flex-col gap-6">
            <span className="text-2xl font-bold">Configurações</span>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <input type="checkbox" {...register("requirePayment")} />
                <label htmlFor="requirePayment">
                  Requerer pagamento na reserva?
                </label>
              </div>
              <button type="submit">Salvar</button>
            </form>
          </div>
        )}

        <Toaster />
      </main>
    </>
  );
}

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  try {
    const adminName = req.cookies["admin-name"];

    if (adminName) {
      const adminConfig = await prisma.admin.findUnique({
        where: {
          name: adminName,
        },
        select: AdminPreferences,
      });

      return {
        props: {
          adminPreferences: adminConfig,
        },
      };
    }

    throw new Error("Not found");
  } catch (err) {
    return {
      props: {
        notFound: true,
      },
    };
  }
};
