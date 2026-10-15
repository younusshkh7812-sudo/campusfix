# CampusFix 🏫

**Report it. Track it. Fix it.**

CampusFix is a full-stack campus issue reporting system that helps students report problems and track their progress. Administrators can review reported issues and update their status through a dedicated admin dashboard.

🌐 **Live Website:** https://campusfix-6lb8.onrender.com

## ✨ Features

- 📝 Report campus issues with title, category, location, priority, and description.
- 📋 View, search, and filter reported issues.
- 🔄 Track issue statuses: Open, In Progress, and Resolved.
- 📊 View campus issue statistics.
- 🔐 Admin login, session management, and logout.
- 🛠️ Admin dashboard for reviewing issues and updating statuses.
- 💾 Persistent database storage.
- 🧪 Automated API tests using Python `unittest`.

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python, Flask
- **Local Database:** SQLite
- **Production Database:** PostgreSQL (Neon)
- **Testing:** Python `unittest`
- **Version Control:** Git and GitHub
- **Deployment:** Render

## 🌐 Live Deployment

- **Website:** https://campusfix-6lb8.onrender.com
- **Issues API:** https://campusfix-6lb8.onrender.com/api/issues

The deployed application uses PostgreSQL for persistent production storage. Local development can use SQLite.

## 📁 Project Structure

```text
CampusFix/
├── .github/
│   ├── issue_template/
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
│   ├── dashboard.html
│   ├── admin.html
│   └── admin-dashboard.html
├── JS/
├── css/
├── docs/
├── tests/
│   └── test_api.py
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/younusshkh7812-sudo/campusfix.git
cd campusfix
```

### 2. Create and activate a virtual environment

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```powershell
python -m pip install -r backend/requirements.txt
```

### 4. Start the application

```powershell
cd backend
python app.py
```

Open **http://127.0.0.1:5000/** in your browser.

For local development, SQLite is used when `DATABASE_URL` is not configured. To use PostgreSQL locally, configure your own `DATABASE_URL` environment variable. Never commit database credentials or secret keys to GitHub.

## 🧪 Run Tests

From the project root, activate your virtual environment and run:

```powershell
python -m unittest discover -s tests -v
```

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/issues` | Retrieve reported issues |
| POST | `/api/issues` | Submit a new issue |
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/session` | Check admin session |
| POST | `/api/admin/logout` | Admin logout |
| PATCH | `/api/issues/<issue_id>/status` | Update issue status with admin authentication |

## 🔄 Issue Statuses

- **Open:** The issue has been reported.
- **In Progress:** Work on the issue is ongoing.
- **Resolved:** The issue has been resolved.

## 🔒 Security

- Admin-only actions require an authenticated session.
- Password verification uses secure password-hashing utilities.
- Production secrets and database credentials should be configured through environment variables.
- Never commit passwords, database URLs, or secret keys to the repository.

## 🤝 Contributing

Contributions, bug reports, and feature suggestions are welcome.

1. Fork the repository.
2. Create a branch for your changes.
3. Make your changes and run the tests.
4. Submit a pull request.

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## 📄 License

See [LICENSE](LICENSE) for licensing details.

## 👨‍💻 Maintainer

**Yunus**

Built with care to make campus issue reporting more organized and transparent.

---

*CampusFix — Report it. Track it. Fix it.*
