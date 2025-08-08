# Units Module Specification

## Purpose
Track door-to-door progress at the unit level for each building: visits, provider per unit, and notes from field staff. Units are created per building and used by field teams to mark progress.

---

## View Units (per Building)
- Units displayed inside Building Profile → Unit Section.
- Table columns:
  - Unit Label (e.g., A1, B2)
  - Visit Status (Visited | Not Visited)
  - Provider (Mediatek | Safaricom | Other)
  - Comments (free text)
  - Actions (Edit | Delete)

**Filters**
- Visited / Not Visited
- By Provider

---

## Add New Unit
**Form Fields**
- **Unit Label** — `string` — *required*
- **Provider** — `string` — *optional* (choose from list or free text)
- **Comments** — `string` — *optional*

**Save Action**

POST /api/buildings/:buildingId/units Body: { "label": "A1", "provider": "Mediatek", "comments": "No one home at first visit" }

Validation:
- `label` required, unique per building.

---

## Edit Unit
- Update label, provider, comments, or visit status.
- Save action:

PUT /api/buildings/:buildingId/units/:unitId

---

## Delete Unit
- Default: **Soft delete** (retain history). Option for hard delete.
- Delete action:

DELETE /api/buildings/:buildingId/units/:unitId

---

## Unit Actions (UX Requirements)
- Inline status toggle: mark unit as Visited / Not Visited quickly during fieldwork.
- Quick comment input (single-line) for short notes.
- Ability to change provider if discovered (e.g., tenant says they use different ISP).
- Bulk operations: mark multiple units as visited (optional).

---

## API Endpoints (Units)
- `GET /api/buildings/:buildingId/units` → list units for building
- `GET /api/buildings/:buildingId/units/:unitId` → get one unit
- `POST /api/buildings/:buildingId/units` → create unit
- `PUT /api/buildings/:buildingId/units/:unitId` → update unit
- `DELETE /api/buildings/:buildingId/units/:unitId` → delete unit

---

## Data Model (example)
**Unit**

json
{
  "_id": "unitA1",
  "buildingId": "bld123",
  "label": "A1",
  "visitStatus": "Not Visited",    // "Visited" or "Not Visited"
  "provider": "Mediatek",
  "comments": "No answer on first attempt",
  "active": true,
  "createdAt": "2025-08-08T14:00:00Z"
}

Notes

Unit label uniqueness constraint scoped to a buildingId.

Keep timestamps for visit history if you want audit trail (optional enhancement).