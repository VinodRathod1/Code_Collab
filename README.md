# 🚀 Realtime Code Editor

<div align="center">
  <h3>✨ Code Together, Create Together ✨</h3>
  <p>A collaborative real-time code editor that allows multiple users to write and execute code together in the same room.</p>
  <p>Built with React, Node.js, Socket.io, and Monaco Editor</p>
  
  ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
  ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
  ![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)
</div>

---

## 🌟 Features

<table>
  <tr>
    <td align="center">
      <h3>🤝 Real-time Collaboration</h3>
      <p>Multiple users can edit code simultaneously with live synchronization</p>
    </td>
    <td align="center">
      <h3>🚀 Multi-language Support</h3>
      <p>Supports C++, Python, JavaScript, and Java</p>
    </td>
  </tr>
  <tr>
    <td align="center">
      <h3>⚡ Code Execution</h3>
      <p>Execute code directly in the browser with input/output support</p>
    </td>
    <td align="center">
      <h3>🏠 Room-based Sessions</h3>
      <p>Join or create rooms using unique room IDs</p>
    </td>
  </tr>
  <tr>
    <td align="center">
      <h3>👥 User Management</h3>
      <p>See connected users in real-time</p>
    </td>
    <td align="center">
      <h3>📱 Responsive Design</h3>
      <p>Works on desktop and mobile devices</p>
    </td>
  </tr>
</table>

## 🛠️ Tech Stack

<div align="center">

### 🎨 Frontend
<p>
  <img src="https://img.shields.io/badge/React-17.0.2-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Monaco_Editor-4.7.0-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Monaco Editor"/>
  <img src="https://img.shields.io/badge/Socket.io_Client-4.8.1-010101?style=flat-square&logo=socketdotio&logoColor=white" alt="Socket.io Client"/>
</p>
<p>
  <img src="https://img.shields.io/badge/React_Router_DOM-6.2.1-CA4245?style=flat-square&logo=reactrouter&logoColor=white" alt="React Router"/>
  <img src="https://img.shields.io/badge/React_Hot_Toast-2.2.0-FF6B6B?style=flat-square" alt="React Hot Toast"/>
  <img src="https://img.shields.io/badge/React_Avatar-4.0.0-4FC3F7?style=flat-square" alt="React Avatar"/>
</p>

### ⚙️ Backend
<p>
  <img src="https://img.shields.io/badge/Node.js-Latest-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-5.1.0-000000?style=flat-square&logo=express&logoColor=white" alt="Express.js"/>
  <img src="https://img.shields.io/badge/Socket.io-4.4.1-010101?style=flat-square&logo=socketdotio&logoColor=white" alt="Socket.io"/>
</p>
<p>
  <img src="https://img.shields.io/badge/Judge0_API-Integration-FF9800?style=flat-square" alt="Judge0 API"/>
  <img src="https://img.shields.io/badge/Axios-1.10.0-5A29E4?style=flat-square" alt="Axios"/>
  <img src="https://img.shields.io/badge/CORS-2.8.5-4CAF50?style=flat-square" alt="CORS"/>
</p>

</div>

## 🎯 How to Use

<div align="center">
  
  ```mermaid
  graph TD
    A[🏠 Visit Homepage] --> B{New Room?}
    B -->|Yes| C[🎲 Click 'new room']
    B -->|No| D[📝 Enter Room ID]
    C --> E[🎯 Get Unique Room ID]
    D --> F[👤 Enter Username]
    E --> F
    F --> G[🚀 Join Room]
    G --> H[💻 Start Coding]
    H --> I[🤝 Share Room ID]
    I --> J[⚡ Execute Code]
    J --> K[🎉 Collaborate!]
  ```
  
</div>

### Step-by-Step Guide

| Step | Action | Description |
|------|--------|-------------|
| 1️⃣ | **Create a Room** | Click "new room" to generate a unique room ID |
| 2️⃣ | **Join a Room** | Enter an existing room ID and your username |
| 3️⃣ | **Start Coding** | Select your programming language and start writing code |
| 4️⃣ | **Collaborate** | Share the room ID with others to collaborate in real-time |
| 5️⃣ | **Execute Code** | Use the "Run" button to execute your code with custom input |
| 6️⃣ | **Copy Room ID** | Use the "Copy ROOM ID" button to share with others |

## 🔧 Supported Languages

<div align="center">

