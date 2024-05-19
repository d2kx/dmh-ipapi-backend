import express, { Express, Request, Response } from 'express';
import { isIP } from 'net';

interface IPGeolocationAPIResponse {
  city: string;
  country: string;
  query: string;
  status: string;
}

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  // please do <3
  res.send('please hire me <3');
});

app.get('/api/location/:ipAddress', async (req: Request, res: Response) => {
  const { ipAddress } = req.params;

  // don't even bother if we didn't get a valid IPv4/IPv6 address, both of which ip-api.com supports
  if (!isIP(ipAddress)) {
    res.status(400).send('please submit a valid IPv4/IPv6 address');
    return;
  }

  try {
    // native fetch requires Node.js 16+, it became stable in 21+
    const response = await fetch(`http://ip-api.com/json/${ipAddress}`);
    const { city, country, query, status } =
      (await response.json()) as IPGeolocationAPIResponse;

    res.json({ city, country, ipAddress: query, status });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

app.listen(port, () => {
  console.log(`dmh-ipapi-backend is running on port ${port}`);
});
