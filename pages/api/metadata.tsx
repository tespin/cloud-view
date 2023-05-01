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
  const url = `${api}/metadata?location=${coords.lat},${coords.long}&key=${process.env.API_KEY}`;

  const meta = await fetch(url);
  const metaJson = await meta.json();

  res.status(200).json(metaJson);
};

export default handler;
