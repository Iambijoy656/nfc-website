import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import CustomerRegistration from "../../Pages/CustomerRegistration/CustomerRegistration";
import CustomerLogin from "../../Pages/CustomerLogin/CustomerLogin";
import CustomerProfile from "../../Pages/CustomerProfile/CustomerProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/customer-registration",
        element: <CustomerRegistration />,
      },
      {
        path: "/customer-login",
        element: <CustomerLogin />,
      }, 
      
      {
        path: "/customer-profile",
        element: <CustomerProfile />,
      },
    ],
  },
]);

export default router;
