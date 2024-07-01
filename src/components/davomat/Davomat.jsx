import React, { useEffect, useState } from "react";
import axios from "axios";

function Davomat() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedClass, setSelectedClass] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [absentStudents, setAbsentStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    axios
      .get("http://localhost:8080/talaba")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  };

  const handleAttendance = (index, status) => {
    if (!selectedDate) {
      alert("Date tanlanmagan");
      return;
    }

    const newAttendance = {
      ...attendance,
      [index]: status === "Keldi",
    };
    setAttendance(newAttendance);

    const newAttendanceRecord = {
      index,
      status: status === "Keldi",
      date: selectedDate,
    };
    setAttendanceRecords([...attendanceRecords, newAttendanceRecord]);

    if (status === "Kelmadi") {
      const absentIds =
        JSON.parse(localStorage.getItem("absentStudents")) || [];
      absentIds.push({ id: students[index].id, date: selectedDate });
      localStorage.setItem("absentStudents", JSON.stringify(absentIds));
    }
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() === "") {
      getStudents(); // If search query is empty, fetch all students
      return;
    }

    axios
      .get(`http://localhost:8080/talaba/search?firstName=${searchQuery}`)
      .then((res) => {
        setStudents(res.data);
      })
      .catch((error) => {
        console.error("Error searching students:", error);
      });
  };

  const handleShowAbsent = () => {
    const absentIds = JSON.parse(localStorage.getItem("absentStudents")) || [];
    const absentStudentsList = students
      .filter((student) => absentIds.some((absent) => absent.id === student.id))
      .map((student) => {
        const absent = absentIds.find((absent) => absent.id === student.id);
        return {
          ...student,
          date: absent.date,
        };
      });
    setAbsentStudents(absentStudentsList);
    setShowModal(true);
  };

  const filteredStudents = students.filter(
    (student) => selectedClass === "" || student.talabaClass === selectedClass
  );

  function saveKelmaganlar(data) {
    data.forEach((student) => {
      const studentData = {
        date: student.date,
        firstName: student.firstName,
        lastName: student.lastName,
        talabaClass: student.talabaClass,
      };

      axios({
        url: "http://localhost:8080/kelmaganlar",
        method: "POST",
        data: studentData,
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error("Error saving student data:", err);
        });
    });

    localStorage.removeItem("absentStudents");
    setShowModal(false);
    setAttendance({});
  }
  return (
    <div className="container px-4 mx-auto">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <form
          style={{ width: "600px", display: "flex", gap: "10px" }}
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            className="form-control w-50"
            placeholder="FirstName"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <input
            type="date"
            className="form-control w-50"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
        </form>

        <div>
          <button
            onClick={handleShowAbsent}
            className="bg-red-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Kelmaganlar
          </button>
        </div>
      </div>
      <div
        className="overflow-y-auto max-h-screen my-3"
        style={{ height: "600px" }}
      >
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
              >
                Id
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
              >
                Surname
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
              >
                Class
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                  {student.id}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                  {student.firstName}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                  {student.lastName}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                  {student.talabaClass}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                  {selectedDate}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                  <button
                    onClick={() => handleAttendance(index, "Keldi")}
                    className={`mr-2 ${
                      attendance[index] === true
                        ? "bg-green-500"
                        : "bg-gray-200"
                    } hover:bg-green-700 text-white font-bold py-2 px-4 rounded`}
                  >
                    Keldi
                  </button>
                  <button
                    onClick={() => handleAttendance(index, "Kelmadi")}
                    className={`${
                      attendance[index] === false ? "bg-red-500" : "bg-gray-200"
                    } hover:bg-red-700 text-white font-bold py-2 px-4 rounded`}
                  >
                    Kelmadi
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-4 rounded"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">Kelmaganlar</h2>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                  >
                    Surname
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                  >
                    Class
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                {absentStudents.map((student, index) => (
                  <tr key={index}>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                      {student.id}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                      {student.firstName}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                      {student.lastName}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                      {student.talabaClass}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                      {student.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              onClick={() => saveKelmaganlar(absentStudents)}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
            >
              Saqlash
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Davomat;
