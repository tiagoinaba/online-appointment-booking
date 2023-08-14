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
}: {
  paymentStart: boolean;
  date: Date;
  admin: any;
  adminConfig: AdminConfig;
  serviceId?: string;
}) {
  const { mutate: createPayment, data } =
    api.mercadopago.createPreference.useMutation();

  const Wallet = dynamic(() => import("@mercadopago/sdk-react/bricks/wallet"), {
    ssr: false,
  });

  useEffect(() => {
    createPayment({
      date,
      adminId: admin.id,
      paymentValue: adminConfig.paymentValue,
      serviceId: serviceId ? serviceId : null,
    });
  }, []);

  return (
    <div>
      {paymentStart && (
        <div id="wallet_container">
          <span>Realize o pagamento para completar a reserva.</span>
          <Wallet initialization={{ preferenceId: data }} />
        </div>
      )}
    </div>
  );
}
