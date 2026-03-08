## HRMS Lite

A lightweight, production-ready HRMS (Human Resource Management System) to manage employees and track attendance.

### Project Overview

HRMS Lite provides:

- **Employee Management**: Add, list, and delete employees.
- **Attendance Management**: Mark daily attendance per employee (Present/Absent) and view records.
- **Dashboard**:
  - Total employees
  - Total present today
  - Total absent today
  - Table of employees with total present days

There is **no authentication**; assume a single admin user.

---

## Tech Stack

- **Backend**
  - Django 3.2
  - Django REST Framework
  - MongoDB via Djongo
  - CORS support (`django-cors-headers`)
- **Frontend**
  - React (Vite)
  - Axios
  - Tailwind CSS
  - React Router
- **Database**
  - MongoDB

---

## Folder Structure

```text
backend/
  hrms/
    __init__.py
    settings.py
    urls.py
    asgi.py
    wsgi.py
  employees/
    __init__.py
    apps.py
    models.py
    serializers.py
    views.py
    urls.py
  attendance/
    __init__.py
    apps.py
    models.py
    serializers.py
    views.py
    urls.py
  dashboard/
    __init__.py
    apps.py
    views.py
    urls.py
  manage.py
  requirements.txt
  Procfile
  .env.example

frontend/
  index.html
  package.json
  vite.config.js
  tailwind.config.cjs
  postcss.config.cjs
  src/
    api/axiosClient.js
    services/
      employeeService.js
      attendanceService.js
      dashboardService.js
    components/
      Navbar.jsx
      EmployeeForm.jsx
      EmployeeTable.jsx
      AttendanceForm.jsx
      AttendanceTable.jsx
      DashboardCards.jsx
      Loader.jsx
      EmptyState.jsx
      ErrorMessage.jsx
    hooks/
      useEmployees.js
      useAttendance.js
      useDashboard.js
    pages/
      Dashboard.jsx
      Employees.jsx
      Attendance.jsx
    App.jsx
    main.jsx
    index.css
```

---

## Backend Setup (Django + DRF + MongoDB)

### 1. Prerequisites

- Python 3.10+ (recommended for Render)
- MongoDB instance (local or cloud, e.g. MongoDB Atlas)

### 2. Create and activate virtual environment

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/macOS
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Copy `.env.example` to `.env` and adjust values:

```bash
cp .env.example .env  # On Windows (PowerShell)
# Or create manually
```

Required variables:

- `DJANGO_SECRET_KEY` – production secret key
- `DJANGO_DEBUG` – `True` for local dev, `False` for production
- `DJANGO_ALLOWED_HOSTS` – comma-separated list of allowed hosts
- `MONGO_DB_NAME` – MongoDB database name
- `MONGO_DB_URI` – MongoDB connection string (e.g. `mongodb://localhost:27017/hrms_lite` or Atlas URI)
- `CORS_ALLOW_ALL_ORIGINS` or `CORS_ALLOWED_ORIGINS` – allowed frontend origins

The `settings.py` file is already configured to use `djongo` with these env vars.

### 5. Run migrations and start server

```bash
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

Backend will be available at `http://localhost:8000`.

---

## Frontend Setup (React + Vite + Tailwind)

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Configure environment variables

Create a `.env` file in `frontend/`:

```bash
VITE_API_BASE_URL=http://localhost:8000/api
```

### 3. Run the frontend

```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`.

---

## API Documentation

Base URL (local):

- `http://localhost:8000/api`

### Employee APIs

- **Create Employee**
  - `POST /api/employees/`
  - Body (JSON):
    ```json
    {
      "employee_id": "EMP001",
      "full_name": "John Doe",
      "email": "john@company.com",
      "department": "Engineering"
    }
    ```
  - Responses:
    - `201 CREATED` with employee object
    - `400 BAD REQUEST` with structured errors (required fields, email format, unique `employee_id`)

- **List Employees**
  - `GET /api/employees/`
  - Responses:
    - `200 OK` with list of employees

- **Delete Employee**
  - `DELETE /api/employees/{id}/`
  - Path:
    - `id` – numeric primary key of the employee
  - Responses:
    - `204 NO CONTENT` on success
    - `404 NOT FOUND` if employee does not exist

### Attendance APIs

- **Create Attendance**
  - `POST /api/attendance/`
  - Body (JSON):
    ```json
    {
      "employee": 1,
      "date": "2026-03-08",
      "status": "Present"
    }
    ```
    - `employee` – numeric employee ID (Django PK)
    - `status` – `"Present"` or `"Absent"`
  - Responses:
    - `201 CREATED` on success
    - `400 BAD REQUEST` with structured errors:
      - required fields
      - invalid date
      - duplicate attendance for same employee and date

