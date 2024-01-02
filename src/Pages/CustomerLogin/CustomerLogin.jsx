import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeSlashFill } from "react-icons/bs";
import { ImEye } from "react-icons/im";
import api from "../../utilities/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// import { useDispatch } from "react-redux";
// import { userData } from "../../redux/Feathers/userData/userDataSlice";
import Swal from "sweetalert2";

const CustomerLogin = () => {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passShow, setPassShow] = useState(false);

  const rootLink = window.location.href;
  const url = new URL(rootLink);
  const baseUrl = `${url.protocol}//${url.host}`;
  //   console.log("baseUrl", baseUrl);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleCustomerLogin = async (data) => {
    const CustomerLogin = {
      email: data.email,
      password: data.password,
    };

    api
      .post("/auth/login", CustomerLogin)
      .then((res) => {
        // console.log(res.data);
        const token = res.data.data.others.accessToken;
        // console.log('token', token);
        // console.log(res.data.data.verifiedUser);

        // console.log("customer login", res?.data?.data?.verifiedUser?.role);

        if (
          res.data.statusCode === 200 &&
          res?.data?.data?.verifiedUser?.role === "customer"
        ) {
          //   dispatch(userData(res.data.data.verifiedUser));

          localStorage.setItem("access-token", token);
          localStorage.setItem(
            "user",
            JSON.stringify(res.data.data.verifiedUser)
          );
          toast.success(res.data.message.slice(4));
          navigate("/customer-profile");
        } else {
          toast.error("You are not a Customer");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const handleForgotPass = async () => {
    const { value: email } = await Swal.fire({
      title: "Input email address",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address",
    });

    const userEmail = {
      email: email,
      baseUrl: baseUrl,
    };

    api
      .post("/reset/forgot-password", userEmail)
      .then(() => {
        // Swal.fire(
        //   "Password Reset successfully!",
        //   "Please check your email.",
        //   "success"
        // );
      })
      .catch(() => {
        Swal.fire(`Failed Reset password`);
      });
  };

  return (
    <div>
      <div className="flex justify-center items-center h-fit pt-24 pb-10">
        <div className=" w-11/12 md:w-3/6 lg:w-2/6 ">
          <h2 className="text-2xl md:text-3xl py-8 font-semibold text-center text-white capitalize">
            Customer Login
          </h2>
          <form
            className="bg-[#363636] p-2 md:p-12 rounded-md w-full"
            onSubmit={handleSubmit(handleCustomerLogin)}
          >
            <div className="flex flex-col mb-2  gap-3  ">
              <div className="form-control w-full ">
                <label className="   text-xs my-2">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="input  border  rounded-md  w-full p-2  text-sm focus:outline-none bg-[#232323] focus:border-[#ef4444]"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="form-control w-full ">
                <div className="relative">
                  <div className="flex justify-between">
                    <label className="   text-xs my-2">Password</label>
                    <label
                      onClick={handleForgotPass}
                      className="   cursor-pointer text-xs my-2"
                    >
                      Forgot Password
                    </label>
                  </div>
                  <input
                    type={passShow ? "text" : "password"}
                    {...register("password", {
                      required: true,
                      pattern: /^(?!(<[^>]?>)|(<script.?>)).*$/,
                    })}
                    className="input  border  rounded-md  w-full p-2  text-sm focus:outline-none bg-[#232323] focus:border-[#ef4444]"
                    placeholder="password.."
                  />
                  <p
                    onClick={() => setPassShow(!passShow)}
                    className=" absolute right-5 top-[48px] cursor-pointer text-gray-600 cursor-pointer "
                  >
                    {passShow ? <BsEyeSlashFill /> : <ImEye />}
                  </p>
                </div>
                {errors.password?.type === "required" && (
                  <small className="text-red-500 text-xs mt-1">
                    Password is required
                  </small>
                )}
                {errors.password?.type === "pattern" && (
                  <small className="text-red-500  text-xs mt-1">
                    Password is not valid
                  </small>
                )}
              </div>
            </div>

            <div className="text-center mt-5">
              <input
                className="  p-2 bg-[#232323] rounded outline outline-1 outline-white hover:bg-[#ef4444] text-white mt-4 w-full md:w-4/6 cursor-pointer  hover:bg-[#363636] ease-in duration-150"
                value=" Login"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CustomerLogin;
