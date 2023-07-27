import DataTable from "@/components/reservations/DataTable";
import { columns } from "@/components/reservations/columns";
import { api } from "@/utils/api";
import { format } from "date-fns";
import Head from "next/head";
import React from "react";

export default function reservations() {
  const { data: reservations } = api.reservation.getAll.useQuery();
  return (
    <>
      <Head>
        <title>Reservas - Admin</title>
      </Head>
      <main className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Reservas</h1>
        {reservations && (
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={reservations} />
          </div>
        )}
      </main>
    </>
  );
}
