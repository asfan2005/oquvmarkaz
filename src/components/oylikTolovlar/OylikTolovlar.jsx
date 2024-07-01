import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function OylikTolovlar() {
  const [tolovlar, setTolovlar] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [tolovlaTarixi, setTolovlarTarixi] = useState([]);
  const [showTolov, setShowTolov] = useState(null);
  useEffect(() => {
    fetchTolovlar();
  }, []);

  const { handleSubmit, register, reset } = useForm();

  const fetchTolovlar = async (query = "") => {
    try {
      const response = await axios({
        url: `http://localhost:8080/talaba${query}`,
        method: "GET",
      });
      setTolovlar(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = searchTerm ? `/search?firstName=${searchTerm}` : "";
    await fetchTolovlar(query);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const mySubmit = async (data) => {
    try {
      await axios.post("http://localhost:8080/tolovlar", data);
      reset(); // Reset form fields
      closeModal(); // Close modal after successful submission
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error if needed
    }
  };

  const tolovTarixi = async (firstName) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/tolovlar/search?firstName=${firstName}`
      );
      setShowTolov(true);
      setTolovlarTarixi(response.data);
      // Handle displaying payment history data as needed
    } catch (error) {
      console.error("Error fetching payment history:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="d-flex" style={{ justifyContent: "space-between" }}>
        <form
          className="max-w-sm w-3/4 m-2 flex items-center"
          onSubmit={handleSearch}
        >
          <label
            htmlFor="search"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Qidirish
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-2"
            placeholder="First Name"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
        </form>
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
        >
          Tolov
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Id
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sinf
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Father Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                First Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Father Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tolovlar Tarixi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tolovlar.map((tolov) => (
              <tr key={tolov.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {tolov.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tolov.talabaClass}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tolov.otasingIsmi}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tolov.firstName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tolov.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tolov.fatherPhone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => tolovTarixi(tolov.firstName)}
                    className="bg-red-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Tolovlar Tarixi
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Section */}
      {showModal && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center h-screen bg-gray-800 bg-opacity-50"
        >
          <div className="relative bg-white rounded-lg shadow-lg w-1/2">
            {/* Modal content */}
            <div className="p-4">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-xl font-semibold text-gray-900">
                  Tolov Malumotlari
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4">
                <form action="" onSubmit={handleSubmit(mySubmit)}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="FirstName"
                    {...register("firstName")}
                  />
                  <input
                    type="text"
                    className="form-control my-2"
                    placeholder="LastName"
                    {...register("lastName")}
                  />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Pul Miqdori"
                    {...register("price")}
                  />
                  <select
                    {...register("type")}
                    id="countries"
                    className=" my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Pul turi</option>
                    <option value="Naqd">Naqd</option>
                    <option value="Plastig">Plastig</option>
                  </select>

                  <select
                    {...register("moon")}
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Qaysi oy Tanlansin</option>
                    <option value="Yanvar">Yanvar</option>
                    <option value="Fevral">Fevral</option>
                    <option value="Mart">Mart</option>
                    <option value="Aprel">Aprel</option>
                    <option value="May">May</option>
                    <option value="Iyun">Iyun</option>
                    <option value="Iyul">Iyul</option>
                    <option value="Avgust">Avgust</option>
                    <option value="Sentabr">Sentabr</option>
                    <option value="Oktabr">Oktabr</option>
                    <option value="Noyabr">Noyabr</option>
                    <option value="Dekabr">Dekabr</option>
                  </select>

                  <input
                    type="date"
                    className="form-control my-2"
                    {...register("date")}
                  />

                  <div className="flex items-center justify-end p-4 border-t">
                    <button
                      onClick={closeModal}
                      className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-danger mx-2">
                      Saqlash
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* tolovlar modal kod */}
      {showTolov && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center h-screen bg-gray-800 bg-opacity-50"
        >
          <div className="relative bg-white rounded-lg shadow-lg w-1/2 p-4">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>FirstName</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Oy</th>
                  <th>Type</th>
                </tr>
              </thead>

              <tbody>
                {tolovlaTarixi.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.firstName}</td>
                      <td>{item.date}</td>
                      <td>{item.price}</td>
                      <td>{item.moon}</td>
                      <td>{item.type}</td>
                    </tr>
                  );
                })}
              </tbody>

              <button onClick={()=>setShowTolov(false)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{marginTop:"30px"}}>Close</button>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default OylikTolovlar;
