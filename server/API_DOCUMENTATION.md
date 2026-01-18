# EMS Server API Documentation

Base URL: `http://localhost:5000`

## Auth

- **POST** `/api/auth/login` – Login and obtain authentication token.

## Departments

- **POST** `/api/departments` – Create a new department.
- **GET** `/api/departments` – List all departments.
- **GET** `/api/departments/:id` – Get department by ID.
- **PUT** `/api/departments/:id` – Update department by ID.
- **DELETE** `/api/departments/:id` – Delete department by ID.

## Employees

- **POST** `/api/employees` – Create a new employee.
- **GET** `/api/employees` – List all employees.
- **GET** `/api/employees/:id` – Get employee by ID.
- **PUT** `/api/employees/:id` – Update employee by ID.
- **DELETE** `/api/employees/:id` – Delete employee by ID.

## Leaves

- **POST** `/api/leaves` – Create a new leave record.
- **GET** `/api/leaves` – List all leaves.
- **GET** `/api/leaves/:id` – Get leave by ID.
- **PUT** `/api/leaves/:id` – Update leave by ID.
- **DELETE** `/api/leaves/:id` – Delete leave by ID.
