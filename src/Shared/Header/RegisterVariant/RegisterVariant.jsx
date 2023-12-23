import { Link } from "react-router-dom";

const RegisterVariant = () => {
  return (
    <div className="flex flex-col justify-center items-start  bg-gray-100 w-[175px] my-[18px]">
      <Link
        className="text-[#37425c] hover:text-white hover:bg-[#363636] text-sm p-2 border-b  w-[175px]"
        to={"/"}
      >
        Customer Registration
      </Link>
      <Link
        className="text-[#37425c] hover:text-white hover:bg-[#363636] text-sm p-2 border-b  w-[175px]"
        to={"/"}
      >
        Member Registration
      </Link>
    </div>
  );
};

export default RegisterVariant;
