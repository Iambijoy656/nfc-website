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
        Used by industry
      </h2>


      <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 justify-center items-center gap-5 ">
        {companyData.map((company, i) => (
          <div key={i} className="w-32 h-32 text-center flex items-center">
            <img src={company?.logo} alt="logo" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsedBy;
