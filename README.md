# 🚧 ContractorHQ

ContractorHQ is a modern E-Commerce platform specializing in construction tools and equipment. We offer a wide range of high-quality products — including drills, power tools, and heavy-duty equipment — from trusted industry-leading brands like Makita, DeWalt, Milwaukee, Stihl, and Bosch.

Our platform is designed to streamline purchasing for contractors and construction professionals by providing a fast, secure, and intuitive online shopping experience.

**Live Demo**: [https://contractor-hq.vercel.app](https://contractor-hq.vercel.app)

---

## ✨ Features

- 🛒 Full E-Commerce platform tailored for construction tools and equipment  
- 🛠 Extensive catalog including Makita, DeWalt, Milwaukee, Stihl, Bosch, and more  
- 🛍️ Product filtering and search for easy tool discovery  
- 🔐 Secure authentication via NextAuth  
- ⚡️ High performance with Next.js  
- 🎨 Responsive, modern UI built with Tailwind CSS  
- 🗃️ Robust backend with MongoDB and Mongoose for scalable data management  
- 🔄 State management using Zustand (cart logic)  
- 🔧 Developed with TypeScript for maintainability and scalability  

---

## 🧱 Tech Stack

| Technology Badge | Description                                             |
|------------------|---------------------------------------------------------|
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) | Framework for server-rendered React apps               |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | Library for building user interfaces                   |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | Utility-first CSS framework                            |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) | Strongly typed JavaScript                              |
| ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) | NoSQL database for scalable data storage               |
| ![Mongoose](https://img.shields.io/badge/Mongoose-D54C1D?style=for-the-badge&logo=mongoose&logoColor=white) | ODM for MongoDB with schema-based modeling             |
| ![Zustand](https://img.shields.io/badge/Zustand-00C1D4?style=for-the-badge&logo=zustand&logoColor=white) | Lightweight state management library                   |
| ![NextAuth](https://img.shields.io/badge/Auth-NextAuth.js-orange?style=for-the-badge) | Authentication solution for Next.js                    |

---

## 📄 Functional Pages

- **Home** – `/src/app/page.tsx`  
- **Shop / Products** – `/src/app/shop/`  
- **Cart** – `/src/app/cart/`  
- **Admin Panel** – `/src/app/admin/`  
- **User Profile** – `/src/app/user/`  
- **Authentication** – `/src/app/auth/` (Login, Register)  
- **Support / Contact** – `/src/app/support/`  
- **Search** – `/src/app/search/`  
- **Legal Pages** – `/src/app/legal/` (Privacy Policy, Terms)  
- **Blogs** – `/src/app/blogs/`  
- **Brands** – `/src/app/brands/`  
- **404 Not Found** – `/src/app/not-found.tsx`  

---

## 🧩 Reusable Components

- `Header.tsx` – site navigation  
- `Footer.tsx` – global footer section  
- `Button.tsx` – flexible button with variants  
- `ProductCard.tsx` – product display  
- `CartToast.tsx`, `HeroSection.tsx`, `FAQ.tsx`, `ContactUs.tsx`, etc.  

All components follow best practices: TypeScript safety, accessibility, and flexible props.

---

## 🔐 Authentication and Role Management

- Built with **NextAuth**  
- Supports Credentials Provider (email/password) and OAuth Providers (GitHub)
- `/user/` – accessible only to authenticated users  
- `/admin/` – accessible only to admin users  

---

## 🛠 CRUD Functionality

Implemented for:

- Products (`/api/products/`)  
- Users (`/api/user/`)  
- Blogs (`/api/blogs/`)  

Includes validation, error handling, and RESTful methods.

---

## 🗃️ MongoDB Integration

Models in `/src/lib/models/`:

- User  
- Product  
- Order  
- Blog  

---

## ⚙️ State & Hooks

- Local state via `useState`, `useEffect`  
- Global state via **Context API** in `/components/provider/`  
- Custom hooks in `/app/hooks/`  

---

## ⚡ Data Fetching

- **SSR** – shop
- **ISR** – blogs 
- **SSG** – support pages

---

## ✅ Forms with Validation

- Login/Register  

  ![Validator](https://img.shields.io/badge/Validator-Active-blue?style=for-the-badge&logo=checkcircle&logoColor=white)  
  Used for input validation to ensure data integrity and security



---

## 🎨 Tailwind & Responsive Design

- Tailwind utility classes  
- Fully responsive across devices  
- Custom config in `postcss.config.mjs`

---

## 🧪 Testing

- Unit/component tests with **Jest** and **Babel**

---

## 🚀 Deployment

- Deployed on **Vercel**  
- `.env.local` for secrets (MongoDB URI, NextAuth, etc.)

---

## 🌙 Extras

- 🌗 **Dark Mode** – toggle built with Tailwind and accessible design (`/components/theme/ThemeToggle.tsx`) 
- 🔁 **Zustand** – lightweight and scalable state management for cart and UI logic  
- 🧭 **App Router (Next.js 15+)** – leveraging the latest file-based routing, layouts, nested routes, and server components  
- 🧩 **Iconify** – 100,000+ icons from major libraries, used across UI for branding, feedback, and navigation  

---

## 👥 Team Members & Roles

| Name          | Role                 |
| ------------- | -------------------- |
| Erjon Hashani | Full-Stack Developer |

---

## Screenshots

Here are some screenshots of the app:

![Screenshot 136](./docs/screenshots/Screenshot%20(136).png)  
![Screenshot 137](./docs/screenshots/Screenshot%20(137).png)  
![Screenshot 138](./docs/screenshots/Screenshot%20(138).png)  
![Screenshot 139](./docs/screenshots/Screenshot%20(139).png)  
![Screenshot 140](./docs/screenshots/Screenshot%20(140).png)  
![Screenshot 141](./docs/screenshots/Screenshot%20(141).png)  
![Screenshot 142](./docs/screenshots/Screenshot%20(142).png)  
![Screenshot 143](./docs/screenshots/Screenshot%20(143).png)  
![Screenshot 144](./docs/screenshots/Screenshot%20(144).png)  
![Screenshot 145](./docs/screenshots/Screenshot%20(145).png)  
![Screenshot 146](./docs/screenshots/Screenshot%20(146).png)  
![Screenshot 147](./docs/screenshots/Screenshot%20(147).png)  
![Screenshot 148](./docs/screenshots/Screenshot%20(148).png)  
![Screenshot 149](./docs/screenshots/Screenshot%20(149).png)  
![Screenshot 150](./docs/screenshots/Screenshot%20(150).png)  
![Screenshot 151](./docs/screenshots/Screenshot%20(151).png)  
![Screenshot 152](./docs/screenshots/Screenshot%20(152).png)  

---

## 🔗 Live Site

👉 [https://contractor-hq.vercel.app](https://contractor-hq.vercel.app)