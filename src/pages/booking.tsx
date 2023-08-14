import BookingForm from "@/components/BookingForm";
import { api } from "@/utils/api";
import { now } from "@/utils/constants";
import { Inputs } from "@/utils/types";
import { Button, Input, InputLabel } from "@mui/material";
import { parseISO } from "date-fns";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";

export default function Booking({}) {
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [paymentStart, setPaymentStart] = useState<boolean>(false);
  const { mutate: createPayment, data } =
    api.mercadopago.createPreference.useMutation();

  const router = useRouter();

  const Wallet = dynamic(() => import("@mercadopago/sdk-react/bricks/wallet"), {
    ssr: false,
  });

  useEffect(() => {
    const selectedTime = localStorage.getItem("dateTime");
    const adminInfo = localStorage.getItem("adminInfo");

    if (!selectedTime) router.back();
    else {
      const date = parseISO(selectedTime);

      if (date < now) router.back();
      else if (date && adminInfo) {
        const { id: adminId, AdminConfig } = JSON.parse(adminInfo);
        createPayment({
          date,
          adminId,
          paymentValue: AdminConfig.paymentValue,
          serviceId: null,
        });
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
        <BookingForm onSubmit={onSubmit} />
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
