### Project-Proposal_todo_list

#### Project Overview

The To-Do List application will allow users to:

1. Add tasks: Input new tasks into the system.
2. View tasks: Display tasks in the screen.
3. Delete tasks: Remove tasks from the list when no longer needed.
   This application will focus on simplicity and usability.

#### MVP Goals

- AAU I should be greeted with a welcome page.
- AAU I should be able to sign up and sign in to a secure Todo list app.
- AAU I should be able to read, update and delete the items on my todo list.
- AAU I should be able to sign out of my profile.

#### Stretch goal

- Integrate calendar to the app.

---

#### | My To-Do List |

| Task 1 [Delete] [Edit] |
| Task 2 [Delete] [Edit] |
| Task 3 [Delete] [Edit] |

---

#### | [Add New Task] |

Add/Edit Task Page

---

#### | Add/Edit Task |

| Task Name: [______________________] |
| Completed: [Edit ] (Save) |

---

![image](./Screenshot%202024-12-07%20at%204.32.32 PM.png)
![image](./Screenshot%202024-12-07%20at%204.32.56 PM.png)
![image](./Screenshot%202024-12-07%20at%204.33.42 PM.png)
![image](./Screenshot%202024-12-07%20at%204.33.59 PM.png)
![image](./Screenshot%202024-12-07%20at%204.34.12 PM.png)

---

#### Description:

This project defines basic functionalities like adding, removing, viewing tasks, the total CRUD operation, along with a simple loop to interact with the user.

---

HTTP Methods

1. GET /tasks
   - Retrieve all tasks in the to-do list.
   - Response: [
   - {"id": 1, "name": "Task 1", "completed": false},
   - {"id": 2, "name": "Task 2", "completed": true}
   - ]
2. POST /tasks
   - Add a new task.
   - Request: { "name": "Task 3", "completed": false }
   - Response: Task details with an assigned ID.
3. PUT /tasks/{id}
   - Update an existing task.
   - Request: { "name": "Updated Task 1", "completed": true }
4. DELETE /tasks/{id}
   - Delete a specific task.
5. GET /tasks/{id}

---

| Day       |     | Task                            | Blockers | Notes/ Thoughts |
| --------- | --- | ------------------------------- | -------- | --------------- |
| Monday    |     | Create add and read             |          |                 |
| Tuesday   |     | create file updating and Delete |          |                 |
| Wednesday |     | integrate the functionality     |          |                 |
| Thursday  |     | Finalize MVP                    |          |                 |
| Friday    |     | Add CSS styling                 |          |                 |
| Saturday  |     | Check for bugs if any           |          |                 |
| Sunday    |     | Deploy                          |          |                 |
| Monday    |     | Present                         |          |                 |
