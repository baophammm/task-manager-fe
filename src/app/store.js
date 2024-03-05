import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../features/project/projectSlice";
import taskReducer from "../features/task/taskSlice";
import userReducer from "../features/user/userSlice";
import invitationReducer from "../features/invitation/invitationSlice";

const rootReducer = {
  project: projectReducer,
  task: taskReducer,
  user: userReducer,
  invitation: invitationReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
