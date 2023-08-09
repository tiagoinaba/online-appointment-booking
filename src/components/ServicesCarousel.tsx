import { api } from "@/utils/api";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import placeholder from "@/assets/placeholder-image.png";

export default function ServicesCarousel({ adminId }: { adminId: string }) {
  const { data: services } = api.service.getServicesByAdmin.useQuery({
    adminId: adminId,
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <div>
      <Slider className="pb-4" {...settings}>
        {services?.map((service) => (
          <div key={service.id}>
            <div className="mx-2 flex flex-col overflow-hidden rounded-2xl bg-transparent text-slate-100 shadow-md">
              <div className="relative h-32  bg-slate-300">
                {service.imageUrl ? (
                  <Image
                    src={service.imageUrl}
                    alt="Foto do serviço"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <Image
                    src={placeholder}
                    alt="Image placeholder"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
              <div className="bg-slate-500 p-4 text-slate-100">
                <p className="truncate text-center">{service.name}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
