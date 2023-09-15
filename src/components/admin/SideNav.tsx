import { api } from "@/utils/api";
import { Banknote, Book, Calendar, Contact2, Settings } from "lucide-react";
import { useRouter } from "next/router";
import Button from "../Button";
import { Link } from "./Link";
import { useEffect, useState } from "react";
import { useActiveTabStore } from "@/hooks/useActiveTab";

const links = [
  {
    label: "Reservas",
    icon: <Book className="h-4 w-4" />,
  },
  {
    label: "Serviços",
    icon: <Contact2 className="h-4 w-4" />,
  },
  {
    label: "Datas e horários",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    label: "Financeiro",
    icon: <Banknote className="h-4 w-4" />,
  },
  {
    label: "Opções",
    icon: <Settings className="h-4 w-4" />,
  },
] as const;

export type Tabs = (typeof links)[number]["label"];

export const SideNav = () => {
  const active = useActiveTabStore((state) => state.active);
  const setActive = useActiveTabStore((state) => state.setActive);
  const router = useRouter();
  const { mutate: logout } = api.auth.logout.useMutation({
    onSuccess: () => {
      router.push("/admin");
    },
  });

  return (
    <div className="fixed flex h-screen flex-col items-center justify-center border-r p-4">
      <h1 className="select-none text-2xl font-bold text-slate-500">
        TIME<span className="text-black">KEEPER</span>
      </h1>
      <div className="my-auto flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={link.label}
            active={active === link.label}
            onClick={() => setActive(link.label)}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>
      <Button
        className=""
        onClick={() => {
          logout();
        }}
      >
        Sair
      </Button>
    </div>
  );
};
