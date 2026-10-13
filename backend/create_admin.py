
from werkzeug.security import generate_password_hash
from database import get_connection, create_table, DATABASE_URL


def execute_query(connection, query, parameters=()):
    if DATABASE_URL:
        query = query.replace("?", "%s")

    return connection.execute(query, parameters)


def main():
    create_table()

    email = input("Enter admin email: ").strip().lower()
    password = input("Enter admin password: ")

    if not email or not password:
        print("Email and password are required.")
        return

    connection = get_connection()

    try:
        password_hash = generate_password_hash(password)

        execute_query(
            connection,
            "INSERT INTO admins (email, password_hash) VALUES (?, ?)",
            (email, password_hash)
        )

        connection.commit()
        print("Admin account created successfully!")

    except Exception as error:
        connection.rollback()
        print("Could not create admin:", error)

    finally:
        connection.close()


if __name__ == "__main__":
    main()