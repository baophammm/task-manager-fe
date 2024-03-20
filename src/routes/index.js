import React, { createContext, useState } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import BlankLayout from "../layouts/BlankLayout";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import AuthRequire from "./AuthRequire";
import ProjectPage from "../pages/ProjectPage";
import TaskPage from "../pages/TaskPage";
import InvitationPage from "../pages/InvitationPage";
import AccountSettingsPage from "../pages/AccountSettingsPage";
import AddProjectModal from "../features/project/AddProjectModal";
import AddTaskModal from "../features/task/AddTaskModal";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import AddProjectTaskModal from "../features/project/AddProjectTaskModal";
import AddProjectMemberModal from "../features/project/AddProjectMemberModal";
import ProjectMembersModal from "../features/user/ProjectMembersModal";
import TaskDetailModal from "../features/task/TaskDetailModal";
import VerificationPage from "../pages/VerificationPage";

export const RouterContext = createContext();
function Router() {
  const location = useLocation();
  let state = location.state;

  const [isDisplayingFeaturedProjects, setIsDisplayingFeaturedProjects] =
    useState(true);

  return (
    <>
      <RouterContext.Provider
        value={{
          isDisplayingFeaturedProjects,
          setIsDisplayingFeaturedProjects,
        }}
      >
        <Routes location={state?.backgroundLocation || location}>
          <Route
            path="/"
            element={
              <AuthRequire>
                <MainLayout />
              </AuthRequire>
            }
          >
            <Route index element={<Navigate to="/projects" />} />

            <Route path="/projects" element={<ProjectPage />} />
            <Route
              path="/projects/:projectId"
              element={<ProjectDetailPage />}
            />
            <Route path="/tasks" element={<TaskPage />} />

            <Route path="/invitations" element={<InvitationPage />} />
            <Route path="/settings" element={<AccountSettingsPage />} />
          </Route>
          <Route element={<BlankLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/verifications/:verificationCode"
              element={<VerificationPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        {state?.backgroundLocation && (
          <Routes>
            <Route
              path="/projects/new"
              element={
                <AuthRequire>
                  <AddProjectModal />
                </AuthRequire>
              }
            />
            <Route
              path="/tasks/new"
              element={
                <AuthRequire>
                  <AddTaskModal />
                </AuthRequire>
              }
            />
            <Route
              path="/projects/:projectId/tasks/new"
              element={
                <AuthRequire>
                  <AddProjectTaskModal />
                </AuthRequire>
              }
            />
            <Route
              path="/projects/:projectId/projectMembers/new"
              element={
                <AuthRequire>
                  <AddProjectMemberModal />
                </AuthRequire>
              }
            />
            <Route
              path="/projects/:projectId/projectMembers"
              element={
                <AuthRequire>
                  <ProjectMembersModal />
                </AuthRequire>
              }
            />
            <Route
              path="/tasks/:taskId"
              element={
                <AuthRequire>
                  <TaskDetailModal />
                </AuthRequire>
              }
            />
          </Routes>
        )}
      </RouterContext.Provider>
    </>
  );
}

export default Router;
