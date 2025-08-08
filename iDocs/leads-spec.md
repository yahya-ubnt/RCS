# iDocs Leads Module Specification

## Purpose
The **Leads** module manages all incoming potential customer inquiries or referrals, tracking their status from submission to conversion.  
This module integrates with WhatsApp, SMS, and potentially API sources to create leads automatically, and supports manual creation.

---

## Main Features
- Store and manage all leads in a structured database.
- Capture lead source (manual, WhatsApp, SMS, API).
- Track the current status of each lead (e.g., New, In Progress, Converted, Rejected).
- Assign leads to agents or caretakers for follow-up.
- Record and update contact details, property information, and notes.
- Link leads to referral programs for commission tracking.
- Enable search, filtering, and sorting by key fields.
- Support bulk imports (CSV/Excel) and exports.
- Provide audit trail for lead status changes.

---

## API Endpoints

### `GET /api/leads`
**Description:** Retrieve all leads, with optional filters for status, source, date range, and assigned agent.  
**Query Parameters:**
- `status` (string) — Optional. Filter by lead status.
- `source` (string) — Optional. Filter by lead source.
- `assignedTo` (string) — Optional. Filter by assigned agent/caretaker.
- `startDate` / `endDate` (date) — Optional. Filter by creation date range.
- `search` (string) — Optional. Search across name, phone, or property.

**Response:**
```json
[
  {
    "id": "string",
    "fullName": "string",
    "phone": "string",
    "propertyId": "string",
    "unitId": "string",
    "source": "manual | whatsapp | sms | api",
    "status": "new | in_progress | converted | rejected",
    "assignedTo": "agent_id",
    "notes": "string",
    "createdAt": "ISODate",
    "updatedAt": "ISODate"
  }
]
