import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('please hire me');
});

app.listen(port, () => {
  console.log(`dmh-ipapi-backend is running on port ${port}`);
});
