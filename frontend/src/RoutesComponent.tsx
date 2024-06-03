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
import Achievements from "./pages/Achievements";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AccountPage from "./pages/AccountPage";
import RankingPage from "./pages/RankingPage";

function RoutesComponent() {
  const isLoggedIn = () => {
    return localStorage.getItem("userID") && localStorage.getItem("token")
      ? true
      : false;
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isLoggedIn() ? "/restaurants" : "/login"} />}
          ></Route>
          <Route
            path="/restaurants"
            element={isLoggedIn() ? <Restarants /> : <LoginPage />}
          />
          <Route
            path="/restaurants/info"
            element={isLoggedIn() ? <RestaurantInfo /> : <LoginPage />}
          />
          <Route
            path="/restaurant/:id"
            element={isLoggedIn() ? <RestaurantInfo /> : <LoginPage />}
          />
          <Route
            path="/achievements"
            element={isLoggedIn() ? <Achievements /> : <LoginPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/ranking"
            element={isLoggedIn() ? <RankingPage /> : <LoginPage />}
          />
          <Route
            path="/user/:userID"
            element={isLoggedIn() ? <AccountPage /> : <LoginPage />}
          />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default RoutesComponent;
