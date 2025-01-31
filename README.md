# AWS Instance Filter - Frontend

## Overview

This is the frontend of the AWS Instance Filter application. It allows users to filter AWS instances based on CPU, RAM, and other parameters. The frontend is built using React with Material-UI components for styling and a seamless user experience.

## Features

- Users can filter AWS instances by CPU, RAM, cloud provider, and region.
- Data is fetched from the backend API.
- Sorting functionality on CPU column.
- Clear filter option to reset selections.
- Responsive design using Material-UI.

## Tech Stack

- **React.js** (Frontend framework)
- **Material-UI** (Component library for styling)
- **Axios** (For API requests)
- **TypeScript** (For type safety)

## Installation

### Prerequisites

- Node.js installed
- A running instance of the backend API

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Nitinp30/digiusher_frontend.git
   cd digiusher_frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm run start
   ```
4. The application will run on `http://localhost:3000/`.

## Project Structure

```
frontend/
│-- src/
│   │-- components/    # Filter UI components
│   │-- App.tsx        # Main app component
│   │-- index.tsx      # Entry point
│-- public/           # Static assets
│-- package.json      # Project dependencies
│-- tsconfig.json     # TypeScript configuration
│-- README.md         # Documentation
```

## API Integration

The frontend interacts with the backend API to fetch and filter AWS instance data.

- **Endpoint:** `GET http://localhost:5020/api/products/filter`
- **Parameters:**
  - `minCPU`: Minimum CPU cores
  - `maxCPU`: Maximum CPU cores
  - `minRAM`: Minimum RAM (GiB)
  - `maxRAM`: Maximum RAM (GiB)

Example API call:

```ts
axios.get("http://localhost:5020/api/products/filter", {
  params: {
    minCPU: 2,
    maxCPU: 8,
    minRAM: 4,
    maxRAM: 16,
  },
});
```

## Usage

1. Select filtering criteria (CPU, RAM, region, etc.).
2. Click the **Filter** button to fetch results.
3. Click **Clear Filters** to reset selections.

## Future Improvements

- Implement advanced sorting on multiple columns.
- Add multi-cloud provider support.
- Enhance UI with animations and better styling.
- Implement caching for better performance.

