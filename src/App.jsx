import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Main } from "./components/index";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
