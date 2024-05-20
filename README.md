# dmh-ipapi-backend

backend part of dmh-ipapi to provide ip to geolocation services

## requirements

I am using Node.js' native fetch implementation to avoid having to deal with the old-style http.get API or 3rd party http clients. this means that at the very least Node.js 16+ is required

## usage

install the packages with your favorite package manager (or npm ci to use the provided package-lock.json) and either run the index.ts directly with

```
npm run dev
```

or build & run with

```
npm run build
npm run start
```

the default port, if not specified by the node environment, is 3100

## api

**GET /api/location/:ipAddress**

will return back the city, country, ip address processed and a status back from the IP Geolocation API (ip-api.com), and not forward the request if a valid IPv4/IPv6 address is not provided

## one more thing

please hire me <3
