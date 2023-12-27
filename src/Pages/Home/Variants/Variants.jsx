import { useEffect, useState } from "react";
import api from "../../../utilities/api";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "./style.css";
import Loading from "../../../Shared/Loading/Loading";

const Variants = () => {
  const [templates, setTemplates] = useState([]);
  const [variant, setVariant] = useState("nfc");
  const [cardVariant, setCardVariant] = useState([]);
  const [loading, setLoading] = useState(false);
  const [variantPrice, setVariantPrice] = useState(null);

  useEffect(() => {
    api
      .get(`/cardVariant`)
      .then((res) => {
        setCardVariant(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/template?variant=${variant}`)
      .then((res) => {
        setTemplates(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [variant]);

  useEffect(() => {
    cardVariant.map((v) => {
      if (v.card === "nfc") {
        setVariantPrice(v.price);
      }
    });
  }, [cardVariant]);

  // console.log(templates);
  // console.log(variant);
  return (
    <section className="container">
      <div className=" flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
        <h2 className="text-4xl text-center font-medium mb-8">
          Different Types of Identity
        </h2>

        <>
          <div className=" grid grid-cols-2 md:grid-cols-4 my-4 gap-4 ">
            {cardVariant.map((variantName, i) => (
              <button
                onClick={() => {
                  setVariant(variantName?.card);
                  setVariantPrice(variantName?.price);
                }}
                key={i}
                type="button"
                className={`${
                  variantName.card === variant && "bg-[#ef4444]"
                } px-8 py-3 font-semibold border rounded border-[#ef4444]  text-gray-100 uppercase tracking-wider hover:bg-[#ef4444] transition duration-150 ease-out hover:ease-in`}
              >
                {variantName?.card}
              </button>
            ))}
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className=" grid grid-cols-1 lg:grid-cols-3 gap-10 mt-4">
              {templates?.map((template, i) => (
                <div
                  key={i}
                  className=" cursor-pointer border border-purple-300 hover:shadow-2xl rounded-md "
                >
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
                        {Number(
                          template?.templatePrice ? template?.templatePrice : 0
                        ) + Number(variantPrice ? variantPrice : 0)}
                        Tk
                      </p>
                    </div>

                    <Link
                      className="p-3 px-8 mt-4 w-full text-center bg-[#363636] text-lg border border-[#363636]    text-gray-300 hover:text-gray-100 rounded-sm hover:bg-[#2e2e2e] hover:border hover:border-white transition duration-150"
                      to={`/details?id=${template?._id}&price=${
                        Number(
                          template?.templatePrice ? template?.templatePrice : 0
                        ) + (variantPrice ? Number(variantPrice) : 0)
                      }`}
                    >
                      Buy
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      </div>
    </section>
  );
};

export default Variants;
