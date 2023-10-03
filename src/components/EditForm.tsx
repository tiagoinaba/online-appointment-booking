import React, { useState } from "react";
import { type FormType } from "./WeekDays";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { api } from "@/utils/api";
import { Switch } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { ErrorMessage } from "@hookform/error-message";
import Button from "./Button";
import { toast } from "react-hot-toast";

export const EditForm = ({
  data,
  adminId,
}: {
  data: FormType;
  adminId: string;
}) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const utils = api.useContext();

  const editForm = useForm<FormType>({
    defaultValues: {
      open: data.open,
      closingHour: data.closingHour,
      interval: data.interval,
      openingHour: data.openingHour,
      weekDay: data.weekDay,
    },
  });
  const { mutate: createDay, isLoading } = api.day.createDay.useMutation({
    onSuccess: async () => {
      setDisabled(true);
      toast.success("Alterado com sucesso.");
      await utils.day.invalidate();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: deleteDay, isLoading: isDeleting } =
    api.day.deleteDay.useMutation({
      onSuccess: async () => {
        toast.success("Deletado com sucesso.");
        await utils.day.invalidate();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    createDay({ ...data, adminId });
  };
  return (
    <form
      onSubmit={editForm.handleSubmit(onSubmit)}
      className="mx-4 flex flex-col gap-4"
    >
      <Controller
        control={editForm.control}
        name="open"
        render={({ field }) => (
          <div className="flex items-center justify-between">
            <p>Aberto</p>
            <Switch
              disabled={isLoading || disabled}
              checked={field.value}
              onChange={field.onChange}
            />
          </div>
        )}
      />
      <Controller
        name="openingHour"
        rules={{ required: "Escolha um horário de abertura" }}
        control={editForm.control}
        render={({ field }) => {
          return (
            <div className="flex w-full flex-col">
              <TimePicker
                disabled={isLoading || disabled}
                ampm={false}
                value={field.value}
                onChange={field.onChange}
                label="Abertura"
              />
              <ErrorMessage
                errors={editForm.formState.errors}
                name="openingHour"
                render={({ message }) => (
                  <p className="text-red-500">{message}</p>
                )}
              />
            </div>
          );
        }}
      />
      <Controller
        name="closingHour"
        rules={{ required: "Escolha um horário de fechamento" }}
        control={editForm.control}
        render={({ field }) => {
          return (
            <div className="flex w-full flex-col">
              <TimePicker
                disabled={isLoading || disabled}
                ampm={false}
                value={field.value}
                onChange={field.onChange}
                label="Fechamento"
              />
              <ErrorMessage
                errors={editForm.formState.errors}
                name="closingHour"
                render={({ message }) => (
                  <p className="text-red-500">{message}</p>
                )}
              />
            </div>
          );
        }}
      />
      <Controller
        name="interval"
        rules={{ required: "Escolha um intervalo" }}
        control={editForm.control}
        render={({ field }) => {
          return (
            <div className="flex w-full flex-col">
              <TimePicker
                disabled={isLoading || disabled}
                ampm={false}
                value={field.value}
                onChange={field.onChange}
                label="Intervalo"
              />
              <ErrorMessage
                errors={editForm.formState.errors}
                name="interval"
                render={({ message }) => (
                  <p className="text-red-500">{message}</p>
                )}
              />
            </div>
          );
        }}
      />
      <div className="flex justify-center gap-2">
        <Button className="mx-0" type="submit" disabled={disabled}>
          Salvar
        </Button>
        <div className="relative">
          <Button
            type="button"
            className=" mx-0"
            variant="destructive"
            onClick={() => setModal(true)}
          >
            Deletar
          </Button>
          {modal && (
            <div className="absolute bottom-0 left-0 z-10 flex w-52 translate-y-full flex-col items-center justify-center gap-2 rounded border bg-zinc-50 px-2 py-4">
              <p className="text-center text-lg text-black">Tem certeza?</p>
              <p className="text-center text-xs text-black">
                Se você tiver reservas já feitas deverá cancelá-las por conta
                própria.
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  className="mx-0"
                  disabled={isDeleting}
                  variant="destructive"
                  onClick={() => deleteDay({ adminId, weekDay: data.weekDay })}
                >
                  Deletar
                </Button>
                <Button
                  onClick={() => {
                    setModal(false);
                  }}
                  type="button"
                  disabled={isDeleting}
                  variant="ghost"
                  className="text-black"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
        <Button
          type="button"
          onClick={() => {
            if (disabled) {
              setDisabled(false);
            } else {
              setDisabled(true);
              editForm.reset();
            }
          }}
          className="mx-0"
          variant="ghost"
        >
          {disabled ? "Editar" : "Cancelar"}
        </Button>
      </div>
    </form>
  );
};
