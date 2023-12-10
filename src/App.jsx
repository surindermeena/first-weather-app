import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import WeatherNewComp from "./Components/weatherNewComp";

function AppComponent() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeatherNewComp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppComponent;
