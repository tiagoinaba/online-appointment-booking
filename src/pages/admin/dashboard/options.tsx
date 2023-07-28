import { prisma } from "@/server/db";
import { AdminPreferences } from "@/types";
import { api } from "@/utils/api";
import { Switch } from "@mui/joy";
import { Button, Input } from "@mui/material";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { Label } from "~/components/ui/label";

type FormType = {
  requirePayment: boolean;
  paymentValue: number;
};

export default function options({
  adminPreferences,
  notFound,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { mutate: updatePreferences } = api.auth.updatePreferences.useMutation({
    onSuccess: () => {
      toast.success("Configurações atualizadas com sucesso!");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      requirePayment: adminPreferences?.AdminConfig?.requirePayment
        ? adminPreferences.AdminConfig.requirePayment
        : true,
      paymentValue: adminPreferences?.AdminConfig?.paymentValue,
    },
  });

  // useEffect(() => {
  //   watch();
  // }, []);

  const onSubmit: SubmitHandler<FormType> = (data) => {
    data.paymentValue = parseFloat(data.paymentValue.toFixed(2));
    updatePreferences({ ...data, adminId: adminPreferences?.id! });
  };

  return (
    <>
      <Head>
        <title>Admin - Opções</title>
      </Head>
      <main className="flex h-screen flex-col items-center justify-center">
        <Button
          href={`/admin/dashboard`}
          sx={{ position: "absolute", top: "1rem", left: "1rem" }}
        >
          Voltar
        </Button>
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
                <Controller
                  name="requirePayment"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="my-switch"
                      onChange={field.onChange}
                      checked={field.value}
                    />
                  )}
                />
                <Label htmlFor="requirePayment">
                  Requerer pagamento na reserva?
                </Label>
              </div>
              <div className="flex items-center gap-4">
                <span>R$</span>
                <Input
                  type="number"
                  inputProps={{ step: ".01" }}
                  disabled={!watch("requirePayment")}
                  {...register("paymentValue", {
                    valueAsNumber: true,
                  })}
                />
                <Label htmlFor="paymentValue">Preço</Label>
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
        select: {
          ...AdminPreferences,
          id: true,
          name: true,
          AdminConfig: true,
        },
      });

      console.log(adminConfig);

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
