# Units Module Specification

## Purpose
Manage individual unit information within buildings, specifically for door-to-door campaign tracking.

---

## 1. View All Buildings (for Unit Management)
**Purpose:** To allow users to select a building to manage its units.
**Display:** Similar to the "View All Buildings" section in the Buildings module.
**Columns:**
- Building Name
- Address / Location
- Total Units (from Building data)
- Actions: **Manage Units** (button/link)

**Search & Filter:**
- Building Name
- Location

**UI Notes:**
- Responsive table/grid.
- Clicking "Manage Units" navigates to the "Manage Units for a Specific Building" view.

---

## 2. Manage Units for a Specific Building
**Purpose:** To provide a spreadsheet-like interface for tracking individual unit status and comments within a selected building.
**Display:** A dynamic form/table, generating rows based on the `totalUnits` of the selected building.

**Header Information (for the selected building):**
- Building Name
- Address
- Total Units

**Unit Entry Fields (for each unit, 1 to Total Units):**
- **Unit Number/Label** — `string` (e.g., 1, 2, A1, B2) — *auto-generated/pre-filled based on total units, editable for custom labels*
- **Visited Status** — `boolean` (checkbox/toggle: Visited / Not Visited) — *required*
- **Provider Status** — `string` (dropdown: Mediatek, Safaricom, Zuku, Other, Not Applicable) — *required*
- **Comments** — `string` (text area) — *optional*

**Save Action:**
- A single save action for all units in the building.
- `PUT /api/buildings/:id/units` or `POST /api/units/bulk` (to be determined based on backend design, likely a bulk update/create)

**Validation:**
- All units must have a `Visited Status` and `Provider Status` selected before saving.

**UI Notes:**
- Spreadsheet-like interface for easy data entry.
- Auto-save functionality (optional, but recommended for large forms).
- Clear visual indicators for visited/not visited status.

---

## API Endpoints (Units)
- `GET /api/buildings/:id/units` → Get all units for a specific building.
- `PUT /api/buildings/:id/units` → Bulk update/create units for a specific building.
- `GET /api/units/:id` → Get a single unit by ID (if needed for future individual unit editing).
- `PUT /api/units/:id` → Update a single unit by ID (if needed for future individual unit editing).

---

## Data Model (example)
**Unit**
```json
{
	"_id": "unit_123",
	"buildingId": "bld_abc",
	"unitNumber": "A1",
	"visited": true,
	"provider": "Mediatek",
	"comments": "Customer interested in 10Mbps package.",
	"createdAt": "2025-08-12T10:00:00Z",
	"updatedAt": "2025-08-12T10:30:00Z"
}
```

Notes:
- `unitNumber` can be a custom label or a sequential number.
- `visited` and `provider` are key tracking fields.
