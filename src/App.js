import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editor from "./components/editor";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
