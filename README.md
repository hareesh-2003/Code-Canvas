Code Canvas 🎨📖

Connecting Tech Enthusiasts to Explore, Discuss, and Share Insights on the Latest Trends in Digital Technology

Welcome to Code Canvas, a MERN stack-based blogging platform for sharing tech insights and innovations. Whether you’re a seasoned developer, a digital enthusiast, or a tech-curious beginner, Code Canvas is the place to discover, discuss, and engage with the latest in digital technology.
Table of Contents

    Features
    Tech Stack
    Installation
    Usage
    Contributing
    License

Features

    User Authentication: Secure login and registration for personalized experiences.
    Create, Read, Update, Delete (CRUD) Posts: Users can manage posts with ease.
    Search and Filter: Find posts based on keywords, tags, or categories.
    User Profiles: View author details, see recent posts, and engage with the community.
    Responsive Design: Optimized for desktop and mobile views.
    Interactive Comments: Engage with posts through comments and reactions.

Tech Stack

    Frontend: React, HTML, CSS, JavaScript
    Backend: Node.js, Express.js
    Database: MongoDB
    Authentication: JWT
    Styling: CSS Modules, Bootstrap

Installation

Follow these instructions to set up Code Canvas locally.
Prerequisites

    Node.js (v14 or higher)
    MongoDB
    Git

Clone the Repository

bash

git clone https://github.com/yourusername/code-canvas.git
cd code-canvas

Set Up the Backend (API)

    Navigate to the api directory:

    bash

cd api

Install dependencies:

bash

npm install

Create a .env file in the api directory and add the following environment variables:

plaintext

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the backend server:

bash

    npm start

Set Up the Frontend (Client)

    Navigate to the client directory:

    bash

cd ../client

Install dependencies:

bash

npm install

Start the frontend development server:

bash

    npm start

Access the Application

Visit http://localhost:3000 in your browser to explore the Code Canvas blogging site locally.
Usage

    Sign Up / Log In: Create a user account or log in if you already have one.
    Create a Post: Click on "Create Post" to share your tech insights.
    Explore and Engage: Browse the latest posts, search for topics, and comment on posts you find interesting.
    Manage Your Content: Edit or delete your posts as needed, directly from your profile.

Contributing

We welcome contributions from the community! To contribute:

    Fork the repository.
    Create a new branch for your feature or bugfix.
    Commit your changes and push the branch.
    Create a pull request to the main repository.

License

This project is licensed under the MIT License.

Happy Coding! 🎉

If you have any questions, feel free to open an issue or reach out.
