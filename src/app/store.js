import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../features/project/projectSlice";
import taskReducer from "../features/task/taskSlice";
import checklistReducer from "../features/checklist/checklistSlice";
import commentReducer from "../features/comment/commentSlice";
import userReducer from "../features/user/userSlice";
import invitationReducer from "../features/invitation/invitationSlice";
import notificationReducer from "../features/notification/notificationSlice";
import tagReducer from "../features/tag/tagSlice";

const rootReducer = {
  project: projectReducer,
  task: taskReducer,
  checklist: checklistReducer,
  comment: commentReducer,
  user: userReducer,
  invitation: invitationReducer,
  notification: notificationReducer,
  tag: tagReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
