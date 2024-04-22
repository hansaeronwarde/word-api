import express, { Request, Response } from 'express';
import wordRouter from './routes/wordRouter';
import connectToMongoDB from './config/mongodb';
import randomUploadRouter from './routes/randomUploadRouter';
import 'dotenv/config'

const app = express();
const port = 4004;

connectToMongoDB();

app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).send({ status: "ok" });
});

app.use('/', wordRouter);
app.use('/', randomUploadRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
