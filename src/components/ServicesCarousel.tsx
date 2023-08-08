import { api } from "@/utils/api";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ServicesCarousel({ adminId }: { adminId: string }) {
  const { data: services } = api.service.getServicesByAdmin.useQuery({
    adminId: adminId,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider className="pb-4" {...settings}>
        {services?.map((service) => (
          <div>
            <div className="mx-4 overflow-hidden rounded-2xl bg-slate-500 p-4 text-slate-100">
              <p className="truncate text-center">{service.name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
