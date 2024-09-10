import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../zustand/userStore";

const ProtectedRoute = () => {
  const { isLogin } = useUserStore();
  if (!isLogin) {
    alert("로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
