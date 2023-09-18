import { Inputs } from "@/utils/types";
import { InputLabel } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import Button from "./Button";

export type BookingFormProps = {
  onSubmit: SubmitHandler<Inputs>;
  disabled?: boolean;
  paymentRequired?: boolean;
};

export default function BookingForm({
  onSubmit,
  disabled,
  paymentRequired,
}: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    watch,
  } = useForm<Inputs>();

  return (
    <form
      className="flex flex-1 flex-col justify-center gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-xl font-bold">Suas informações</h2>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-baseline lg:gap-4">
        <div className="lg:flex-1">
          <p className="font-bold">Nome</p>
          <Input
            placeholder="Nome"
            disabled={disabled}
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className="mt-1 text-sm text-red-500">
              Este campo é obrigatório
            </span>
          )}
        </div>
        <div className="lg:flex-1">
          <p className="font-bold">Sobrenome</p>
          <Input
            placeholder="Sobrenome"
            disabled={disabled}
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="mt-1 text-sm text-red-500">
              Este campo é obrigatório
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-baseline lg:gap-4">
        <div className="flex-1">
          <p className="font-bold">Email</p>
          <Input
            placeholder="exemplo@email.com"
            disabled={disabled}
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="mt-1 text-sm text-red-500">
              Este campo é obrigatório
            </span>
          )}
        </div>
        <div className="flex-1">
          <p className="font-bold">Telefone</p>
          <Input
            placeholder="16987654321"
            className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            type="number"
            inputMode="numeric"
            disabled={disabled}
            {...register("phoneNumber", { required: true })}
          />
          {errors.phoneNumber && (
            <span className="mt-1 text-sm text-red-500">
              Este campo é obrigatório
            </span>
          )}
        </div>
      </div>
      <p className="text-xs text-zinc-500">
        *Essas informações são apenas para contato caso haja alguma mudança em
        seu agendamento.
      </p>

      <Button className="" type="submit" disabled={disabled}>
        {paymentRequired ? "Próximo" : "Reservar"}
      </Button>
    </form>
  );
}
