# Natours — Tour Booking Application

A full-stack tour booking application built with Node.js, Express, MongoDB, and React.

This repository contains the backend REST API for the Natours application. It provides endpoints for retrieving tour data and supports the application's backend functionality.

## Live API

**Deployed Backend:**
https://natours-backend-wfbl.onrender.com

**Tours API:**
https://natours-backend-wfbl.onrender.com/api/v1/tours

The tours endpoint returns tour data in JSON format.

> **Note:** The backend root URL is not a frontend webpage. Use the API endpoints to access the application's data.

## Tech Stack

* **Runtime:** Node.js
* **Backend:** Express.js
* **Database:** MongoDB
* **ODM:** Mongoose
* **API Architecture:** REST
* **Deployment:** Render

## Features

* REST API for retrieving tour data
* MongoDB database integration
* Tour data management
* User authentication
* Password change functionality
* User profile photo upload and update functionality

See the source code for the implemented routes, controllers, models, and middleware.

## API Endpoints

### Tours

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| GET    | `/api/v1/tours` | Retrieve the list of tours |

**Example request:**

```http
GET https://natours-backend-wfbl.onrender.com/api/v1/tours
```

The endpoint returns a JSON response containing tour data.

### Additional Endpoints

The application also contains user-related functionality. Refer to the route definitions in the source code for available endpoints and their authentication requirements.

## Getting Started

### Prerequisites

* Node.js
* npm
* MongoDB database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/prak-coder/natours-2026.git
   ```

2. Navigate to the project directory:

   ```bash
   cd natours-2026
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and configure the environment variables required by the application.

5. Start the development server using the appropriate script defined in `package.json`.

   ```bash
   npm run dev
   ```

   If your project uses a different development script, use the corresponding command from `package.json`.

## Environment Variables

Configure the environment variables required by your application. These may include:

* MongoDB connection string
* JWT configuration
* Application port
* Email service credentials, if applicable
* Other service credentials used by the application

Refer to the application's configuration files for the exact variable names.

**Security:** Never commit your `.env` file, database credentials, JWT secrets, or API keys to GitHub.

## Project Structure

The backend uses Express.js and MongoDB. Refer to the source code for the complete project structure, including routes, controllers, models, and middleware.

## Deployment

The backend is deployed on Render and connects to a MongoDB database.

The deployed API can be accessed using the live endpoint provided above.

## Future Improvements

* Complete and deploy the React frontend
* Document all API endpoints and request parameters
* Add API testing documentation
* Improve automated test coverage

## Author

**GitHub:** [prak-coder](https://github.com/prak-coder)
