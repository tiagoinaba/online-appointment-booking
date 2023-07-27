import { Inputs } from "@/utils/types";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
import { Button, Input, InputLabel } from "@mui/material";

export type BookingFormProps = {
  onSubmit: SubmitHandler<Inputs>;
  disabled?: boolean;
};

export default function BookingForm({ onSubmit, disabled }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    watch,
  } = useForm<Inputs>();

  return (
    <form
      className="flex flex-col items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputLabel>Nome da reserva</InputLabel>
      <Input
        disabled={disabled}
        inputProps={{ style: { padding: 5, background: "none" } }}
        {...register("name", { required: true })}
      />
      {errors.name && (
        <span className="mt-1 text-sm text-red-500">
          Este campo é obrigatório
        </span>
      )}

      <InputLabel className="mt-6">Email</InputLabel>
      <Input
        disabled={disabled}
        inputProps={{ style: { padding: 5, background: "none" } }}
        {...register("email", { required: true })}
      />
      {errors.email && (
        <span className="mt-1 text-sm text-red-500">
          Este campo é obrigatório
        </span>
      )}

      <Button
        variant="outlined"
        sx={{ marginTop: "1.5rem" }}
        type="submit"
        disabled={disabled}
      >
        Reservar
      </Button>
    </form>
  );
}
