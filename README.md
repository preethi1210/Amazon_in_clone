# Amazon Clone - Key Points
MERN stack Amazon-like e-commerce application



## Key Features

* User authentication (JWT), registration, password reset, optional phone verification
* Product listing, categories, search, product details
* Cart and checkout flow, order history
* Admin dashboard: CRUD for products, categories, orders
* Payment integration via Razorpay
* Email notifications via Nodemailer
* Role-based access control (user/admin)

## Tech Stack

* Frontend: React, Redux, Tailwind/CSS
* Backend: Node.js, Express
* Database: MongoDB (Mongoose)
* Auth: JWT, bcrypt
* Payments: Razorpay

## Quick Setup

1. Clone repo: `git clone <repo-url>`
2. Install dependencies:

   * `cd server && npm install`
   * `cd client && npm install`
3. Create `.env` files for server and client
4. Run:

   * Server: `npm run dev`
   * Client: `npm start`

## Environment Variables (Important)

* `MONGO_URI`
* `JWT_SECRET`, `REFRESH_TOKEN_SECRET`
* `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
* `EMAIL_USER`, `EMAIL_PASS`
* `CLIENT_URL`

## Git Ignore / Security

* `.env` files, `/node_modules`, `/build` should be ignored
* Never push `.env` to GitHub

## Frontend Routes

* `/` Home, `/search?q=`, `/category/:name`, `/product/:id`
* `/cart`, `/checkout`, `/orders`
* `/signin`, `/signup`, `/profile`
* `/admin` protected dashboard

## Backend Endpoints

* `/api/auth` login, register, refresh, logout
* `/api/users` profile & admin users
* `/api/products` CRUD, search, filter
* `/api/orders` create, list, update
* `/api/payments/razorpay` create order, verify payment

## Notes

* Seeder scripts available for initial data
* Use Helmet, CORS, rate limiting, and input validation for security
* Recommended deployment: MongoDB Atlas, Vercel/Netlify, Render/Heroku
* Always rotate credentials if `.env` is exposed

---
backend deployment url : https://amazon-in-clone.onrender.com/

This is a concise version highlighting the essential setup and features for quick reference.
