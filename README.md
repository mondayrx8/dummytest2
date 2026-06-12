<div align="center">

# 🎓 SiswaNiaga
**Enterprise-grade University Student Business Portfolio System & Landing Page Builder**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

*Empowering student entrepreneurs to generate high-fidelity, interactive pitch decks while providing administrators with a powerful command center for analytics and management.*

</div>

---

## 📖 Project Overview

**SiswaNiaga** is a robust, full-stack web application designed for university students. It operates as a comprehensive **Pitch Deck Directory and Landing Page Builder**, bridging the gap between student entrepreneurs and potential investors or customers. The platform empowers users to craft professional business portfolios with an elegant, responsive interface tailored to the academic enterprise aesthetic.

---

## ✨ Key Enterprise Features

- **🚀 Dynamic Premium Landing Page Generation (5 Themes)**
  - **Theme 1: Startup Pitch Deck** — Classic, Professional, Parallax scrolling.
  - **Theme 2: Minimalist Modern** — Clean, fast, Bento-box aesthetic.
  - **Theme 3: Maison Editorial** — Dark Luxe, cinematic, pinned-scroll animations, featuring semantic CSS architecture (`oklch` color tokens), Newsreader typography, and enterprise-grade accessibility.
  - **Theme 4: Maison de Saveur** — Elegant F&B light theme with Artisan warmth, refined typography, and smooth hover interactions.
  - **Theme 5: NEXUS / Cybernetic** — Dark, futuristic tech aesthetic with cybernetic accents, terminal typing effects, and modular layouts for SaaS/IT ventures.
- **📱 High-Fidelity Responsive Design**
  - Fluid typography and seamless mobile user experiences across all views.
  - Optimized Framer Motion scroll-based interactions with strict accessibility-focused touch targets.
  - Refined parallax animations and layouts for flawless cross-device rendering.
- **🛡️ Admin Command Center (Dashboard)**
  - Built with a sleek, minimalist Tailwind UI.
  - Real-time **MongoDB Aggregation Analytics** (Category Distribution, Template Popularity).
  - Smart Data Table featuring Debounced Search, Category Filtering (F&B, Tech & IT, Retail/Apparel, Services), and Advanced Sorting.
  - High-fidelity UX with Skeleton Loaders and customized Empty States.
- **🌐 Investor Directory (Public Portal)**
  - Public-facing directory showcasing student ventures.
  - Server-side Pagination and Search.
  - Smart thumbnail fallback system prioritizing business banners.
- **🏗️ Advanced Backend Architecture**
  - **Server-Side Pagination, Filtering, and Sorting** to handle large datasets seamlessly.
  - **MongoDB Aggregation Pipelines** for lightning-fast dashboard analytics.
  - **Strict Privacy Controls (RBAC):** Admins oversee all operations; Students manage only their own ventures.
- **🤖 AI Copywriter Integration**
  - Powered by **Google Gemini 2.5 Flash** to automatically generate professional marketing slogans.
- **🖼️ Advanced Image Management**
  - Seamless main cover and multiple gallery media uploads managed via **Cloudinary**.

---

## 📸 Showcase & Preview

> **Note:** Replace the placeholder links below with actual screenshots or GIFs of your project.

| Admin Command Center | Maison Editorial Theme | Minimalist Modern Theme |
| :---: | :---: | :---: |
| ![Command Center Dashboard](https://via.placeholder.com/400x250?text=Command+Center+Dashboard) | ![Maison Editorial Theme](https://via.placeholder.com/400x250?text=Maison+Editorial+Theme) | ![Minimalist Modern Theme](https://via.placeholder.com/400x250?text=Minimalist+Modern+Theme) |

*Features sleek data tables, real-time analytics, and enterprise-grade UI.*

---

## 🧩 Project Architecture

SiswaNiaga is built on the MERN stack and strictly follows the **Controller-Service Pattern** for maintainability and scalability. The platform leverages a highly refined design system, utilizing semantic CSS architectures and modern typography for a strict "Corporate Professional" aesthetic.

```text
📦 siswaniaga
 ┣ 📂 client (Vite + React)
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components   # Reusable UI components & Theme Templates
 ┃ ┃ ┣ 📂 pages        # Route pages (Dashboard, Directory, Editor)
 ┃ ┃ ┗ 📜 App.jsx      # Main application router
 ┃ ┗ 📜 tailwind.config.js
 ┗ 📂 server (Node.js + Express)
   ┣ 📂 controllers    # Request handlers (e.g., PortfolioController.js)
   ┣ 📂 services       # Core business logic & database queries
   ┣ 📂 models         # Mongoose Schemas
   ┣ 📂 routes         # API endpoint definitions
   ┣ 📂 validations    # Zod validation schemas
   ┗ 📜 server.js      # Express application entry point
```

---

## 🚀 Getting Started

Follow these step-by-step instructions to get a local copy up and running.

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/siswaniaga.git
cd siswaniaga
```

### 2. Install Dependencies

**For Client:**
```bash
cd client
npm install
```

**For Server:**
```bash
cd ../server
npm install
```

### 3. Setup Environment Variables
Create `.env` files in both the `client` and `server` directories based on the required keys outlined below.

#### Server (`server/.env`)
| Key | Description |
|---|---|
| `PORT` | The port the backend will run on (e.g., 5000) |
| `MONGO_URI` | Your MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `FRONTEND_URL` | URL of your deployed or local frontend (for CORS) |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET`| Your Cloudinary API secret |

#### Client (`client/.env`)
| Key | Description |
|---|---|
| `VITE_API_URL` | URL of your backend API |
| `VITE_CLOUDINARY_CLOUD_NAME`| Cloudinary cloud name for frontend uploads |
| `VITE_GEMINI_API_KEY` | Google Gemini API Key for the AI Copywriter |

### 4. Run the Application

**Run Backend Server:**
```bash
cd server
npm run dev
```

**Run Frontend Client:**
```bash
cd client
npm run dev
```

---

## 🔌 API Endpoints Overview

Here is a quick overview of the primary REST API endpoints available in the backend.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register a new student account | ❌ |
| `POST` | `/api/auth/login` | Authenticate user and receive JWT | ❌ |
| `GET` | `/api/portfolio/dashboard-list` | Fetch paginated portfolios with filtering | ✅ |
| `GET` | `/api/portfolio/directory` | Fetch public directory (investor view) | ❌ |
| `POST` | `/api/portfolio/create` | Create a new business portfolio | ✅ |
| `GET` | `/api/stats/analytics` | Retrieve admin dashboard analytics | ✅ (Admin) |
| `GET` | `/api/stats` | Retrieve global system statistics | ❌ |

---

## 🏗️ Deployment Architecture

SiswaNiaga embraces a modern, decoupled deployment architecture for maximum performance, security, and scalability:

- **Frontend (Cloudflare Pages):** The Vite React application is deployed on Cloudflare Pages, taking advantage of Cloudflare's massive global Edge network for ultra-fast asset delivery and out-of-the-box SSL.
- **Backend (Oracle Cloud VPS):** The Node.js/Express API is hosted on an Oracle Cloud VPS (ARM Ampere architecture). The application process is kept alive and monitored using **PM2**, and routed securely to the internet through an **Nginx** reverse proxy to handle traffic loads and TLS termination.

---

## 🎓 Acknowledgements & License

This project was developed as a Final Year Project (FYP) for Universiti Utara Malaysia (UUM). 

Distributed under the MIT License. See `LICENSE` for more information.
