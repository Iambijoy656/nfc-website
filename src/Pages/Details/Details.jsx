import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import api from "../../utilities/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaMinus, FaPlus } from "react-icons/fa";
import Loading from "../../Shared/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeOne } from "../../redux/features/cart/cartSlice";

const Details = () => {
  const dispatch = useDispatch();
  const { templates, total } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState({});
  const [variant, setVariant] = useState({});
  //   const [cart, setCart] = useContext(CartContext);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  //   const slider1Ref = useRef(null);
  //   const slider2Ref = useRef(null);

  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const location = useLocation();
  const templateId = new URLSearchParams(location.search).get("templateId");
  const variantId = new URLSearchParams(location.search).get("variantId");

  useEffect(() => {
    api
      .get(`/cardVariant/${variantId}`)
      .then((res) => {
        setVariant(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [variantId]);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/template/${templateId}`)
      .then((res) => {
        setTemplate(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [templateId]);

  // console.log("template", template);
  // console.log("variant", variant);

  const price =
    Number(template?.templatePrice ? template?.templatePrice : 0) +
    Number(variant ? variant?.price : 0);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  const handleAddToCart = (template) => {
    dispatch(addToCart({ ...template, price: price }));
  };

  return (
    <div>
      <div className="py-24 grid grid-cols-1 lg:grid-cols-2 lg:gap-5 container ">
        <div className="grid grid-cols-12   ">
          <div className="col-span-10">
            <Slider
              asNavFor={nav2}
              ref={slider1}
              swipeToSlide={true}
              focusOnSelect={true}
              // vertical={true}
              arrows={false}
              className="mx-auto cursor-grab"
            >
              {template?.templateImages?.map((image, i) => (
                <div key={i}>
                  <img
                    className="mx-auto object-fit w-[500px] h-[350px] "
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
          <h2 className="text-2xl font-semibold mt-2  tracking-wide capitalize ">
            {template?.templateName}
          </h2>
          <div className="text-xs text-gray-500 flex items-center gap-4 my-1 border-b pb-1">
            {/* <div className="w-10 ">
                <Rating style={{ maxWidth: 80 }} value={0} readOnly />
              </div> */}
            <p>{`${0} review)`}</p>
          </div>
          <div className="flex items-center my-2">
            <span className="text-2xl  text-red-500 font-semibold">
              {price} <span className="text-sm text-red-500">Tk</span>
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

          {/* <div
          className="mt-2"
            dangerouslySetInnerHTML={{ __html: specificationData }}
        ></div> */}

          <div className="mt-2">
            <ul className=" list-disc">
              <li className="text-sm">
                One side custom design. logo on the back.
              </li>
              <li className="text-sm">
                Built-in high frequency NFC chip & QR Code embedded. It is made
                of waterproof premium plastic (PVC).
              </li>
              <li className="text-sm">
                Product Dimension: 85.5 X 54 X 0.90 mm.
              </li>
            </ul>
          </div>

          <div className="flex flex-col md:flex-row justify-between  gap-3 lg:mt-8 items-center border-b border-t border-gray-300 p-2">
            <div className="flex border gap-5 w-max items-center justify-center px-3 h-12 ">
              <p
              //   onClick={() => {
              //     decreaseCount(product?._id);
              //     setLocalQuantity(localQuantity - 1);
              //   }}
              >
                <FaMinus
                  onClick={() => dispatch(removeOne(template))}
                  className="text-gray-400 cursor-pointer font-bold"
                />
              </p>
              {templates.length > 0 ? (
                templates.map((product, i) => (
                  <input
                    key={i}
                    value={product?.quantity} // Add the value attribute here
                    className="px-1 py-2  text-xs text-center bg-[#272829]"
                  />
                ))
              ) : (
                <input
                  value={0} // Add the value attribute here
                  className="px-1  py-2  text-xs text-center bg-[#272829]"
                />
              )}

              <p
              //   onClick={() => {
              //     increaseCount(product?._id);
              //     setLocalQuantity(localQuantity + 1);
              //   }}
              >
                <FaPlus
                  onClick={() => dispatch(addToCart(...template,price))}
                  
                  className="text-gray-400 cursor-pointer font-bold"
                />
              </p>
            </div>
            <div className="flex items-center gap-5 -mt-4">
              <button
                onClick={() => {
                  handleAddToCart(template);
                }}
                className="  p-2 bg-[#232323] rounded outline outline-1 outline-white hover:bg-[#ef4444] text-white mt-4 cursor-pointer   ease-in duration-150"
              >
                Add To Cart
              </button>
              <div className="  p-2  rounded outline outline-1 outline-white bg-[#ef4444] text-white mt-4  cursor-pointer  hover:bg-[#363636] ease-in duration-150">
                Buy Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
