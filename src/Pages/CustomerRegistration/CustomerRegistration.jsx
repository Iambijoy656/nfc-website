import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeSlashFill } from "react-icons/bs";
import { ImEye } from "react-icons/im";
import api from "../../utilities/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CustomerRegistration = () => {
  const [passShow, setPassShow] = useState(false);
  const [confirmPassShow, setNewPassShow] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleCustomerRegistration = (data) => {
    if (data.confirmPassword !== data.password) {
      return toast.error("password & confirm Password did not match");
    }
    const password = data.password;

    const customer = {
      // name: {
      //   firstName: data.firstName,
      //   lastName: data.lastName,
      // },
      email: data.email,
      contactNo: data.contactNo,
    };

    const userData = {
      password,
      customer,
    };

    api
      .post("/user/create-customer", userData)
      .then((res) => {
        console.log(res.data);
        // toast.success(res?.data?.message);
        toast.success("Verify your email");
        navigate("/customer-login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Please try again");
        // toast.error(err.response.data.errorMessages[0].message.slice(0, 16));
        // console.log(err.response.data.errorMessages[0].message.slice(80));
        // toast.error(
        //   "Duplicate Error:",
        //   err.response.data.errorMessages[0].message.slice(80)
        // );
        // const errorMessage = err.response.data.errorMessages[0].message.slice(80);
        // // setLoginError(errorMessage);
        // Swal.fire({
        //   icon: "error",
        //   title: "Duplicate Error",
        //   text: errorMessage,
        // });

        // console.log(err.response.data);
      });

    // try {
    //   fetch(`https://rent-home-server.vercel.app/users`, {
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //     body: JSON.stringify(userData),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.message) {
    //         navigate("/");
    //       }
    //       if (data.acknowledged) {
    //         toast.success("CustomerRegistration successfully");
    //         navigate("/");
    //       }
    //     });

    // } catch (error) {
    //   console.log(error)
    // }
  };
  return (
    <div className="flex justify-center items-center h-fit pt-24 pb-10 ">
      <div className=" w-11/12 md:w-3/6 lg:w-2/6 ">
        <h2 className="text-2xl md:text-3xl py-8 font-semibold text-center text-white capitalize">
          Customer Registration
        </h2>
        <form
          className=" bg-[#363636] p-2 md:p-12 rounded-md w-full"
          onSubmit={handleSubmit(handleCustomerRegistration)}
        >
          {/* <div className="flex flex-col  mb-2 gap-3">
              <div className="form-control w-full ">
                <label className="  text-xs my-2">
                  First Name
                </label>
                <input
                  type="text"
                  {...register("firstName", {
                    required: "First Name  is required",
                  })}
                  className="input border rounded-md  w-full p-2  text-sm focus:outline-none bg-[#232323] focus:border-[#ef4444]"
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName?.message}
                  </p>
                )}
              </div>
              <div className="form-control w-full ">
                <label className="  text-xs my-2">
                  Last name
                </label>
                <input
                  type="text"
                  {...register("lastName", {
                    required: "Last Name  is required",
                  })}
                  className="input  border  rounded-md  w-full p-2  text-sm focus:outline-none bg-[#232323] focus:border-[#ef4444]"
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName?.message}
                  </p>
                )}
              </div>
            </div> */}
          <div className="flex flex-col mb-2  gap-3  ">
            <div className="form-control w-full ">
              <label className="  text-xs my-2">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email  is required",
                })}
                className="input  border  rounded-md  w-full p-2  text-sm focus:outline-none bg-[#232323] focus:border-[#ef4444] "
                placeholder="example@gmail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>

            <div className="form-control w-full ">
              <label className="  text-xs my-2">Contact No.</label>
              <input
                type="number"
                {...register("contactNo", {
                  required: "Contact No  is required",
                })}
                className="input  border  rounded-md  w-full p-2  text-sm focus:outline-none bg-[#232323] focus:border-[#ef4444]"
                placeholder="Contact No.."
              />
              {errors.contactNo && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.contactNo?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full">
              <div className="relative">
                <label className=" text-xs my-2">Password</label>
                <input
                  type={passShow ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password should be at least six characters",
                    },
                    maxLength: {
                      value: 16,
                      message: "Maximum length exceeded",
                    },
                    pattern: {
                      value:
                        /(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*/,
                      message:
                        "Your password must contain at least one letter and one special character.",
                    },
                  })}
                  className="input border rounded-md w-full p-2 text-sm focus:outline-none bg-[#232323] focus:border-[#ef4444]"
                  placeholder="Password..."
                />
                <p
                  onClick={() => setPassShow(!passShow)}
                  className="absolute right-6 top-9 cursor-pointer text-gray-600"
                >
                  {passShow ? <BsEyeSlashFill /> : <ImEye />}
                </p>
              </div>
              {errors.password && (
                <small className="text-error mt-2">
                  {errors.password.message}
                </small>
              )}
            </div>
            <div className="form-control w-full ">
              <div className="relative">
                <label className="  text-xs my-2">Confirm Password</label>
                <input
                  type={confirmPassShow ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: true,
                    pattern: {
                      value:
                        /(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*/,
                      message:
                        "Your password must contain at least one letter and one special character.",
                    },
                  })}
                  className="input  border   rounded-md  w-full p-2  text-sm focus:outline-none bg-[#232323] focus:border-[#ef4444]"
                  placeholder="Confirm Password.."
                />
                <p
                  onClick={() => setNewPassShow(!confirmPassShow)}
                  className=" absolute right-6 top-9 cursor-pointer text-gray-600 "
                >
                  {confirmPassShow ? <BsEyeSlashFill /> : <ImEye />}
                </p>
              </div>
              {errors.confirmPassword?.type === "required" && (
                <small className="text-red-500 text-xs mt-1">
                  Confirm Password is required
                </small>
              )}
              {errors.confirmPassword && (
                <small className="text-red-500  text-xs mt-1">
                  {errors.confirmPassword.message}
                </small>
              )}
            </div>
          </div>{" "}
          <div className="text-center mt-5">
            <input
              className="  p-2 bg-[#232323] rounded outline outline-1 outline-white hover:bg-[#ef4444] text-white mt-4 w-full md:w-4/6 cursor-pointer  hover:bg-[#363636] ease-in duration-150"
              value="Registration"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerRegistration;
