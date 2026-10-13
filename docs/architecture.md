# CampusFix Architecture

## 1. Overview

CampusFix is a web application for reporting campus issues and tracking their resolution.

The application uses a frontend built with HTML, CSS, and JavaScript, a Python Flask backend, and an SQLite database.

## 2. Technology Stack

| Component | Technology | Responsibility |
|---|---|---|
| Frontend | HTML, CSS, JavaScript | User interface and interactions |
| Backend | Python, Flask | API endpoints and application logic |
| Database | SQLite | Persistent storage for issues and admin accounts |
| Cross-origin requests | Flask-CORS | Allows the configured frontend origin to access the API |
| Authentication | Flask session | Maintains the logged-in admin session |

## 3. High-Level Architecture

```text
Student / Admin
       |
       v
HTML + CSS + JavaScript
       |
       | HTTP requests
       v
Flask REST API
       |
       | SQL queries
       v
SQLite Database
```

The frontend sends requests to the Flask backend. The backend validates supported inputs, performs database operations, and returns JSON responses.

## 4. Issue Reporting Flow

1. A student enters issue details in the report form.
2. JavaScript sends the issue data to `POST /api/issues`.
3. Flask validates the required title and location.
4. The backend inserts the issue into SQLite.
5. The API returns a success response containing the saved issue.

## 5. Dashboard Flow

1. The dashboard requests `GET /api/issues`.
2. Flask retrieves issues from SQLite.
3. The backend returns the issues as JSON.
4. JavaScript displays the issues and updates dashboard statistics and filters.

## 6. Admin Authentication Flow

The admin authentication endpoints are:

- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET /api/admin/session`

After successful login, the backend stores the admin ID in the Flask session.

The `PATCH /api/issues/<issue_id>/status` endpoint checks the session before allowing a status change.

Supported status values are:

- Open
- In Progress
- Resolved

## 7. API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/admin/login` | Authenticate an admin |
| POST | `/api/admin/logout` | Clear the admin session |
| GET | `/api/admin/session` | Check admin authentication |
| POST | `/api/issues` | Create a campus issue |
| GET | `/api/issues` | Retrieve campus issues |
| PATCH | `/api/issues/<issue_id>/status` | Update an issue status |

## 8. Security Considerations

- Admin passwords are verified using password hashes.
- SQL queries use parameterized values for issue creation and status updates.
- Admin authentication is required for issue status updates.
- Session cookies use HTTP-only settings.
- The current CORS configuration allows the configured local frontend origin.
- Debug mode and insecure cookie settings are intended for local development only.

Before production deployment, configure a persistent secret key, disable debug mode, enable secure cookies over HTTPS, and review authentication, authorization, and request validation.

## 9. Testing

Run the test suite from the project root:

```bash
python -m unittest discover -s tests -v
```

The test suite checks the implemented behavior covered by the existing tests.