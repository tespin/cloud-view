import React, { useState } from 'react';

const Geolocate = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);
  const [coords, setCoords] = useState<{
    lat: number | null;
    long: number | null;
  }>({ lat: null, long: null });
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

  const getCloudImage = async (coords: { lat: number; long: number }) => {
    const res = await fetch('/api/stview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location: coords }),
    });

    let cloudImg = await res.json();
    setCloudImg(cloudImg);
  };

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
