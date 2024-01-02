import { HiMinus, HiOutlinePlus } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utilities/api";
import toast from "react-hot-toast";

const CartDrawer = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();
  const { templates } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const token = localStorage.getItem("access-token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    api
      .get(`/customers/${user?.customer}`, {
        headers: {
          authorization: `${token}`,
        },
      })
      .then((res) => {
        dispatch(addToCart(res?.data?.data?.cart));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user?.customer, token, dispatch]);

  useEffect(() => {
    if (token) {
      api
        .get(`/subscriptions`, {
          headers: {
            authorization: `${token}`,
          },
        })
        .then((res) => {
          setSubscriptions(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  const filteredSubscription = subscriptions?.find(
    (subscription) => parseInt(subscription.duration.split(" ")[0]) === 12
  );
  // console.log(filteredSubscription?.packagePrice);

  const handleAddToCart = async (template) => {
    if (!user?.userEmail && !token) {
      toast.error("Please Login First");
      navigate("/customer-login");
      return;
    }

    const cartData = {
      templateId: template?.templateId?._id,
      variantName: template?.variantName,
      price: template?.price,
    };
    try {
      // Assuming user?.customer is the customer ID
      const response = await api.put(
        `customers/addCart?id=${user?.customer}`,
        cartData
      );

      if (response.status === 200) {
        dispatch(addToCart(response?.data?.data?.cart));
        // toast.success("Template Added Successfully in Cart");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding template to cart");
    }
  };

  const decreaseCount = async (template) => {
    if (!user?.userEmail && !token) {
      toast.error("Please Login First");
      navigate("/customer-login");
      return;
    }
    const cartData = {
      templateId: template?.templateId?._id,
      variantName: template?.variantName,
      price: template?.price,
    };
    try {
      // Assuming user?.customer is the customer ID
      const response = await api.put(
        `customers/removeOneFromCart?id=${user?.customer}`,
        cartData
      );

      if (response.status === 200) {
        // dispatch(removeOne({ ...template, price: price }));
        dispatch(addToCart(response?.data?.data?.cart));
        // toast.success("Template Remove Successfully in Cart");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItemFromCart = async (template) => {
    if (!user?.userEmail && !token) {
      toast.error("Please Login First");
      navigate("/customer-login");
      return;
    }
    const cartData = {
      templateId: template?.templateId?._id,
      variantName: template?.variantName,
      price: template?.price,
    };
    try {
      // Assuming user?.customer is the customer ID
      const response = await api.put(
        `customers/removeTemplateFromCart?id=${user?.customer}`,
        cartData
      );

      if (response.status === 200) {
        // dispatch(removeOne({ ...template, price: price }));
        dispatch(addToCart(response?.data?.data?.cart));
        // toast.success("Template Remove Successfully in Cart");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const total = templates.reduce(
    (acc, template) => acc + template.price * template.quantity,
    0
  );

  return (
    <>
      <div className="drawer drawer-end ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu p-2 md:p-3 w-[95%] md:w-[50%] lg:w-[40%] xl:w-[30%] min-h-full bg-[#363636] text-base-content ">
            <label
              htmlFor="my-drawer-4"
              className="flex justify-end cursor-pointer "
            >
              <RxCross2 className="text-xl cursor-pointer hover:text-red-500" />
            </label>
            <h2 className="text-center text-xl font-semibold my-5 tracking-wide">
              Cart Item
            </h2>
            <div className="">
              {templates?.map((template, i) => (
                <div key={i}>
                  {/* {console.log("template?.templateId?.templateImages[0]?.imageUrl, ", template?.templateId?.templateImages?.[0]?.imageUrl)} */}
                  <div className="space-y-5 my-1 ">
                    <div className="border h-36 md:h-44 p-1 md:p-4 flex justify-between rounded-md">
                      <div className="border-r pr-2 md:pr-5 shrink-0">
                        <img
                          src={
                            template?.templateId?.templateImages?.[0]?.imageUrl
                          }
                          alt=""
                          className="h-full w-20 md:w-full "
                        />
                      </div>
                      <div className="px-2 w-full flex flex-col items-center gap-2">
                        <h1 className="word-wrap text-lg text-center capitalize ">
                          {template?.templateId?.templateName}{" "}
                          <span className="text-xs uppercase">
                            {" "}
                            ({template?.variantName})
                          </span>
                          <p className="text-sm">
                            Price: {Number(template?.price)}{" "}
                          </p>
                        </h1>

                        <p>Quantity: {template?.quantity}</p>
                        <p className="text-xs">
                          Subscription :{filteredSubscription?.packagePrice}
                          Tk (12 month)
                        </p>
                        <p className=" text-md lg:text-lg">
                          {" "}
                          Total:
                          <span className="mx-1">
                            {(
                              Number(template?.price) *
                                Number(template?.quantity) +
                              Number(filteredSubscription.packagePrice) *
                                Number(template?.quantity)
                            ).toFixed(2)}
                          </span>
                        </p>
                      </div>
                      <div className="border-l  p-3 flex flex-col items-center justify-around md:justify-between">
                        <button
                          className="bg-blue-700 hover:bg-blue-800  px-[5px] py-1 text-white rounded"
                          onClick={() => handleAddToCart(template)}
                        >
                          <HiOutlinePlus size="20" />
                        </button>
                        <button
                          className="bg-blue-700 hover:bg-blue-800  px-[5px] py-1 text-white rounded"
                          onClick={() => decreaseCount(template)}
                        >
                          <HiMinus className="cursor-pointer" size="20" />
                        </button>
                        <div className="bg-red-500 hover:bg-red-600  px-[5px] py-1 text-white rounded cursor-pointer">
                          <RiDeleteBin6Line
                            onClick={() => deleteItemFromCart(template)}
                            size="20"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {templates?.length > 0 ? (
                <div>
                  <div className="space-y-1 text-right mt-10">
                    <p>
                      Total amount:
                      <span className="font-semibold mx-2 tracking-wide">
                        {/* Ensure that total is calculated appropriately */}
                        {total}
                      </span>
                    </p>
                    <p className="text-sm dark:text-gray-400">
                      Not including taxes and shipping costs
                    </p>
                  </div>
                  <div className="flex justify-end space-x-4 my-5">
                    <button
                      type="button"
                      className="px-6 py-2 border rounded-md hover:bg-red-500 dark:text-gray-900 border-red-500 ease-in duration-150"
                    >
                      Back
                      <span className="sr-only sm:not-sr-only"> to shop</span>
                    </button>
                    <Link
                      to={"/checkout"}
                      type="button"
                      className="px-6 py-2 rounded-md bg-red-500 hover:bg-red-600 ease-in duration-150"
                    >
                      <span className="sr-only sm:not-sr-only">
                        Continue to{" "}
                      </span>
                      Checkout
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-center mt-5 text-red-400">
                  Your Cart is Empty
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
