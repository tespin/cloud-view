import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Container from './UI/Container';

// interface Data {
//   copyright: string;
//   date: string;
//   location: {
//     lat: number;
//     lng: number;
//   };
//   pano_id: string;
//   status: string;
// }

interface GeoProps {
  className?: string;
  label: string;
}

interface Metadata {
  copyright?: string;
  date?: string;
  location?: { lat: string; long: string };
  pano_id?: string;
  status: string;
}

const Geolocate = ({ className, label }: GeoProps) => {
  // const fetcher = (url: string) => fetch(url).then((res) => res.json());
  // const { data, error, mutate } = useSWR('https://maps.googleapis.com/maps/api/streetview/metadata?location=${coords.lat},${coords.long}&key=${process.env.API_KEY}', fetcher);
  const [coords, setCoords] = useState<{
    lat: number | null;
    long: number | null;
  }>({ lat: null, long: null });
  const [status, setStatus] = useState<string | null>('');
  const [metadata, setMetadata] = useState<Metadata>({ status: '' });
  const [cloudImg, setCloudImg] = useState<string | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      // setStatus('Geolocation not supported by your browser.');
      console.log('Geolocation not supported');
    } else {
      console.log('Requesting your location ...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus('');
          const newCoords = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          };
          setCoords(newCoords);
        },
        () => {
          setStatus('Unable to retrieve your location');
        }
      );
    }
  };

  const getMeta = async () => {
    // setMetadata({ status: '' });
    console.log('Checking metadata ...');
    console.log(metadata);
    const res = await fetch('/api/metadata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location: coords }),
    });

    const result = await res.json();
    setMetadata(result);
  };

  const getCloudImage = async () => {
    // setCloudImg(null);
    // console.log('getting cloud img');
    if (metadata.status === 'OK') {
      console.log(metadata);
      console.log('Obtaining your cloud image ...');
      const res = await fetch('/api/stview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location: coords }),
      });
      const src = await res.json();
      setCloudImg(src);
    } else {
      console.log(
        'No imagery is available at your location. Please move to a different place and try again.'
      );
    }
  };

  useEffect(() => {
    getMeta();
  }, [coords]);

  useEffect(() => {
    // console.log(cloudImg);
    getCloudImage();
  }, [metadata]);

  return (
    <>
      {/* <Container
        className={`${
          !cloudImg
            ? 'xs:justify-center xs:items-center xs:w-96 xs:h-96 xs:rounded-md xs:border-dashed xs:border-black xs:border-[1px]'
            : ''
        } xs:mt-8 `}
      > */}
      {/* {cloudImg && (
          <Image
            src={cloudImg}
            alt='cloud photo'
            width={400}
            height={400}
            className=''
          />
        )} */}
      <Container
        className={`${
          !cloudImg
            ? 'xs:justify-center xs:items-center xs:w-96 xs:h-96 xs:rounded-md xs:border-dashed xs:border-black xs:border-[1px]'
            : ''
        } xs:flex-col xs:mt-8`}
        // className={`${cloudImg ? 'mt-8`' : 'mt-4'}`}
      >
        {cloudImg && (
          <Image
            src={cloudImg}
            alt='cloud photo'
            width={400}
            height={400}
            className='xs:rounded-lg'
          />
        )}
        <button
          className={`${className} ${cloudImg ? 'xs:mt-4' : ''}`}
          onClick={getLocation}
        >
          {label}
        </button>
      </Container>
      {/* </Container> */}
    </>
  );
};

export default Geolocate;
