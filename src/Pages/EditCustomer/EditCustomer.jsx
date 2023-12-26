import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillCamera } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../utilities/api";
import imageUploader from "../../utilities/imageUploader";
import imageDestroyer from "../../utilities/imageDestroyer";

const EditCustomer = () => {
  const [customerData, setCustomerData] = useState({});
  const [socialLink, setSocialLink] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();
  const token = localStorage.getItem("access-token");

  const addSocialMedia = () => {
    const newForm = { name: "", link: "" };
    setSocialLink([...socialLink, newForm]);
  };
  const updateSocialMedia = (formIndex, fieldName, value) => {
    const updatedForms = [...socialLink];
    updatedForms[formIndex][fieldName] = value;
    setSocialLink(updatedForms);
  };
  const removeSocialMedia = (formIndex) => {
    const updatedForms = [...socialLink];
    updatedForms.splice(formIndex, 1);
    setSocialLink(updatedForms);
  };

  useEffect(() => {
    api
      .get(`/customers/${id}`, {
        headers: {
          authorization: `${token}`,
        },
      })
      .then((res) => {
        setCustomerData(res.data.data);
        res?.data?.data?.socialMedia &&
          setSocialLink(res.data.data.socialMedia);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, token]);

  const [profileImg, setProfileImg] = useState("");

  const {
    register,
    // formState: { errors },
    handleSubmit,
  } = useForm();

  // const handleImageUpload = (e) => {
  //   const image = e.target.files;
  //   console.log(image);
  //   const imgsrc = URL.createObjectURL(image[0]);
  //   console.log(imgsrc);
  //   setProfileImg(imgsrc);
  // };

  const handleProfile = (data) => {
    data.profileImage = profileImg;
    const updateData = {
      name: {
        firstName: data?.firstName
          ? data.firstName
          : customerData?.name?.firstName,
        lastName: data?.lastName ? data.lastName : customerData?.name?.lastName,
      },
      email: data?.email ? data.email : customerData.email,
      contactNo: data?.contactNo ? data.contactNo : customerData.contactNo,
      passportNo: data?.passportNo ? data.passportNo : customerData.passportNo,
      presentAddress: data?.presentAddress
        ? data.presentAddress
        : customerData.presentAddress,

      profileImage: profileImg ? profileImg : customerData.profileImage,
      description: data?.description
        ? data?.description
        : customerData.description,
      socialMedia: socialLink,
    };

    console.log(updateData);

    api
      .patch(`/customers/${id}`, updateData, {
        headers: {
          authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.statusCode === 200) {
          toast.success("Update Successfully");
          navigate("/customer-profile");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function handleImageUpload(event) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      //   console.log(file);
      const { imageUrl } = await imageUploader(file);
      setProfileImg(imageUrl);
    }
  }

  return (
    <div className="pt-20 pb-10">
      <div className="  border border-gray-400 shadow-md m-4 p-2 lg:px-10 rounded-lg lg:py-5">
        <form
          className="user_form w-full"
          onSubmit={handleSubmit(handleProfile)}
        >
          <div className="grid grid-cols-2 mt-3 mb-8">
            {profileImg ? (
              <div className="relative w-20 mb-3">
                <img
                  width={70}
                  height={70}
                  src={profileImg}
                  alt={profileImg}
                  className="rounded-full object-cover aspect-square"
                />
                <div
                  className="bg-[#E3E9EF] hover:bg-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#ffffff49] smooth cursor-pointer absolute bottom-0 right-0"
                  onClick={async () => {
                    await imageDestroyer(profileImg), setProfileImg("");
                  }}
                >
                  <RxCross2
                    size={20}
                    className="hover:text-red-500 text-[#0f3460] "
                  />
                </div>
                {/* <input
                type="file"
                id="imageInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              /> */}
              </div>
            ) : (
              <div className="relative w-20 mb-3">
                <img
                  width={70}
                  height={70}
                  src={
                    customerData?.profileImage
                      ? customerData?.profileImage
                      : "https://ik.imagekit.io/maynuddin/ecommerce-frontend/profileImg.webp"
                  }
                  // src={
                  //   "https://ik.imagekit.io/maynuddin/ecommerce-frontend/profileImg.webp"
                  // }
                  alt="profileImg.webp"
                  className="rounded-full aspect-square"
                />
                <div
                  className="bg-[#E3E9EF]  w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#ffffff49] smooth cursor-pointer absolute bottom-0 right-0"
                  onClick={() => document.getElementById("imageInput").click()}
                >
                  <AiFillCamera size={20} color="#0f3460" />
                </div>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </div>
            )}
            <div className="col-span-5">
              <label className="block text-xs mb-1">About Me</label>
              <textarea
                {...register("description")}
                defaultValue={customerData?.description}
                className="textarea textarea-bordered rounded-md   focus:outline-none bg-[#232323] focus:border-[#ef4444] w-full py-3 px-3 border border-gray-600 "
                placeholder="Bio"
              ></textarea>
              {/* <input
                placeholder="profession"
                defaultValue={customerData?.profession}
                type="textarea"
                {...register("profession")}
                className="rounded-md focus:outline-none focus:border-primary  w-full py-2 px-3 border border-gray-300 text-black"
              /> */}
            </div>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mt-3">
            <div>
              <label className="block text-xs  mb-1 ">First Name</label>
              <input
                placeholder="First Name"
                defaultValue={customerData?.name?.firstName}
                type="text"
                {...register("firstName")}
                className="rounded-md  focus:outline-none bg-[#232323] focus:border-[#ef4444]  w-full py-2 px-3 border border-gray-600  "
              />
            </div>
            <div>
              <label className="block text-xs  mb-1">Last Name</label>
              <input
                placeholder="Last Name"
                type="text"
                {...register("lastName")}
                defaultValue={customerData?.name?.lastName}
                className="rounded-md  focus:outline-none bg-[#232323] focus:border-[#ef4444]  w-full py-2 px-3 border border-gray-600  "
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mt-3">
            <div>
              <label className="block text-xs  mb-1">Email</label>
              <input
                placeholder="Email"
                defaultValue={customerData?.email}
                type="email"
                {...register("email")}
                disabled
                className="rounded-md  focus:outline-none bg-[#232323] focus:border-[#ef4444]  w-full py-2 px-3 border border-gray-600 "
              />
            </div>
            <div>
              <label className="block text-xs  mb-1">Contact No</label>
              <input
                {...register("contactNo")}
                defaultValue={customerData?.contactNo}
                placeholder="Contact Number"
                type="text"
                className="rounded-md  focus:outline-none bg-[#232323] focus:border-[#ef4444]  w-full py-2 px-3 border border-gray-600  "
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mt-3">
            <div>
              <label className="block text-xs mb-1">Present Address</label>
              <input
                placeholder="Present Address"
                {...register("presentAddress")}
                defaultValue={customerData?.presentAddress}
                type="text"
                className="rounded-md  focus:outline-none bg-[#232323] focus:border-[#ef4444]  w-full py-2 px-3 border border-gray-600  "
              />
            </div>
          </div>{" "}
          {/*  Social Media  start */}
          {/* 1st div */}
          {/* Render multiple media forms */}
          <div className="mt-12">
            {socialLink?.map((form, index) => (
              <div
                className=" grid lg:grid-cols-1 grid-cols-1gap-5 mt-3"
                key={index}
              >
                <div className="grid grid-cols-12  justify-center items-center w-full   gap-6">
                  <div className="flex  flex-col  col-span-12  lg:col-span-6">
                    <label className="block text-xs     mb-1">
                      Social Media Name {index + 1}
                    </label>
                    <select
                      value={form.name}
                      onChange={(e) =>
                        updateSocialMedia(index, "name", e.target.value)
                      }
                      className="rounded-md  focus:outline-none bg-[#232323] focus:border-[#ef4444]  w-full py-2 px-3 border border-gray-600  "
                      required={true}
                    >
                      <option value="">Select one</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Twitter">Twitter</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="YouTube">YouTube</option>
                    </select>
                  </div>
                  <div className=" col-span-12  lg:col-span-6">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs     mb-1">
                        link {index + 1}
                      </label>

                      <RxCross2
                        size={16}
                        className="text-red-700 cursor-pointer"
                        onClick={() => removeSocialMedia(index)}
                      />
                    </div>
                    <input
                      // {...register(`link-${index+1}`)}
                      type="text"
                      placeholder="put your link"
                      value={form.link}
                      onChange={(e) =>
                        updateSocialMedia(index, "link", e.target.value)
                      }
                      className="rounded-md  focus:outline-none bg-[#232323] focus:border-[#ef4444]  w-full py-2 px-3 border border-gray-600  "
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-10 mb-5">
            <button
              className="font-medium text-[15px]   text-gray-100  bg-transparent outline outline-1 outline-red-500 p-2 rounded hover:bg-red-500  transition duration-150"
              type="button"
              onClick={addSocialMedia}
            >
              Add Social Media
            </button>
          </div>
          {/* Social Media  end */}
          <button
            type="submit"
            className="font-medium text-[15px] border-none outline-none  text-gray-100  bg-transparent  bg-red-500 p-2 rounded hover:bg-red-600  transition duration-150"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCustomer;
