<p align="center">
  <img src="./assets/icon/logo.png" alt="IntelliMate Logo" width="120" />
</p>
> A real-time chat application built with **MERN stack**, **WebSockets**, and modern UI libraries.  
> Connect instantly, chat seamlessly, and stay in touch.

---

## ✨ Features

✅ Modern, responsive design with Tailwind CSS + DaisyUI  
✅ Sign up & login with JWT-based authentication  
✅ Real-time messaging using **Socket.io**  
✅ User presence detection (online users)  
✅ Secure password hashing & tokens  
✅ Profile management  
✅ Protected routes & access control  
✅ Deployed frontend on **Vercel**

---

## ⚙️ Tech Stack

<table>
  <tr>
    <td><strong>Frontend</strong></td>
    <td>
      <img src="https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB"/>
      <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff"/>
      <img src="https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white"/>
      <img src="https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white"/>
      <img src="https://img.shields.io/badge/Zustand-🐻-red?labelColor=white&style=flat?for-the-badge"/>
      <img src="https://img.shields.io/badge/daisyUI-🌼-green?labelColor=white&style=flat?for-the-badge"/>
    </td>
  </tr>
  <tr>
    <td><strong>Backend</strong></td>
    <td>
      <img src="https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white"/>
      <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white"/>
      <img src="https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB"/>
      <img src="https://img.shields.io/badge/Cloudinary-☁️-blue?labelColor=white&style=flat?for-the-badge"/>
      <img src="https://img.shields.io/badge/Axios-🔗-purple?labelColor=white&style=flat?for-the-badge"/>
      <img src="https://img.shields.io/badge/Vercel-▲-black?labelColor=white&style=flat?for-the-badge"/>
    </td>
  </tr>
  <tr>
    <td><strong>Auth</strong></td>
    <td>
      <img src="https://img.shields.io/badge/JWT-🔑-orange?labelColor=white&style=flat?for-the-badge"/>
      <img src="https://img.shields.io/badge/bcryptjs-🔒-blue?labelColor=white&style=flat?for-the-badge"/>
    </td>
  </tr>
  <tr>
    <td><strong>Chat</strong></td>
    <td>
      <img src="https://img.shields.io/badge/Socket.io-🖇-black?labelColor=white&style=flat?for-the-badge"/>
      <img src="https://img.shields.io/badge/socket.io--client-🧧-gray?labelColor=white&style=flat?for-the-badge"/>
    </td>
  </tr>
</table>

---

## 🚀 Getting Started

### Clone the repo

```bash
git clone https://github.com/ahmedyar7/PingMe.git
cd PingMe
```

---

### ⚙️ Setup Backend

```bash
cd backend
npm install
```

- Create a `.env` file in `/backend`:

```bash
PORT=8000
MONGO_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

```bash
npm run dev
```

Backend runs on [http://localhost:8000](http://localhost:8000)

---

### 🖼 Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on [http://localhost:5173](http://localhost:5173)

---

## ⚡ How it works

- User signs up / logs in → JWT + refresh tokens saved in HTTP-only cookies.
- Socket connects on login → chat updates & online status in real time.
- State managed with Zustand; UI with DaisyUI.

---

---

## 📄 License

[MIT-License](./LICENSE)
