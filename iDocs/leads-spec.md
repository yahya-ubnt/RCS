# Leads Module Specification

## Purpose
The **Leads** module manages all incoming potential customer inquiries or referrals, tracking their status from submission to conversion.  
This module integrates with WhatsApp, SMS, and potentially API sources to create leads automatically, and supports manual creation.

---

## UI Flow

When the user clicks on 'Leads' in the sidebar, a dropdown menu appears with the following options:

- **Add New Lead**
- **View All Leads**

---

## 1. Add New Lead

**Purpose:** To allow users to manually input new lead information.

**Form Fields:**
- **Name** — `string` — *optional*
- **Phone Number** — `string` — *required*, unique, validated
- **Lead Source** — `string` (e.g., Manual, WhatsApp, SMS, Referral, Website) — *optional*
- **Building Name** — `string` — *optional* (text input, potentially with autocomplete/suggestions from existing buildings)
- **Building Location** — `string` — *optional* (text input, could be address or general area)
- **Notes** — `string` (text area) — *optional*. Use for comments like: current provider, reason for dissatisfaction with current provider, specific customer needs, etc.
- **Next Payment Date** — `Date` — *optional*. The date the lead is expected to make the next payment. Can be manually entered or chosen from a calendar.

**Save Action:**
- `POST /api/leads`

**Validation:**
- `Phone Number` is required and must be a valid, unique phone format.

---

## 2. View All Leads

**Purpose:** To display a comprehensive list of all leads with their details.

**Display:** A table or grid showing all relevant lead information.

**Columns (example):**
- Name
- Phone Number
- Lead Source
- Building Name
- Building Location
- Status (e.g., New, In Progress, Converted, Rejected)
- Assigned To (Agent/Caretaker)
- Created At
- Next Payment Date
- Actions: **View Details** | **Edit** | **Change Status**

**Search & Filter:**
- By Name
- By Phone Number
- By Lead Source
- By Status
- By Assigned To
- By Building Name/Location

---

## Main Features (General)
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

**Response (example):**
```json
[
  {
    "_id": "lead_123",
    "name": "John Doe",
    "phoneNumber": "+254712345678",
    "leadSource": "Website",
    "buildingName": "Sunrise Apartments",
    "buildingLocation": "Kilimani, Nairobi",
    "status": "new",
    "assignedTo": "staff_123",
    "notes": "Currently with Safaricom, unhappy with speed. Looking for 10Mbps.",
    "createdAt": "ISODate",
    "updatedAt": "ISODate",
    "nextPaymentDate": "ISODate" // Example: "2025-09-15T00:00:00Z"
  }
]
```

### Other Endpoints

- `GET /api/leads/:id` → get lead by id
- `POST /api/leads` (Auth)→ add new lead
- `PUT /api/leads/:id` (Auth)→ update lead
- `DELETE /api/leads/:id` (Auth)→ delete lead

---

## Data Model (example)
**Lead**
```json
{
  "_id": "lead_123",
  "name": "John Doe",
  "phoneNumber": "+254712345678",
  "leadSource": "Website",
  "buildingName": "Sunrise Apartments",
  "buildingLocation": "Kilimani, Nairobi",
  "status": "new",
  "assignedTo": "staff_123", // Reference to Staff ID
  "notes": "Currently with Safaricom, unhappy with speed. Looking for 10Mbps.",
  "nextPaymentDate": "ISODate", // Example: "2025-09-15T00:00:00Z"
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```