
import os
import secrets

from flask import Flask, request, jsonify, session, send_from_directory
from flask_cors import CORS
from werkzeug.security import check_password_hash

from database import create_table, get_connection, DATABASE_URL


app = Flask(__name__)

app.secret_key = (
    os.environ.get("CAMPUSFIX_SECRET_KEY")
    or secrets.token_hex(32)
)

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": os.environ.get(
                "CORS_ORIGIN",
                "http://127.0.0.1:5501"
            ).split(",")
        }
    },
    supports_credentials=True
)

app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=(
        os.environ.get("SESSION_COOKIE_SECURE", "false").lower()
        == "true"
    )
)
@app.route("/")
def home():
    return send_from_directory(
        os.path.join(os.path.dirname(__file__), "..", "frontend"),
        "index.html"
    )

@app.route("/report.html")
def report_page():
    return send_from_directory(
        os.path.join(os.path.dirname(__file__), "..", "frontend"),
        "report.html"
    )


@app.route("/dashboard.html")
def dashboard_page():
    return send_from_directory(
        os.path.join(os.path.dirname(__file__), "..", "frontend"),
        "dashboard.html"
    )

@app.route("/admin.html")
def admin_page():
    return send_from_directory(
        os.path.join(os.path.dirname(__file__), "..", "frontend"),
        "admin.html"
    )
@app.route("/admin-dashboard.html")
def admin_dashboard_page():
    return send_from_directory(
        os.path.join(os.path.dirname(__file__), "..", "frontend"),
        "admin-dashboard.html"
    )

@app.route("/JS/<path:filename>")
def serve_js(filename):
    return send_from_directory(
        os.path.join(os.path.dirname(__file__), "..", "JS"),
        filename
    )


@app.route("/css/<path:filename>")
def serve_css(filename):
    return send_from_directory(
        os.path.join(os.path.dirname(__file__), "..", "css"),
        filename
    )

def execute_query(connection, query, parameters=()):
    """Run a query using the correct placeholder for each database."""
    if DATABASE_URL:
        query = query.replace("?", "%s")

    return connection.execute(query, parameters)


# Create the required tables when the backend starts.
create_table()


@app.route("/api/admin/login", methods=["POST"])
def admin_login():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "error": "Email and password are required"
        }), 400

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({
            "error": "Email and password are required"
        }), 400

    connection = get_connection()

    try:
        admin = execute_query(
            connection,
            "SELECT * FROM admins WHERE email = ?",
            (email,)
        ).fetchone()
    finally:
        connection.close()

    if admin is None or not check_password_hash(
        admin["password_hash"], password
    ):
        return jsonify({
            "error": "Invalid email or password"
        }), 401

    session.clear()
    session["admin_id"] = admin["id"]

    return jsonify({
        "message": "Admin login successful"
    }), 200


@app.route("/api/admin/logout", methods=["POST"])
def admin_logout():
    session.clear()

    return jsonify({
        "message": "Logged out successfully"
    }), 200


@app.route("/api/admin/session", methods=["GET"])
def admin_session():
    if "admin_id" not in session:
        return jsonify({
            "authenticated": False
        }), 401

    return jsonify({
        "authenticated": True
    }), 200


@app.route("/api/issues", methods=["POST"])
def create_issue():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "error": "No issue data received"
        }), 400

    title = data.get("title", "").strip()
    location = data.get("location", "").strip()

    if not title or not location:
        return jsonify({
            "error": "Title and location are required"
        }), 400

    priority = data.get("priority", "Medium")
    category = data.get("category", "Other")
    description = data.get("description", "")
    status = "Open"

    connection = get_connection()

    try:
        cursor = execute_query(
            connection,
            """
            INSERT INTO issues
            (title, priority, category, location, description, status)
            VALUES (?, ?, ?, ?, ?, ?)
            RETURNING id
            """,
            (title, priority, category, location, description, status)
        )

        issue_id = cursor.fetchone()["id"]
        connection.commit()

    finally:
        connection.close()

    return jsonify({
        "message": "Issue saved successfully",
        "issue": {
            "id": issue_id,
            "title": title,
            "priority": priority,
            "category": category,
            "location": location,
            "description": description,
            "status": status
        }
    }), 201


@app.route("/api/issues", methods=["GET"])
def get_issues():
    connection = get_connection()

    try:
        rows = execute_query(
            connection,
            "SELECT * FROM issues ORDER BY id DESC"
        ).fetchall()
    finally:
        connection.close()

    issues = [dict(row) for row in rows]

    return jsonify(issues), 200


@app.route("/api/issues/<int:issue_id>/status", methods=["PATCH"])
def update_issue_status(issue_id):
    # Only logged-in admins can update issue status.
    if "admin_id" not in session:
        return jsonify({
            "error": "Admin login required"
        }), 401

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "error": "Status is required"
        }), 400

    status = data.get("status", "").strip()

    allowed_statuses = ["Open", "In Progress", "Resolved"]

    if status not in allowed_statuses:
        return jsonify({
            "error": "Invalid status"
        }), 400

    connection = get_connection()

    try:
        cursor = execute_query(
            connection,
            "UPDATE issues SET status = ? WHERE id = ?",
            (status, issue_id)
        )

        if cursor.rowcount == 0:
            return jsonify({
                "error": "Issue not found"
            }), 404

        connection.commit()

    finally:
        connection.close()

    return jsonify({
        "message": "Issue status updated successfully",
        "issue_id": issue_id,
        "status": status
    }), 200


if __name__ == "__main__":
    app.run(debug=False)

