import { api } from "@/utils/api";
import {
  ColumnDef,
  ColumnFilter,
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { Service } from "prisma/generated/zod";
import { useState } from "react";
import Select, { StylesConfig } from "react-select";
import Button from "../Button";

interface DataTableProps<TData> {
  data: TData[];
  services?: Service[];
}

export type ReservationTable = {
  id: string;
  name: string;
  email: string;
  service: string | null;
  date: Date;
  paymentIdMP: string | null;
};

export const columns: ColumnDef<ReservationTable>[] = [
  {
    accessorKey: "name",
    header: ({ column, header, table }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Nome
          <ArrowUpDown size={16} />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Email
          <ArrowUpDown size={16} />
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    accessorFn: ({ date }) => {
      return format(date, "yyyy-MM-dd");
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Data
          <ArrowUpDown size={16} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatted = format(row.original.date, "dd/MM/yyyy HH:mm");

      return formatted;
    },
  },
  {
    accessorKey: "service",
    header: "Serviço",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const utils = api.useContext();
      const { mutate: deleteReservation, isSuccess } =
        api.reservation.deleteReservation.useMutation({
          onSuccess: () => {
            utils.reservation.invalidate();
          },
        });
      const { mutate: createReimbursement } =
        api.mercadopago.createReimbursement.useMutation({
          onSuccess: (data) => {
            console.log(data);
          },
        });

      return (
        <Button
          onClick={async () => {
            deleteReservation({ id: row.original.id });
            if (row.original.paymentIdMP)
              createReimbursement({ id: row.original.paymentIdMP });
          }}
        >
          Excluir
        </Button>
      );
    },
  },
];

export default function DataTable({
  data,
  services,
}: DataTableProps<ReservationTable>) {
  const selectStyles = {
    container: (base) => ({
      ...base,
      width: "32%",
    }),
    control: (base) => ({
      // ...base,
      display: "flex",
      border: "1px solid rgba(0, 0, 0, .1)",
      padding: ".25rem",
      borderRadius: ".25rem",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "white",
      padding: ".25rem",
      border: "1px solid rgba(0, 0, 0, .1)",
      borderRadius: ".25rem",
    }),
    input: (base) => ({ ...base }),
    placeholder: (base) => ({ ...base, opacity: "50%" }),
    option: (base) => ({
      ...base,
      ":hover": { backgroundColor: "#e4e4e7" },
      borderRadius: ".25rem",
      padding: ".25rem .5rem",
    }),
  } satisfies StylesConfig;

  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
  const [sorting, setSorting] = useState<ColumnSort[]>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <input
          placeholder="Filtrar emails..."
          className="w-[32%] self-start rounded border px-2 py-1 outline-none"
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
        />
        <input
          type="date"
          className="rouded w-[32%] self-center rounded border px-2 py-[0.1875rem] outline-none"
          value={(table.getColumn("date")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("date")?.setFilterValue(e.target.value)
          }
        />
        {services?.length && services.length > 0 && (
          <Select
            placeholder={"Escolha um serviço..."}
            options={services?.map((service) => ({
              label: service.name,
              value: service.name,
            }))}
            onChange={(event) =>
              table.getColumn("service")?.setFilterValue(event?.value)
            }
            styles={selectStyles}
            isClearable
            unstyled
          />
        )}
      </div>
      <div className="overflow-hidden rounded border">
        <table className="">
          <thead className="transition-all duration-200 hover:bg-slate-200">
            {table.getHeaderGroups().map((hGroup) => (
              <tr key={hGroup.id} className="">
                {hGroup.headers.map((header) => (
                  <th className="border-b px-4 py-2" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-center">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b transition-all duration-200 last:border-0 hover:bg-slate-200"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="truncate p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
