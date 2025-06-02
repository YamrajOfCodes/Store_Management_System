# 🏪 Store Management System

A comprehensive **React and Node.js** application designed to streamline store management, user interactions, and rating systems. This full-stack solution provides role-based access control with distinct functionalities for System Administrators, Normal Users, and Store Owners.

## ✨ Features Overview

### 🔐 Multi-Role Authentication System
- **System Administrator**: Complete system oversight and management
- **Normal User**: Store discovery, rating, and profile management  
- **Store Owner**: Store dashboard and rating analytics

---

## 👑 System Administrator Features

### 📊 **Comprehensive Dashboard**
- **Real-time Analytics Display:**
  - 📈 Total number of users
  - 🏬 Total number of stores  
  - ⭐ Total number of submitted ratings

### 👥 **User Management**
- ➕ **Add New Users** with complete profile details:
  - Name, Email, Password, Address
- 👀 **View All Users** with role-based filtering:
  - Name, Email, Address, Role
  - Special display for Store Owner ratings
- 🔍 **Advanced Filtering System:**
  - Filter by Name, Email, Address, and Role
  - Quick search and sort capabilities

### 🏪 **Store Management**  
- ➕ **Add New Stores** to the platform
- 📋 **Complete Store Listings** with:
  - Store Name, Email, Address, Overall Rating

## 👤 Normal User Features

### 🎯 **Account Management**
- 📝 **Easy Signup Process** with required fields:
  - Name, Email, Address, Password
- 🔑 **Secure Login System**
- 🔒 **Password Update** functionality

### ⭐ **Rating System**
- 📊 **Submit Ratings** (1-5 scale) for any store

## 🏬 Store Owner Features

### 📊 **Personalized Dashboard**
- 👥 **Customer Insights:**
  - Complete list of users who rated the store
  - Individual rating breakdowns
- 📈 **Performance Analytics:**
  - Average store rating calculation
  - Rating trends and statistics

### 🔧 **Account Management**
- 🔑 **Secure Login Access**
- 🔒 **Password Management**

---

## 🛠️ Technical Stack

### **Frontend (React)**
- 🎨 **Modern UI/UX** with responsive design
- 📱 **Mobile-Optimized** interface using Tailwind CSS
- ⚡ **Real-time Updates** and interactive components
- 🔍 **Advanced Search & Filter** functionality
- 📊 **Dynamic Dashboards** for all user roles

### **Backend (Node.js/Express)**
- 🔄 **RESTful API Architecture**
- 🛡️ **Role-Based Access Control**
- 📊 **CRUD Operations** for all entities:
  - `GET /api/getallusers` - List all users
  - `POST /api/adduser` - Add new user
  - `PUT /api/users/:id` - Update user details
  - `DELETE /api/deleteuser/:id` - Delete user record
  - `GET /api/getallstored` - List all stores
  - `POST /api/addstore` - Add new store
  - `GET /api/getallratings` - Get ratings data
  - `POST /api/addratings` - Submit new rating
- 🗄️ **Database Integration** with MySQL
- ✅ **Data Validation** and error handling

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/store-management-system.git
cd store-management-system
```

2. **Install dependencies**
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
```

3. **Environment Variables**
Create a `.env` file in the root directory:
```env
DATABASE=your_database_name
HOST=localhost
PASSWORD=your_database_password
USER=your_database_user
SECRET=your_jwt_secret_key
```

4. **Start the application**
```bash
# Start backend server
npm run server

# Start frontend (in new terminal)
cd client
npm start
```

---

## 📱 Usage Examples

### **For System Administrators:**
- Access comprehensive analytics dashboard
- Manage users and stores efficiently
- Monitor platform activity and ratings

### **For Normal Users:**
- Discover local stores and services
- Share experiences through ratings
- Build a personalized store preference list

### **For Store Owners:**
- Track customer satisfaction
- Analyze rating patterns
- Improve services based on feedback

---

## 🔒 Security Features

- 🛡️ **JWT Authentication** for secure sessions
- 🔐 **Password Hashing** with bcrypt
- 🎭 **Role-Based Access Control**
- 🚫 **Input Validation & Sanitization**

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  address TEXT,
  role ENUM('admin', 'user', 'store_owner') DEFAULT 'user'
);
```

### Stores Table
```sql
CREATE TABLE stores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  address TEXT,
  owner_id INT,
  average_rating DECIMAL(2,1) DEFAULT 0,
  FOREIGN KEY (owner_id) REFERENCES users(id)
);
```

### Ratings Table
```sql
CREATE TABLE ratings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  store_id INT,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (store_id) REFERENCES stores(id)
);
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## 📞 Support

If you encounter any issues or have questions:

- 📧 Email: support@storemanagement.com
- 💬 Create an issue on GitHub
- 📚 Check our [Documentation](docs/)

---

## 🎯 Future Enhancements

- 🔔 Real-time notifications
- 📊 Advanced analytics dashboard
- 🌍 Geolocation-based store discovery
- 📸 Image upload for stores

---

**Made with ❤️ for better store management and customer experiences**
