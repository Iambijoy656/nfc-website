import { Link } from "react-router-dom";

const LoginVariant = () => {
  return (
    <div className="flex flex-col justify-center items-start  bg-gray-100 w-[150px] my-[18px]">
      <Link
        className="text-[#37425c] hover:text-white hover:bg-[#363636] text-sm p-2 border-b  w-[150px]"
        to={"/"}
      >
        Customer Login
      </Link>
      <Link
        className="text-[#37425c] hover:text-white hover:bg-[#363636] text-sm p-2 border-b  w-[150px]"
        to={"/"}
      >
        Member Login
      </Link>
    </div>
  );
};

export default LoginVariant;
