import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function RoyxatdanOtish() {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/talaba", data);
      console.log(response.data);
      reset(); // Optionally reset the form after successful submission
    } catch (error) {
      console.error("Error submitting the form: ", error);
    }
  };

  return (
    <div
      style={{ border: "2px solid #B3B6B7", borderRadius: "5px" }}
      className="w-100 p-3"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First name
            </label>
            <input
              {...register("firstName", {
                required: "First name is required",
              })}
              type="text"
              id="first_name"
              name="firstName"
              className={`bg-gray-50 border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="Asfandiyor"
              required
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last name
            </label>
            <input
              {...register("lastName", { required: "Last name is required" })}
              type="text"
              id="last_name"
              name="lastName"
              className={`bg-gray-50 border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="To'raqulov"
              required
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="father_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Otasing Ismi
            </label>
            <input
              {...register("otasingIsmi", {
                required: "Father's name is required",
              })}
              type="text"
              id="father_name"
              name="otasingIsmi"
              className={`bg-gray-50 border ${
                errors.otasingIsmi ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="FatherName"
              required
            />
            {errors.otasingIsmi && (
              <p className="text-red-500 text-xs mt-1">
                {errors.otasingIsmi.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone number
            </label>
            <input
              {...register("studentPhone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[+]998[(][0-9]{2}[)]\s[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
                  message: "Please enter a valid phone number",
                },
              })}
              type="tel"
              id="phone"
              name="studentPhone"
              className={`bg-gray-50 border ${
                errors.studentPhone ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="+998(XX) XXX-XX-XX"
              required
            />
            {errors.studentPhone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.studentPhone.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="father_phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone Number (Otasi)
            </label>
            <input
              {...register("fatherPhone", {
                required: "Father's phone number is required",
                pattern: {
                  value: /^[+]998[(][0-9]{2}[)]\s[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
                  message: "Please enter a valid phone number",
                },
              })}
              type="tel"
              id="father_phone"
              name="fatherPhone"
              className={`bg-gray-50 border ${
                errors.fatherPhone ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="+998(XX) XXX-XX-XX"
              required
            />
            {errors.fatherPhone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fatherPhone.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="telegram_username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Telegram Username
            </label>
            <input
              {...register("telegramUser", {
                required: "Telegram username is required",
              })}
              type="text"
              id="telegram_username"
              name="telegramUser"
              className={`bg-gray-50 border ${
                errors.telegramUser ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="https://t.me/username"
              required
            />
            {errors.telegramUser && (
              <p className="text-red-500 text-xs mt-1">
                {errors.telegramUser.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="sinf"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sinfni kiriting
            </label>
            <input
              {...register("talabaClass", { required: "Class is required" })}
              type="text"
              id="sinf"
              name="talabaClass"
              className={`bg-gray-50 border ${
                errors.talabaClass ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="7 Sinf"
              required
            />
            {errors.talabaClass && (
              <p className="text-red-500 text-xs mt-1">
                {errors.talabaClass.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              type="email"
              id="email"
              name="email"
              className={`bg-gray-50 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="asfan.code@company.com"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Consent checkbox */}
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              {...register("consent", { required: true })}
              id="consent"
              name="consent"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="consent"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Malumotlarni yuborishga rozilik
            <a
              href="#"
              style={{ textDecoration: "none" }}
              className="text-blue-600 hover:underline dark:text-blue-500 mx-2"
            >
              Bering
            </a>
            .
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Yuborish
        </button>
      </form>
    </div>
  );
}

export default RoyxatdanOtish;
