const OrderSetup = () => {
  return (
    <div className="my-12 container mx-auto">
      <h2 className="text-4xl text-center font-medium mb-8">Order and Setup</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-5 ">
        <div className="  bg-[#363636] rounded-lg flex justify-center items-center  shadow-xl h-44  ">
          <h1 className="text-5xl px-8 ">1</h1>
          <div className="divider divider-horizontal bg-white max-w-[2px]"></div>
          <div className="  p-2 ">
            <h2 className="text-xl tracking-wide">Order</h2>
            <p className="text-sm">
              Just place an order form website or contact on WhatsApp:{" "}
              <span className="text-blue-500">{"+8808723656985"}</span>
            </p>
          </div>
        </div>
        <div className=" bg-[#363636] rounded-lg flex justify-center items-center  shadow-xl h-44  ">
          <h1 className="text-5xl px-8">2</h1>
          <div className="divider divider-horizontal bg-white max-w-[2px]"></div>
          <div className=" p-2 ">
            <h2 className="text-xl tracking-wide">Design</h2>
            <p className="text-sm">
              Designed with your own logo, colors, fonts and branding. Front and
              back side are customizable.
            </p>
          </div>
        </div>
        <div className=" bg-[#363636] rounded-lg flex justify-center items-center  shadow-xl h-44  ">
          <h1 className="text-5xl px-8">3</h1>
          <div className="divider divider-horizontal bg-white max-w-[2px]"></div>
          <div className=" p-2">
            <h2 className="text-xl tracking-wide">Setup</h2>
            <p className="text-sm">
              After receiving the card, You can setup your own profile yourself.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSetup;
