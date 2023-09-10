import { api } from "@/utils/api";
import { ErrorMessage } from "@hookform/error-message";
import { TimePicker } from "@mui/x-date-pickers";
import { Admin, AdminConfig } from "@prisma/client";
import { add } from "date-fns";
import { IntFieldUpdateOperationsInputSchema } from "prisma/generated/zod";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "./Button";
import { toast } from "react-hot-toast";
const ZodForm = z.object({
  openingHours: z.date(),
  closingHours: z.date(),
  interval: z.date(),
});

type FormType = z.infer<typeof ZodForm>;

export const HourForm = ({ adminConfig }: { adminConfig: AdminConfig }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      openingHours: adminConfig?.openingHours,
      closingHours: adminConfig?.closingHours,
      interval: adminConfig?.interval,
    },
  });

  const [touchedFields, setTouchedFields] = useState({
    openingHours: false,
    closingHours: false,
    interval: false,
  });

  const { mutate: updateHours, isLoading } = api.auth.setHours.useMutation({
    onSuccess: () => {
      setTouchedFields({
        openingHours: false,
        closingHours: false,
        interval: false,
      });
      toast.success("Horários alterados com sucesso!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    updateHours({
      openingHours: new Date(data.openingHours),
      closingHours: new Date(data.closingHours),
      interval: new Date(data.interval),
      adminId: adminConfig.adminId,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Controller
          control={control}
          name="openingHours"
          render={({ field }) => (
            <div className="flex flex-col">
              <TimePicker
                ampm={false}
                value={new Date(field.value)}
                label="Abertura"
                onChange={(e) => {
                  setTouchedFields((prev) => ({ ...prev, openingHours: true }));
                  field.onChange(e);
                }}
              />
              <ErrorMessage
                errors={errors}
                name="openingHours"
                render={({ message }) => (
                  <p className="text-red-500">{message}</p>
                )}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="closingHours"
          render={({ field }) => (
            <div className="flex flex-col">
              <TimePicker
                ampm={false}
                value={new Date(field.value)}
                onChange={(e) => {
                  setTouchedFields((prev) => ({ ...prev, closingHours: true }));
                  field.onChange(e);
                }}
                label="Fechamento"
              />
              <ErrorMessage
                errors={errors}
                name="closingHours"
                render={({ message }) => (
                  <p className="text-red-500">{message}</p>
                )}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="interval"
          render={({ field }) => (
            <div className="flex flex-col">
              <TimePicker
                ampm={false}
                value={new Date(field.value)}
                onChange={(e) => {
                  setTouchedFields((prev) => ({ ...prev, interval: true }));
                  field.onChange(e);
                }}
                label="Intervalo"
              />
              <ErrorMessage
                errors={errors}
                name="interval"
                render={({ message }) => (
                  <p className="text-red-500">{message}</p>
                )}
              />
            </div>
          )}
        />
      </div>
      <Button
        type="submit"
        disabled={
          (!touchedFields.openingHours &&
            !touchedFields.closingHours &&
            !touchedFields.interval) ||
          isLoading
        }
      >
        Salvar
      </Button>
    </form>
  );
};
