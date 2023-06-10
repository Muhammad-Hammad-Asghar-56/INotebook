
# Backend API Documentation

This documentation provides details about the backend API endpoints for user authentication and note management.

## User Authentication

This section provides details about the user authentication endpoints for user registration, login, and retrieving user details.

### Create User

**Endpoint**: `/user/auth/createUser`
**Method**: `POST`
**Required Authorization**: No

#### Request Body

| Field       | Type   | Description         |
| ----------- | ------ | ------------------- |
| `name`      | string | User's name         |
| `email`     | string | User's email address |
| `password`  | string | User's password     |

#### Response

- Status: 200 OK
- Body: JSON object containing the authentication token (`authToken`).

#### Exceptions

- Status: 400 Bad Request
  Body: JSON object containing the error details.
- Status: 500 Internal Server Error
  Body: JSON object containing the error details.

### Login

**Endpoint**: `/user/auth/login`
**Method**: `POST`
**Required Authorization**: No

#### Request Body

| Field       | Type   | Description         |
| ----------- | ------ | ------------------- |
| `email`     | string | User's email address |
| `password`  | string | User's password     |

#### Response

- Status: 200 OK
- Body: JSON object containing the authentication token (`authToken`).

#### Exceptions

- Status: 400 Bad Request
  Body: JSON object containing the error details.
- Status: 500 Internal Server Error
  Body: JSON object containing the error details.

### Get User Details

**Endpoint**: `/user/auth/getUser`
**Method**: `POST`
**Required Authorization**: Yes

#### Response

- Status: 200 OK
- Body: JSON object containing the user details.

#### Exceptions

- Status: 500 Internal Server Error
  Body: JSON object containing the error details.


## Note Management

This section provides details about the endpoints for managing notes.

### Add New Note

**Endpoint**: `/note/addNote`
**Method**: `POST`
**Required Authorization**: Yes

#### Request Body

| Field       | Type   | Description       |
| ----------- | ------ | ----------------- |
| `title`     | string | Title of the note |
| `description` | string | Description of the note |
| `tag`       | string | Tag for categorizing the note |

#### Response

- Status: 200 OK
- Body: JSON object containing the details of the added note.

#### Exceptions

- Status: 500 Internal Server Error
  Body: JSON object containing the error details.

### Get All Notes

**Endpoint**: `/note/getNotes`
**Method**: `GET`
**Required Authorization**: Yes

#### Response

- Status: 200 OK
- Body: JSON array containing all the notes of the user.

#### Exceptions

- Status: 500 Internal Server Error
  Body: JSON object containing the error details.

### Delete a Note

**Endpoint**: `/note/deleteNote/:noteID`
**Method**: `DELETE`
**Required Authorization**: Yes

#### Path Parameters

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| `noteID`  | string | ID of the note to be deleted |

#### Response

- Status: 200 OK
- Body: JSON object with the title indicating the successful deletion.

#### Exceptions

- Status: 500 Internal Server Error
  Body: JSON object containing the error details.

### Update a Note

**Endpoint**: `/note/updateNoteOnID/:noteID`
**Method**: `PUT`
**Required Authorization**: Yes

#### Path Parameters

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| `noteID`  | string | ID of the note to be updated |

#### Request Body

| Field       | Type   | Description       |
| ----------- | ------ | ----------------- |
| `title`     | string | Updated title     |
| `description` | string | Updated description |
| `tag`       | string | Updated tag       |

#### Response

- Status: 200 OK
- Body: JSON object with the title indicating the successful update and the updated note details.

#### Exceptions

- Status: 401 Unauthorized
  Body: JSON object indicating access denied.
- Status: 500 Internal Server Error
  Body: JSON object containing the error details.

### Get One Note

**Endpoint**: `/note/getNote/:id`
**Method**: `GET`
**Required Authorization**: Yes

#### Path Parameters

| Parameter | Type   | Description          |
| --------- | ------ | -------------------- |
| `id`      | string | ID of the note to get |

#### Response

- Status: 200 OK
- Body: JSON array containing the requested note.

#### Exceptions

- Status: 500 Internal Server Error
  Body: JSON object containing the error details.

