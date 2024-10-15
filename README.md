# COMP693 / Industry Project

---

## Deployment Information

- **Latest Frontend URL**: [http://13.238.254.19:5173/](http://13.238.254.19:5173/)  

- **Local Development URL**: `http://localhost:5173/`

---

## **SportsConnect+**

> A web application designed to simplify the process of discovering and reviewing sports and gym venues.

### Overview

**SportsConnect+** is a platform that streamlines the search and review of sports venues, such as gyms, courts, and training facilities. Users can explore venues, leave reviews, and rate their experiences, offering valuable insights for others.

### Purpose

The application provides a centralized platform for discovering sports venues, encouraging users to engage through reviews and ratings. This helps others make informed decisions based on reliable user feedback.

### Key Features

- **Venue Exploration**: Browse sports and gym venues by category, location, and rating.
- **Rating & Reviews**: Users can rate venues and leave feedback to guide others.
- **User Registration & Login**: Supports traditional email-based authentication.
- **Responsive Design**: Ensures an optimal experience across devices (desktop, tablet, and mobile).

---

## Features Overview

This section details the key features of the application, designed to enhance the user experience in discovering and reviewing sports and gym venues.

### Feature Summary

| Feature                   | Description                                                                                                                                   |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| **Venue Exploration**     | Browse sports and gym venues by filtering based on location, category, and rating.                                                            |
| **Rating & Reviews**      | Provide ratings and leave comments for venues.                                                                                                |
| **User Registration**     | Traditional email-based signup and login.                                                                                                     |
| **Session Persistence**   | Users can resume activities and retain preferences upon re-login.                                                                             |
| **Review History**        | Users can view their past reviews and ratings, tracking interactions with various venues.                                                      |
| **Community Interaction** | Engage with other users through comments and interact with venue reviews, fostering a community-driven recommendation system.                  |

---

## Code Structure

```
├── app-admin
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   ├── src/
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
├── my-react-app
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   ├── src/
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
└── my_app
    ├── base/
    ├── controller/
    ├── index.js
    ├── models/
    ├── service/
    └── uploads/
```

---

## Development Commands

### Backend Commands (under `./my_app` directory)

- **Install dependencies**: `npm install`
- **Start server**: `npm start` (Starts the Node.js server)

### Frontend Commands (under `./app-admin` or `./my-react-app` directory)

- **Install dependencies**: `npm install`
- **Start development server**: `npm run dev` (Starts Vite at `localhost:5173`)
- **Build for production**: `npm run build`

---

### Notes
This document has been streamlined to provide a concise and efficient overview of the **SportsConnect+** project. For further details or questions, please refer to the project's Q&A section.