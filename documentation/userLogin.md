# Signin API Documentation

## Endpoint

`POST /api/auth/signin`

## Description

This API endpoint is used for user authentication. It allows users to sign in by providing their email and password. Upon successful authentication, the user receives an access token and a refresh token.

## Request Body

```json
{
  "user_email": "string",
  "user_password": "string"
}
```

- `user_email`: The email address of the user.
- `user_password`: The password of the user.

## Response

```json
{
  "data": {
    "user": {
      "user_id": "integer",
      "user_email": "string",
      "first_name": "string",
      "last_name": "string",
      "username": "string",
      "institution": "string",
      "designation": "string",
      "user_profile_url": "string",
      "verified": "boolean"
    },
    "accessToken": "string"
  },
  "message": "user logged-in successfully",
  "error": false
}
```

### Success Response

- **Status Code**: `200 OK`
- **Content**:

```json
{
  "message": "Invalid Credentials"
}
```

- `data`: Contains the user information and the access token.
- `user`: The user's information.
  - `user_id`: The unique identifier of the user.
  - `user_email`: The email address of the user.
  - `first_name`: The first name of the user.
  - `last_name`: The last name of the user.
  - `username`: The username of the user.
  - `institution`: The institution associated with the user.
  - `designation`: The designation of the user.
  - `user_profile_url`: The URL to the user's profile picture.
  - `verified`: A boolean indicating whether the user's email is verified.
- `accessToken`: The access token for the user.
- `message`: A success message indicating that the user has logged in successfully.
- `error`: A boolean indicating that there was no error.

### Error Response

- **Status Code**: `400 Bad Request`
- **Content**:

- `message`: An error message indicating that the provided credentials are invalid.

Example CURL

```bash
curl --request POST \
 --url http://localhost:3003/api/auth/signin \
 --header 'Content-Type: application/json' \
 --header 'User-Agent: insomnia/8.6.1' \
 --data '{
    "user_email":"example@example.com",
    "user_password": "examplePassword123"
}'
```

## Notes

- The API uses JWT (JSON Web Tokens) for authentication.
- The access token is used for accessing protected routes.
- The refresh token is used to obtain a new access token when the current one expires. It is stored in a secure, HTTP-only cookie to prevent XSS attacks. The refresh token is generated using a cryptographically secure random number generator and is valid for a predefined period. Upon expiration, the user must re-authenticate to obtain a new refresh token.
- The refresh token is crucial for maintaining a user's session without requiring them to log in again. It allows the application to issue new access tokens without exposing the user's credentials.
- The user's password is hashed using bcrypt for security.
- The user's permissions are fetched and included in the access token.
- The user's details, including `user_details_json`, are not included in the response for security reasons.
