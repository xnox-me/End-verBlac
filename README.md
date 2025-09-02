# DEX Terminal Clone (DTC)

A comprehensive DEX trading terminal with advanced charting capabilities and webhook features.

## Features

- Real-time charting with professional interface
- DEX trading panel with buy/sell functionality
- Webhook management system for price alerts and trade notifications
- Responsive design for desktop and mobile devices
- Real-time data updates with Socket.IO
- User authentication and account management

## Tech Stack

### Frontend
- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for HTTP requests
- Socket.IO client for real-time updates

### Backend
- Node.js with Express
- MongoDB with Mongoose
- Socket.IO for real-time communication
- JSON Web Tokens for authentication
- Web3.js for blockchain integration

## Project Structure

```
.
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── utils/
│   │   └── ...
│   └── ...
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── ...
│   └── ...
└── docs/
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open your browser to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Charts
- `GET /api/charts/:pair/:timeframe` - Get chart data for a pair and timeframe

### Trades
- `POST /api/trades` - Execute a trade
- `GET /api/trades` - Get recent trades

### Webhooks
- `POST /api/webhooks` - Create a new webhook
- `GET /api/webhooks` - Get all webhooks
- `PUT /api/webhooks/:id` - Update a webhook
- `DELETE /api/webhooks/:id` - Delete a webhook

## Webhook Events

1. **Price Crossing** - Triggered when a price crosses a specified threshold
2. **Trade Executed** - Triggered when a trade is executed
3. **Order Book Change** - Triggered when the order book changes significantly

## Development

### Frontend
The frontend is built with React and Vite. Components are organized in the `src/components` directory.

### Backend
The backend is built with Node.js and Express. Routes are defined in `src/routes`, models in `src/models`, and business logic in `src/services`.

## Deployment

### Frontend
Build the frontend for production:
```bash
cd frontend
npm run build
```

### Backend
Run the backend in production mode:
```bash
cd backend
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.