import Image, { type StaticImageData } from "next/image";

export default function ServiceCard({
  name,
  image,
}: {
  name: string;
  image: StaticImageData;
}) {
  return (
    <div>
      <div className="group relative mx-2 flex aspect-[3/4] cursor-pointer flex-col overflow-hidden rounded-2xl bg-transparent text-zinc-100 shadow-md">
        <div className="relative flex-1 bg-zinc-300">
          <Image
            src={image}
            quality={80}
            className="transition-all duration-500 group-hover:scale-110"
            alt="Foto do serviço"
            sizes="300px"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="z-10 bg-zinc-500 p-4 text-zinc-100">
          <p className="truncate text-center">{name}</p>
        </div>
      </div>
    </div>
  );
}
