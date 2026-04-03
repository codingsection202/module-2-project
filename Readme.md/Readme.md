# 🔧 NexaStore Backend API

RESTful API backend for NexaStore e-commerce platform built with FastAPI, MongoDB, and JWT authentication.

## 🌐 Live API

- **Base URL**: https://module-2-project-1.onrender.com
- **API Documentation**: https://module-2-project-1.onrender.com/docs
- **API Status**:https://module-2-project-1.onrender.com/api/

## ✨ Features

### 🔐 Authentication & Security
- JWT token-based authentication
- Bcrypt password hashing
- Secure user registration and login
- Token expiration management (30-minute sessions)
- Protected API endpoints

### 📦 Data Management
- Async MongoDB operations with Motor
- User account management
- Shopping cart persistence
- Wishlist management
- UUID-based unique identifiers

### 🚀 Performance & Reliability
- Asynchronous request handling
- CORS middleware for cross-origin requests
- Pydantic data validation
- Structured error handling
- RESTful API design

### 📊 Database Schema
- **Users Collection**: Email, name, hashed password, timestamps
- **Cart Collection**: User ID, product ID, quantity, timestamps
- **Wishlist Collection**: User ID, product ID, timestamps

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| FastAPI | 0.011.1|
| Python | 3.11 | Programming Language |
| MongoDB | Atlas | Cloud Database |
| Motor | 3.3.1 | Async MongoDB Driver |
| Pydantic | 2.6.4+ | Data Validation |
| PyJWT | 2.10.1+ | JWT Authentication |
| Bcrypt | 4.1.3 | Password Hashing |
| Passlib | 1.7.4+ | Password Context |
| Uvicorn | 0.25.0 | ASGI Server |
| python-jose | 3.3.0+ | JWT Encoding/Decoding |

## 🚀 Getting Started

### Prerequisites

