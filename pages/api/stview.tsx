import type { NextApiRequest, NextApiResponse } from 'next';
import useSWR from 'swr';

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
  status: 'OK';
}

const handler = async (
  req: ExtendedNextAPIRequest,
  res: NextApiResponse<Data>
) => {
  const coords = req.body.location;
  // console.log(coords);
  // console.log(coords.lat, coords.long, process.env.API_KEY);
  const metadata = await fetch(
    `https://maps.googleapis.com/maps/api/streetview/metadata?location=${coords.lat},${coords.long}&key=${process.env.API_KEY}`
  );
  console.log(metadata);
  // res.status(200).send(metadata);
  // const json = await metadata.json();
  // const data = { name: 'John Doe' };
  // res.status(200).json(data);
  // const data = {{ 'name': 'John Doe' }}
  // res.status(200).send(json);
  // res.send(json);
  // const fetcher = (url: string) => fetch(url).then((res) => res.json());
  // const { data, error, mutate } = useSWR(
  //   `https://maps.googleapis.com/maps/api/streetview/metadata?location=${coords.lat},${coords.long}&key=${process.env.API_KEY}`,
  //   fetcher
  // );

  // if (error) {
  //   return error;
  // }

  // return data;
  // if (data && !error) {
  //   res.json(data);
  // }
  // const options = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };

  // const metaRequest = await fetch(
  //   `https://maps.googleapis.com/maps/api/streetview/metadata?location=${coords.lat},${coords.long}&key=${process.env.API_KEY}`
  // );

  // const metaJson = await metaRequest.json();

  // console.log(metaJson);
  // res.json(metaJson);
};

export default handler;
