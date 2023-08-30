import { TimePicker } from "@mui/x-date-pickers";
import { add } from "date-fns";
import React, { useState } from "react";
import Button from "./Button";
import { DoorClosed } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";
import { api } from "@/utils/api";
import { Toaster, toast } from "react-hot-toast";

type weekNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | string;
type weekDayName =
  | "Domingo"
  | "Segunda"
  | "Terça"
  | "Quarta"
  | "Quinta"
  | "Sexta"
  | "Sábado";

const weekDayRecord: Record<weekNumber, weekDayName> = {
  0: "Domingo",
  1: "Segunda",
  2: "Terça",
  3: "Quarta",
  4: "Quinta",
  5: "Sexta",
  6: "Sábado",
};

type FormType = {
  open: boolean;
  weekDay: number;
  openingHour: Date;
  closingHour: Date;
  interval: Date;
};

export const WeekDays = ({ adminId }: { adminId: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: days } = api.day.getDay.useQuery({ adminId });
  const { mutate: createDay, isLoading } = api.day.createDay.useMutation({
    onSuccess: () => {
      toast.success("Criado com sucesso!");
      reset();
      setOpen(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      open: true,
      // @ts-expect-error
      weekDay: "",
      // @ts-expect-error
      openingHour: null,
      // @ts-expect-error
      closingHour: null,
      // @ts-expect-error
      interval: null,
    },
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    createDay({ ...data, adminId });
  };

  return (
    <div className="mx-40 flex flex-col gap-4">
      <div className="flex gap-4">
        <TimePicker
          ampm={false}
          value={add(new Date(0, 0, 0, 0), { hours: 9 })}
          label="Abertura"
        />
        <TimePicker
          ampm={false}
          value={add(new Date(0, 0, 0, 0), { hours: 13 })}
          label="Fechamento"
        />
        <TimePicker
          ampm={false}
          value={add(new Date(0, 0, 0, 0), { minutes: 30 })}
          label="Intervalo"
        />
      </div>
      <Button onClick={() => setOpen(true)}>Adicionar dia</Button>

      {days && days.map((item) => <div>{weekDayRecord[item.weekDay]}</div>)}

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          reset();
        }}
      >
        <div className="absolute left-1/2 top-1/2 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded bg-slate-50 p-8">
          <div className="flex flex-col gap-8">
            <h2 className="text-xl font-bold">Novo horário</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-4"
            >
              <Controller
                name="open"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center justify-between">
                    <InputLabel>Aberto?</InputLabel>
                    <Switch
                      checked={field.value}
                      disabled={isLoading}
                      onChange={field.onChange}
                    />
                  </div>
                )}
              />
              <div>
                <Controller
                  name="weekDay"
                  control={control}
                  rules={{ required: "Escolha um dia da semana" }}
                  render={({ field, fieldState: { invalid } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      disabled={isLoading}
                      select
                      inputRef={field.ref}
                      error={invalid}
                      sx={{ flex: "1 1 auto" }}
                      value={field.value}
                      onChange={field.onChange}
                      label={"Dia da semana"}
                    >
                      <MenuItem value={0}>Domingo</MenuItem>
                      <MenuItem value={1}>Segunda</MenuItem>
                      <MenuItem value={2}>Terça</MenuItem>
                      <MenuItem value={3}>Quarta</MenuItem>
                      <MenuItem value={4}>Quinta</MenuItem>
                      <MenuItem value={5}>Sexta</MenuItem>
                      <MenuItem value={6}>Sábado</MenuItem>
                    </TextField>
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="weekDay"
                  render={({ message }) => (
                    <p className="text-red-500">{message}</p>
                  )}
                />
              </div>
              <Controller
                name="openingHour"
                rules={{ required: "Escolha um horário de abertura" }}
                control={control}
                render={({ field }) => {
                  return (
                    <div className="flex w-full flex-col">
                      <TimePicker
                        disabled={isLoading}
                        ampm={false}
                        value={field.value}
                        onChange={field.onChange}
                        label="Abertura"
                      />
                      <ErrorMessage
                        errors={errors}
                        name="openingHour"
                        render={({ message }) => (
                          <p className="text-red-500">{message}</p>
                        )}
                      />
                    </div>
                  );
                }}
              />

              <div className="flex flex-col">
                <Controller
                  name="closingHour"
                  control={control}
                  rules={{ required: "Escolha um horário de fechamento" }}
                  render={({ field }) => {
                    return (
                      <TimePicker
                        disabled={isLoading}
                        ampm={false}
                        value={field.value}
                        onChange={field.onChange}
                        label="Fechamento"
                      />
                    );
                  }}
                />
                <ErrorMessage
                  errors={errors}
                  name="closingHour"
                  render={({ message }) => (
                    <p className="text-red-500">{message}</p>
                  )}
                />
              </div>
              <div className="flex flex-col">
                <Controller
                  name="interval"
                  control={control}
                  rules={{ required: "Escolha um intervalo" }}
                  render={({ field }) => {
                    return (
                      <TimePicker
                        disabled={isLoading}
                        ampm={false}
                        value={field.value}
                        onChange={field.onChange}
                        label="Intervalo"
                      />
                    );
                  }}
                />
                <ErrorMessage
                  errors={errors}
                  name="interval"
                  render={({ message }) => (
                    <p className="text-red-500">{message}</p>
                  )}
                />
              </div>
              <Button>Salvar</Button>
            </form>
          </div>
        </div>
      </Modal>
      <Toaster />
    </div>
  );
};
