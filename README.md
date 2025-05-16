
# 🧠 Real-Time Image Classification Server with MobileNet + Socket.IO

This project implements a real-time image classification server using MobileNet via TensorFlow.js and communicates with clients through WebSocket (Socket.IO). Ideal for applications such as surveillance, mobile apps, or browser-based AI interaction.

---

## 🚀 Features

- 🔄 Real-time classification from camera or image input
- 🧠 Uses pretrained MobileNet model (TensorFlow.js)
- ⚡ WebSocket support via Socket.IO
- 🖼️ Accepts base64-encoded image input (e.g., from webcam)
- 📦 Simple, clean codebase using Node.js and Express
- 🧪 Outputs top prediction with label and confidence score

---

## 📁 Project Structure

```
├── server.js              # Main server file
├── public/
│   └── index.html         # Example client (optional)
├── package.json
```

---

## 📦 Requirements

- Node.js (v14+ recommended)
- npm

---

## 🔧 Installation

```bash
git clone https://github.com/yourusername/realtime-mobilenet-socketio.git
cd realtime-mobilenet-socketio
npm install
```

---

## ▶️ Running the Server

```bash
node server.js
```

Server starts on: [http://localhost:3000](http://localhost:3000)

---

## 🔌 Socket.IO API

### Client → Server

- `frame`  
  Send base64 image:
  ```json
  {
    "image": "data:image/jpeg;base64,..."
  }
  ```

### Server → Client

- `prediction`  
  Receive prediction result:
  ```json
  {
    "label": "hotdog",
    "score": 0.97
  }
  ```

---

## 🧠 Model

Uses MobileNet V1 from `@tensorflow-models/mobilenet`. Optimized for speed and deployed with `@tensorflow/tfjs-node`.

---

## 📷 Example Use Case

A mobile device or browser sends webcam frames as base64 via Socket.IO. The server performs classification and returns predictions in real-time — ideal for real-time UI feedback or embedded systems.

---

## 🛠 Dependencies

- [express](https://www.npmjs.com/package/express)
- [socket.io](https://www.npmjs.com/package/socket.io)
- [@tensorflow/tfjs-node](https://www.npmjs.com/package/@tensorflow/tfjs-node)
- [@tensorflow-models/mobilenet](https://www.npmjs.com/package/@tensorflow-models/mobilenet)

---

## 📝 License

MIT License
