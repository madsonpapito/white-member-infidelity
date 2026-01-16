# 🕵️‍♂️ Member Area - Reading Signs (Reading Platform)

> **Project Status:** Requirements Specification
> **Objective:** Develop an exclusive membership area focused on a fluid reading experience (PDF First), secure and responsive, for the "Reading Signs" course.

---

## 1. Product Overview
The project consists of a simplified LMS (Learning Management System) platform where the core focus is not video, but **document reading (PDFs)**. The user should feel like they are navigating a high-quality reading app (Kindle/Medium style), rather than just a file folder.

The aesthetic must follow the sales page visual identity: **Royal Blue (#1D4ED8), White, and Light Gray**, conveying seriousness, cleanliness, and trust.

---

## 2. Content Structure (Syllabus)
The system must be populated (or prepared to receive) the following hierarchical structure, based on the sales promise:

### **👋 Onboarding (Start Here)**
* **Lesson 0:** Welcome + How to use the platform.

### **Module 1: The Fundamentals**
* **Content:** "The fundamentals of lying and how the brain reacts."
* **Asset:** Reading PDF + Download Option.

### **Module 2: Body Language**
* **Content:** "Reading eyes, hands, and posture – The body speaks."
* **Asset:** Reading PDF (focus on images/diagrams) + Download Option.

### **Module 3: The Digital World**
* **Content:** "Analyzing text messages and online behavior."
* **Asset:** Reading PDF + Interactive Checklist.

### **Module 4: The Truth Method**
* **Content:** "How to confront safely."
* **Asset:** Reading PDF + Step-by-step Script.

### **🎁 Bonus**
* **Content:** "Guide to Rebuilding Trust and Intimacy."
* **Asset:** Complete E-book.

---

## 3. Functional Requirements (Features)

### 🔐 Authentication & Security
* Login via Email and Password.
* Password Recovery ("Forgot my password").
* Route Protection (only users with `active` status can access content).

### 📺 The PDF Reader (Core Feature)
**Critical Requirement:** The PDF must not just be a download link.
* **Embedded Viewer:** Use libraries like `PDF.js` or `React-PDF` to render the document directly on the page.
* **Controls:** Zoom in/out, Fullscreen Mode, Go to Page X.
* **Download Button:** A secondary button (ghost button) to download the physical file, positioned below the reader.

### 🧭 Navigation & Progress
* **Sidebar:** Collapsible menu listing Modules and Lessons.
* **Progress Tracking:** General progress bar (0 to 100%).
* **"Mark as Complete" Button:** At the end of the reading, the user marks the lesson, and the system automatically advances or suggests the next one ("Next Lesson >").

---

## 4. UI/UX Requirements (Design System)

Based on the reference image (`image_da3325.jpg`):

* **Typography:** Modern Sans-serif (Inter, Roboto, or Poppins). **Bold** titles.
* **Color Palette:**
    * *Primary:* Blue `#2563EB` (Action buttons, links, highlights).
    * *Background:* `#F8FAFC` (Very light gray to reduce eye strain while reading).
    * *Surface:* `#FFFFFF` (Module cards and reading area).
    * *Text:* `#1E293B` (Dark gray for soft contrast).
* **Responsiveness:** **Mobile First**. PDF reading must be adapted for vertical screens (vertical infinite scroll is preferable to horizontal flip on mobile).

---

## 5. Suggested Tech Stack (For Developer)

Modern technologies are recommended to ensure fluidity (SPA - Single Page Application):

* **Frontend:** React.js, Next.js, or Vue.js.
* **Styling:** Tailwind CSS (for agility and consistency with the clean design).
* **Backend/Auth:** Supabase or Firebase (Auth + Database + Storage for PDFs).
* **PDF Rendering:** `react-pdf-viewer` or native browser library in a sandboxed iframe (depending on desired security).

---

## 6. Data Structure (Schema Suggestion)

```json
// Table: Modules
{
  "id": "mod_01",
  "title": "Module 1: The Fundamentals",
  "order_index": 1,
  "is_bonus": false
}

// Table: Lessons
{
  "id": "les_01",
  "module_id": "mod_01",
  "title": "How the brain reacts to lying",
  "pdf_url": "https://storage.../file.pdf",
  "description": "A brief introduction to psychology...",
  "duration_read": "10 min"
}

// Table: UserProgress
{
  "user_id": "u_123",
  "lesson_id": "les_01",
  "completed": true,
  "completed_at": "timestamp"
}
```
