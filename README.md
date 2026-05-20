# 💻Mini Lead Distribution System

A real-time lead distribution platform built with **Next.js**, **MongoDB**, **Mongoose**, and **Socket.IO**.

This project automatically distributes customer leads using:

- Mandatory provider rules
- Fair round-robin allocation
- Provider quota management
- Real-time dashboard updates
- Webhook idempotency
- MongoDB transactions
- Concurrency-safe assignment handling

---

# 🚀 Live Project Links
Customer-Request-Service Page
```bash
https://lead-distribution-system-fawn.vercel.app/request-service
```
Admin-Dashboard Page
```bash
https://lead-distribution-system-fawn.vercel.app/dashboard
```
Provider-Dashboard Page
```bash
https://lead-distribution-system-fawn.vercel.app/dashboard/6a0c61cada2a6fe72107d04b
```
Test-Tools Page
```bash
https://lead-distribution-system-fawn.vercel.app/test-tools
```

# 🔗 GitHub Repository

```bash
https://github.com/omgujar77/Lead-Distribution-System.git
```

---

# 🛠️ Tech Stack

## Frontend

- Next.js 15
- React.js
- Tailwind CSS
- Socket.IO Client

## Backend

- Node.js
- Next.js API Routes
- Socket.IO
- MongoDB
- Mongoose

---

# ✨ Main Features

## Customer Lead Submission

Customers can submit:

- Name
- Phone
- City
- Service Type
- Description

The system automatically:

- Creates lead
- Prevents duplicate leads
- Assigns providers
- Updates provider quotas
- Sends real-time dashboard updates
- Socket.IO real-time updates work locally using custom Node.js server.
For deployed Vercel compatibility, dashboard uses auto-refresh polling.

---

# 🧠 Smart Lead Assignment Engine

## Mandatory Provider Rules

| Service Type | Mandatory Providers |
|---|---|
| Service 1 | Provider 1 |
| Service 2 | Provider 5 |
| Service 3 | Provider 1, Provider 4 |

---

## Fair Round Robin Distribution

Remaining providers are selected using:

- Round-robin algorithm
- Allocation state tracking
- Quota checking
- Duplicate prevention

---

# 📊 Provider Dashboard

Each provider dashboard displays:

- Provider name
- Remaining quota
- Total assigned leads
- Assigned leads list
- Real-time updates using Socket.IO

---

# 🧪 Admin Tools

Admin testing page includes:

- Reset provider quotas
- Generate concurrent leads
- Test payment webhook

---

# 🔔 Webhook System

Simulated payment webhook:

- Resets provider quota
- Stores processed webhook IDs
- Prevents duplicate webhook execution
- Demonstrates idempotency handling

---

# ⚡ Concurrency Handling

The system supports concurrent lead requests using:

- MongoDB transactions
- Retry mechanism
- Atomic operations
- Session management

This prevents:

- Duplicate assignments
- Incorrect quota deductions
- Race conditions

---

# 📡 Real-Time Features

Implemented using **Socket.IO**.

## Events

- `lead-assigned`
- `quota-updated`

Provider dashboards update instantly without page refresh.

---

# 📁 Project Structure

```bash
app/
 ├── api/
 ├── dashboard/
 ├── request-service/
 └── test-tools/

lib/
 ├── db.js
 ├── socket.js
 └── socketClient.js

models/
 ├── Provider.js
 ├── Lead.js
 ├── LeadAssignment.js
 ├── AllocationState.js
 └── ProcessedWebhook.js

services/
 └── assignmentService.js

scripts/
 └── seed.js
```

---

# 🔌 API Endpoints

## Lead Creation

```http
POST /api/leads/create
```

Creates customer lead and assigns providers.

---

## Provider Dashboard API

```http
GET /api/providers/:id
```

Returns provider details and assigned leads.

---

## Reset Quotas

```http
POST /api/admin/reset-quotas
```

Resets all provider quotas to `10`.

---

## Test Concurrency

```http
POST /api/admin/test-concurrency
```

Creates multiple simultaneous lead requests.

---

## Payment Webhook

```http
POST /api/webhooks/payment-success
```

Simulates payment success webhook.

---

# 🌐 Pages / Routes

## Customer Form

```bash
/request-service
```

Used for customer lead submission.

---

## Provider Dashboard

```bash
/ dashboard / :providerId
```

Example:

```bash
/dashboard/PROVIDER_ID
```

---

## Admin Test Tools

```bash
/test-tools
```

Used for:

- Concurrency testing
- Webhook testing
- Quota reset

---

# 👨‍💼 Provider Dashboard Links


## Provider 1

```bash
https://lead-distribution-system-fawn.vercel.app/dashboard/6a0c61cada2a6fe72107d048
```

## Provider 2

```bash
https://lead-distribution-system-fawn.vercel.app/dashboard/6a0c61cada2a6fe72107d049
```

## Provider 3

```bash
https://lead-distribution-system-fawn.vercel.app/dashboard/6a0c61cada2a6fe72107d04a
```

## Provider 4

```bash
https://lead-distribution-system-fawn.vercel.app/dashboard/6a0c61cada2a6fe72107d04b
```

## Provider 5

```bash
https://lead-distribution-system-fawn.vercel.app/dashboard/6a0c61cada2a6fe72107d04c
```

---

# ⚙️ Setup Instructions

## 1. Clone Repository

```bash
https://github.com/omgujar77/Lead-Distribution-System.git
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create Environment File

Create:

```bash
.env.local
```

Add:

```env
MONGODB_URI=your_mongodb_connection_string
```

---

## 4. Seed Database

```bash
npm run seed
```

This creates:

- Providers
- Allocation states

---

## 5. Run Project

```bash
npm run dev
```


# 🧪 Testing Guide

## 1. Customer Lead Submission

Open:

```bash
/request-service
```

Submit customer details.

---

## 2. Provider Dashboard

Open provider dashboard in another tab.

Verify:

- Realtime updates
- Lead assignments
- Quota changes

---

## 3. Concurrency Test

Open:

```bash
/test-tools
```

Run:

```bash
Generate 5 Concurrent Leads
```

Verify:

- No crashes
- Correct quotas
- Correct distribution

---

## 4. Webhook Test

Enter:

- Webhook ID
- Provider ID

Run webhook.

Verify:

- Quota reset
- Duplicate webhook blocked

---

# 📚 Key Concepts Implemented

- Real-time communication
- MongoDB transactions
- Webhook idempotency
- Concurrency handling
- Round-robin scheduling
- REST APIs
- State management
- Socket.IO events
- Database indexing
- Duplicate prevention

---

# 👨‍💻 Author

## Om Gujar

- Branch: Computer Science Engineering (CSE)
- Semester: 5th Semester

---

# 📝 Final Notes

This project was built as a backend-focused real-time lead distribution system demonstrating:

- Scalable architecture
- Fair provider allocation
- Concurrent request handling
- Realtime updates
- Production-level backend concepts

---
