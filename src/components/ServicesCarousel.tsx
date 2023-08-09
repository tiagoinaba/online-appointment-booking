import { api } from "@/utils/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ServiceCard from "./ServiceCard";

export default function ServicesCarousel({ adminId }: { adminId: string }) {
  const { data: services } = api.service.getServicesByAdmin.useQuery({
    adminId: adminId,
  });

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
            <ServiceCard key={service.id} service={service} />
          ))}
        </Slider>
      ) : (
        <span>Não há serviços ainda.</span>
      )}
    </div>
  );
}
