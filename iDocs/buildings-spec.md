# Buildings Module Specification

## Purpose
Manage all building information for door-to-door campaigns and partner tracking. Buildings link to units and to caretakers or agents (either may be assigned). Building-level view does **not** track per-unit provider status — that lives on Units.

---

## 1. View All Buildings (Table / Grid)
**Columns**
- Building Name
- Address / Location (text)
- Assigned Caretaker/Agent (Name or ID)
- Caretaker/Agent Contact (phone)
- Total Units 
- Providers in Building (list of ISPs present, e.g., Mediatek, Safaricom, Zuku)
- Actions: **View** | **Edit** | **Delete**

**Search & Filter**
- Building Name
- Location (text)
- Caretaker/Agent Name
- Caretaker/Agent Contact (phone)

**UI Notes**
- Stable responsive table/grid.
- Providers shown as small chips or comma list.
- Total Units computed from Units collection on the backend.

---

## 2. Add New Building

**Form Fields**
- **Building Name** — `string` — *required*
- **Address** — `string` — *required*
- **GPS Coordinates** — `{ lat: number, lng: number }` — *optional*
- **Owner / Landlord Name** — `string` — *optional*
- **Assigned Caretaker/Agent** — `id` or `string` — *required* 
	- UI: dropdown populated from Caretaker & Agent module (shows `Name — Phone`). 
	- Optionally allow entering a phone number if person not yet created (system should prompt to create staff or create temp staff record).
- **Caretaker/Agent Contact** — `string` — *required* (phone)
- **Description / Notes** — `string` — *optional*
- **Upload Building Image(s)** — file upload — *optional*
- **Providers in Building** — `string[]` (multi-select or free text) — *optional*

**Save Action**

POST /api/buildings Content-Type: application/json

{ "name": "Sunrise Apartments", "address": "Kilimani, Nairobi", "gps": { "lat": -1.2921, "lng": 36.8219 }, "owner": "John Doe", "staffId": "staff_abc123",     // selected Caretaker/Agent ID "staffPhone": "+254712345678", "notes": "Rooftop antenna installed", "images": ["url1.jpg"], "providers": ["Mediatek", "Zuku"] }

**Validation**
- `name` and `address` required.
- `staffPhone` must be valid phone format.
- `staffId` must reference an existing staff record if provided.

---

## 3. Edit Building
- Uses the Add form pre-filled.
- Editable fields: caretaker/agent, caretaker contact, address/GPS, notes, providers, images.
- Save action:

PUT /api/buildings/:id

---

## 4. View Building Profile (Single Building Page)

**Overview Card**
- Primary image (if any)
- Building Name
- Address (click-to-open map)
- Caretaker/Agent Name + Contact (click-to-call / WhatsApp)
- Providers in Building (chip list)

**Unit Section** (displayed on same page)
- Table columns:
	- Unit Label (e.g., A1)
	- Visit Status (Visited / Not Visited)
	- Provider (Mediatek / Safaricom / Other)
	- Comments (text)
- Actions for each unit:
	- Mark Visited / Not Visited
	- Change Provider
	- Add / Edit Comment
- Filters available:
	- Visited / Not Visited
	- By Provider
- Add New Unit button (opens Unit form)

**Quick Operations**
- Bulk-mark visited/unvisited (optional)
- Export unit list CSV (optional)

---

## 5. Delete Building
- Default: **Soft delete** — set `active: false`, keep linked units and history.
- **Hard delete** allowed only if no units linked (backend prevents otherwise).
- Delete endpoint:

DELETE /api/buildings/:id

---

## API Endpoints (Buildings)
- `GET /api/buildings` → list all buildings (supports query filters)
- `GET /api/buildings/:id` → get building by id (includes providers, staff reference, totalUnits)
- `POST /api/buildings` → add new building
- `PUT /api/buildings/:id` → update building
- `DELETE /api/buildings/:id` → delete (soft/hard depending on backend logic)

---

## Data Model (example)
**Building**
```json
{
	"_id": "bld123",
	"name": "Sunrise Apartments",
	"address": "Kilimani, Nairobi",
	"gps": { "lat": -1.2921, "lng": 36.8219 },
	"owner": "John Doe",
	"staffId": "staff_987",				 // caretaker or agent id
	"staffName": "Peter Mwangi",
	"staffPhone": "+254712345678",
	"notes": "Rooftop antenna installed",
	"images": ["url1.jpg"],
	"providers": ["Mediatek", "Zuku"],
	"totalUnits": 20,
	"active": true,
	"createdAt": "2025-08-08T12:00:00Z"
}
```

Notes

totalUnits computed from Units collection.

providers is an array; show as chips in UI.

Building-level status (visited/provider) is not stored — per-unit provider/status handled in Units.



---

---