```bash
Python 3.8 or higher
MongoDB (local or Atlas)
pip (Python package manager)
Git
Installation
Clone the repository

git clone https://github.com/codingsection202/module-2-project
cd alma-backend
Create virtual environment

# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
Install dependencies

pip install -r requirements.txt
Create environment file

Create .env file in the root directory:

MONGO_URL=mongodb://localhost:27017
DB_NAME=nexastore_db
CORS_ORIGINS=*
JWT_SECRET_KEY=your-super-secret-jwt-key-change-in-production
For MongoDB Atlas:

MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/nexastore_db?retryWrites=true&w=majority
DB_NAME=nexastore_db
CORS_ORIGINS=htttps://earnest-croissant-746940.netlify.app
JWT_SECRET_KEY=your-super-secret-jwt-key-change-in-production
Start the server

# Development mode with auto-reload
uvicorn server:app --reload --host 0.0.0.0 --port 8001

# Production mode
uvicorn server:app --host 0.0.0.0 --port 8001
Access the API

API: http://localhost:8001/api/
Interactive Docs: http://localhost:8001/docs
Alternative Docs: http://localhost:8001/redoc

📁 Project Structure
nexastore-backend/
├── server.py              # Main FastAPI application
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables (not in Git)
├── .gitignore            # Git ignore rules
└── README.md             # This file
🔌 API Endpoints
Health Check
GET /api/
Response:

{
  "message": "NexaStore API"
}
Authentication
Register User
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
Response:

{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2026-03-30T10:30:00.000Z"
  }
}
Login User
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
Response:

{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
Cart Management
Add to Cart
POST /api/cart
Content-Type: application/json

{
  "user_id": "uuid-here",
  "product_id": 1,
  "quantity": 2
}
Response:

{
  "message": "Item added to cart",
  "item": {
    "id": "cart-item-uuid",
    "user_id": "user-uuid",
    "product_id": 1,
    "quantity": 2,
    "created_at": "2026-03-30T10:35:00.000Z"
  }
}
Get Cart Items
GET /api/cart/{user_id}
Response:

[
  {
    "id": "cart-item-uuid",
    "user_id": "user-uuid",
    "product_id": 1,
    "quantity": 2,
    "created_at": "2026-03-30T10:35:00.000Z"
  }
]
Remove from Cart
DELETE /api/cart/{item_id}
Response:

{
  "message": "Item removed from cart"
}
Wishlist Management
Add to Wishlist
POST /api/wishlist
Content-Type: application/json

{
  "user_id": "uuid-here",
  "product_id": 5
}
Get Wishlist Items
GET /api/wishlist/{user_id}
Remove from Wishlist
DELETE /api/wishlist/{item_id}
🗄️ Database Schema
Users Collection
{
  "_id": ObjectId,
  "id": "uuid-string",
  "email": "user@example.com",
  "name": "John Doe",
  "password": "$2b$12$hashed_password_here",
  "created_at": "ISO-8601-timestamp"
}
Cart Collection
{
  "_id": ObjectId,
  "id": "uuid-string",
  "user_id": "user-uuid",
  "product_id": 1,
  "quantity": 2,
  "created_at": "ISO-8601-timestamp"
}
Wishlist Collection
{
  "_id": ObjectId,
  "id": "uuid-string",
  "user_id": "user-uuid",
  "product_id": 5,
  "created_at": "ISO-8601-timestamp"
}
🔒 Security Features
Password Security
Passwords hashed using bcrypt with salt rounds
Plain text passwords never stored
Secure password verification
JWT Authentication
Tokens expire after 30 minutes
HS256 algorithm for token signing
User ID and email encoded in payload
Secret key stored in environment variables
CORS Configuration
Configurable allowed origins
Credentials support enabled
All HTTP methods allowed for development
Best Practices
Environment variables for sensitive data
Input validation with Pydantic models
ObjectId exclusion from responses (MongoDB)
Proper error handling and HTTP status codes
📦 Deployment
Render Deployment
Push to GitHub

git add .
git commit -m "Initial commit"
git push origin main
Configure Render Service

Environment: Python 3
Build Command: pip install -r requirements.txt
Start Command: uvicorn server:app --host 0.0.0.0 --port $PORT
Environment Variables

MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=nexastore_db
CORS_ORIGINS=https://earnest-croissant-746940.netlify.app
JWT_SECRET_KEY=production-secret-key
PYTHON_VERSION=3.11.0
Deploy

Render automatically deploys on push to main branch
Check logs for any errors
Test endpoints using /docs
MongoDB Atlas Setup
Create Cluster

Free tier (M0) available
Choose region closest to your Render deployment
Database User

Username: nexastore_user
Strong password (autogenerate recommended)
Role: Read and write to any database
Network Access

Whitelist: 0.0.0.0/0 (allow from anywhere)
Or specific Render IP ranges
Connection String

mongodb+srv://nexastore_user:PASSWORD@cluster.mongodb.net/nexastore_db?retryWrites=true&w=majority

🧪 Testing
Manual Testing
Test Health Check
curl https://https://module-2-project-1.onrender.com/api/
Test Registration
curl -X POST https://module-2-project-1.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'
Test Login
curl -X POST https://module-2-project-1.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
Interactive API Testing
Visit: https://https://module-2-project-1.onrender.com/docs

Swagger UI provides:
✅ All endpoints documented
✅ Try it out functionality
✅ Request/response examples
✅ Schema definitions
📊 Dependencies

fastapi==0.110.1          # Web framework
uvicorn==0.25.0           # ASGI server
python-dotenv>=1.0.1      # Environment variables
pymongo==4.5.0            # MongoDB driver
motor==3.3.1              # Async MongoDB driver
pydantic>=2.6.4           # Data validation
email-validator>=2.2.0    # Email validation
pyjwt>=2.10.1             # JWT handling
bcrypt==4.1.3             # Password hashing
passlib>=1.7.4            # Password context
python-jose[cryptography]>=3.3.0  # JWT encoding/decoding
python-multipart>=0.0.9   # Form data parsing

⚙️ Environment Variables
Variable	Description	Example
MONGO_URL	MongoDB connection string	mongodb+srv://...
DB_NAME	Database name	nexastore_db
CORS_ORIGINS	Allowed origins for CORS	* or https://app.com
JWT_SECRET_KEY	Secret key for JWT signing	random-secret-key
PYTHON_VERSION	Python version (Render)	3.11.0

🐛 Troubleshooting
Common Issues
Issue: MongoDB connection timeout

Fix: Check MongoDB Atlas Network Access whitelist
     Verify connection string format
     Ensure password doesn't contain special characters
Issue: JWT decode error

Fix: Verify JWT_SECRET_KEY matches between encoding/decoding
     Check token expiration
     Ensure proper Authorization header format
Issue: CORS errors

Fix: Add frontend URL to CORS_ORIGINS
     Restart server after env changes
     Check CORS middleware configuration
Issue: Password validation fails

Fix: Ensure password is at least 6 characters
     Check bcrypt installation
     Verify password hashing configuration

📝 Development Notes
Code Standards
Follow PEP 8 style guide
Use async/await for database operations
Pydantic models for request/response validation
Comprehensive error handling
Best Practices
Never commit .env files
Use environment variables for secrets
Validate all user inputs
Return appropriate HTTP status codes
Log important operations
Handle database errors gracefully

🔄 API Versioning
Current version: v1
All endpoints prefixed with /api/
Future versions will use: /api/v2/, /api/v3/, etc.

📚 Additional Resources
FastAPI Documentation
MongoDB Motor Docs
Pydantic Documentation
JWT.io - JWT debugger

👨‍💻 Developer
Your Name-Harsh Vardhan
GitHub: @codingsection202
Email: hv50554@gmail.com

🤝 Related Repositories
Frontend: nexastore-frontend

📄 License
This project is part of a Full-Stack Web Development Capstone project and is intended for educational purposes.

🙏 Acknowledgments
FastAPI framework by Sebastián Ramírez
MongoDB Atlas for cloud database hosting
Render for backend deployment
Built with guidance from Emergent AI
⭐ Star this repository if you found it helpful!

### Links

- **GitHub Repository**:[https://github.com/codingsection202/module-2-project]
- **Live Website**: [https://dancing-pie-668af9.netlify.app]
- **Backend API**: [https://module-2-project-1.onrender.com]

Built with ⚡ FastAPI in 2026