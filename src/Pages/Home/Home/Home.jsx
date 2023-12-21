import Banner from "../Banner/Banner";
import Faq from "../Faq/Faq";
import OrderSetup from "../OrderSetup/OrderSetup";
import UsedBy from "../UsedBy/UsedBy";
import Variants from "../Variants/Variants";

const Home = () => {
  return (
    <div>
      <Banner />
      <OrderSetup />
      <Variants />
      <UsedBy />
      <Faq />
   
    </div>
  );
};

export default Home;
