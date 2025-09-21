// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import logger from "morgan";


const app = express();
app.use(cors());
app.use(logger("dev"));
// Crear servidor HTTP
const server = http.createServer(app);

// Inicializar Socket.IO
const io = new Server(server, {
  cors: {
    origin: ["https://finanzia.xyz", "http://localhost:3000"], // Permitir todas las conexiones (ajustar en producción)
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 10, // 10 segundos
    skipMiddlewares: true,
  },
});

// Evento de conexión y desconexión (sin lógica de negocio aún)
io.on("connection", (socket) => {
  console.log("✅ Usuario conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Usuario desconectado:", socket.id);
  });
});

// Ruta simple para probar si el servidor responde
app.get("/", (req, res) => {
  res.send("Servidor Socket.IO activo 🚀");
});

// Puerto dinámico (Heroku lo define en process.env.PORT)
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🔥 Servidor Socket.IO corriendo en puerto ${PORT}`);
});
