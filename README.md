# Job Tracker App

## Description
A simple Job Tracker application built with **React** and **Redux Toolkit** for managing job applications. This app allows users to add, edit, and delete job applications, filter jobs by status, type, and sort them by date. The application uses Redux for state management, including features like pagination, search debouncing, and mock authentication.

## Features
- **Job Management:**
  - Add, edit, and delete job applications.
  - Filter jobs by status, job type, and sorting.
  - Pagination and search functionality.
  
- **Mock Authentication:**
  - Protected routes with mock authentication.
  - User state persisted in `localStorage`.

- **UX Enhancements:**
  - Search input debounced to prevent rapid dispatching of actions.
  - LocalStorage integration for persisting state across sessions.
  - Toast notifications for delete,success.

## Technologies Used
- **React**
- **Redux Toolkit**
- **React Router DOM**
- **Bootstrap** (or any CSS framework)
- **LocalStorage** for persistence
- **React-Toastify** for notifications

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/MohammedTaha18/jobtracker.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the app:
    ```bash
    npm start
    ```

## Usage
- Navigate through the dashboard to view, add, edit, and delete job applications.
- Use filters to narrow down the job list by status, type, and sorting.
- Search for jobs by position or company.
- Check the "Stats" page for insights into the job applications.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

