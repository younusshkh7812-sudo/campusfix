
import getpass
from database import get_connection, create_table
from werkzeug.security import generate_password_hash
create_table()

email = input("Enter admin email: ").strip().lower()
password = getpass.getpass("Enter admin password: ")

if not email or not password:
    print("Email and password are required.")
else:
    connection = get_connection()

    try:
        password_hash = generate_password_hash(password)

        connection.execute(
            "INSERT INTO admins (email, password_hash) VALUES (?, ?)",
            (email, password_hash)
        )

        connection.commit()
        print("Admin account created successfully!")

    except Exception as error:
        print("Could not create admin:", error)

    finally:
        connection.close()
