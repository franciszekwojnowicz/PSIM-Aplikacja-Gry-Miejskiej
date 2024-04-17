import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Restarants from "./pages/Restaurants";
import NotFoundPage from "./pages/NotFoundPage";
import RestaurantInfo from "./pages/RestaurantInfo";
import Achivements from "./pages/Achievements";
import LoginPage from "./pages/LoginPage";

function RoutesComponent() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={"/restaurants"} />}></Route>
          <Route path="/restaurants" element={<Restarants />} />
          <Route path="/restaurants/info" element={<RestaurantInfo />} />
          <Route path="/achivements" element={<Achivements />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default RoutesComponent;
