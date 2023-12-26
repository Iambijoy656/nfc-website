import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utilities/api";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Loading from "../../Shared/Loading/Loading";

const CustomerProfile = () => {
  const [loading, setLoading] = useState(true);

  const [customer, setCustomer] = useState({});

  const token = localStorage.getItem("access-token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (token) {
      if (user?.role === "customer") {
        setLoading(true);
        api
          .get(`/customers/${user?.customer}`, {
            headers: {
              authorization: `${token}`,
            },
          })
          .then((res) => {
            setCustomer(res.data.data);
            // console.log(res.data);
            // if (res.data.data?.suspend) {
            //   openModal();
            // } else if (!res.data.data?.isActive) {
            //   openModal();
            // }
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
    }
  }, [user?.customer, user?.role, user?.admin, token]);
  console.log(customer);

  //   const socialLink = [];
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="pt-20  pb-16 ">
          <div className="w-full flex flex-col items-center justify-center rounded-3 h-full md:h-80 overflow-hidden ">
            <img
              className="w-full"
              src="https://tapitag.co/cdn/shop/files/Untitled-5_aa7a71df-4ea4-44c2-a80b-23be51e034ef.png?v=1695208803&width=2400"
              alt="cover"
            />
          </div>
          <div
            className="flex flex-col items-center gap-1 relative -top-[60px]"
            // style={{ position: "relative", top: "-60px" }}
          >
            <div
              className="rounded-full overflow-hidden "
              style={{ width: "120px", height: "120px" }}
            >
              <img
                className="w-full h-full"
                // src={
                //   "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg"
                // }
                src={
                  customer?.profileImage
                    ? customer?.profileImage
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrANb8UqDbeIYuPvSmU0eLbgUtdCxiPXylNQ_OhJ3IuvdlyUqUgwvhsuS6F1qSAGtOsK4&usqp=CAU"
                }
                alt="profileImg.webp"
              />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold pt-4 lg:pt-0">{customer?.id}</h1>
              <h1 className="text-3xl font-bold  lg:pt-0">
                {customer?.name?.firstName} {customer?.name?.lastName}
              </h1>
              <p className="pt-2 flex items-center  px-10 text-sm justify-start text-justify md:text-center sm:w-full lg:w-9/12 mx-auto">
                {/* <svg
              className="h-4 fill-current text-green-700 pr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
            </svg> */}
                {customer?.description}
              </p>
            </div>
            <div className="mt-6 pb-5 md:pb-8 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-center gap-5">
              {customer?.socialMedia?.map((media, i) => (
                <Link key={i} target="_blank" to={media.link}>
                  {media.name === "Facebook" ? (
                    <FaFacebookF
                      className="text-blue-900 hover:text-blue-900"
                      size="24px"
                    />
                  ) : media.name === "Twitter" ? (
                    <FaTwitter color="#0084b4" size="24px" />
                  ) : media.name === "LinkedIn" ? (
                    <FaLinkedin
                      className="text-blue-800 hover:text-blue-900 "
                      size="30px"
                    />
                  ) : media.name === "YouTube" ? (
                    <FaYoutube
                      className="text-red-600  hover:text-red-900"
                      size="30px"
                    />
                  ) : (
                    <FaInstagram
                      className="text-red-800  hover:text-red-900"
                      size="26px"
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-[#ef4444] opacity-25"></div>
            <div>
              <p className="pt-3 text-sm tracking-wide">
                <b>Email :</b> {customer?.email}
              </p>{" "}
              <p className="pt-3 text-sm tracking-wide">
                <b>Contact No: </b>
                {customer?.contactNo}
              </p>
            </div>
          </div>
          <div className="pb-8 flex items-center  justify-around md:justify-center  gap-2  -mt-5">
            {/* <button
          //   onClick={downloadContact}
          className="bg-green-700 hover:bg-green-900 text-sm  text-white font-bold py-2 px-4 rounded"
        >
          Update Profile
        </button>{" "} */}
            <Link
              to={`/dashboard/customers/edit/${user?.customer}`}
              className="font-medium text-[15px]   text-gray-100  bg-transparent outline outline-1 outline-red-500 p-2 rounded hover:bg-red-500  transition duration-150"
            >
              update profile
            </Link>
          </div>

          {/* <div className="flex items-center gap-4 mt-4">
          {socialLink.map((media, i) => (
            <Link key={i} target="_blank" href={media.link}>
              {media.name === "Facebook" ? (
                <svg
                  className="text-facebook"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="..." />
                </svg>
              ) : media.name === "Twitter" ? (
                <svg
                  className="text-twitter"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="..." />
                </svg>
              ) : media.name === "LinkedIn" ? (
                <svg
                  className="text-linkedin"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                >
                  <path d="..." />
                </svg>
              ) : (
                <svg
                  className="text-instagram"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="..." />
                </svg>
              )}
            </Link>
          ))}
        </div> */}

          <div className="container">
            <div className="flex flex-col md:flex-row gap-4  mt-2 justify-between mr-4 ">
              <h2 className="text-xl md:text-2xl px-5 font-bold text-red-500  ">
                Your Members
              </h2>

              <div className=" px-4">
                <div className=" flex items-center justify-start">
                  <div className="relative mx-end w-max">
                    <input
                      type="search"
                      placeholder={"search"}
                      // value={searchTerm}
                      // onChange={(e) => setSearchTerm(e.target.value)}
                      className="font-semibold peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12
                  focus:w-full focus:cursor-text focus:border-red-500 focus:pl-16 focus:pr-4 border-red-500 outline-none md:w-full md:cursor-text md:border-red-500 md:pl-16 md:pr-4 text-sm md:text-base"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-red-500 px-3.5 peer-focus:border-red-500 peer-focus:stroke-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className=" mt-2 mb-10 px-3 lg:pl-5 ">
              <div className="overflow-x-auto  text-gray-600">
                <table className="table table-sm w-full  ">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="text-white">SL</th>
                      <th className="text-white">Id</th>
                      <th className="text-white">Name</th>
                      <th className="text-white">Email</th>
                      <th className="text-white">Variant</th>
                      <th className="text-white">Template</th>
                      <th className="text-white">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.members?.map((option, i) => (
                      <tr key={i}>
                        <th className=" ">{i + 1}</th>
                        <td className=" font-semibold uppercase">
                          {option?.card}
                        </td>
                        <td className=" ">{option?.description}</td>
                        <td className=" ">{option?.price}</td>
                        {/* <td className=" ">
                          <FaEdit
                            onClick={() => {
                              document
                                .getElementById("edit-cardVariant-modal")
                                .showModal();
                              setSingleCardVariant(option);
                            }}
                            size={20}
                            className="hover:text-blue-600 cursor-pointer"
                          />
                        </td> */}
                        {/* <td className=" ">
                          <AiFillDelete
                            onClick={() => {
                              handleDelete(option._id);
                            }}
                            size={20}
                            className="hover:text-red-700 cursor-pointer"
                          />
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {loading && <Loading></Loading>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerProfile;
