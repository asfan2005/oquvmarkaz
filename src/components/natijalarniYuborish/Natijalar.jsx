import React, { useEffect, useState } from "react";
import axios from "axios";

function Natijalar() {
  const [talaba, setTalaba] = useState([]);
  const [results, setResults] = useState({});

  useEffect(() => {
    getTalaba();
  }, []);

  function getTalaba() {
    axios({
      url: "http://localhost:8080/talaba",
      method: "GET",
    }).then((res) => {
      setTalaba(res.data);
      console.log(res.data);
    });
  }

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    setResults((prevResults) => ({
      ...prevResults,
      [index]: value,
    }));
  };

  const sendTelegramMessage = (message) => {
    const token = "7165241827:AAH1CdalIdabNVN5E__GfE1TINeAimkyZxk";
    const chat_id = "-4148520225";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    return axios
      .post(url, {
        chat_id: chat_id,
        text: message,
      })
      .then((response) => {
        console.log("Message sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending message:", error.response.data);
      });
  };

  const handleButtonClick = () => {
    const promises = talaba.map((item, index) => {
      const message = `FirstName: ${item.firstName}, LastName: ${
        item.lastName
      }, Result: ${results[index] || "N/A"}`;
      return sendTelegramMessage(message);
    });

    Promise.all(promises)
      .then(() => {
        alert("Ajoyib! Barcha qiymatlar muvaffaqiyatli yuborildi.");
        setResults({});
      })
      .catch((error) => {
        console.error("Xatolik yuz berdi:", error);
        alert("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
      });
  };

  return (
    <div className="container m-auto">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleButtonClick}
      >
        Yuborish
      </button>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-200 border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      FirstName
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      LastName
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      OtasingIsmi
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      TestNatijalari
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {talaba.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {item.firstName}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {item.lastName}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {item.otasingIsmi}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          className="form-control w-25"
                          placeholder="Natija"
                          value={results[index] || ""}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Natijalar;
