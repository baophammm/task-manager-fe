# Task Manager App

## Brainstorm reference designs

- https://www.figma.com/file/UpwUJe0j4zhVhJ4zLL9a0s/Task--Management--Web-App-Design-(Community)?type=design&mode=design&t=mcZFoBT0b0Kd6qF7-0

- https://dribbble.com/shots/19222723-TASK-Task-Management-Dashboard

- https://dribbble.com/shots/23470029-Team-Manager-Dashboard

## Requirements

### Authentication

- [ ] User can login with email and password
- [ ] New User can register with firstName, lastName, email and password
- [ ] User stay logged in with refreshing page

### User

- [ ] User can see his account information when hovering on the profile tab
- [ ] User can see the list of available users when adding new members, sending invitations or add assignee to tasks.
- [ ] User can update profile info: first name, last name, profile picture, password

### Home Page/ Quick Access

- [ ] User can see a Home Page with a report for Current Projects, current tasks, new tasks, today's tasks, prioritized tasks.
- [ ] On the top right side, User can see search icons, notification button, profile information, logout
- [ ] On the left side, User can switch tabs between Projects, Tasks, Invitations, Settings

### Projects Tab

- [ ] User can see his/her current projects, categorized by his project roles (Owner, Mananager or Member)
- [ ] User can see basic project status on each project: Project status, project members, Task progress, due date
- [ ] User can search and filter projects

### Project

- [ ] When selecting a single project, User can see more details, comments, all members' tasks and progress.
- [ ] If User is project owner, he can send invitations
- [ ] If User is project owner or manager, he can add tasks to projects and assign to members

### Tasks Tab

- [ ] User can see his/her currently assigned tasks, sorting by preferred order
- [ ] On the tasks, User can see task name, comments, recent changed statuses

### Task

- [ ] user can see more details, comments, task files, task edit requests or edit options
- [ ] If task is personal task (not in any project), user can edit tasks freely
- [ ] If task is of project, if User is project owner or manager, User can edit and assign task. Else if User is member only, User can only request Task changes

### Project Invitation

- [ ] User can see 2 tabs of incoming and outgoing invitations
- [ ] In incoming tab, user can see list of incoming invitations and basic project information. User can accept or decline incoming invitations
- [ ] In out going tab, user can see list of outgoing invitations and basic project information. User can cancel invitation if needed

### Settings Tab

- [ ] User can update personal information: First Name, Last Name, Password, Profile picture

### Notifications

- [ ] When click on notification button, User can see list of notfications, ordered by created time most recently
- [ ] User can click on notification and send to reffered project, task

```
npx create-react-app codercomm-demo --template redux
```

- Install libraries

```
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material @mui/lab
npm install react-router-dom@6 react-hook-form @hookform/resolvers yup
npm install axios numeral lodash jwt-decode change-case
npm install react-markdown rehype-raw date-fns react-dropzone react-toastify
```
