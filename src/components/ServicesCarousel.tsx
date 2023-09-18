import { api } from "@/utils/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ServiceCard from "./ServiceCard";
import { Service } from "@prisma/client";

export default function ServicesCarousel({
  services,
}: {
  services: Service[];
}) {
  const settings = {
    dots: services.length > 4,
    infinite: services.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <div>
      {services?.length! > 0 ? (
        <Slider {...settings}>
          {services?.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </Slider>
      ) : (
        <span>Não há serviços ainda.</span>
      )}
    </div>
  );
}
