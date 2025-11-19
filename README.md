# 🛒 Forever – Full Stack E-Commerce Website  

A fully functional e-commerce web application built using the **MERN Stack**, featuring user authentication, product browsing, cart management, secure checkout, and admin-level CRUD functionalities.  
Designed to deliver a clean, modern, and seamless shopping experience similar to real-world e-commerce platforms.

---

## 🚀 Features

### 🧑‍💻 User Features
- Browse products with real-time updated UI  
- Add/remove products to cart  
- Secure user login & registration (JWT-based)  
- Persisting cart data  
- Smooth checkout flow  
- Responsive UI for all screens  

### 🔐 Admin Features
- Add, update, and delete products  
- Admin dashboard  
- Handle inventory  
- Manage orders  
- REST-based backend architecture  

---

## 🛠️ Tech Stack

### Frontend:
- React.js  
- React Hooks  
- Context API / useReducer  
- Tailwind / CSS (if used)  

### Backend:
- Node.js  
- Express.js  
- REST APIs  

### Database:
- MongoDB  
- Mongoose ORM  

### Authentication:
- JWT (JSON Web Tokens)  
- Bcrypt Password Hashing

---

## 📂 Folder Structure

```
/client
    /src
        /components
        /pages
        /context
        /styles

/server
    /config
    /controllers
    /models
    /routes
```

---

## ⚙️ Installation & Setup

### Clone the Repository
```bash
git clone https://github.com/Shahzar786/ecommerce-website
cd ecommerce-website
```

### Install Dependencies

#### For Backend:
```bash
cd server
npm install
```

#### For Frontend:
```bash
cd ../client
npm install
```

---

## ▶️ Run the Project

### Start Backend:
```bash
cd server
npm start
```

### Start Frontend:
```bash
cd client
npm start
```

Both servers will run concurrently (React on 3000, Node.js on 5000).

---

## 🔑 Environment Variables

Create `.env` in `/server`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 📸 Screenshots (Add Yours)

- 🏠 Home Page  
- 🛍️ Product Listing  
- 🛒 Cart Page  
- 🔐 Login / Signup  
- 📦 Admin Dashboard  

*(Add screenshots folder `/assets`)*
  
---

## 📌 Future Improvements

- Online Payment Integration (Razorpay / Stripe)  
- Wishlist Feature  
- Product Reviews & Ratings  
- Seller Dashboard  
- Delivery Tracking System  

---

## ❤️ Author

**Md. Shahzar**  
Full-Stack MERN Developer  
- GitHub: [Shahzar786](https://github.com/Shahzar786)  
- LinkedIn: [linkedin.com/in/md-shahzar](https://www.linkedin.com/in/md-shahzar-77340928b/)  

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!

