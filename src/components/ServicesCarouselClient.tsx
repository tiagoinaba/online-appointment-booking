import { Service } from "@prisma/client";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ServiceCardClient from "./ServiceCardClient";
import { Dispatch, SetStateAction } from "react";

export default function ServicesCarousel({
  services,
  setService,
}: {
  services: Service[];
  setService: Dispatch<SetStateAction<Service | null>>;
}) {
  const settings = {
    dots: false,
    infinite: services.length > 4,
    speed: 500,
    slidesToShow: services.length > 4 ? 4 : services.length,
    slidesToScroll: 4,
  };

  return (
    <div>
      {services?.length! > 0 ? (
        <Slider {...settings}>
          {services?.map((service) => (
            <ServiceCardClient
              setService={setService}
              key={service.id}
              service={service}
            />
          ))}
        </Slider>
      ) : (
        <span>Não há serviços ainda.</span>
      )}
    </div>
  );
}
