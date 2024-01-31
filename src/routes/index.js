import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import AccountPage from "../pages/AccountPage";
import ProjectPage from "../pages/ProjectPage";
import TaskPage from "../pages/TaskPage";
import BlankLayout from "../layouts/BlankLayout";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
