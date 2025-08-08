# Caretaker & Agent Module Specification

## Purpose
Manage caretakers and agents (staff) who can be assigned to buildings. The building form uses this list in a dropdown; you may also allow ad-hoc phone entry that prompts staff creation.

---

## Core Features
- Create caretaker or agent.
- Edit caretaker or agent.
- Delete caretaker or agent.
- List and search staff.
- Assign staff to buildings (selection in building form).
- Search staff by name or phone.

---

## Fields
- **id** — Unique identifier
- **fullName** — `string` — *required*
- **phone** — `string` — *required`, unique, validated
- **role** — `enum` — *required* — Values: `Caretaker`, `Agent`
- **assignedBuildings** — `string[]` (array of building IDs) — *optional*
- **status** — `enum` — `Active` | `Inactive`
- **createdAt**, **updatedAt**

---

## Add / Edit Staff Form
**Fields**
- Full Name (required)
- Phone Number (required, validated)
- Role (Caretaker or Agent) (required)
- Assigned Buildings (optional multi-select)
- Status (Active / Inactive)

**Save Actions**
- Create:

POST /api/staff Body: { "fullName": "Mwikali Jane", "phone": "+254712345678", "role": "Caretaker" }

- Update:

PUT /api/staff/:id

**Delete**
- Soft delete preferred (set `status: Inactive`).
- Endpoint:

DELETE /api/staff/:id

---

## UI Requirements
- Staff list table with columns: Name | Phone | Role | Assigned Buildings (count) | Status | Actions (Edit, Delete)
- Search & filter by name and phone.
- When adding a building, dropdown must display staff entries as: `Name — Phone (Role)` and return `staffId`.

**Dropdown Behavior (Building form)**
- Primary method: pick an existing staff entry from dropdown (required).
- If staff not found, allow manual entry of phone number **and** show a prompt/button: "Create staff from this phone".
- Validation: if phone exists in staff table, auto-select existing staff.

---

## API Endpoints (Staff)
- `GET /api/staff` → list staff (supports query by role, active)
- `GET /api/staff/:id` → get staff
- `POST /api/staff` → create staff
- `PUT /api/staff/:id` → update staff
- `DELETE /api/staff/:id` → delete (soft/hard according to policy)

---

## Data Model (example)
**Staff**
```json
{
  "_id": "staff_987",
  "fullName": "Peter Mwangi",
  "phone": "+254712345678",
  "role": "Caretaker",  // or "Agent"
  "assignedBuildings": ["bld123","bld456"],
  "status": "Active",
  "createdAt": "2025-08-08T11:00:00Z"
}
```

Notes

phone should be unique — use it to prevent duplicate staff records.

Allow linking staff ↔ buildings via assignedBuildings array (optional).

Building form should support selecting staff by id (preferred) or entering phone to auto-create new staff if needed.
