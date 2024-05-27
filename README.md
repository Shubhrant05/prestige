# Prestige Estate

## Introduction

Welcome to **Prestige Estate**, a sophisticated real estate website meticulously crafted as part of my learning journey and hands-on application of modern web technologies. This project showcases my proficiency in a robust tech stack. Spanning approximately 15 days of dedicated development, Prestige Estate is not only fully functional but also responsive, ensuring a seamless experience across devices. Dive in to explore the seamless integration and powerful features that bring this project to life.

## Tech Stack

### Frontend
- **ReactJS**
- **JavaScript**
- **TailwindCSS**
- **Redux**

### Backend
- **NodeJS**
- **ExpressJS**

### Database
- **MongoDB**

### Authentication
- **Google OAuth**
- **Firebase**

## Frontend Specifications

The frontend of **Prestige Estate** is designed to provide an intuitive and seamless user experience. Below are the key components and features of the frontend:

### Authentication
- **Sign In Page**: Allows existing users to log in securely.
- **Sign Up Page**: Enables new users to register using JWT authentication.

### Main Pages
- **Landing Page**: Displays properties in three categories: Sale, Rent, and Offers. Users can easily browse through featured listings.
- **About Us Page**: Provides a brief overview of the company and its mission.

### Property Listings
- **Listings Page**: Showcases all available properties. Users can search with keywords and filter by parameters such as Sale, Rent, Offers, and Amenities. Sorting options are available to organize listings by different values.

### User Profile
- **Profile Page**: Users can update their details and profile picture. This page also allows users to view and manage their listings.

### Listing Management
- **Create Listing Page**: Users are redirected to a form where they can add details and pictures for a new listing.
- **Update Listing Page**: Allows users to update details of their existing listings.
- **Listing Details Page**: Provides comprehensive information about a listing. Includes a "Contact Landlord" feature, enabling users to send emails directly to the property owner.

## Backend Specifications

The backend of **Prestige Estate** is powered by a suite of robust APIs developed using **Node.js** and **Express.js**, with **MongoDB** serving as the database. These APIs ensure smooth and efficient handling of data and provide the following functionalities:

### API Features
- **CRUD Operations for Users**: Comprehensive APIs to create, read, update, and delete user information.
- **CRUD Operations for Listings**: Full set of APIs to manage property listings, including creation, retrieval, updating, and deletion of listings.

### API Documentation
For detailed information and to explore the available endpoints, please refer to the [Postman Collection](https://blue-resonance-76334.postman.co/workspace/New-Team-Workspace~2b42d5ed-22f9-4a59-9d40-8861d7957cea/collection/18860320-86ce470b-8474-4928-8972-2eb8636b0312?action=share&creator=18860320)


## Deployment Details

The **Prestige Estate** project is deployed to ensure accessibility and performance. Here are the deployment specifics:

### Frontend
The frontend is hosted on **Vercel**, providing a fast and reliable platform for static site hosting and serverless functions.

### Backend
The backend is deployed on **Render** using their free server tier. Please note that it may take some time to boot up when accessed after a period of inactivity.

---

Feel free to explore the [live application](https://prestige-gamma.vercel.app/) and experience its features in real-time.

## How to Run on Local Server

### Frontend

1. **Fork and Clone the Repository**
   - Fork the [frontend repository](https://github.com/Shubhrant05/prestige) to your GitHub account.
   - Clone the forked repository to your local machine:
     ```sh
     git clone https://github.com/<your-username>/prestige.git
     ```
   
2. **Set Up the Codebase**
   - Navigate to the project directory:
     ```sh
     cd prestige
     ```
   - Install the required dependencies:
     ```sh
     npm install
     ```
   
3. **Run the Development Server**
   - Start the frontend development server:
     ```sh
     npm start
     ```
   - The application should now be running on `http://localhost:3000`.

### Backend

1. **Fork and Clone the Repository**
   - Fork the [backend repository](https://github.com/Shubhrant05/prestige_backend) to your GitHub account.
   - Clone the forked repository to your local machine:
     ```sh
     git clone https://github.com/<your-username>/prestige_backend.git
     ```

2. **Set Up the Codebase**
   - Navigate to the project directory:
     ```sh
     cd prestige_backend
     ```
   - Install the required dependencies:
     ```sh
     npm install
     ```

3. **Check Environment Variables**


4. **Run the Development Server**
   - Start the backend development server:
     ```sh
     npm start
     ```
   - The backend server should now be running on `http://localhost:5000` or the port specified in your environment variables.
