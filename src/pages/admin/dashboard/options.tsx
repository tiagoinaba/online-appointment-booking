import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { Switch } from "@mui/joy";
import { Button, Input, TextField } from "@mui/material";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { z } from "zod";
import { Label } from "~/components/ui/label";

export const ZodForm = z.object({
  requirePayment: z.boolean(),
  paymentValue: z.number(),
  description: z.string(),
});

type FormType = z.infer<typeof ZodForm>;

export default function options({
  admin,
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
      requirePayment: admin?.AdminConfig?.requirePayment
        ? admin.AdminConfig.requirePayment
        : true,
      paymentValue: admin?.AdminConfig?.paymentValue,
      description: admin?.AdminConfig?.description,
    },
  });

  // useEffect(() => {
  //   watch();
  // }, []);

  const onSubmit: SubmitHandler<FormType> = (data) => {
    data.paymentValue = parseFloat(data.paymentValue.toFixed(2));
    const config = { ...data };
    updatePreferences({ config, adminId: admin?.id! });
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
                <Label htmlFor="requirePayment">
                  Requerer pagamento na reserva?
                </Label>
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
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="paymentValue">Preço</Label>

                <span>R$</span>
                <Input
                  type="number"
                  inputProps={{ step: ".01" }}
                  disabled={!watch("requirePayment")}
                  {...register("paymentValue", {
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div className="flex flex-col justify-center gap-4">
                <Label htmlFor="paymentValue">Descrição</Label>
                <TextField multiline {...register("description")} />
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
      const admin = await prisma.admin.findUnique({
        where: {
          name: adminName,
        },
        select: {
          id: true,
          name: true,
          AdminConfig: true,
        },
      });

      return {
        props: {
          admin: admin,
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
