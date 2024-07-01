import React, { useState, useEffect } from "react";
import { Header, Navbar, Tablelar } from "../index";
function Main() {
  const [selectedNavItem, setSelectedNavItem] = useState(null);

  const handleNavItemSelect = (item) => {
    setSelectedNavItem(item);
  };

  useEffect(() => {
    // Bu yerda `selectedNavItem` o'zgarganda bajariladigan kod bo'lishi mumkin
    console.log("Selected nav item: ", selectedNavItem);
  }, [selectedNavItem]);

  return (
    <div>
      <Header />
      <div
        style={{
          width: "100%",
          height: "90vh",
          border: "2px solid",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Navbar onSelectNavItem={handleNavItemSelect} />
        <Tablelar selectedNavItem={selectedNavItem} />
      </div>
    </div>
  );
}

export default Main;
