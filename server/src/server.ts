import express, {Request, Response} from "express";
const cors = require("cors");
import cookieParser from 'cookie-parser';
import authRouter from "./routes/auth.routes";
import hashDemoRouter from "./routes/hashDemo.routes";

const app = express();

const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  process.env.FRONTEND_URL ||
  "http://localhost:5173"
)
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) return callback(null, true); // server-to-server / Postman
    if (allowedOrigins.includes(origin)) return callback(null, true);

    console.warn(`[CORS BLOCKED] origin=${origin} allowed=${allowedOrigins.join(",")}`);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// simple request log for Render
app.use((req: Request, res: Response, next) => {
  res.on("finish", () => {
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode}`);
  });
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/hash', hashDemoRouter)




export default app