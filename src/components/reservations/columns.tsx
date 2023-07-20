import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { z } from "zod";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react"
import { Button } from "~/components/ui/button";

export const Reservation = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    justDate: z.date(),
    dateTime: z.date(),
    createdAt: z.date(),
})

export type ReservationType = z.infer<typeof Reservation>;

export const columns: ColumnDef<ReservationType>[] = [
    {
        accessorKey: "name",
        header: "Nome",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "dateTime",
        header: "Data",
        cell: ({ row }) => {
            const date = row.getValue("dateTime");
            if (date instanceof Date) {
                const formatted = format(date, "dd/MM/yyyy '->' HH:mm");

                return <div className="text-right font-medium">{formatted}</div>
            }

        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <Button variant={"default"}>Delete</Button>
            )
        },
    }
]