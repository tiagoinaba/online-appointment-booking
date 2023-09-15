import AdminBackButton from "@/components/AdminBackButton";
import Button from "@/components/Button";
import NotFound from "@/components/NotFound";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { Input, TextField, Switch } from "@mui/material";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { z } from "zod";
import { Label } from "~/components/ui/label";
import { FullAdmin } from ".";
import { Heading } from "@/components/Heading";

export const ZodForm = z.object({
  requirePayment: z.boolean(),
  paymentValue: z.number(),
  description: z.string(),
  multipleServices: z.boolean(),
});

type FormType = z.infer<typeof ZodForm>;

export default function Options({ admin }: { admin: FullAdmin }) {
  const [isTouched, setIsTouched] = useState(false);

  const utils = api.useContext();

  const { mutate: updatePreferences, isLoading } =
    api.auth.updatePreferences.useMutation({
      onSuccess: () => {
        utils.invalidate();
        setIsTouched(false);
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
    formState: { errors, touchedFields },
  } = useForm<FormType>({
    defaultValues: {
      requirePayment: admin?.AdminConfig?.requirePayment ?? true,
      paymentValue: admin?.AdminConfig?.paymentValue,
      description: admin?.AdminConfig?.description,
      multipleServices: admin?.AdminConfig?.multipleServices,
    },
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    data.paymentValue = parseFloat(data.paymentValue.toFixed(2));
    const config = { ...data };
    updatePreferences({
      config: {
        ...config,
      },
      adminId: admin?.id!,
    });
  };

  return (
    <>
      <main className="flex h-screen flex-col items-center justify-center">
        <div className="flex flex-col gap-6">
          <Heading>Opções</Heading>
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
                    onChange={(e) => {
                      setIsTouched(true);
                      field.onChange(e);
                    }}
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
                    onChange={(e) => {
                      setIsTouched(true);
                      field.onChange(e);
                    }}
                    checked={field.value}
                  />
                )}
              />
            </div>
            <div className="flex flex-col justify-center gap-4">
              <Label htmlFor="paymentValue">Descrição</Label>
              <TextField multiline {...register("description")} />
            </div>
            <Button
              type="submit"
              className="self-stretch"
              disabled={
                isLoading ||
                (!touchedFields.description &&
                  !touchedFields.paymentValue &&
                  !isTouched)
              }
            >
              {!isLoading ? "Salvar" : "Salvando..."}
            </Button>
          </form>
        </div>

        <Toaster />
      </main>
    </>
  );
}
