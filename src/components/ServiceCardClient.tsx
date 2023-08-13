import placeholder from "@/assets/placeholder-image.png";
import { ServiceFormType } from "@/pages/admin/dashboard/services";
import { api } from "@/utils/api";
import { useUploadThing } from "@/utils/uploadthing";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Service } from "@prisma/client";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import CreateServiceForm from "./ServiceForm";

export const ServiceEditForm = z.object({
  name: z.string(),
});

export default function ServiceCard({
  service,
  setService,
}: {
  service: Service;
  setService: Dispatch<SetStateAction<Service | null>>;
}) {
  return (
    <div>
      <div
        className="group relative mx-2 flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-transparent text-slate-100 shadow-md"
        onClick={() => setService(service)}
      >
        <div className="relative h-32  bg-slate-300">
          {service.imageUrl ? (
            <Image
              src={service.imageUrl}
              className="transition-all duration-500 group-hover:scale-110"
              alt="Foto do serviço"
              sizes="300px"
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <Image
              src={placeholder}
              alt="Image placeholder"
              sizes="300px"
              fill
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        <div className="z-10 bg-slate-500 p-4 text-slate-100">
          <p className="truncate text-center">{service.name}</p>
        </div>
      </div>
    </div>
  );
}
