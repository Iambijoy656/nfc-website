/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "./style.css";

const TemplateCard = ({ template, variantPrice, variantId, i }) => {
  return (
    <div className=" cursor-pointer border border-purple-300 hover:shadow-2xl rounded-md ">
      {/* <Template
        isMember={isMember}
        template={template?.templateDesign}
      /> */}

      <div className="">
        <Swiper
          grabCursor={true}
          loop={true}
          effect={"creative"}
          autoplay={{
            delay: `${1800 + i * 50}`,
            disableOnInteraction: true,
          }}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          pagination={true}
          modules={[EffectCreative, Pagination, Autoplay]}
          className="mySwiper w-full"
        >
          {template.templateImages.map((image, i) => (
            <SwiperSlide key={i}>
              {/* {console.log(image)} */}
              <img
                src={image.imageUrl}
                className="object-cover object-center w-full rounded-t-md h-80"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex flex-col justify-center items-center p-3">
        <h2 className="text-xl capitalize text-center md:text-2xl px-5 font-bold  bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-400 to-purple-500">
          {template?.templateName}
        </h2>
        <div className="flex justify-center items-center gap-2 ">
          <p className="text-gray-200 font-medium">Price : </p>
          <p className=" font-bold">
            {Number(template?.templatePrice ? template?.templatePrice : 0) +
              Number(variantPrice ? variantPrice : 0)}
            Tk
          </p>
        </div>
        {/* 
          <Link
            className="p-3 px-8 mt-4 w-full text-center bg-[#363636] text-lg border border-[#363636]    text-gray-300 hover:text-gray-100 rounded-sm hover:bg-[#2e2e2e] hover:border hover:border-white transition duration-150"
            to={`/details?id=${template?._id}&price=${
              Number(
                template?.templatePrice ? template?.templatePrice : 0
              ) + (variantPrice ? Number(variantPrice) : 0)
            }`}
          >
            Buy
          </Link> */}

        <Link
          className="p-3 px-8 mt-4 w-full text-center bg-[#363636] text-lg border border-[#363636]    text-gray-300 hover:text-gray-100 rounded-sm hover:bg-[#2e2e2e] hover:border hover:border-white transition duration-150"
          to={`/details?templateId=${template?._id}&variantId=${variantId}`}
        >
          Buy
        </Link>
      </div>
    </div>
  );
};

export default TemplateCard;
