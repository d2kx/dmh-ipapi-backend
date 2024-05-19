import express, { Express, Request, Response } from 'express';
import { isIP } from 'net';

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('please hire me <3');
});

app.get('/api/location/:ipAddress', (req: Request, res: Response) => {
  const ipAddress = req.params.ipAddress;
  if (!isIP(ipAddress)) {
    res.send('please submit a valid IPv4/IPv6 address');
    return;
  }
  res.send(`your ip: ${JSON.stringify(req.params)}`);
});

app.listen(port, () => {
  console.log(`dmh-ipapi-backend is running on port ${port}`);
});
