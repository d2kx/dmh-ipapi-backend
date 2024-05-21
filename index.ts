import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { isIP } from 'net';

interface IPGeolocationAPIResponse {
  city: string;
  country: string;
  message?: string;
  query: string;
  status: string;
}

const IP_GEOLOCATION_API_URL = 'http://ip-api.com/json/';

const app: Express = express();
const port = process.env.PORT || 3100;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  // please do <3
  res.send('please hire me <3');
});

app.get('/api/location/:ipAddress', async (req: Request, res: Response) => {
  const { ipAddress } = req.params;

  // don't even bother if we didn't get a valid IPv4/IPv6 address, both of which ip-api.com supports
  if (!isIP(ipAddress)) {
    res.status(400).json({
      status: 'error',
      message: 'please submit a valid IPv4/IPv6 address',
    });
    return;
  }

  try {
    // native fetch requires Node.js 16+, it became stable in 21+
    const response = await fetch(IP_GEOLOCATION_API_URL + ipAddress);

    // ip-api.com only returns field 'message' on failure
    const { city, country, message, query, status } =
      (await response.json()) as IPGeolocationAPIResponse;

    // ip-api.com will return status 200 even in failure cases of e.g. reserved ranges like 127.0.0.1
    // let's make our HTTP status dependend on its outcome instead
    res
      .status(status === 'success' ? 200 : 400)
      .json({ city, country, ipAddress: query, message, status });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
});

app.listen(port, () => {
  console.log(`dmh-ipapi-backend is running on port ${port}`);
});
