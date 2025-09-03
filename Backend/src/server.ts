import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false, // como você usa Bearer, não precisa enviar cookies
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(routes);

const PORT = process.env.LOCAL_PORT || 3000;

app.listen(PORT, () =>
  console.log(`servidor rodando corretamente na porta ${PORT} `)
);
