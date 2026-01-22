# Recursive To-Do Application (comuneo Intro Task)

A full-stack, recursive to-do list application built with **React**, **TypeScript**, and **Appwrite**. This project demonstrates the ability to handle complex nested data structures, third-party BaaS integration, and automated testing pipelines.

[![Vercel Deployment](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://comuneo-todo-test-react.vercel.app)
[![CI Checks](https://github.com/CodePapi/comuneo-todo-test-react/actions/workflows/ci.yml/badge.svg)](https://github.com/CodePapi/comuneo-todo-test-react/actions)

## 🚀 Live Demo
You can view the live application here: [comuneo-todo-test-react.vercel.app](https://comuneo-todo-test-react.vercel.app)

---

## 🚀 Technical Stack

* **Frontend**: React, Vite, TypeScript
* **Styling**: Tailwind CSS
* **Routing**: React Router DOM
* **Backend as a Service**: Appwrite (Auth & Database)
* **State Management**: React Context API
* **Testing**: Vitest & React Testing Library
* **DevOps**: GitHub Actions & Vercel

---

## ✨ Features & Accomplishments

* **Recursive Task Architecture**: Supports infinite nesting of sub-tasks. Adding a sub-task to any level preserves the tree structure in the UI and the database.
* **Authentication**: Secure Login and Signup flow using Appwrite Account API.
* **Data Persistence**: All tasks are stored in Appwrite Databases. The app performs a recursive "tree-build" algorithm on the client side to reconstruct the nested UI from flat database documents.
* **Form Validation**: Implemented schema-based validation using **Zod** and **React Hook Form** for the signup process.
* **Optimistic UI**: Checkbox toggles and task additions reflect instantly in the UI for a snappy user experience.
* **Accessibility**: Used `useId` for form associations and semantic HTML for better screen-reader support.

---

## 🛠️ Installation & Setup

1. **Clone the repository**:
```bash
git clone <your-repo-url>
cd comuneo-todo-test-react

```


2. **Install dependencies**:
```bash
npm install

```


3. **Environment Variables**:
Create a `.env` file in the root directory. Refer to `.env.sample` for the required keys:
* `VITE_APPWRITE_ENDPOINT`
* `VITE_APPWRITE_PROJECT_ID`
* `VITE_APPWRITE_DATABASE_ID`
* `VITE_APPWRITE_COLLECTION_ID`


4. **Run the app**:
```bash
npm run dev

```



---

## 🧪 Testing

I have included UI tests specifically for the Todo component to verify recursive rendering and user interactions.

* **Run tests**: `npm run test`
* **Interactive UI tests**: `npm run test:ui`

---

## 📑 Project Reflections & Trade-offs

* **Framework Choice**: I initially started with **Remix**, but encountered significant compatibility challenges with the latest versioning during setup. To prioritize delivering a functional, bug-free recursive logic within the time limit, I migrated to **Vite/React**.
* **Data Privacy**: Currently, todo data is accessible to any authenticated users. In a real world production environment, I would implement Appwrite **Document-Level Permissions** to ensure users can only see their own tasks.
* **Appwrite Functions**: I opted not to implement the SMTP Welcome Email function to focus on the core recursive logic and testing. However, I have extensive experience with **Nodemailer** and **Mailgun** in custom Node.js environments.
* **Separation of Concerns**: While mostly decoupled, some logic remains in the Context providers to speed up development; ideally, business logic would be further abstracted into custom hooks.

---

## ♾️ DevOps & CI/CD (Thought Exercise)

As part of the project requirements, I implemented a modern CI/CD strategy:

1. **GitHub Actions (CI)**:
* Triggered on every Pull Request to `main`.
* **Linting**: Runs ESLint to check for code quality.
* **Testing**: Runs the Vitest suite to ensure no regressions in the recursive logic.



2. **Vercel (CD)**:
* **Continuous Deployment**: Merges to `main` trigger an automatic production deployment.
* **Preview Deployments**: Each PR generates a unique preview URL for testing features in a live environment.


3. **Production Readiness**:
* In a larger scale project, I would utilize **Docker** to containerize the environment, ensuring parity between local development and the cloud server.



---

### Closing Note

Thank you for this challenge! It provided a great introduction to the Remix philosophy and the Appwrite ecosystem. Even though I am uncertain given my decisions like not using Remix for instance, I am still very grateful for the opportunity. 

---