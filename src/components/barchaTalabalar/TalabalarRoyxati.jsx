import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios, { Axios } from "axios";
function TalabalarRoyxati() {
  const [talablar, setTalablar] = useState([]);
  const [selectedTalaba, setSelectedTalaba] = useState(null); // State to track selected student

  useEffect(() => {
    axios({
      url: "http://localhost:8080/talaba",
      method: "GET",
    }).then((res) => {
      console.log(res.data);
      setTalablar(res.data);
    });
  }, []);

  function deleteTalaba(id) {
    const updatedTalablar = talablar.filter((talaba) => talaba.id !== id);
    setTalablar(updatedTalablar);
  }

  const openModal = (talaba) => {
    setSelectedTalaba(talaba);
  };

  const closeModal = () => {
    setSelectedTalaba(null);
  };

  return (
    <section className="container px-4 mx-auto">
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      First Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Father's Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Father's Phone
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Telegram
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {talablar.map((talaba) => (
                    <tr key={talaba.id}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                        #{talaba.id}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {talaba.lastName}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {talaba.firstName}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {talaba.otasingIsmi}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {talaba.studentPhone}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {talaba.fatherPhone}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        <a
                          href={talaba.telegramUser}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Telegram
                        </a>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button
                            className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                            onClick={() => deleteTalaba(talaba.id)}
                          >
                            Delete
                          </button>
                          <button
                            className="text-gray-500 transition-colors duration-200 dark:hover:text-blue-500 dark:text-gray-300 hover:text-blue-500 focus:outline-none"
                            onClick={() => openModal(talaba)}
                          >
                            View Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for displaying student details */}
      <Modal show={selectedTalaba !== null} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTalaba && (
            <div>
              <p>ID: {selectedTalaba.id}</p>
              <p>Last Name: {selectedTalaba.lastName}</p>
              <p>First Name: {selectedTalaba.firstName}</p>
              <p>Father's Name: {selectedTalaba.otasingIsmi}</p>
              <p>Phone: {selectedTalaba.studentPhone}</p>
              <p>Father's Phone: {selectedTalaba.fatherPhone}</p>
              <p>
                Telegram:{" "}
                <a
                  href={selectedTalaba.telegram_username}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {selectedTalaba.telegramUser}
                </a>
              </p>
              <p>Email: {selectedTalaba.email}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default TalabalarRoyxati;
