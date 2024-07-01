import React from "react";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  function backtoPage() {
    navigate("/");
  }
  return (
    <div
      className="bg-gray-300"
      style={{
        width: "100%",
        height: "80px",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <a
        style={{
          textDecoration: "none",
          marginTop: "15px",
          marginLeft: "30px",
        }}
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900  dark:text-white"
      >
        <img
          className="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        Education Center
      </a>

      <button
        onClick={() => backtoPage()}
        type="button"
        className=" my-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Logo Out
      </button>
    </div>
  );
}

export default Header;
