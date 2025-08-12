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
- **Assigned Caretaker/Agent Name** — `string` — *required* (manually entered)
- **Assigned Caretaker/Agent Contact** — `string` — *required* (phone, manually entered)
- **Description / Notes** — `string` — *optional*
- **Upload Building Image(s)** — file upload — *optional*
- **Total Units** — `number` — *optional*
- **Providers in Building** — `string[]` (multi-select or free text) — *optional*

**Save Action**

POST /api/buildings Content-Type: application/json

{ "name": "Sunrise Apartments", "address": "Kilimani, Nairobi", "gps": { "lat": -1.2921, "lng": 36.8219 }, "owner": "John Doe", "staffId": "staff_abc123",     // selected Caretaker/Agent ID "staffPhone": "+254712345678", "notes": "Rooftop antenna installed", "images": ["url1.jpg"], "providers": ["Mediatek", "Zuku"], "totalUnits": 50 }

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
- `POST /api/buildings` (Auth)→ add new building
- `PUT /api/buildings/:id` (Auth)→ update building
- `DELETE /api/buildings/:id` (Auth)→ delete (soft/hard depending on backend logic)

---

## Data Model (example)
**Building**
```json
{
	"_id": "bld_123",
	"name": "Sunrise Apartments",
	"address": "Kilimani, Nairobi",
	"gps": { "lat": -1.2921, "lng": 36.8219 },
	"owner": "John Doe",
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