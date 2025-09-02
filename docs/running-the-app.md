# Running the Application

This guide explains how to run the DEX TradingView Clone application locally.

## Prerequisites

Before running the application, ensure you have the following installed:

1. Node.js (v16 or higher)
2. npm or yarn
3. MongoDB (for backend data storage)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tradingview-clone
```

### 2. Install Dependencies

Install frontend dependencies:
```bash
cd frontend
npm install
```

Install backend dependencies:
```bash
cd ../backend
npm install
```

## Configuration

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tradingview-clone
JWT_SECRET=your_jwt_secret_key
```

## Running the Application

### 1. Start MongoDB

Make sure MongoDB is running on your system:
```bash
mongod
```

Or if using Docker:
```bash
docker run -d -p 27017:27017 mongo
```

### 2. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`.

### 3. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend development server will start on `http://localhost:3000`.

## Testing

### Run Frontend Tests

```bash
cd frontend
npm test
```

### Run Tests in Watch Mode

```bash
cd frontend
npm run test:watch
```

## Building for Production

### Build the Frontend

```bash
cd frontend
npm run build
```

The built files will be in the `dist` directory.

### Run Production Build

```bash
cd frontend
npm run preview
```

## Project Structure

```
tradingview-clone/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── config/
│   │   └── assets/
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── utils/
│   ├── package.json
│   └── .env
└── docs/
```

## Development Workflow

1. Make changes to the code
2. The frontend development server will automatically reload
3. For backend changes, the server will restart automatically
4. Run tests to ensure everything works correctly

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the PORT in `.env` file
2. **MongoDB connection failed**: Ensure MongoDB is running
3. **Dependency issues**: Delete `node_modules` and run `npm install` again

### Debugging

1. Check the browser console for frontend errors
2. Check the terminal for backend errors
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed

## Additional Resources

- [Frontend Documentation](./frontend.md)
- [Backend Documentation](./backend.md)
- [API Documentation](./api.md)
- [Webhook System](./webhooks.md)