# 🎮 tatuka-engine

A modular, browser-native game engine built for creators who want full control over scene management, asset workflows, and rendering. Built with TypeScript, Express, MongoDB, and PixiJS (currently), it’s designed to support real-time editing, runtime asset playback, and scalable architecture for games or interactive media apps.

## 📚 Table of Contents

* [Features](#features)
* [Folder Structure](#folder-structure)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [Usage](#usage)
* [Database Info](#database-info)
* [Contributing](#contributing)
* [License](#license)

## ✨ Features

* Real-time scene editing
* Runtime asset player (PixiJS)
* Modular structure for expansion
* MongoDB Atlas integration
* JWT-based authentication
* Drag-and-drop asset system
* Static asset hosting via `/public`

## 📁 Folder Structure

## 📁 Folder Structure

```bash
pixi-js-game-engine/
├── client/                # Next.js frontend
├── node_modules/          
├── public/                # Static assets
├── src/
│   ├── config/            # ENV, DB configs
│   ├── controllers/       # Express controllers
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express routes
│   └── index.ts           # Server entry point
├── .env
├── .gitignore
├── next.config.ts
├── next-env.d.ts
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md


## 🚀 Getting Started

1. Clone the repository
   git clone [https://github.com/your-username/sisi-engine.git](https://github.com/your-username/sisi-engine.git)
   cd sisi-engine

2. Install dependencies
   npm install

3. Create a `.env` file (see below)

4. Run the development server
   npm run dev

## 🔐 Environment Variables

Create a `.env` file in the root directory with:

```
PORT=9001
MONGODB_URI=mongodb+srv://<username>:<password>@pixi-js-game-engine-clu.2o4hbdf.mongodb.net/?retryWrites=true&w=majority&appName=pixi-js-game-engine-cluster
JWT_SECRET=your_custom_secure_secret
```

## 🧪 Usage

* Backend runs at: [http://localhost:9001/api](http://localhost:9001/api)
* Frontend (e.g. Next.js) connects via CORS ([http://localhost:3000](http://localhost:3000))
* Static assets served from `/public`
* Runtime loads and plays scene data from backend API
* Auth is handled via JWT & cookies

## 💃 Database Info (MongoDB Atlas)

* Cluster Name: pixi-js-game-engine-cluster
* Example collection: test.users
* Example document:

```json
{
  "email": "admin@gmail.com",
  "username": "asdasd",
  "password": "$2b$10$B38bvb3HlX1Ix/oMybzcNou6ZSh80kijO.eY.xp0wrBffVQS/4pnaG",
  "__v": 0
}
```

## 🤝 Contributing

We welcome contributions!

* Use your own MongoDB credentials
* Never commit your actual `.env`
* Follow the structure and naming conventions
* Run formatter / linter if set up

Steps:

```bash
git fork
git checkout -b feature/your-feature
# make changes
git commit -m "Add your feature"
git push origin feature/your-feature
# then create PR
```

## 📄 License

MIT License


