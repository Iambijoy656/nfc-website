import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import api from "../../utilities/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaMinus, FaPlus } from "react-icons/fa";
import Loading from "../../Shared/Loading/Loading";

const Details = () => {
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState({});
  //   const [cart, setCart] = useContext(CartContext);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  //   const slider1Ref = useRef(null);
  //   const slider2Ref = useRef(null);

  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    api
      .get(`/template/${id}`)
      .then((res) => {
        setTemplate(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  console.log("template", template);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  return (
    <div className="py-24 grid grid-cols-1 lg:grid-cols-2 lg:gap-5 container ">
      <div className="grid grid-cols-12  ">
        <div className="col-span-10">
          <Slider asNavFor={nav2} ref={slider1} className="mx-auto">
            {template?.templateImages?.map((image, i) => (
              <div key={i}>
                <img
                  className="mx-auto object-fit w-[500px] h-[300px] "
                  src={image?.imageUrl}
                  alt=""
                />
              </div>
            ))}
          </Slider>

          <Slider
            asNavFor={nav1}
            ref={slider2}
            slidesToShow={2}
            swipeToSlide={true}
            focusOnSelect={true}
            centerMode={true}
            className="w-[320px] mx-auto "
          >
            {template?.templateImages?.map((image, i) => (
              <div key={i}>
                <img
                  className=" h-16 w-24 cursor-grab"
                  src={image?.imageUrl}
                  alt=""
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="">
        <h2 className="text-2xl mt-2  tracking-wide capitalize ">
          {template?.templateName}
        </h2>
        <div className="text-xs text-gray-500 flex items-center gap-4 my-1 border-b pb-1">
          {/* <div className="w-10 ">
                <Rating style={{ maxWidth: 80 }} value={0} readOnly />
              </div> */}
          <p>{`(${0} review)`}</p>
        </div>
        <div className="flex items-center my-2">
          <span className="text-2xl  text-red-500">
            {"$"}
            {0}
          </span>
        </div>

        {/* <div className="text-sm tracking-wider">
             Sold By :{" "}
             <Link
               href="/shop"
               className="text-[#2ca4d1] font-semibold text-md capitalize tracking-wider"
             >
               {product?.vendor?.vendorName}
             </Link>
           </div> */}
        <div
          className="mt-2"
          //   dangerouslySetInnerHTML={{ __html: specificationData }}
        ></div>

        <div className="flex flex-col md:flex-row justify-between  gap-3 lg:mt-8 items-center border-b border-t border-gray-300 p-2">
          <div className="flex border gap-5 w-max items-center justify-center px-3 h-12 ">
            <p
            //   onClick={() => {
            //     decreaseCount(product?._id);
            //     setLocalQuantity(localQuantity - 1);
            //   }}
            >
              <FaMinus className="text-gray-400 cursor-pointer font-bold" />
            </p>
            <input
              type="number"
              className="px-3 text-center text-xs bg-[#272829] w-16"
              //   value={quantity?.quantity ?? localQuantity}
              value={0}
            />

            <p
            //   onClick={() => {
            //     increaseCount(product?._id);
            //     setLocalQuantity(localQuantity + 1);
            //   }}
            >
              <FaPlus className="text-gray-400 cursor-pointer font-bold" />
            </p>
          </div>
          <div className="flex items-center gap-5">
            <button
              //   onClick={() => handleAddToCart(product?._id)}
              className="  p-2 bg-[#232323] rounded outline outline-1 outline-white hover:bg-[#ef4444] text-white mt-4 cursor-pointer   ease-in duration-150"
            >
              Add To Cart
            </button>
            <div
              //   onClick={() => {
              //     handleAddToCart(product?._id, true);
              //   }}
              className="  p-2 bg-[#232323] rounded outline outline-1 outline-white bg-[#ef4444] text-white mt-4  cursor-pointer  hover:bg-[#363636] ease-in duration-150"
            >
              Buy Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
