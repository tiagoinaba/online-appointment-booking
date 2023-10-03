import { api } from "@/utils/api";
import { ErrorMessage } from "@hookform/error-message";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputLabel,
  MenuItem,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { add, format } from "date-fns";
import React, { useState } from "react";
import { IconDropdown } from "react-day-picker";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import Button from "./Button";
import { EditForm } from "./EditForm";
import { HourForm } from "./HourForm";
import { Admin, type AdminConfig } from "@prisma/client";

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

export type FormType = {
  open: boolean;
  weekDay: number;
  openingHour: Date;
  closingHour: Date;
  interval: Date;
};

export const WeekDays = ({
  adminId,
  adminConfig,
}: {
  adminId: string;
  adminConfig: AdminConfig;
}) => {
  const utils = api.useContext();
  const [open, setOpen] = useState<boolean>(false);
  const { data: days } = api.day.getDay.useQuery({ adminId });
  const { mutate: createDay, isLoading } = api.day.createDay.useMutation({
    onSuccess: async () => {
      await utils.day.invalidate();
      toast.success("Criado com sucesso!");
      reset();
      setOpen(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const [expanded, setExpanded] = React.useState<number | false>(false);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      open: true,
      // @ts-expect-error this is dumb
      weekDay: "",
      // @ts-expect-error this is dumb
      openingHour: null,
      // @ts-expect-error this is dumb
      closingHour: null,
      // @ts-expect-error this is dumb
      interval: null,
    },
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    createDay({ ...data, adminId });
  };

  return (
    <div className="mx-40 flex flex-col gap-4">
      <HourForm adminConfig={adminConfig} />
      <Button onClick={() => setOpen(true)}>Adicionar dia</Button>

      {days &&
        days.map((item) => {
          return (
            <Accordion
              expanded={expanded === item.weekDay}
              onChange={handleChange(item.weekDay)}
              key={item.weekDay}
            >
              <AccordionSummary
                expandIcon={<IconDropdown />}
                aria-controls="panel1bh-content"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span className="font-bold tracking-tight">
                  {weekDayRecord[item.weekDay]}
                </span>
                <span className="ml-auto mr-4 text-muted-foreground">
                  {item.open
                    ? `${format(item.openingHour, "kk:mm")} -> ${format(
                        item.closingHour,
                        "kk:mm"
                      )}`
                    : "Fechado"}
                </span>
              </AccordionSummary>
              <AccordionDetails>
                <EditForm data={item} adminId={adminId} />
              </AccordionDetails>
            </Accordion>
          );
        })}

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          reset();
        }}
      >
        <div className="absolute left-1/2 top-1/2 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded bg-zinc-50 p-8">
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
              <Button disabled={isLoading}>Salvar</Button>
            </form>
          </div>
        </div>
      </Modal>
      <Toaster />
    </div>
  );
};
