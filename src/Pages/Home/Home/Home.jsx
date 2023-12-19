import Banner from "../Banner/Banner";
import Faq from "../Faq/Faq";
import OrderSetup from "../OrderSetup/OrderSetup";
import UsedBy from "../UsedBy/UsedBy";

const Home = () => {
  return (
    <div>
      <Banner />
      <OrderSetup />
      <UsedBy />
      <Faq/>
    </div>
  );
};

export default Home;
