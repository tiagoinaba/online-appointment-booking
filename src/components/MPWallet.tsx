import { api } from "@/utils/api";
import { Admin, AdminConfig } from "@prisma/client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

export default function MPWallet({
  paymentStart,
  date,
  admin,
  adminConfig,
  serviceId,
  firstName,
  lastName,
  email,
}: {
  paymentStart: boolean;
  date: Date;
  admin: any;
  adminConfig: AdminConfig;
  serviceId?: string;
  firstName: string;
  lastName: string;
  email: string;
}) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { mutate: createPayment, data } =
    api.mercadopago.createPreference.useMutation({
      onSuccess: () => {
        setIsMounted(true);
      },
    });

  const Wallet = dynamic(() => import("@mercadopago/sdk-react/bricks/wallet"), {
    ssr: false,
  });

  useEffect(() => {
    createPayment({
      date,
      adminId: admin.id,
      paymentValue: adminConfig.paymentValue,
      serviceId: serviceId ? serviceId : null,
      firstName,
      lastName,
      email,
    });
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!isMounted) return null;

  return (
    <div>
      {paymentStart && data && (
        <div id="wallet_container">
          <span>Realize o pagamento para completar a reserva.</span>
          <Wallet initialization={{ preferenceId: data }} />
        </div>
      )}
    </div>
  );
}
