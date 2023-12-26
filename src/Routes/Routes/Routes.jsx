import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import CustomerRegistration from "../../Pages/CustomerRegistration/CustomerRegistration";
import CustomerLogin from "../../Pages/CustomerLogin/CustomerLogin";
import CustomerProfile from "../../Pages/CustomerProfile/CustomerProfile";
import EditCustomer from "../../Pages/EditCustomer/EditCustomer";
import Details from "../../Pages/Details/Details";

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
      {
        path: "/dashboard/customers/edit/:id",
        element: <EditCustomer />,
      },
      {
        path: "/details/:id",
        element: <Details/>,
      },
    ],
  },
]);

export default router;
