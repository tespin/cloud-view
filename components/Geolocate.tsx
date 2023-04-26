import React, { useState, useEffect } from 'react';
import useSWR from 'swr';

const Geolocate = () => {
  // const fetcher = (url: string) => fetch(url).then((res) => res.json());
  // const { data, error, mutate } = useSWR('https://maps.googleapis.com/maps/api/streetview/metadata?location=${coords.lat},${coords.long}&key=${process.env.API_KEY}', fetcher);
  const [coords, setCoords] = useState<{
    lat: number | null;
    long: number | null;
  }>({ lat: 0, long: 0 });
  const [status, setStatus] = useState<string | null>('');
  const [cloudImg, setCloudImg] = useState<string | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation not supported by your browser.');
    } else {
      setStatus('Locating ...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus('');
          setCoords({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        () => {
          setStatus('Unable to retrieve your location');
        }
      );
    }
  };

  const getCloudImage = async () => {
    // const res = await fetch(
    //   `https://maps.googleapis.com/maps/api/streetview/metadata?location=${coords.lat},${coords.long}&key=${process.env.NEXT_PUBLIC_API_KEY}`
    // );
    // let json = res.json();
    // console.log(json);
    // console.log(process.env.NEXT_PUBLIC_API_KEY);
    // console.log(json);
    // console.log(coords);
    const res = await fetch('/api/stview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location: coords }),
    });

    let metadata = await res.json();
    console.log(metadata);

    // let metadata = await res.json();
    // console.log(metadata);
    // let cloudImg = await res.json();
    // setCloudImg(cloudImg);
  };

  useEffect(() => {
    getCloudImage();
  }, [coords]);

  return (
    <>
      <button onClick={getLocation}>Get location</button>
      {coords && (
        <p>
          Lat: {coords.lat}, long: {coords.long}
        </p>
      )}
    </>
  );
};

export default Geolocate;
