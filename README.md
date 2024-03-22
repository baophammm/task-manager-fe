# Taskify - Task Management Application MERN Stack

## General Description

Taskify is a task management web application that enhance collaboration and boost productivity, either personal tasks or overviewing complex projects with multiple members. Taskify provides tools for users to stay organized, focused and on track.

To register, each user should provide their first name, last name, an email, a password to create an account. The email address should be unique and not link to any account in the system. User will then receive an email verification sent to their email. Confirming on the verification link will then activate user's account and allows login.

After registration and login, an user can create a project and become the project owner. As project owner, he/she can invite others to join the project. Project Onwer can update project details and members' roles.

Within Project, both Project Owner and Lead can create, update and assign Tasks. While normal Project Member can only view tasks and comment.

For Personal Tasks, any user can create their own. User can see all of his/her assigned Tasks in one place.

Users can comment on the tasks that he/she has access to.

When there is an update of Task, Project User is following, or new Incoming Project Invitation, the system will generate a notification and send to User to check the related activity.

## Requirements

### Authentication

- [ ] User can login with email and password
- [ ] New User can register with firstName, lastName, email and password
- [ ] User stay logged in with refreshing page

### User

- [ ] User can see his account information when click on avatar icon menu top right screen
- [ ] User can see the list of available users when adding new members, sending invitations or add assignee to tasks.
- [ ] User can update profile info: first name, last name, profile picture, password

### Home Page/ Quick Access

- [ ] On the top right side, User can see notification button, profile information, logout
- [ ] On NAV bar, user can switch between HomePage of Projects, My Tasks and My Invitations.
- [ ] Beside NAV bar, User can Add Project or Add Task from Main Header, accessible anywhere

### Home Tab (Projects Tab)

- [ ] User can see a Home Page with featured projects: starred projects, ongoing and planning projects
- [ ] User can click on All Button to see All of his/her projects and search/filter projects. Filters can be by Project Status, Project role, start date and due date. Sort by created time and title.
- [ ] User can click on Featured Button to come back to Featured Project Page.
- [ ] User can see basic project status on each project: title, description, status, task count, member count, creator
- [ ] User can click on the Star Icon to save Project as Starred or Favorite Projects to follow. These projects appear in the Featured
- [ ] User can click + Project to add new Project and become the project Owner

### Project

- [ ] When selecting a single project, User can see more details, all members' tasks and progress.
- [ ] If User is project owner, he can send invitations for other to join project through the + Members in the Project Detail Page, or in Update Project. He/she can manage the proeject invitations in this modal.
- [ ] As a Project Owner, he/she can change member's role, remove members by clicking on MembersAvatarStackList in Project Information side bar.
- [ ] As a Project Owner, he/she can Update Information of Project and Delete Project.

- [ ] If User is project owner or manager, he can add tasks to projects and assign to members and update tasks. Task update can be done using drag and drop.
- [ ] If User is Member only, he can only view tasks.
- [ ] On Task cards, User can see title, description, project, assignee, recent changed statuses, if overdue

### Tasks Tab

- [ ] User can see his/her currently assigned tasks. Filtered by project, status, start and due time.
- [ ] On Task cards, User can see title, description, project, assignee, recent changed statuses, if overdue

### Task

- [ ] User can see more details, including: comments, task files, edit options.
- [ ] If task is personal task (not in any project), user can edit tasks freely
- [ ] If task is of project, if User is project owner or manager, User can edit and assign task. Else if User is member only, User can only view Task

### Project Invitation

- [ ] As a User can see list of incoming invitations with basic project information. User can accept or decline incoming invitations
- [ ] After accepting Invitation, User can click See Details to access Project

### Settings Tab

- [ ] User can update personal information: First Name, Last Name, Password, Profile picture

### Notifications

- [ ] When click on notification button, User can see list of notfications, ordered by created time most recently
- [ ] User can click on notification and send to targeted items or activities.
- [ ] Notifications can be filtered with Unread only switch, can be deleted or set between Read or Unread.
- [ ] User can see number of Unread notifications on the Notification icon on the Header.

- Install libraries

```
npm install

```
