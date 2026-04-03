"# NexaStore — E-Commerce Web Application

## Project Summary

**NexaStore** is a full-stack e-commerce web application built as a Frontend Engineering Capstone Project. It provides a seamless online shopping experience for electronics and fashion products, featuring a modern dark-themed UI with responsive design across all devices.

### Objective

To design and develop a production-ready e-commerce platform that demonstrates proficiency in modern frontend technologies (React, Redux, TailwindCSS) alongside a robust backend (FastAPI, MongoDB), while following industry best practices in modular coding, testing, and deployment.

### Key Features

- **Product Browsing** — Dynamic product catalog fetched from the Fake Store API, with category filtering (Electronics, Men's Clothing, Women's Clothing, Jewelry) and real-time search functionality.
- **Shopping Cart** — Add, remove, and update product quantities with an order summary that calculates subtotal, shipping (free over $50), and total. Cart data persists across sessions via localStorage.
- **Wishlist / Favorites** — Save products for later with one-click \"Move to Cart\" functionality. Wishlist data persists across sessions.
- **User Authentication** — Secure login and registration system using JWT tokens and bcrypt password hashing, with form validation (email format, password length, required fields).
- **Product Details** — Dedicated product pages with full descriptions, star ratings, quantity selectors, breadcrumb navigation, and related shipping/return policy information.
- **Responsive Design** — Fully responsive layout optimized for mobile, tablet, and desktop screens using TailwindCSS utility classes. Includes a mobile hamburger menu with search.
- **Privacy & Terms Modals** — Accessible Privacy Policy and Terms & Conditions modals triggered from the footer.
- **Dark Theme UI** — Cohesive dark color palette with glassmorphism header, parallax hero banner, custom scrollbar, and smooth micro-interactions.

### Technology Stack

| Layer       | Technology                                                |
|-------------|-----------------------------------------------------------|
| Frontend    | React 19, Redux Toolkit, TailwindCSS, React Router v7, Axios |
| Backend     | FastAPI (Python), Motor (Async MongoDB Driver), PyJWT, Bcrypt |
| Database    | MongoDB (MongoDB Atlas in production)                     |
| API Source  | FastAPI backend hosted on Render                |
| Testing     | React Testing Library, Jest (63 unit tests across 8 test suites) |
| Deployment  | Netlify (Frontend), Render (Backend), MongoDB Atlas (Database) |

### Testing

The project includes **63 unit tests** across **8 test suites** using React Testing Library and Jest:

- **Redux Slices** — Cart (7 tests), Wishlist (6 tests), Auth (5 tests), Filters (6 tests): Covers add, remove, update, clear operations, localStorage persistence, and edge cases.
- **Components** — ProductCard (12 tests), CategoryFilter (5 tests), Footer (11 tests): Validates rendering, user interactions, modal behavior, and Redux dispatching.
- **Pages** — Login (11 tests): Tests form validation, error display, mode toggling, and field clearing.

### Project Structure

```
NexaStore/
├── backend/
│   ├── server.py              # FastAPI REST API (Auth, Cart, Wishlist endpoints)
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables (DB, JWT secrets)
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components (Header, Footer, ProductCard, CategoryFilter, PrivacyModal)
│   │   ├── pages/             # Page components (Home, ProductDetail, Cart, Wishlist, Login)
│   │   ├── store/             # Redux store configuration and feature slices
│   │   ├── __tests__/         # Unit test files (8 test suites)
│   │   ├── App.js             # Root component with routing
│   │   └── index.css          # Global styles and Tailwind configuration
│   ├── public/                # Static assets
│   └── package.json           # Node dependencies
└── README.md                  # Project documentation
```

### Methodology

1. **Planning** — Defined the application scope, UI wireframes, and component hierarchy based on capstone requirements.
2. **Frontend Development** — Built reusable React components with Redux Toolkit for state management. Used createAsyncThunk for API calls and localStorage for data persistence.
3. **Backend Development** — Developed RESTful API endpoints with FastAPI for user authentication (JWT/bcrypt) and data persistence (cart/wishlist) using MongoDB.
4. **Styling** — Implemented a dark-themed, responsive UI using TailwindCSS with custom design tokens, glassmorphism effects, and micro-animations.
5. **Testing** — Wrote comprehensive unit tests using React Testing Library covering Redux logic, component rendering, user interactions, and form validation.
6. **Deployment** — Deployed frontend to Netlify, backend to Render, and database to MongoDB Atlas for a fully accessible production environment.

### Outcome

NexaStore is a fully functional, deployed e-commerce application that demonstrates end-to-end full-stack development skills — from responsive UI design and state management to secure authentication, database integration, modular architecture, and automated testing.

### Links

- **GitHub Repository**:[https://github.com/codingsection202/module-2-project]
- **Live Website**: [https://nexashopecommerce.netlify.app/]
- **Backend API**: [https://module-2-project-1.onrender.com]
