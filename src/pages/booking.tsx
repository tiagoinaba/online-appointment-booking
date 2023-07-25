import { now } from "@/utils/constants";
import { Button, Input, InputLabel } from "@mui/material";
import { parseISO } from "date-fns";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { api } from "@/utils/api";
import axios from "axios";
import { Inputs } from "@/utils/types";

export default function Booking({}) {
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [paymentStart, setPaymentStart] = useState<boolean>(false);
  const { mutate: createPayment, data } =
    api.mercadopago.createPreference.useMutation();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<Inputs>();

  const Wallet = dynamic(() => import("@mercadopago/sdk-react/bricks/wallet"), {
    ssr: false,
  });

  useEffect(() => {
    const selectedTime = localStorage.getItem("dateTime");
    const adminId = localStorage.getItem("adminId");

    if (!selectedTime) router.back();
    else {
      const date = parseISO(selectedTime);

      if (date < now) router.back();
      else if (date && adminId) {
        createPayment({ date, adminId });
        setDateTime(date);
      }
    }
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await import("@mercadopago/sdk-react").then((res) => {
      res.initMercadoPago("TEST-6e075dd3-fe77-4349-abae-37dd548c290f");
      setPaymentStart(true);
      localStorage.setItem("reservationInfo", JSON.stringify(data));
    });
  };

  return (
    <>
      <main className="flex h-screen flex-col items-center justify-center gap-8">
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputLabel>Nome da reserva</InputLabel>
          <Input {...register("name", { required: true })} />
          {errors.name && (
            <span className="text-red-500">Este campo é obrigatório</span>
          )}

          <InputLabel className="mt-6">Email</InputLabel>
          <Input {...register("email", { required: true })} />
          {errors.email && (
            <span className="text-red-500">Este campo é obrigatório</span>
          )}

          <Button variant="outlined" sx={{ marginTop: "1.5rem" }} type="submit">
            Submit
          </Button>
        </form>
        {paymentStart && (
          <div id="wallet_container">
            {dateTime && <Wallet initialization={{ preferenceId: data }} />}
          </div>
        )}
        <Toaster position="bottom-center" />
      </main>
    </>
  );
}
