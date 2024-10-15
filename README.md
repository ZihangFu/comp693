# COMP693 / Industry Project

---

# Deployment URL  
Latest frontend URL (at the time of writing): `http://13.238.254.19:5173/`  
If this is not working, check the Q&A section: `3. How do I access the latest deployed website`

**Local URL:** `http://localhost:5173/`

# **SportsConnect+**

> A web application designed to simplify the process of discovering and reviewing sports and gym venues.

## Overview

**SportsConnect+** is a platform that enhances the experience of finding and reviewing sports-related venues such as gyms, courts, and training facilities. The application allows users to explore venues, leave reviews, and rate their experiences, providing valuable insights for others.

### Purpose

The purpose of this application is to provide users with a centralized platform to discover sports and gym-related venues. It encourages user engagement by enabling them to share their experiences through comments and ratings, offering a reliable source of information for others looking to make informed decisions.

### Development Focus

Our project focuses primarily on the web platform and targets users looking for sports and gym venues. The key features include:

- **Venue Exploration:** Users can browse a list of sports and gym venues based on category, location, and ratings.
- **Rating and Reviews:** Users can rate venues and provide comments to help others make better decisions.
- **User Registration and Login:** Users can sign up and log in to the platform to leave reviews and ratings. Traditional email-based authentication is supported.
- **Responsive Design:** The application is designed to be responsive, ensuring a seamless user experience across different devices (desktop, tablet, and mobile).

---

# Features Overview

This section provides a detailed overview of the essential and additional features of our web application, designed to simplify the discovery and review of sports and gym venues.

## Feature Details

| Feature                          | Description                                                                                                                                                                                                                  |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Venue Exploration**             | Allows users to browse sports and gym venues filtered by location, category, and rating.                                                                                                                                    |
| **Rating and Reviews**            | Enables users to provide ratings and leave comments on the venues they visit.                                                                                                                                               |
| **User Sign-Up & Login**          | Supports registration and login using traditional email-based authentication.                                                                                                                                                |
| **Session Persistence**           | Ensures that users can resume their activities upon re-login, retaining their preferences and activity history.                                                                                                              |
| **Review History**                | Provides users the ability to view their past reviews and ratings, making it easy to track their interactions with different venues.                                                                                         |
| **Community Interaction**         | Users can engage with one another by commenting on venues and interacting with the reviews, fostering community-driven recommendations.                                                                                       |

---

# 1. Code Structure

> .github                       # GitHub Actions CI/CD Pipeline  
    |-- cd.yml                  # Continuous deployment workflow  
    |-- ci.yml                  # Continuous integration workflow  
> backend                       # Node.js, Express, and MongoDB code  
    |-- .env                    # Local Node.js configuration and credentials  
    |-- package.json            # Backend dependencies  
> diagrams                      # Directory for all diagram code (if any)  
    |-- sequence-diagram.txt    # Sequence diagram code  
> e2eTests                      # Playwright end-to-end tests (Chrome only)  
    |-- .env                    # Local Playwright configurations  
> frontend                      # Vite React application  
    |-- .env                    # Local frontend configuration and credentials  
    |-- package.json            # Frontend dependencies  
> infrastructure                # AWS CDK with TypeScript  
    |-- package.json            # AWS CDK dependencies  
> scripts                       # Useful scripts for local development, CI, and CD  
> wiremock                      # Mock responses for local development  
.env                            # MongoDB local configuration and credentials  
docker-compose-ci.yml           # Docker-compose configuration for CI environment  
docker-compose-prod.yml         # Docker-compose configuration for production environment  
docker-compose.yml              # Docker-compose configuration for local development environment  
Dockerfile                      # Docker container for Frontend & Backend applications  

# 2. Useful Development Commands

## Useful Backend Commands

Only available for the backend project under `./backend` directory.

- `npm start`: Start the Node.js server  
- `npm run start:dev`: Start the Node.js server in development mode  
- `npm test`: Run unit tests  
- `npm run test:e2e`: Start end-to-end tests  
- `npm run build:image`: Build a Docker image for the backend and frontend code (no longer used for production)

## Useful Frontend Commands

Only available for the frontend project under `./frontend` directory.

- `npm run start`: Start frontend React service (starts Vite at localhost:5173)  
- `npm test`: Run unit tests  

# 3. Important: How to Set Up Local Development Environment

1. Install nvm  
   - **Windows**: Download the Zip (nvm-noinstall.zip) [HERE]  
   - **Mac**: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`  
2. Install Node.js  
   - `nvm install 20.11.1`  
   - `nvm use 20.11.1`  
3. Install nodemon globally  
   - `npm install -g nodemon`  
4. Setup Frontend React Project  
   - `cd ./frontend`  
   - `npm install`  
5. Setup Backend Node.js Project  
   - `cd ../backend`  
   - `npm install`  

# 4. How to Run Frontend React and Backend Node.js in Dev Mode

1. Run MongoDB (Docker-Compose)  
   - In a new shell, and keep this shell open  
   - `cd ./backend`  
   - `npm run start:dep`  
2. Run Frontend React  
   - `cd ./frontend`  
   - `npm run start`  
3. Run Backend Node  
   - `cd ./backend`  
   - `npm start`  

# 5. How to Build & Test Docker Image

While Docker is no longer required for production, it can be used for testing.  
**Note**: The Docker image now excludes features related to Docker deployment.

- Build the image  
  - `sh scripts/build.sh`  
- Run the image  
  - `docker run -p 8001:3000 -p 8000:5000 -d SportsConnect+`  

Verify the instance:

- Backend: `http://localhost:8001/api/users`  
- Frontend: `http://localhost:8000/`  
- MongoDB Admin Portal: `http://localhost:8080/` (Username: dev, Password: dev)  

# 6. How to Test the Code

## Frontend Unit Tests

- `cd ./frontend`  
- `npm test`  

## Backend Unit Tests

- `cd ./backend`  
- `npm test`  

## Backend API Integration Tests

- Run the backend and MongoDB services  
- Run end-to-end tests  
  - `cd ./backend`  
  - `npm run test:e2e`  

You can manually test APIs through Swagger at `http://localhost:3000/api/api-docs`.

# 7. Deployment

Deployment is handled through AWS EC2 and GitHub Actions. The CI/CD pipeline is triggered on PR submission to automatically deploy the latest code to AWS.
