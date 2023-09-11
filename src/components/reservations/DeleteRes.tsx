import React, { useState } from "react";
import Button from "../Button";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import { Row } from "@tanstack/react-table";
import { ReservationTable } from "./DataTable";

export const DeleteRes = ({ row }: { row: Row<ReservationTable> }) => {
  const utils = api.useContext();
  const { mutate: deleteReservation, isLoading } =
    api.reservation.deleteReservation.useMutation({
      onSuccess: () => {
        toast.success("Reserva excluída com sucesso!");
        utils.reservation.invalidate();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const [modal, setModal] = useState<boolean>(false);

  return (
    <div className="">
      {modal ? (
        <div className="flex flex-col items-center justify-center gap-2">
          Tem certeza que deseja excluir esta reserva?
          <div className="mx-auto flex gap-4">
            <Button
              variant="destructive"
              disabled={isLoading}
              onClick={() => {
                deleteReservation({ id: row.original.id });
                utils.reservation.invalidate();
                console.log("hello");
              }}
            >
              Confirmar
            </Button>
            <Button
              disabled={isLoading}
              variant="ghost"
              onClick={() => setModal(false)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <Button onClick={() => setModal(true)}>Excluir</Button>
      )}
    </div>
  );
};
