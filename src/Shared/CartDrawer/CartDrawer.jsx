import { HiMinus, HiOutlinePlus } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const CartDrawer = () => {
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
            <div className="space-y-5 ">
              <div className="border h-36 md:h-44 p-1 md:p-4 flex justify-between rounded-md">
                <div className="border-r pr-2 md:pr-5 shrink-0">
                  <img
                    src={
                      "https://res.cloudinary.com/dov60yweq/image/upload/f_webp/High-Quality-Good-Print-PVC-NFC-Carte-Card-with-Unique-Qr-Code-and-NFC-Programming_1_n3yfeo"
                    }
                    alt=""
                    className="h-full w-20 md:w-full "
                  />
                </div>
                <div className="px-2 w-full flex flex-col items-center gap-3">
                  <h1 className="word-wrap text-sm text-center ">
                    {"product?.name ?.name ?.name i8erfyeiur rrrr"}
                  </h1>
                  <p>Quantity: {"00"}</p>
                  <p className=" text-md lg:text-lg">Total Price: {0}$</p>
                </div>
                <div className="border-l p-3 flex flex-col items-center justify-around md:justify-between">
                  <button
                    className="bg-blue-700 hover:bg-blue-800  px-[5px] py-1 text-white rounded"
                    // onClick={() => dispatch(addToCart(product))}
                  >
                    <HiOutlinePlus size="20" />
                  </button>
                  <button
                    className="bg-blue-700 hover:bg-blue-800  px-[5px] py-1 text-white rounded"

                    // onClick={() => dispatch(removeOne(product))}
                  >
                    <HiMinus size="20" />
                  </button>
                  <div className="bg-red-500 hover:bg-red-600  px-[5px] py-1 text-white rounded">
                    <RiDeleteBin6Line
                      // onClick={() => dispatch(removeFromCart(product))}
                      size="20"
                    />
                  </div>
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
