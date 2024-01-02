/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../utilities/api";
import Loading from "../../Shared/Loading/Loading";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { useForm } from "react-hook-form";

const CheckOut = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { templates } = useSelector((state) => state.cart);
  const [method, setMethod] = useState("");
  const token = localStorage.getItem("access-token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [paymentOptions, setPaymentOptions] = useState([]);

  // useEffect(() => {
  //   api
  //     .get(`/customers/${user?.customer}`, {
  //       headers: {
  //         authorization: `${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setCustomer(res?.data?.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [user?.customer, token]);

  // console.log("customer", customer);

  useEffect(() => {
    if (token) {
      setLoading(true);
      api
        .get(`/subscriptions`, {
          headers: {
            authorization: `${token}`,
          },
        })
        .then((res) => {
          setSubscriptions(res.data.data);
          // console.log(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      api
        .get(`/payment-options`, {
          headers: {
            authorization: `${token}`,
          },
        })
        .then((res) => {
          setPaymentOptions(res.data.data);
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  const filteredSubscription = subscriptions?.find(
    (subscription) => parseInt(subscription.duration.split(" ")[0]) === 12
  ) ?? { packagePrice: 0 }; // Provide a default subscription with packagePrice as 0 if not found

  const total = templates.reduce((acc, template) => {
    const templatePrice = Number(template.price);
    const templateQuantity = Number(template.quantity);

    const templateSubTotal = templatePrice * templateQuantity;

    // Include the subscription's price in the total calculation
    acc +=
      templateSubTotal + filteredSubscription?.packagePrice * templateQuantity;

    return acc;
  }, 0);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleManualPayment = (data) => {
    console.log(data);
  };

  const pppp = paymentOptions.find(
    (number) => number.paymentMethod == method
  )?.paymentNumber;

  console.log("pppp", pppp);

  return (
    <div classNameName="py-44">
      {loading ? (
        <Loading />
      ) : (
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 pt-20">
          <div className="px-4 pt-8">
            <p className="text-2xl font-medium">Order Summary</p>
            <p className="">
              Check your items. And select a suitable shipping method.
            </p>
            <div className="mt-8 space-y-3 rounded-lg border  px-2 py-4 sm:px-6">
              {/* <div className="flex flex-col rounded-lg sm:flex-row">
            <img
              className="m-2 h-24 w-28 rounded-md border object-cover object-center"
              src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=htmlFormat&fit=crop&w=500&q=60"
              alt=""
            />
            <div className="flex w-full flex-col px-4 py-4">
              <span className="font-semibold">
                Nike Air Max Pro 8888 - Super Light
              </span>
              <span className="float-right ">42EU - 8.5US</span>
              <p className="text-lg font-bold">$138.99</p>
            </div>
          </div> */}

              {templates.map((template, i) => (
                <div key={i} className="flex flex-col rounded-lg  sm:flex-row">
                  <img
                    className="m-2 h-36 w-44 rounded-md border object-cover object-center"
                    src={template?.templateId?.templateImages?.[0]?.imageUrl}
                    alt=""
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold capitalize tracking-wider">
                      {template?.templateId?.templateName}
                      <p className="text-xs mb-3">
                        Price: {Number(template?.price)}{" "}
                      </p>
                    </span>
                    <span className="float-right text-sm tracking-wider ">
                      Quantity : {template?.quantity}
                    </span>

                    <p className="text-xs ">
                      Subscription Fee: {filteredSubscription?.packagePrice}
                      <span> Tk (12 month)</span>
                    </p>

                    <p className=" text-lg font-bold mt-2">
                      {/* Total: {template?.price}  */}
                      Total:{" "}
                      {(
                        Number(template?.price) * Number(template?.quantity) +
                        Number(filteredSubscription.packagePrice) *
                          Number(template?.quantity)
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              {/* <div className="flex flex-col rounded-lg  sm:flex-row">
            <img
              className="m-2 h-24 w-28 rounded-md border object-cover object-center"
              src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=htmlFormat&fit=crop&w=500&q=60"
              alt=""
            />
            <div className="flex w-full flex-col px-4 py-4">
              <span className="font-semibold">
                Nike Air Max Pro 8888 - Super Light
              </span>
              <span className="float-right ">42EU - 8.5US</span>
              <p className="mt-auto text-lg font-bold">$238.99</p>
            </div>
          </div> */}
            </div>

            <p className="mt-8 text-lg font-medium">Shipping Methods</p>
            <htmlForm className="my-5 grid gap-6">
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_1"
                  type="radio"
                  name="radio"
                  checked
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-500 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_1"
                >
                  <img
                    className="w-14 object-contain"
                    src="https://i.insider.com/5f5bdd1a7ed0ee001e25eed8?width=700"
                    alt=""
                  />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Fedex Delivery</span>
                    <p className=" text-sm leading-6">Delivery: 2-4 Days</p>
                  </div>
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_2"
                  type="radio"
                  name="radio"
                  checked
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-500 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_2"
                >
                  <img
                    className="w-14 object-contain"
                    src="https://i.insider.com/5f5bdd1a7ed0ee001e25eed8?width=700"
                    alt=""
                  />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Fedex Delivery</span>
                    <p className=" text-sm leading-6">Delivery: 2-4 Days</p>
                  </div>
                </label>
              </div>
            </htmlForm>
          </div>
          <div className="mt-10  px-4 pt-8 lg:mt-0">
            <p className="text-2xl font-medium">Payment Details</p>
            <p className="">
              Complete your order by providing your payment details.
            </p>
            <form onSubmit={handleSubmit(handleManualPayment)} className="">
              <div>
                <label
                  htmlFor="email"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    {...register("email", {
                      required: "Email is required ",
                    })}
                    type="email"
                    // value={user?.userEmail}
                    className="w-full   bg-black rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-red-500 focus:ring-red-500"
                    placeholder="your.email@gmail.com"
                  />

                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mt-4 mb-2 block text-sm font-medium">
                  Name
                </label>
                <div className="relative">
                  <input
                    {...register("name", {
                      required: "Name is required ",
                    })}
                    type="text"
                    className="w-full bg-black valid:bg-black rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-red-500 focus:ring-red-500"
                    placeholder="Your full name here"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                      />
                    </svg>
                  </div>
                </div>

                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name?.message}
                  </p>
                )}
              </div>

              <div className="my-4">
                <label className="mb-2 block text-sm font-medium">
                  Select Payment Method
                </label>
                <select
                  {...register("paymentMethod", {
                    required: "Payment Method is required ",
                  })}
                  onChange={(e) => setMethod(e.target.value)}
                  type="text"
                  className="w-full rounded-md border border-gray-200 bg-black text-gray-300 uppercase px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-red-500 focus:ring-red-500"
                >
                  <option value={""}>Select Payment Method?</option>
                  {paymentOptions.map((option, i) => (
                    <option key={i} value={option?.paymentMethod}>
                      {option?.paymentMethod}
                    </option>
                  ))}
                </select>
                {errors.paymentMethod && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.paymentMethod?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mt-4 mb-2 block text-sm font-medium">
                  Payment Number
                </label>
                <div className="relative">
                  {console.log(
                    method &&
                      paymentOptions.find(
                        (number) => number?.paymentMethod === method
                      )?.paymentNumber
                  )}
                  <input
                    defaultValue={
                      method &&
                      paymentOptions.find(
                        (number) => number?.paymentMethod === method
                      )?.paymentNumber
                    }
                    className="w-full bg-black rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-red-500 focus:ring-red-500"
                    placeholder="Select Method First"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <HiDevicePhoneMobile />
                  </div>
                </div>
              </div>

              <div>
                <label className="mt-4 mb-2 block text-sm font-medium">
                  Transaction ID
                </label>
                <div className="relative">
                  <input
                    {...register("transactionNumber", {
                      required: "Transaction Number is required",
                    })}
                    type="text"
                    className="w-full bg-black rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-red-500 focus:ring-red-500"
                    placeholder="TrxID"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                      />
                    </svg>
                  </div>
                </div>
                {errors.transactionNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.transactionNumber?.message}
                  </p>
                )}
              </div>

              {/* <div>
                <label
                  htmlFor="card-holder"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Select Payment Method
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="card-holder"
                    name="card-holder"
                    className="w-full bg-black rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-red-500 focus:ring-red-500"
                    placeholder="Select Payment Method"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div> */}

              {/* <label
            htmlFor="card-no"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Card Details
          </label>
           <div className="flex">
            <div className="relative w-7/12 flex-shrink-0">
              <input
                type="text"
                id="card-no"
                name="card-no"
                className="w-full bg-black rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-red-500 focus:ring-red-500"
                placeholder="xxxx-xxxx-xxxx-xxxx"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  className="h-4 w-4 "
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                </svg>
              </div>
            </div>
            <input
              type="text"
              name="credit-expiry"
              className="w-full bg-black rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-red-500 focus:ring-red-500"
              placeholder="MM/YY"
            />
            <input
              type="text"
              name="credit-cvc"
              className="w-1/6 bg-black flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-red-500 focus:ring-red-500"
              placeholder="CVC"
            />
         
         
         
          </div> */}

              <div>
                <label className="mt-4 mb-2 block text-sm font-medium">
                  Billing Address
                </label>
                <div className="flex flex-col sm:flex-row">
                  <div className="relative flex-shrink-0 sm:w-7/12">
                    <input
                      {...register("billingAddress", {
                        required: "Billing Address is required",
                      })}
                      type="text"
                      className="w-full bg-black rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-red-500 focus:ring-red-500"
                      placeholder="Street Address"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <img
                        className="h-5 w-5 object-contain"
                        src="https://media.istockphoto.com/id/1132350508/photo/bangladesh-flag-on-canvas.jpg?s=612x612&w=0&k=20&c=QdNQjaEiY3sQy6x2PTI1YigXa-Fz_lBEC9wXZjsK-1o="
                        alt=""
                      />
                    </div>
                  </div>
                  <input
                    {...register("state", {
                      required: "state is required",
                    })}
                    type="text"
                    className="w-full bg-black rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-red-500 focus:ring-red-500"
                    placeholder="State"
                  />
                  <input
                    {...register("zip", {
                      required: "zip is required",
                    })}
                    type="text"
                    className="flex-shrink-0 bg-black rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-red-500 focus:ring-red-500"
                    placeholder="ZIP"
                  />
                </div>
                {errors.billingAddress && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.billingAddress?.message}
                  </p>
                )}{" "}
                {errors.state && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.state?.message}
                  </p>
                )}{" "}
                {errors.zip && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.zip?.message}
                  </p>
                )}
              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium ">Subtotal</p>
                  <p className="font-semibold ">{total}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium ">Shipping</p>
                  <p className="font-semibold ">0.00</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium ">Total</p>
                <p className="text-2xl font-semibold ">{total}</p>
              </div>
              <button className="mt-4 mb-8 w-full rounded-md bg-red-500 px-6 py-3 font-medium text-white hover:bg-red-600 transition duration-150 ease-in">
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOut;
