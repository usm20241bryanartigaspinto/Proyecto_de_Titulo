const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");

// Configuración del entorno
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Rutas de los certificados
const httpsOptions = {
  key: fs.readFileSync("./certs/localhost.key"),
  cert: fs.readFileSync("./certs/localhost.crt"),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Servidor HTTPS corriendo en https://localhost:3000");
  });
});
