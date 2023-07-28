import DataTable from "@/components/reservations/DataTable";
import { columns } from "@/components/reservations/columns";
import { api } from "@/utils/api";
import { Button } from "@mui/material";
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
        <Button
          href={`/admin/dashboard`}
          sx={{ position: "absolute", top: "1rem", left: "1rem" }}
        >
          Voltar
        </Button>
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
