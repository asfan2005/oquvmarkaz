import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function Sinflar() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [sinflar, setSinflar] = useState([]);
  const [sortOrder, setSortOrder] = useState("ascending");

  // Function to fetch sinflar data from the server
  const fetchSinflar = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sinflar");
      setSinflar(response.data); // Assuming response.data is an array of sinflar objects
    } catch (error) {
      console.error("Error fetching sinflar:", error);
    }
  };

  useEffect(() => {
    fetchSinflar(); // Fetch sinflar data on component mount
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/sinflar", data);
      setSinflar([...sinflar, response.data]); // Assuming response.data is the new sinflar object
      reset(); // Clear form fields after successful submission
    } catch (error) {
      console.error("Error saving sinflar:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/sinflar/${id}`);
      const updatedSinflar = sinflar.filter((sinflar) => sinflar.id !== id);
      setSinflar(updatedSinflar);
    } catch (error) {
      console.error("Error deleting sinflar:", error);
    }
  };

  const handleEdit = (index) => {
    // Implement edit functionality if needed
    console.log(`Editing sinflar at index ${index}`);
  };

  const sortedSinflar = [...sinflar].sort((a, b) => {
    if (sortOrder === "ascending") {
      return a.sinfName.localeCompare(b.sinfName);
    } else {
      return b.sinfName.localeCompare(a.sinfName);
    }
  });

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto overflow-y-auto">
        <form
          className="w-full max-w-lg mb-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6">
              <input
                {...register("sinfName", { required: true })}
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                  errors.sinfName ? "border-red-500" : ""
                }`}
                type="text"
                placeholder="Sinf nomi"
              />
              {errors.sinfName && (
                <p className="text-red-500 text-xs italic">
                  Sinf nomini kiriting
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6">
              <input
                {...register("oquvchilarSoni", {
                  required: true,
                  pattern: /^[0-9]*$/,
                })}
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                  errors.oquvchilarSoni ? "border-red-500" : ""
                }`}
                type="text"
                placeholder="O'quvchilar soni"
              />
              {errors.oquvchilarSoni && (
                <p className="text-red-500 text-xs italic">
                  O'quvchilar sonini raqamlarda kiriting
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6">
              <input
                {...register("teacherName", { required: true })}
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                  errors.teacherName ? "border-red-500" : ""
                }`}
                type="text"
                placeholder="O'qituvchi"
              />
              {errors.teacherName && (
                <p className="text-red-500 text-xs italic">
                  O'qituvchini kiriting
                </p>
              )}
            </div>
            <div className="w-full px-3 mb-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Saqlash
              </button>
            </div>
          </div>
        </form>
        <div className="overflow-y-auto max-h-80">
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
                  Sinf Nomi
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  O'quvchilar Soni
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  O'qituvchi
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedSinflar.map((sinflar, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {sinflar.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {sinflar.sinfName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {sinflar.oquvchilarSoni} ta
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sinflar.teacherName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(sinflar.id)}
                      className="ml-2 text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Sinflar;
