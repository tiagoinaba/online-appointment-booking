import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const paymentStatus: Record<string, string> = {
  pending: "Pendente",
  approved: "Aprovado",
  authorized: "Autorizado",
  in_process: "Em processamento",
  in_mediation: "Em mediação",
  rejected: "Rejeitado",
  cancelled: "Cancelado",
  refunded: "Reembolsado",
  charged_back: "Estornado",
  null: "Inexistente",
};
