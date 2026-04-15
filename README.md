# 🎓 SiswaNiaga - Universiti Utara Malaysia Enterprise Portal

A professional, high-fidelity web application built for Universiti Utara Malaysia (UUM) that empowers student entrepreneurs to create, manage, and showcase their business ventures to potential investors. 

![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.3.0-646CFF?style=flat-square&logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)

## ✨ Features

### 🎯 For Student Entrepreneurs
- **Venture Creation** - Build stunning business portfolios with rich content and media.
- **Dashboard Management** - Edit, preview, and delete portfolios easily through a professional dashboard.
- **Export to PDF** - Download individual portfolio pitch decks directly.
- **Real-time Progress** - Track form completion and platform statistics visually.

### 🌐 For Investors (Guest View)
- **Public Showcase Gallery** - Browse all published student ventures through a premium Venture Card grid.
- **Smart Search & Filters** - Quickly navigate projects by keywords or specific criteria.
- **Interactive Details** - Hover effects and complete pitch views out of the box.

### 🔐 Architecture & Security
- **Secure Authentication** - JWT-based auth system with session management and secure routing.
- **Role-based Access Control (RBAC)** - Separates student dashboard (authenticated) from public investor views.
- **Clean Architecture** - Standardized OOP Controller-Service backend implementation.

## 🎨 Design System

Fully refactored to align with the formal **Universiti Utara Malaysia (UUM)** academic enterprise aesthetic, completely utilizing CSS variables to standardize styling across all modules.

| Brand Color | Hex | Usage |
|-------|-----|-------|
| **UUM Royal Navy Blue** | `#0B2046` | Primary brand color, headers, authentications, authoritative elements |
| **UUM Academic Gold** | `#FDB813` | Accents, core CTAs, highlights |

### UI/UX Highlights
- ✅ Comprehensive implementation of the UUM color scheme
- ✅ Glassmorphism effects perfectly matched with deep navy branding
- ✅ Clean white-card setups for the investor galleries and showcases
- ✅ Modern typography utilizing the **Poppins** font family
- ✅ Dynamic micro-animations for responsiveness and interactivity

## 🛠️ Tech Stack

**Frontend:**
- React 19 + Vite
- React Router DOM
- html2pdf.js for Document Generation
- Custom CSS Variables for Theming (`styles.css`)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (OOP MVC approach)
- JWT + bcryptjs for security

## 📁 Project Structure

```text
📦 FYP1_Portfolio
 ┣ 📂 client                 # React frontend application
 ┃ ┣ 📂 public             # Public static assets
 ┃ ┣ 📂 src               
 ┃ ┃ ┣ 📂 assets           # Static UI media
 ┃ ┃ ┣ 📂 components       # Modular React functional components
 ┃ ┃ ┃ ┣ 📜 Dashboard, Portfolio cards, Navbar, etc.
 ┃ ┃ ┣ 📜 App.jsx          # Entry application routing 
 ┃ ┃ ┣ 📜 config.js        # Global configuration configurations
 ┃ ┃ ┣ 📜 main.jsx         # React application entry point
 ┃ ┃ ┣ 📜 scroll-landing.css # Landing page specific styling
 ┃ ┃ ┗ 📜 styles.css       # Core Design System CSS variables & utilities
 ┃ ┣ 📜 index.html         # Main HTML template
 ┃ ┣ 📜 package.json       # Frontend dependency configurations
 ┃ ┣ 📜 vercel.json        # Vercel deployment configurations
 ┃ ┗ 📜 vite.config.js     # Vite configuration
 ┣ 📂 server                 # Express backend application
 ┃ ┣ 📂 config             # Environment and external resource setups
 ┃ ┣ 📂 controllers        # Route handlers and HTTP logic
 ┃ ┣ 📂 middleware         # Auth, validation, and error guards
 ┃ ┣ 📂 models             # Mongoose database schemas
 ┃ ┣ 📂 routes             # API endpoints definitions
 ┃ ┣ 📂 services           # Business logic and database operations
 ┃ ┣ 📂 utils              # Helper functions
 ┃ ┣ 📂 validations        # Zod validation schemas
 ┃ ┣ 📜 .env               # Environment configuration file (not in repo)
 ┃ ┗ 📜 index.js           # Server entry point
 ┣ 📜 package.json           # Backend & root dependency configurations
 ┗ 📜 README.md              # Project documentation
```

## 🚀 Quick Start

1. **Clone the repository**
2. **Setup Backend:**
   - In the root folder, run `npm install`
   - Setup a `.env` file at `server/.env` based on standard configurations (e.g., MongoDB URI, JWT Secret)
   - Start the backend via `node server/index.js`
3. **Setup Frontend:**
   - Navigate to the frontend directory: `cd client`
   - Install dependencies: `npm install`
   - Start the development server: `npm run dev`
