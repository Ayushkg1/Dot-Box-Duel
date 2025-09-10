# 🎮 Dot-Box-Duel

> **A real-time multiplayer strategy game where players compete to capture boxes by connecting dots on a grid!**

[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7.4-black?style=flat-square&logo=socket.io)](https://socket.io/)
[![Redis](https://img.shields.io/badge/Redis-4.6.13-red?style=flat-square&logo=redis)](https://redis.io/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-green?style=flat-square&logo=node.js)](https://nodejs.org/)

## 🌟 Overview

Dot-Box-Duel is an engaging real-time multiplayer strategy game that brings the classic "Dots and Boxes" game to the modern web. Players compete in real-time to capture boxes by strategically connecting adjacent dots on a 7×24 grid. The game features seamless multiplayer functionality with persistent game state and turn-based gameplay.

## ✨ Features

### 🎯 Core Gameplay
- **Strategic Grid Game**: 168 dots arranged in a 7×24 grid for optimal gameplay
- **Box Capture Mechanics**: Players earn points and bonus moves when completing boxes
- **Turn-Based System**: Fair alternating turns with bonus moves for box completion
- **Real-Time Updates**: Instant synchronization of game state between players

### 🌐 Multiplayer Experience
- **Room-Based System**: Create or join custom game rooms with unique names
- **Real-Time Communication**: Powered by Socket.IO for instant updates
- **Persistent Game State**: Redis-backed state management ensures game continuity
- **Player Management**: Automatic player assignment and turn tracking

### 🎨 User Interface
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Interactive Grid**: Touch and mouse support for seamless gameplay
- **Visual Feedback**: Active dot highlighting and path visualization
- **Modern UI**: Clean, intuitive interface with smooth animations

### 🔧 Technical Features
- **Client-Side**: Next.js 14 with React 18 for optimal performance
- **Server-Side**: Node.js with Socket.IO for real-time communication
- **Data Persistence**: Redis for game state and room management
- **Cross-Platform**: Works on all modern browsers and devices

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Redis server
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Dot-Box-Duel.git
   cd Dot-Box-Duel
   ```

2. **Start Redis server**
   ```bash
   # Make sure Redis is running on localhost:6379
   redis-server
   ```

3. **Install dependencies**
   ```bash
   # Install client dependencies
   cd connect-dots
   npm install
   
   # Install server dependencies
   cd ../socket-server
   npm install
   ```

4. **Run the application**
   ```bash
   # Terminal 1: Start the socket server
   cd socket-server
   npm run devStart
   
   # Terminal 2: Start the Next.js client
   cd connect-dots
   npm run dev
   ```

5. **Play the game**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - Enter a room name (minimum 4 characters)
   - Share the room name with a friend to play together!

## 🎮 How to Play

1. **Join a Room**: Enter a room name to create or join an existing game
2. **Take Turns**: Players alternate turns connecting adjacent dots
3. **Capture Boxes**: Complete a square by connecting the fourth side to capture it
4. **Earn Bonus Moves**: Successfully capturing a box grants an extra turn
5. **Win the Game**: The player with the most captured boxes wins!

## 🏗️ Architecture

### Frontend (`connect-dots/`)
- **Framework**: Next.js 14 with App Router
- **UI**: React 18 with CSS Modules
- **Real-time**: Socket.IO client for server communication
- **State Management**: React hooks for local state management

### Backend (`socket-server/`)
- **Runtime**: Node.js
- **Real-time**: Socket.IO server for WebSocket communication
- **Database**: Redis for game state persistence
- **Features**: Room management, player tracking, game state synchronization

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Next.js 14, React 18 | Modern web application framework |
| **Styling** | CSS Modules | Component-scoped styling |
| **Real-time** | Socket.IO | WebSocket communication |
| **Backend** | Node.js | Server runtime |
| **Database** | Redis | Game state persistence |
| **Development** | Nodemon | Auto-restart during development |

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ayush Kumar Gupta**
- GitHub: [@ayushkumargupta](https://github.com/ayushkumargupta)

## 🙏 Acknowledgments

- Inspired by the classic "Dots and Boxes" game
- Built with modern web technologies for optimal performance
- Special thanks to the open-source community for the amazing tools and libraries

---

⭐ **Star this repository if you found it helpful!**
