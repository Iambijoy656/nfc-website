import { HiMinus, HiOutlinePlus } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  removeOne,
} from "../../redux/features/cart/cartSlice";

const CartDrawer = () => {
  const { templates, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  console.log(templates);

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
              <RxCross2 className="text-xl hover:text-red-500" />
            </label>
            <h2 className="text-center text-xl font-semibold my-5 tracking-wide">
              Cart Item
            </h2>
            <div className="">
              {templates.map((template, i) => (
                <>
                  <div key={i} className="space-y-5 my-1 ">
                    <div className="border h-36 md:h-44 p-1 md:p-4 flex justify-between rounded-md">
                      <div className="border-r pr-2 md:pr-5 shrink-0">
                        <img
                          src={template?.templateImages[0]?.imageUrl}
                          alt=""
                          className="h-full w-20 md:w-full "
                        />
                      </div>
                      <div className="px-2 w-full flex flex-col items-center gap-3">
                        <h1 className="word-wrap text-lg text-center capitalize ">
                          {template?.templateName}
                        </h1>
                        <p>Quantity: {template?.quantity}</p>
                        <p className=" text-md lg:text-lg">
                          Total Price:{" "}
                          {(
                            Number(template?.price) * Number(template?.quantity)
                          ).toFixed(2)}
                        </p>
                      </div>
                      <div className="border-l p-3 flex flex-col items-center justify-around md:justify-between">
                        <button
                          className="bg-blue-700 hover:bg-blue-800  px-[5px] py-1 text-white rounded"
                          onClick={() => dispatch(addToCart(template))}
                        >
                          <HiOutlinePlus size="20" />
                        </button>
                        <button
                          className="bg-blue-700 hover:bg-blue-800  px-[5px] py-1 text-white rounded"
                          onClick={() => dispatch(removeOne(template))}
                        >
                          <HiMinus size="20" />
                        </button>
                        <div className="bg-red-500 hover:bg-red-600  px-[5px] py-1 text-white rounded">
                          <RiDeleteBin6Line
                            onClick={() => dispatch(removeFromCart(template))}
                            size="20"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
              <div>
                <div className="space-y-1  text-right mt-10">
                  <p>
                    Total amount:
                    <span className="font-semibold mx-2 tracking-wide">{total}</span>
                  </p>
                  <p className="text-sm dark:text-gray-400">
                    Not including taxes and shipping costs
                  </p>
                </div>
                <div className="flex justify-end space-x-4 my-2">
                  <button
                    type="button"
                    className="px-6 py-2 border rounded-md dark:border-violet-400"
                  >
                    Back
                    <span className="sr-only sm:not-sr-only">to shop</span>
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 border rounded-md dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400"
                  >
                    <span className="sr-only sm:not-sr-only">Continue to</span>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
