import Slider, { type Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ServiceCardDemo from "./ServiceCardDemo";
import jimHalpert from "public/asianjim.jpg";
import dateMike from "public/datemike.jpg";

export default function ServicesCarouselDemo() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 560,
        settings: {
          dots: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  } satisfies Settings;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-bold">Escolha um serviço:</p>
      <Slider {...settings}>
        <ServiceCardDemo image={jimHalpert} name="Jim Halpert" />
        <ServiceCardDemo image={dateMike} name="Date Mike" />
      </Slider>
    </div>
  );
}
