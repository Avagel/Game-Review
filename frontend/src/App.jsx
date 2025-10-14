import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router";
import { Home } from "./pages/Home";
import { Browse } from "./pages/Browse";
import { Overview } from "./pages/Overview";
import { News } from "./pages/News";
import { Layout } from "./pages/Layout";
import { TestingAPI } from "./pages/TestingAPI";
import axios from "axios";
import { TestCarousel } from "./pages/TestCarousel";
import Loader from "./components/Loader";
import sadtear from "../src/assets/sadtear.svg";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="browse" element={<Navigate to="1" replace />} />
            <Route path="browse/:pagenum" element={<Browse />} />

            <Route path="overview/:gameName" element={<Overview />} />
            <Route path="news" element={<News />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
