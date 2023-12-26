/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import Slider from "react-slick";

const DetailsSlider = ({ isIndex, template }) => {
  const sliderRef = useRef();

  //   console.log("isIndex ", isIndex);

  const goNext = () => {
    sliderRef.current.slickNext(++isIndex);
  };

  const goPrev = () => {
    sliderRef.current.slickPrev(--isIndex);
  };

  useEffect(() => {
    sliderRef.current.slickGoTo(isIndex);
  }, [isIndex]);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: isIndex,
  };

  return (
    <div className="relative">
      <Slider {...settings} className="" ref={sliderRef}>
        {template?.templateImages.map((image, index) => (
          <div key={index} className="w-full lg:h-[800px] object-cover">
            <img
              width="0"
              height="0"
              sizes="100vw"
              style={{ width: "100%", height: "100%" }}
              src={image?.imageUrl}
              alt={`Thumbnail ${index}`}
            />
          </div>
        ))}
      </Slider>
      <button
        onClick={() => goNext()}
        className="absolute right-1 md:right-0 top-1/2 hover:bg-warning bg-[#302e2e] text-white py-4 px-3 hover:text-black smooth"
      >
        <SlArrowRight className="lg:text-xl" />
      </button>
      <button
        onClick={() => goPrev()}
        className="absolute left-1 md:left-0 top-1/2 hover:bg-warning bg-[#302e2e] text-white py-4 px-3 hover:text-black smooth"
      >
        <SlArrowLeft className="lg:text-xl" />
      </button>
    </div>
  );
};

export default DetailsSlider;
