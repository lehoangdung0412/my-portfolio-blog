# My Portfolio & Blog

A personal portfolio and blog website built with Golang for the backend API and Next.js with Chakra UI for the frontend.

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Built with Chakra UI for a clean, modern look
- **Server-Side API**: RESTful API built with Golang and Gin
- **Blog System**: Write and publish blog posts with markdown support
- **Portfolio Sections**:
  - About Me: Personal introduction and skills
  - CV/Resume: Education, work experience, and skills
  - Certificates: Display professional certifications
  - Badges: Showcase earned achievements and badges

## Tech Stack

### Backend
- **Golang**: Programming language
- **Gin**: Web framework
- **RESTful API**: CRUD operations for all resources

### Frontend
- **Next.js**: React framework
- **TypeScript**: Type-safe JavaScript
- **Chakra UI**: Component library
- **Axios**: HTTP client

## Project Structure

```
.
├── client/                 # Frontend Next.js application
│   ├── components/         # Reusable React components
│   ├── pages/              # Next.js pages
│   ├── styles/             # Global styles
│   ├── next.config.js      # Next.js configuration
│   ├── package.json        # Frontend dependencies
│   └── tsconfig.json       # TypeScript configuration
│
└── server/                 # Backend Golang application
    ├── controllers/        # API controllers
    ├── models/             # Data models
    ├── routes/             # API routes
    ├── go.mod              # Go module file
    ├── go.sum              # Go dependencies checksum
    └── main.go             # Entry point
```

## Getting Started

### Prerequisites

- Go 1.16+
- Node.js 14+
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install Go dependencies:
   ```
   go mod tidy
   ```

3. Run the server:
   ```
   go run main.go
   ```

The server will start on http://localhost:8080

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

The frontend will start on http://localhost:3000

## API Endpoints

- **GET /api/health**: Health check endpoint
- **GET /api/profile**: Get user profile information
- **GET /api/blog**: Get all blog posts
- **GET /api/blog/:id**: Get a specific blog post
- **GET /api/cv**: Get CV/resume information
- **GET /api/certificates**: Get all certificates
- **GET /api/badges**: Get all badges

## Future Improvements

- Authentication system for admin access
- CMS for managing content
- Image upload functionality
- Comments system for blog posts
- Search functionality
- Dark mode toggle
- Internationalization support

## License

This project is licensed under the MIT License - see the LICENSE file for details.