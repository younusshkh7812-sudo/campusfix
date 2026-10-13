
import os
import sys
import tempfile
import unittest

# Make the backend modules available to the test file.
BACKEND_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "backend")
)
sys.path.insert(0, BACKEND_DIR)

import database

# Use a separate database for testing.
TEST_DIRECTORY = tempfile.mkdtemp(prefix="campusfix_tests_")
database.DATABASE = os.path.join(
    TEST_DIRECTORY, "test_campusfix.db"
)

from app import app
from werkzeug.security import generate_password_hash


class CampusFixAPITests(unittest.TestCase):

    def setUp(self):
        app.config["TESTING"] = True
        self.client = app.test_client()

        # Reset only the temporary test database.
        connection = database.get_connection()
        try:
            connection.execute("DELETE FROM issues")
            connection.execute("DELETE FROM admins")

            connection.execute(
                """
                INSERT INTO admins (email, password_hash)
                VALUES (?, ?)
                """,
                (
                    "admin@campusfix.test",
                    generate_password_hash("TestPass123!"),
                ),
            )
            connection.commit()
        finally:
            connection.close()

    def create_test_issue(self):
        return self.client.post(
            "/api/issues",
            json={
                "title": "Projector not working",
                "priority": "High",
                "category": "Electrical",
                "location": "CSE-H",
                "description": "Projector is not turning on.",
            },
        )

    def login_admin(self):
        return self.client.post(
            "/api/admin/login",
            json={
                "email": "admin@campusfix.test",
                "password": "TestPass123!",
            },
        )

    def test_create_issue(self):
        response = self.create_test_issue()

        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            response.get_json()["issue"]["status"], "Open"
        )

    def test_issue_requires_title_and_location(self):
        response = self.client.post(
            "/api/issues",
            json={"title": "", "location": ""},
        )

        self.assertEqual(response.status_code, 400)

    def test_get_issues(self):
        self.create_test_issue()

        response = self.client.get("/api/issues")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.get_json()), 1)

    def test_admin_login(self):
        response = self.login_admin()

        self.assertEqual(response.status_code, 200)

    def test_admin_session_and_logout(self):
        login_response = self.login_admin()
        self.assertEqual(login_response.status_code, 200)

        session_response = self.client.get("/api/admin/session")
        self.assertEqual(session_response.status_code, 200)

        logout_response = self.client.post("/api/admin/logout")
        self.assertEqual(logout_response.status_code, 200)

        session_after_logout = self.client.get(
            "/api/admin/session"
        )
        self.assertEqual(session_after_logout.status_code, 401)

    def test_status_update_requires_admin_login(self):
        issue_response = self.create_test_issue()
        issue_id = issue_response.get_json()["issue"]["id"]

        response = self.client.patch(
            f"/api/issues/{issue_id}/status",
            json={"status": "Resolved"},
        )

        self.assertEqual(response.status_code, 401)

    def test_admin_can_update_issue_status(self):
        issue_response = self.create_test_issue()
        issue_id = issue_response.get_json()["issue"]["id"]

        self.login_admin()

        response = self.client.patch(
            f"/api/issues/{issue_id}/status",
            json={"status": "Resolved"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()["status"], "Resolved")

    def test_invalid_status_is_rejected(self):
        issue_response = self.create_test_issue()
        issue_id = issue_response.get_json()["issue"]["id"]

        self.login_admin()

        response = self.client.patch(
            f"/api/issues/{issue_id}/status",
            json={"status": "Invalid Status"},
        )

        self.assertEqual(response.status_code, 400)


if __name__ == "__main__":
    unittest.main()
