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
    infinite: services ? services.length > 1 : false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
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
