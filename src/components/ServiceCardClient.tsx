import placeholder from "@/assets/placeholder-image.png";
import { type Service } from "@prisma/client";
import Image from "next/image";
import { type Dispatch, type SetStateAction } from "react";
import { z } from "zod";

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
        className="group relative mx-2 flex aspect-[3/4] cursor-pointer flex-col overflow-hidden rounded-2xl bg-transparent text-zinc-100 shadow-md"
        onClick={() => setService(service)}
      >
        <div className="relative flex-1 bg-zinc-300">
          {service.imageUrl ? (
            <Image
              src={service.imageUrl}
              quality={80}
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
              quality={80}
              sizes="300px"
              fill
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        <div className="z-10 bg-zinc-500 p-4 text-zinc-100">
          <p className="truncate text-center">{service.name}</p>
        </div>
      </div>
    </div>
  );
}
