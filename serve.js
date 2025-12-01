// server.js

// Importar los módulos necesarios
import http from "http";
import fs from "fs";
import path from "path";
// Importar 'fileURLToPath' y 'URL' para manejar rutas en módulos ESM
import { fileURLToPath } from "url";

// --- NUEVAS LÍNEAS PARA REEMPLAZAR __dirname ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ----------------------------------------------

const port = 8080;
// Si tu index.html está directamente en la raíz de tu proyecto, usa:
const filePath = path.join(__dirname, "index.html");
// Si tu index.html está en una carpeta 'public', usa la ruta que tenías:
// const filePath = path.join(__dirname, "./public/index.html");

// Creamos la función del servidor
const server = http.createServer((req, res) => {
  // Establece los encabezados de seguridad CLAVE para FFmpeg.wasm
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");

  // Sirve el archivo index.html
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end("Error al cargar index.html");
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

// Inicia el servidor
server.listen(port, "127.0.0.1", () => {
  console.log(`\n✅ ¡Servidor Node.js iniciado!`);
  console.log(`Abre tu navegador en: http://127.0.0.1:${port}\n`);
});
