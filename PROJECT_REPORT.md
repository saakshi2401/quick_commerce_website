# Luxury Quick Commerce App - Project Report

## Project Overview

The Luxury Quick Commerce App is a full-stack web application designed to provide a premium online shopping experience for luxury and grocery items. The app allows users to browse products, add them to a cart, place orders, and manage their accounts. It features a modern, responsive frontend built with React and a robust backend powered by Node.js and MongoDB.

The application simulates a quick-commerce service (similar to Zepto or Blinkit) but focuses on high-end luxury products alongside everyday groceries, delivered within 10 minutes.

## Features

### User Features
- **User Registration and Authentication**: Secure login/signup with JWT tokens
- **Product Browsing**: View products by category with search and sorting functionality
- **Product Details**: Detailed view of individual products with images and descriptions
- **Shopping Cart**: Add/remove items, update quantities, persistent cart state
- **Checkout Process**: Complete order placement with address and payment simulation
- **Order History**: View past orders and order status
- **Admin Dashboard**: Admin users can manage products and view orders

### Technical Features
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Image Management**: Automated image downloading and serving for products
- **Real-time Updates**: Redux for state management across the app
- **API Integration**: RESTful API with proper error handling
- **Database Seeding**: Automated population of products with images
- **Security**: Password hashing, JWT authentication, CORS protection

## Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Redux Toolkit**: State management for cart and authentication
- **Axios**: HTTP client for API calls
- **React Router**: Client-side routing

### Backend
- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Web framework for building REST APIs
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Development Tools
- **Google Images API**: For downloading product images
- **Nodemon**: Development server with auto-restart
- **ESLint**: Code linting
- **PostCSS**: CSS processing

## Project Structure

```
luxury-quick-commerce/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── orderController.js    # Order management
│   │   └── productController.js  # Product operations
│   ├── data/
│   │   ├── groceryItems.js       # Grocery product data
│   │   └── luxuryItems.js        # Luxury product data
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT authentication middleware
│   ├── models/
│   │   ├── Order.js              # Order schema
│   │   ├── Product.js            # Product schema
│   │   └── User.js               # User schema
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication routes
│   │   ├── orderRoutes.js        # Order routes
│   │   └── productRoutes.js      # Product routes
│   ├── scripts/
│   │   └── seed.js               # Database seeding script
│   ├── downloadImages.js         # Image download script for luxury items
│   ├── downloadGroceryImages.js  # Image download script for grocery items
│   ├── server.js                 # Main server file
│   ├── package.json
│   └── .env                      # Environment variables
├── frontend/
│   ├── public/
│   │   └── images/
│   │       └── products/          # Product images
│   ├── src/
│   │   ├── components/
│   │   │   ├── CartDrawer.jsx     # Shopping cart sidebar
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   └── ProductCard.jsx    # Product display card
│   │   ├── context/
│   │   │   └── ThemeContext.jsx   # Theme provider
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx # Admin management page
│   │   │   ├── Checkout.jsx       # Order checkout
│   │   │   ├── Dashboard.jsx      # User dashboard
│   │   │   ├── Home.jsx           # Landing page
│   │   │   ├── Login.jsx          # Login page
│   │   │   ├── ProductDetails.jsx # Product detail page
│   │   │   ├── ProductListing.jsx # Product catalog
│   │   │   └── Register.jsx       # Registration page
│   │   ├── redux/
│   │   │   ├── authSlice.js       # Authentication state
│   │   │   ├── cartSlice.js       # Cart state
│   │   │   └── store.js           # Redux store
│   │   ├── services/
│   │   │   └── api.js             # API service layer
│   │   ├── App.jsx                # Main app component
│   │   ├── index.css              # Global styles
│   │   └── main.jsx               # App entry point
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd luxury-quick-commerce/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=adminpassword
   ```

4. Download product images (optional, images are pre-downloaded):
   ```bash
   node downloadImages.js
   node downloadGroceryImages.js
   ```

5. Seed the database:
   ```bash
   npm run seed
   ```

6. Start the server:
   ```bash
   npm start
   # or for development
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd luxury-quick-commerce/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get product by ID

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: 'user'),
  address: String,
  createdAt: Date
}
```

### Product Model
```javascript
{
  name: String (required),
  price: Number (required),
  category: String (required),
  description: String,
  weight: String,
  image: String (required),
  stock: Number (default: 0),
  createdAt: Date
}
```

### Order Model
```javascript
{
  user: ObjectId (ref: 'User'),
  orderItems: [{
    name: String,
    qty: Number,
    price: Number,
    product: ObjectId (ref: 'Product'),
    image: String
  }],
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String,
  totalPrice: Number,
  isPaid: Boolean (default: false),
  paidAt: Date,
  isDelivered: Boolean (default: false),
  deliveredAt: Date,
  createdAt: Date
}
```

## Challenges Faced and Solutions

### 1. Image Management
**Challenge**: Managing product images for a large catalog.
**Solution**: Implemented automated image downloading scripts using Google Images API, storing images locally and updating product data with image paths.

### 2. Database Connection Issues
**Challenge**: MongoDB connection timeouts during development.
**Solution**: Increased connection timeouts and optimized connection options in the database configuration.

### 3. State Management
**Challenge**: Managing complex state across components (cart, authentication).
**Solution**: Implemented Redux Toolkit for predictable state management with slices for different domains.

### 4. Responsive Design
**Challenge**: Ensuring the app works well on all device sizes.
**Solution**: Used Tailwind CSS with mobile-first approach and responsive utilities.

### 5. Port Conflicts
**Challenge**: Backend server port conflicts during development.
**Solution**: Implemented proper process management and port checking.

## Performance Optimizations

- **Image Optimization**: Images are downloaded and stored locally to reduce external API calls
- **Database Indexing**: Proper indexing on frequently queried fields
- **Lazy Loading**: Components are loaded as needed
- **Caching**: Redux state caching for better performance

## Security Measures

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Token-based authentication with expiration
- **Input Validation**: Server-side validation for all API inputs
- **CORS Protection**: Configured CORS for allowed origins
- **Environment Variables**: Sensitive data stored in environment variables

## Testing

The application includes basic testing setup:
- Unit tests for API endpoints
- Integration tests for user flows
- Image download validation

Run tests with:
```bash
npm test
```

## Deployment

### Backend Deployment
1. Set up a cloud MongoDB instance (MongoDB Atlas recommended)
2. Deploy to a cloud platform (Heroku, Vercel, AWS, etc.)
3. Set environment variables in the deployment platform
4. Run database seeding in production

### Frontend Deployment
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to a static hosting service (Netlify, Vercel, etc.)
3. Configure API base URL for production

## Future Improvements

### Short-term
- Add payment gateway integration (Stripe, PayPal)
- Implement real-time order tracking
- Add product reviews and ratings
- Enhance search with filters and autocomplete

### Long-term
- Mobile app development (React Native)
- AI-powered product recommendations
- Multi-vendor marketplace
- Advanced analytics dashboard
- Integration with delivery services

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact the development team.

---

**Project Developed By**: [Your Name]  
**Date**: April 2026  
**Version**: 1.0.0</content>
<parameter name="filePath">c:\Users\Sakshi\OneDrive\Desktop\quick_commerce\luxury-quick-commerce\PROJECT_REPORT.md