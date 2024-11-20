import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { CircularProgress, Typography } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/page";
import { APIProvider } from "@vis.gl/react-google-maps";
import { TruckIndex } from "./pages/truck";

function App() {
  return (
    <APIProvider
      apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}
      onLoad={() => <CircularProgress color="secondary" />}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/truck">
            <Route path=":id" element={<TruckIndex />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </APIProvider>
  );
}

export default App;
