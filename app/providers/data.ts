type GeoPoint = {
  id: string;
  latitude: number;
  longitude: number;
  radius: number; // in meters
  mp3: string; // MP3 filename in assets
};

const LOCATIONS: GeoPoint[] = [
  {
    id: 'point-1',
    latitude: 37.7749,
    longitude: -122.4194,
    radius: 50, // meters
    mp3: 'audio1.mp3',
  },
  {
    id: 'point-2',
    latitude: 34.0522,
    longitude: -118.2437,
    radius: 50,
    mp3: 'audio2.mp3',
  },
];

export {GeoPoint, LOCATIONS};
