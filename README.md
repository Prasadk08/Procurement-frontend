📦 AI-Powered Procurement System

A full-stack platform to automate RFP (Request for Proposal) management, vendor submission, AI-driven vendor comparison, and procurement workflows.

📁 1. Project Setup
1.a Prerequisites

Node.js: v18 or later

Package Manager: npm or yarn

Database: MongoDB Atlas

AI Provider: Google Gemini (via LangChain)

Email Provider: Gmail SMTP / Nodemailer

Frontend Framework: Next.js 16

1.b Installation Steps
🔹 Clone Repository
git clone Frontend : https://github.com/Prasadk08/Procurement-frontend
git clone Backend : https://github.com/Prasadk08/Procurement-Backend
cd Procurement-System

🔹 Backend Setup
cd backend
npm install

🔹 Frontend Setup
cd ../frontend
npm install

⚙️ 1.c Configure Email Sending

Create a .env file in backend:

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email
EMAIL_PASS=your-app-password

▶️ 1.d Run Locally
Start Backend
cd backend
npm start

Start Frontend
cd frontend
npm run dev


Visit:
Live Website Link : 👉 https://procurement-frontend-ten.vercel.app/

🧪 1.e Seed Data (Optional)
node app.js

🧱 2. Tech Stack
2.a Frontend

Next.js 16
TypeScript
TailwindCSS
ShadCN UI
React Hook Form


2.b Backend

Node.js
Express.js
Mongoose
LangChain
Google Gemini Flash 2.0 (AI Model)

2.c Database
MongoDB Atlas (Cloud NoSQL)

2.d Hosting

Frontend: Vercel
Backend: Render
Database: MongoDB Atlas

2.e Key Libraries

axios
cors
dotenv
nodemailer
langchain



🔌 3. API Documentation
3.a Vendor Comparison API
POST /api/compare-vendors
Request Body:
{
  "vendors": [
    {
      "name": "Vendor A",
      "price": 5000,
      "deliveryDays": 7,
      "warranty": 12
    }
  ]
}

Success Response:
{
  "comparisons": [
    {
      "vendor": "Vendor A",
      "priceScore": 8,
      "deliveryScore": 9,
      "warrantyScore": 7,
      "overallScore": 8,
      "summary": "Good price and fast delivery."
    }
  ],
  "bestVendor": {
    "vendor": "Vendor A",
    "reason": "Vendor A offers the best balance of pricing, delivery speed, and warranty coverage. Their proposal is cost-effective while maintaining strong service reliability. Delivery time is faster than competitors, adding operational advantage. The overall value makes Vendor A the ideal procurement choice."
  }
}

Error Example:
{
  "error": "Failed to evaluate vendors"
}

3.b RFP Routes
POST /api/rfp

Creates new RFP.

GET /api/rfp/:id

Fetches RFP details.

3.c Vendor Submission Routes
POST /api/vendor/submit

Vendor submits proposal.

GET /api/vendors

Fetch all vendors.

🧠 4. Decisions & Assumptions
4.a Key Design Decisions

MongoDB Atlas chosen for flexible schema handling.

Next.js selected for SSR, routing, server actions, and production readiness.

AI vendor comparison built using LangChain + Gemini with strict JSON output parsing.

Weighted scoring model created to evaluate:

Price (40%)

Delivery (30%)

Warranty (30%)

4.b Assumptions

Vendor data always arrives in correct structure.

Emails are formatted consistently.

Client uploads attachments externally.

AI model always returns valid JSON (enforced via prompt).


🤖 5. AI Tools Usage
5.a Tools Used

ChatGPT
Gemini Flash 2.0
LangChain
Cursor IDE (AI Coding Assistant)

5.b Help Provided by AI

Generating boilerplate code.
Creating scoring algorithms.
Prompt engineering for JSON-safe responses.
Improving UI layout using Tailwind & ShadCN.

5.c Notable Approaches

Strict JSON schema in prompts to prevent AI hallucinations.
Used LangChain output parser for stability.
Implemented server-side AI execution for security.

5.d What I Learned

Next.js is more powerful than React for production apps.
Prompt structure heavily affects AI output quality.
AI can significantly speed up backend logic implementation.
Combining AI + traditional backend yields reliable automation.

🚀 Why Choose Next.js Over React.js?
1️⃣ Built-in SSR + SSG

Next.js gives instant SEO, performance, and page-speed advantages.

2️⃣ File-Based Routing

No React Router setup needed.

3️⃣ Server + Client Components

Better optimization and faster rendering.

4️⃣ Production-Ready Features

Image optimization

Metadata management

Server Actions

API Routes

5️⃣ Vercel Native Deployment

Next.js apps deploy instantly with auto-optimizations.

React alone cannot provide these features without heavy manual setup.