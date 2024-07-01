import React, { useState } from "react";

const Navbar = ({ onSelectNavItem }) => {
  const navItems = [
    "Royxatdan O'tish",
    "Oylik Tolovlar",
    "Sinf qo'shish",
    "Barcha Talabar ro'yxati",
    "Davomat",
    "Test Natijlarini yuborish",
  ];
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onSelectNavItem(item);
  };

  return (
    <div className="w-25 p-2" style={{ height: "90vh" }}>
      <div className="card">
        <div
          className="card-header fs-4"
          style={{ fontFamily: "sans-serif",display:"flex",justifyContent:"space-between" }}
        >
          Bo'limlar

          
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="list-group-item"
                onClick={() => handleItemClick(item)}
                style={{
                  cursor: "pointer",
                  fontFamily: "sans-serif",
                  backgroundColor: item === selectedItem ? "blue" : "white",
                  color: item === selectedItem ? "white" : "black",
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
