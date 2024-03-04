# User Signup Documentation

### API Endpoint

- **Endpoint**: `/api/auth/signup`

### Expected Request Body

The request body should contain the following fields:

- `user_email`: The user's email address.
- `user_password`: The user's password.
- `first_name`: The user's first name.
- `last_name`: The user's last name.
- `username`: The user's chosen username.
- `institution`: The user's institution (optional).
- `designation`: The user's designation (optional, defaults to "user").
- `user_profile_url`: The URL to the user's profile picture (optional).

### Response

Upon successful registration, the response will include:

- `data`: Contains the new user's details, excluding the password and creation timestamp.
- `message`: A success message indicating the user has been registered successfully.
- `error`: A boolean indicating the absence of errors (`false`).

Example response:

```json
{
  "data": {
    "user_id": 1,
    "user_email": "example@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "username": "johndoe",
    "institution": "Example University",
    "designation": "user",
    "user_profile_url": "https://example.com/profile.jpg"
  },
  "message": "user registered successfully",
  "error": false
}
```

Example CURL

```bash
curl --request POST \
 --url http://localhost:3003/api/auth/signup \
 --header 'Content-Type: application/json' \
 --header 'User-Agent: insomnia/8.6.1' \
 --data '{
 "user_email": "example@example.com",
 "user_password": "examplePassword123",
 "first_name": "John",
 "last_name": "Doe",
 "username": "johndoe",
 "institution": "Example University",
 "designation": "user",
 "user_profile_url": "https://example.com/profile.jpg"
}'

```

## User Schema

The `Users` table schema is defined as follows:

```sql

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT,
    user_email varchar(63) NOT NULL UNIQUE,
    user_password varchar(255) NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    username varchar(63) NOT NULL UNIQUE,
    institution varchar(63) DEFAULT "",
    designation varchar(63) DEFAULT "user",
    user_profile_url varchar(255) DEFAULT "",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_details_json json,
    verified boolean DEFAULT false,
    PRIMARY KEY (user_id)
);

```

### Fields

- `user_id`: A unique identifier for each user.
- `user_email`: The user's email address, must be unique.
- `user_password`: The user's encrypted password.
- `first_name`, `last_name`: The user's first and last names.
- `username`: The user's chosen username, must be unique.
- `institution`: The user's institution (optional).
- `designation`: The user's designation (optional, defaults to "user").
- `user_profile_url`: The URL to the user's profile picture (optional).
- `created_at`: The timestamp of the user's registration.
- `user_details_json`: A JSON field for storing additional user details.
- `verified`: A boolean indicating whether the user's email has been verified (defaults to false).

### Note

- The `user_password` field is not included in the response to maintain security.
- The `created_at` field is automatically set to the current timestamp upon user registration.
- The `verified` field is used to track email verification status.
