import AdminBackButton from "@/components/AdminBackButton";
import NotFound from "@/components/NotFound";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { Switch } from "@mui/joy";
import { Button, Input, TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { useMask } from "@react-input/mask";
import { router } from "@trpc/server";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { z } from "zod";
import { Label } from "~/components/ui/label";

export const ZodForm = z.object({
  requirePayment: z.boolean(),
  paymentValue: z.number(),
  description: z.string(),
  openingHours: z.date(),
  closingHours: z.date(),
  interval: z.date(),
  multipleServices: z.boolean(),
});

type FormType = z.infer<typeof ZodForm>;

export default function options({
  admin,
  notFound,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const { mutate: updatePreferences, isLoading } =
    api.auth.updatePreferences.useMutation({
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
    watch,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      requirePayment: admin?.AdminConfig?.requirePayment ?? true,
      paymentValue: admin?.AdminConfig?.paymentValue,
      description: admin?.AdminConfig?.description,
      openingHours: admin?.AdminConfig?.openingHours,
      closingHours: admin?.AdminConfig?.closingHours,
      interval: admin?.AdminConfig?.interval,
      multipleServices: admin?.AdminConfig?.multipleServices,
    },
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    data.paymentValue = parseFloat(data.paymentValue.toFixed(2));
    const config = { ...data };
    updatePreferences({
      config: {
        ...config,
        openingHours: new Date(config.openingHours),
        closingHours: new Date(config.closingHours),
        interval: new Date(config.interval),
      },
      adminId: admin?.id!,
    });
  };

  return (
    <>
      <Head>
        <title>Admin - Opções</title>
      </Head>
      <main className="flex h-screen flex-col items-center justify-center">
        <AdminBackButton />
        {notFound ? (
          <NotFound />
        ) : (
          <div className="flex flex-col gap-6">
            <span className="text-2xl font-bold">Configurações</span>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
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
              <div className="flex items-center justify-between gap-8">
                <Label htmlFor="multipleServices">
                  Gostaria de oferecer múltiplos serviços?
                </Label>
                <Controller
                  name="multipleServices"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="multipleServices"
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
              <div className="flex flex-col justify-center gap-4">
                <Label htmlFor="horarios">Horários</Label>
                <Controller
                  name="openingHours"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      label="Horário de abertura"
                      value={new Date(field.value)}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Controller
                  name="closingHours"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      label="Horário de fechamento"
                      value={new Date(field.value)}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Controller
                  name="interval"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      label="Intervalo"
                      value={new Date(field.value)}
                      onChange={field.onChange}
                    />
                  )}
                />
                <span className="-mt-2 text-center text-xs text-slate-700 opacity-80">
                  "Intervalo" se refere à duração de cada evento.
                </span>
              </div>
              <Button
                type="submit"
                className="self-center"
                disabled={isLoading}
              >
                {!isLoading ? "Salvar" : "Salvando..."}
              </Button>
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
      let admin = await prisma.admin.findUnique({
        where: {
          name: adminName,
        },
        select: {
          id: true,
          name: true,
          AdminConfig: true,
        },
      });

      if (admin) {
        admin = JSON.parse(JSON.stringify(admin));

        return {
          props: {
            admin: admin,
          },
        };
      }
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
