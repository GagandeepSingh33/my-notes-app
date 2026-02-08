📝 Notes App

A full-stack Notes application built with Node.js, Express, MongoDB, and Vanilla JavaScript.
Users can create, edit, delete, search, and pin notes with a clean macOS-style interface.

Live Demo
👉 https://my-notes-app-5sei.onrender.com

✨ Features

Create, edit, and delete notes

Autosave while editing

Pin important notes to the top

Search notes by title

Modal-based editor

Dark mode with smooth animation

Keyboard shortcuts

macOS-style light theme and bluish dark theme

Responsive UI

Deployed on Render

🛠 Tech Stack

Frontend

HTML

CSS

Vanilla JavaScript

Backend

Node.js

Express.js

Database

MongoDB Atlas

Mongoose

Deployment

Render

GitHub

⌨️ Keyboard Shortcuts

Ctrl / Cmd + N → Focus new note

Ctrl / Cmd + S → Save note in editor

Esc → Close editor modal

📂 Project Structure
my-notes-app/
├── models/
│   └── Note.js
├── routes/
│   └── notes.js
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── server.js
├── package.json
└── README.md

⚙️ Environment Variables

Create a .env file in the root directory.

PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string


Do not commit .env to GitHub.

🚀 Run Locally

Clone the repository

git clone https://github.com/GagandeepSingh33/my-notes-app.git
cd my-notes-app


Install dependencies

npm install


Start the server

node server.js


Open in browser

http://localhost:5000

🌱 Future Improvements

User authentication

Persist pinned notes in database

Remember dark mode preference

Note tags and categories

Undo delete

Markdown support

Custom domain

👤 Author

Gagandeep Singh
Full-Stack Developer

GitHub: https://github.com/GagandeepSingh33

📜 License

This project is open-source and available for learning and portfolio use.