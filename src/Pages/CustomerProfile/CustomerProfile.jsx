import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../utilities/api";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Loading from "../../Shared/Loading/Loading";

const CustomerProfile = () => {
  const [loading, setLoading] = useState(true);
  const { id: userId } = useParams();

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

  console.log("customer", customer);
  console.log("user", user.customer);

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
              src="https://www.usmartcards.co.uk/image/catalog/Applications/NFCbanner.jpg"
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
              <p className="pt-2 flex items-center  px-10 text-sm justify-start text-justify md:text-center w-9/12 mx-auto">
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

            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <div>
              <p className="pt-3 text-sm tracking-wide">
                <b>Email :</b> {customer?.email}
              </p>{" "}
              <p className="pt-3 text-sm tracking-wide">
                <b>Contact No :</b>
                {customer?.contactNo}
              </p>
            </div>
          </div>
          <div className="pb-8 flex items-center  justify-around md:justify-center  gap-2 ">
            {/* <button
          //   onClick={downloadContact}
          className="bg-green-700 hover:bg-green-900 text-sm  text-white font-bold py-2 px-4 rounded"
        >
          Update Profile
        </button>{" "} */}
            <Link
              to={`/dashboard/customers/edit/${userId}`}
              className="bg-green-700 hover:bg-green-900 text-sm text-white font-bold py-2 px-4 rounded capitalize tracking-wider w-44 text-center"
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
        </div>
      )}
    </>
  );
};

export default CustomerProfile;
