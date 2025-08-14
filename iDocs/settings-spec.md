# Settings Module Specification

## Purpose
This module allows users to manage their personal account settings, including changing their username and password.

---

## UI Flow

When the user clicks on 'Settings' in the sidebar/navigation, they should be directed to this page.

---

## 1. Change Username & Password

**Purpose:** To allow authenticated users to update their full name (acting as a username) and password.

**Form Fields:**
- **Full Name** — `string` — *required*, pre-filled with current user's full name.
- **Current Password** — `password` — *required*, for verification.
- **New Password** — `password` — *required*, minimum 8 characters, strong password policy (e.g., mix of uppercase, lowercase, numbers, special characters).
- **Confirm New Password** — `password` — *required*, must match New Password.

**Save Action:**
- `PUT /api/users/profile` (or a dedicated endpoint like `/api/users/change-password`)
- The request body should include `fullName` (if changed), `currentPassword`, and `newPassword`.

**Validation:**
- `Full Name` is required.
- `Current Password` must match the user's actual current password (backend validation).
- `New Password` must meet strength requirements (frontend and backend validation).
- `New Password` and `Confirm New Password` must match (frontend validation).
- If `New Password` is provided, `Current Password` is required.

**UI Notes:**
- Clear success/error messages after submission.
- Password fields should be masked.

---

## API Endpoints (New/Modified)

- `PUT /api/users/profile` (Auth) → Update user profile (including full name).
  - **Request Body (example for profile update):**
    ```json
    {
      "fullName": "Jane Doe"
    }
    ```
  - **Request Body (example for password change):**
    ```json
    {
      "currentPassword": "oldPassword123",
      "newPassword": "newStrongPassword456"
    }
    ```
    *(Note: It's generally better practice to have a separate endpoint for password changes for security reasons, e.g., `PUT /api/users/change-password`. If the backend doesn't have this, the frontend will need to send `currentPassword` and `newPassword` to `/api/users/profile` and the backend should handle it.)*

---

## Data Model (User - extended example)
The existing User data model will not need to be extended for these changes.

**User**
```json
{
  "_id": "user_123",
  "fullName": "Admin User",
  "email": "admin@example.com",
  "phone": "+254700000000",
  "isAdmin": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

---

## UI Requirements (General)
- The page should be accessible only to authenticated users.
- Use Shadcn UI v0 components for forms.
- Ensure clear and concise labels and instructions.
- Provide immediate feedback on validation errors.
- Display success messages upon successful updates.
- Responsive design for various screen sizes.