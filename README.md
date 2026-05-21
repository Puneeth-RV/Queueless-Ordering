# QueueLess — Smart Canteen Pre-Order System

QueueLess is a modern full-stack web application designed for college canteens. It allows students to browse the menu, place orders in advance, track their order status, and pick up their food without waiting in long queues. Admins have a dedicated dashboard to manage menu items and update order statuses in real-time.

## Features

**For Students:**
- Secure signup and login
- Browse menu with search and category filters
- Add items to cart and place orders
- Receive an auto-generated token number
- Real-time order status tracking (Pending -> Preparing -> Ready -> Completed)
- View estimated waiting time and order history
- Mobile-friendly responsive UI

**For Admins:**
- Dashboard with live statistics (Total Orders, Pending, Completed, Revenue)
- Manage Menu (Add, Edit, Delete food items)
- Manage Orders (Update status, view details)

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS (v4), React Router, Axios, Lucide React
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs
- **Architecture:** Monorepo structure

## Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB (Local instance or MongoDB Atlas cluster)

## Setup and Execution

### 1. Environment Variables

Create `.env` files in both the `client` and `server` directories based on the provided `.env.example` files.

**Server (`server/.env`):**
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/queueless
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```
*(Make sure MongoDB is running locally on port 27017 or use an Atlas URI)*

**Client (`client/.env`):**
```env
VITE_API_URL=http://localhost:5001
```

### 2. Quick Start (Recommended)

To run the entire project (backend, frontend, and database seeding) with a single command, open a terminal in the root directory and run:

```bash
./start.sh
```
This script will automatically install dependencies, seed the database, and start both servers concurrently. Press `Ctrl+C` to stop both.

### 3. Manual Setup (Alternative)

#### Backend Setup

Open a terminal and navigate to the `server` directory:

```bash
cd server
npm install
```

#### Seed the Database (Optional but recommended)
To populate the database with an admin user and sample menu items, run:
```bash
npm run seed
```
**Default Admin Credentials:**
- Email: admin@queueless.com
- Password: password123

#### Start the Server
```bash
npm run dev
```
The backend will run on `http://localhost:5001`.

### 3. Frontend Setup

Open a new terminal and navigate to the `client` directory:

```bash
cd client
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`.

## Demo Flow
1. Login as the admin using the seeded credentials.
2. View the dashboard and ensure menu items are listed in "Manage Menu".
3. Open an incognito window, sign up as a new student.
4. Browse the menu, add items to the cart, and place an order.
5. Note the generated Token Number and Estimated Wait Time.
6. Switch back to the admin window, go to "Manage Orders", and change the status of the new order from "Pending" to "Preparing" and then "Ready".
7. Switch back to the student window to see the real-time status updates!

## Code Quality and Design
- **Clean UI**: Uses modern Tailwind CSS utility classes and `lucide-react` icons.
- **Component Reusability**: Common layouts (`StudentLayout`, `AdminLayout`) and protected route components.
- **Error Handling**: Implemented using `react-hot-toast` for user-friendly notifications.
- **Security**: Passwords hashed with `bcryptjs`, API endpoints secured with JWT authentication and role-based middleware.
