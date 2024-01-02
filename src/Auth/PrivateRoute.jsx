/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { MoonLoader } from "react-spinners";
// import api from "../utilities/api";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("access-token");
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center my-10">
        <MoonLoader color="#f97316" size={60} />
      </div>
    );
  }

  if (user ) {
    return children;
  }
  return <Navigate to="/customer-login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
