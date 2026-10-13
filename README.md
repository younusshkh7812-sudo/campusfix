# CampusFix 🏫

**A campus issue reporting and tracking system.**

CampusFix is a web application designed to help students report campus-related problems and track their status in one place.

## ✨ Features

- Report campus issues with a title, category, location, priority, and description.
- Store reported issues in an SQLite database.
- View reported issues on the dashboard.
- Track issue statuses such as Open, In Progress, and Resolved.
- Search and filter issues on the dashboard.
- View dashboard statistics.
- Provide a Flask-based API for frontend-backend communication.

> Note: Features requiring authentication or administrator access should be documented according to the functionality actually implemented.

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python, Flask
- **Database:** SQLite
- **Testing:** Python unittest

## 📁 Project Structure

```text
CampusFix/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
├── backend/
│   ├── app.py
│   ├── database.py
│   ├── models.py
│   ├── create_admin.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── report.html
│   └── dashboard.html
├── JS/
│   ├── api.js
│   ├── report.js
│   └── dashboard.js
├── css/
│   └── style.css
├── docs/
│   └── architecture.md
├── tests/
│   └── test_api.py
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Python 3
- Git
- A modern web browser
- Visual Studio Code (recommended)

### 1. Clone the repository

```bash
git clone https://github.com/younusshkh7812-sudo/campusfix.git
cd campusfix
```

### 2. Create and activate a virtual environment

**Windows:**

```bash
python -m venv .venv
.venv\Scripts\activate
```

### 3. Install dependencies

```bash
python -m pip install -r backend/requirements.txt
```

### 4. Start the backend

Follow the backend configuration instructions and run the Flask application from the correct working directory.

### 5. Open the frontend

Open `frontend/index.html` with VS Code Live Server, or use another local static server.

Ensure that the frontend API URL matches the backend address and that the backend allows requests from the frontend origin.

## 🧪 Running Tests

From the project root, run:

```bash
python -m unittest discover -s tests -v
```

## 🔌 API

The backend exposes REST API endpoints for supported CampusFix operations.

Check the Flask routes in `backend/app.py` for the exact endpoints, request formats, and response codes.

## 🤝 Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting changes.

You can report bugs or suggest features using the GitHub issue templates.

## 📄 License

See the [LICENSE](LICENSE) file for the project's licensing terms.

## 👨‍💻 Maintainer

**Yunus**

Built to make campus issue reporting more organized and transparent.