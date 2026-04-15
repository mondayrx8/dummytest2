<div align="center">

# 🎓 SiswaNiaga
**Digital Entrepreneur Portfolio Builder for UUM Students**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

*An enterprise-grade profiling platform for student entrepreneurs to create investor-ready pitch decks.*

</div>

## 📖 About The Project

**SiswaNiaga** is a robust, full-stack web application designed specifically for university students (Universiti Utara Malaysia). Operating as a comprehensive **Pitch Deck Directory**, it bridges the gap between student entrepreneurs and potential investors or customers. The platform empowers users to craft professional business portfolios that highlight their products, traction, and business models with an elegant, responsive interface tailored to the academic enterprise aesthetic.

---

## ✨ Key Features

- **🔐 Secure Authentication:** Robust user authentication and authorization using JWT and `bcrypt`.
- **📝 Comprehensive Pitch Deck Builder:** Easily input and manage business fundamentals, market size projections, and financial data.
- **🤖 AI Copywriter Integration:** Powered by **Google Gemini 2.5 Flash** to automatically generate professional marketing slogans using structured JSON mode.
- **🖼️ Advanced Image Management:** Seamless main cover and multiple gallery media uploads managed via **Cloudinary**.
- **📈 Dynamic Traction Charts:** Highly interactive data visualizations and line charts built with **Recharts**.
- **📥 Export & Share:** Instantly download portfolios as PDF or share via direct **WhatsApp** deal links.
- **🌐 SEO Ready:** Fully optimized with dynamic Meta tags, automated sitemap generation, and `robots.txt` configuration.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React (via Vite)
- **Routing:** React Router
- **Data Fetching:** Axios
- **Visualization:** Recharts
- **Validation:** Zod

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Security:** JWT, bcryptjs

### Cloud & External Services
- **Image Hosting (CDN):** Cloudinary
- **AI Integration:** Google Gemini API
- **Deployment & Hosting:** 
  - **Frontend:** Cloudflare Pages
  - **Backend:** Oracle Cloud VPS (ARM Ampere) managed with PM2 & Nginx

---

## 🚀 Getting Started / Local Installation

To get a local copy up and running, follow these simple steps.

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/siswaniaga.git
cd siswaniaga
```

### 2. Install Dependencies
You need to install dependencies for both the client and the server.

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
Create `.env` files in both the `client` and `server` directories based on the required keys outlined in the **Environment Variables** section below.

### 4. Run the Application
**Run Server:**
```bash
cd server
npm start
# or npm run dev for nodemon
```

**Run Client:**
```bash
cd client
npm run dev
```

---

## 🔐 Environment Variables

Ensure you have the following environment variables set up locally in your `.env` files.

### Server (`server/.env`)
| Key | Description |
|---|---|
| `PORT` | The port the backend will run on (e.g., 5000) |
| `MONGO_URI` | Your MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `FRONTEND_URL` | URL of your deployed or local frontend (for CORS) |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET`| Your Cloudinary API secret |

### Client (`client/.env`)
| Key | Description |
|---|---|
| `VITE_API_URL` | URL of your backend API |
| `VITE_CLOUDINARY_CLOUD_NAME`| Cloudinary cloud name for frontend uploads |
| `VITE_GEMINI_API_KEY` | Google Gemini API Key for the AI Copywriter |

---

## 🏗️ Deployment Architecture

SiswaNiaga embraces a modern, decoupled deployment architecture for maximum performance, security, and scalability:

- **Frontend (Cloudflare Pages):** The Vite React application is deployed on Cloudflare Pages, taking advantage of Cloudflare's massive global Edge network for ultra-fast asset delivery and out-of-the-box SSL.
- **Backend (Oracle Cloud VPS):** The Node.js/Express API is hosted on an Oracle Cloud VPS (ARM Ampere architecture). The application process is kept alive and monitored using **PM2**, and routed securely to the internet through an **Nginx** reverse proxy to handle traffic loads and TLS termination.

---

## 🎓 Acknowledgements & License

This project was developed as a Final Year Project (FYP) for Universiti Utara Malaysia (UUM). 

Distributed under the MIT License. See `LICENSE` for more information.
