import axios from "axios";
import { useEffect, useState } from "react";

const Faq = () => {
  const [faqData, setFaqData] = useState([]);
  useEffect(() => {
    axios
      .get("/public/faq.json")
      .then((response) => {
        const data = response.data;
        setFaqData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <section className="container">
      <div className=" flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
        <h2 className="text-4xl text-center font-medium mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, i) => (
            <details key={i} className="w-full border rounded-lg  bg-[#363636]">
              <summary className="px-4 py-6 focus:outline-none focus-visible:ri font-bold ">
                {faq?.question}
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:dark:text-gray-400 text-sm">
                {faq?.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
