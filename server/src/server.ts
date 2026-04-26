import express, {Request, Response} from "express";
import cookieParser from 'cookie-parser';
import authRouter from "./routes/auth.routes";
import hashDemoRouter from "./routes/hashDemo.routes";

const app = express();


app.use((req: Request, res: Response, next) => {
	const start = Date.now();

	res.on("finish", () => {
		const duration = Date.now() - start;
		console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
	});

	next();
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/hash', hashDemoRouter)




export default app