import axios from "axios";
import { useEffect, useState } from "react";

const UsedBy = () => {
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    axios
      .get("/public/industry.json")
      .then((response) => {
        const data = response.data;
        setCompanyData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="my-24 container mx-auto">
      <h2 className="text-4xl text-center font-medium mb-5 ">
        Our Valuable Clients
      </h2>


      <div className="flex flex-wrap justify-center items-center gap-6 ">
        {companyData.map((company, i) => (
          <div key={i} className="w-32 h-32 text-center flex items-center justify-center">
            <img src={company?.logo} alt="logo" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsedBy;