| Language | Language ID | Badge |
|----------|-------------|-------|
| **C++** | 54 | ![C++](https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white) |
| **Python** | 71 | ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) |
| **JavaScript** | 63 | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) |
| **Java** | 62 | ![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white) |

</div>

## 📁 Project Structure

```
🌳 realtime-editor/
├── 📁 public/
│   ├── 📄 index.html
│   └── 📄 manifest.json
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 🧩 Client.js
│   │   ├── 💻 Editor.js
│   │   └── 🎨 Editor.css
│   ├── 📁 pages/
│   │   ├── 🏠 Home.js
│   │   └── ✏️ EditorPage.js
│   ├── ⚡ Actions.js
│   ├── 🚀 App.js
│   ├── 🔌 socket.js
│   └── 📍 index.js
├── 🖥️ server.js
└── 📦 package.json
```

## 🔗 API Integration

<div align="center">
  <h3>⚖️ Judge0 API Integration</h3>
  <p>Powerful code execution engine powering our real-time compiler</p>
</div>

The application uses the **Judge0 API** for seamless code execution:

| Feature | Description | Status |
|---------|-------------|--------|
| 🚀 **Code Submission** | Submit code to Judge0 for execution | ✅ Active |
| 🗂️ **Language Mapping** | Map frontend languages to Judge0 IDs | ✅ Active |
| 📥 **Input/Output** | Handle custom input and capture output | ✅ Active |
| 🛠️ **Error Management** | Comprehensive error handling and reporting | ✅ Active |

## 🔌 Socket Events

<div align="center">
  
  ```mermaid
  sequenceDiagram
    participant User1
    participant Server
    participant User2
    
    User1->>Server: join (roomId, username)
    Server->>User2: joined (user joined notification)
    User1->>Server: code-change (new code)
    Server->>User2: code-change (synchronized code)
    User2->>Server: code-change (modified code)
    Server->>User1: code-change (synchronized code)
    User1->>Server: disconnect
    Server->>User2: disconnected (user left)
  ```
  
</div>

### Event Types

| Event | Direction | Description | Icon |
|-------|-----------|-------------|------|
| `join` | Client → Server | User joins a room | 🚪 |
| `joined` | Server → Client | Broadcast when user joins | 📢 |
| `disconnected` | Server → Client | User leaves the room | 👋 |
| `code-change` | Bidirectional | Real-time code synchronization | 💻 |
| `sync-code` | Server → Client | Sync code for new joiners | 🔄 |

## 🤝 Contributing

<div align="center">
  <h3>🌟 We Welcome Contributors! 🌟</h3>
  <p>Help us make this project even better!</p>
</div>

### 🚀 Quick Start

| Step | Action | Command/Description |
|------|--------|---------------------|
| 1️⃣ | **Fork** | Fork the repository to your GitHub account |
| 2️⃣ | **Clone** | `git clone <your-fork-url>` |
| 3️⃣ | **Branch** | `git checkout -b feature/amazing-feature` |
| 4️⃣ | **Code** | Make your awesome changes |
| 5️⃣ | **Test** | Test thoroughly to ensure everything works |
| 6️⃣ | **Commit** | `git commit -m "Add amazing feature"` |
| 7️⃣ | **Push** | `git push origin feature/amazing-feature` |
| 8️⃣ | **PR** | Submit a pull request |

### 🎯 Areas for Contribution

- 🐛 **Bug Fixes** - Help us squash bugs
- ✨ **New Features** - Add exciting new functionality
- 📚 **Documentation** - Improve our docs
- 🎨 **UI/UX** - Enhance user experience
- 🔧 **Performance** - Optimize for better performance

## 📄 License

<div align="center">
  <p>📝 This project is private and not licensed for public use.</p>
</div>

---

## 👨‍💻 Author

<div align="center">
  <h3>🎉 Built with ❤️ by</h3>
  <p>
    <a href="https://github.com/VinodRathod1"> </a>
  </p>
  <h3>VinodRathod</h3>
  
</div>

---

<div align="center">
  <h3>🌟 If you found this project helpful, please give it a star! 🌟</h3>
  <p>
    <img src="https://img.shields.io/badge/Made_with-Love-red?style=for-the-badge&logo=heart&logoColor=white" alt="Made with Love"/>
    <img src="https://img.shields.io/badge/Powered_by-Coffee-brown?style=for-the-badge&logo=coffee&logoColor=white" alt="Powered by Coffee"/>
  </p>
</div>
