import type { NextApiRequest, NextApiResponse } from 'next';

interface ExtendedNextAPIRequest extends NextApiRequest {
  body: {
    location: { lat: number; long: number };
  };
}

interface Data {
  copyright: string;
  date: string;
  location: {
    lat: number;
    lng: number;
  };
  pano_id: string;
  status: string;
}

const handler = async (req: ExtendedNextAPIRequest, res: NextApiResponse) => {
  const coords = req.body.location;
  const api = 'https://maps.googleapis.com/maps/api/streetview';
  const size = { w: 400, h: 400 };
  const fov = 40;
  const heading = '';
  const pitch = 90;

  let result = `${api}?size=${size.w}x${size.h}&location=${coords.lat},${coords.long}&fov=${fov}&heading=${heading}&pitch=${pitch}&key=${process.env.API_KEY}`;

  res.status(200).json(result);
};

export default handler;
