import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import BlankLayout from "../layouts/BlankLayout";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import AuthRequire from "./AuthRequire";
import ProjectPage from "../pages/ProjectPage";
import TaskPage from "../pages/TaskPage";
import InvitationPage from "../pages/InvitationPage";
import AccountSettingsPage from "../pages/AccountSettingsPage";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/invitations" element={<InvitationPage />} />
        <Route path="/settings" element={<AccountSettingsPage />} />
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
