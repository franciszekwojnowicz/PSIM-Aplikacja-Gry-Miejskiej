import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Restarants from "./pages/Restarants";
import NotFoundPage from "./pages/NotFoundPage";
import RestaurantInfo from "./pages/RestaurantInfo";

function RoutesCompomonent() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={"/restaurants"} />}></Route>
          <Route path="/restaurants" element={<Restarants />} />
          <Route path="/restaurants/info" element={<RestaurantInfo />} />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default RoutesCompomonent;
