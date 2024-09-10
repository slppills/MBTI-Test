import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import TestPage from "../pages/TestPage";
import TestResultPage from "../pages/TestResultPage";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/test-result" element={<TestResultPage />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
