const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const tf = require('@tensorflow/tfjs-node');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const { createCanvas, loadImage } = require('canvas');
const Tesseract = require('tesseract.js');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

let model;
(async () => {
  model = await cocoSsd.load();
  console.log('Model COCO-SSD siap');
})();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('webcam-data', async (imageData) => {
    if (!model) {
      socket.emit('detection-data', { objects: [], text: 'Model belum siap.' });
      return;
    }

    try {
      // Parse image
      const base64 = imageData.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64, 'base64');
      const img = await loadImage(buffer);

      // Canvas setup for COCO-SSD
      const canvas = createCanvas(img.width, img.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Tensor for object detection
      const input = tf.browser.fromPixels(canvas);
      const predictions = await model.detect(input);
      input.dispose();

      // Filter confident predictions (>0.5)
      const filteredObjects = predictions.filter(p => p.score > 0.5);
      const objectsStr = filteredObjects.map(p => `${p.class} (${(p.score * 100).toFixed(1)}%)`);

      // OCR text detection with Tesseract.js (async)
      const { data: { text: ocrText } } = await Tesseract.recognize(buffer, 'eng', {
        logger: m => {
          // optionally show progress in console
          // console.log(m);
        }
      });

      // Kirim hasil ke client
      socket.emit('detection-data', {
        objects: objectsStr,
        text: ocrText.trim() || 'Tidak terbaca',
      });

    } catch (error) {
      console.error('Error deteksi:', error);
      socket.emit('detection-data', { objects: [], text: 'Terjadi kesalahan pada server.' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