- **List All Attendance**
  - `GET /api/attendance/`
  - Responses:
    - `200 OK` with list of attendance records

- **Get Attendance by Employee**
  - `GET /api/attendance/employee/{employee_id}/`
  - Path:
    - `employee_id` – employee code such as `"EMP001"`
  - Responses:
    - `200 OK` with list of records for that employee
    - `404 NOT FOUND` if employee does not exist

- **Filter Attendance by Date**
  - `GET /api/attendance/filter?date=YYYY-MM-DD`
  - Query params:
    - `date` – required, `YYYY-MM-DD`
  - Responses:
    - `200 OK` with list of records for that date
    - `400 BAD REQUEST` if date is missing or invalid

### Dashboard API

- **Get Dashboard Summary**
  - `GET /api/dashboard/`
  - Responses:
    - `200 OK` with:
      ```json
      {
        "total_employees": 5,
        "present_today": 3,
        "absent_today": 2,
        "present_summary": [
          {
            "employee_id": "EMP001",
            "full_name": "John Doe",
            "department": "Engineering",
            "total_present_days": 10
          }
        ]
      }
      ```

---

## Frontend Pages & Features

### Dashboard

- **Route**: `/dashboard`
- **Features**:
  - Shows dashboard cards:
    - Total Employees
    - Present Today
    - Absent Today
  - Table of employees with total present days.

### Employees

- **Route**: `/employees`
- **Features**:
  - Add new employee via form:
    - `employee_id`
    - `full_name`
    - `email`
    - `department`
  - Employee table:
    - Columns: Employee ID, Name, Email, Department, Actions (Delete)
  - Uses loading, empty state, and error components.

### Attendance

- **Route**: `/attendance`
- **Features**:
  - Mark attendance:
    - Select employee (dropdown)
    - Select date
    - Select status (`Present` / `Absent`)
  - Attendance table:
    - Columns: Employee Name, Employee ID, Date, Status
  - Filter attendance by date via date picker and filter button.

---

## Deployment

### Backend (Render)

1. **Push code to a Git repository** (e.g. GitHub).
2. **Create a new Web Service on Render**:
   - Connect your repo.
   - Root directory: `backend`
   - Build command:
     ```bash
     pip install -r requirements.txt
     python manage.py migrate
     ```
   - Start command (uses included `Procfile` as reference):
     ```bash
     gunicorn hrms.wsgi --log-file -
     ```
3. **Environment variables** on Render:
   - `DJANGO_SECRET_KEY`
   - `DJANGO_DEBUG=False`
   - `DJANGO_ALLOWED_HOSTS=<your-render-service-host>`
   - `MONGO_DB_NAME`
   - `MONGO_DB_URI`
   - `CORS_ALLOW_ALL_ORIGINS=False`
   - `CORS_ALLOWED_ORIGINS=https://your-frontend-domain`

4. **MongoDB**:
   - Use MongoDB Atlas or another managed MongoDB.
   - Set its connection string in `MONGO_DB_URI`.

### Frontend (Vercel)

1. **Push the frontend folder to the same repo or a separate one.**
2. **Create a new Vercel project**:
   - Framework preset: **Vite**
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`
3. **Environment variables** on Vercel:
   - `VITE_API_BASE_URL=https://your-backend-domain/api`
4. Deploy; Vercel will host the static site.

---

## MongoDB Configuration

- Local MongoDB:
  - Install MongoDB and run it on default port.
  - Use:
    ```bash
    MONGO_DB_URI=mongodb://localhost:27017/hrms_lite
    MONGO_DB_NAME=hrms_lite
    ```

- MongoDB Atlas:
  - Create a cluster and database.
  - Add your backend’s IP (or `0.0.0.0/0` for dev) to IP Access List.
  - Create a database user.
  - Use the connection string:
    ```bash
    MONGO_DB_URI=mongodb+srv://<user>:<password>@<cluster-url>/hrms_lite?retryWrites=true&w=majority
    MONGO_DB_NAME=hrms_lite
    ```

The Django `DATABASES` config (via Djongo) will use these values.

---

## Setup Commands (Summary)

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # or source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # then adjust values
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

### Frontend

```bash
cd frontend
npm install
echo VITE_API_BASE_URL=http://localhost:8000/api > .env
npm run dev
```

You now have a complete, production-ready HRMS Lite full-stack application with a Django + DRF + MongoDB backend and a React + Vite + Tailwind frontend.

