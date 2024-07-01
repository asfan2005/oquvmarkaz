import React from "react";
import {
  Davomat,
  Natijalar,
  OylikTolovlar,
  RoyxatdanOtish,
  Sinflar,
  TalabalarRoyxati,
} from "../index";

const Tablelar = ({ selectedNavItem }) => {
  const renderContent = () => {
    switch (selectedNavItem) {
      case "Royxatdan O'tish":
        return <RoyxatdanOtish />;
      case "Sinf qo'shish":
        return <Sinflar />;
      case "Barcha Talabar ro'yxati":
        return <TalabalarRoyxati />;
      case "Test Natijlarini yuborish":
        return <Natijalar />;
      case "Davomat":
        return <Davomat />;
      case "Oylik Tolovlar":
        return <OylikTolovlar />;
      default:
        return <div>Please select a nav item</div>;
    }
  };

  return <div className="w-75 p-3">{renderContent()}</div>;
};

export default Tablelar;
