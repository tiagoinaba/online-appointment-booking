import { type Service } from "@prisma/client";
import Slider, { type Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ServiceCardClient from "./ServiceCardClient";
import { type Dispatch, type SetStateAction } from "react";
import { Heading } from "./Heading";

export default function ServicesCarousel({
  services,
  setService,
}: {
  services: Service[];
  setService: Dispatch<SetStateAction<Service | null>>;
}) {
  const settings = {
    dots: services.length > 4,
    infinite: services.length > 4,
    speed: 500,
    slidesToShow: services.length > 4 ? 4 : services.length,
    slidesToScroll: 4,
    arrows: services.length > 4,
    responsive: [
      {
        breakpoint: 560,
        settings: {
          dots: services.length > 1,
          infinite: services.length > 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: services.length > 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          dots: services.length > 2,
          infinite: services.length > 2,
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: services.length > 2,
        },
      },
      {
        breakpoint: 820,
        settings: {
          dots: services.length > 3,
          infinite: services.length > 3,
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: services.length > 3,
        },
      },
    ],
  } satisfies Settings;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-bold">Escolha um serviço:</p>
      {services?.length > 0 ? (
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
