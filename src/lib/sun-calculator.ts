export interface SunPosition {
  isDayTime: boolean;
  sunAngle: number;
  dayProgress: number;
}

export const calculateSunPosition = (lat: number, lng: number, date: Date = new Date()): SunPosition => {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  // Solar declination angle
  const declination = 23.45 * Math.sin(Math.PI * (284 + dayOfYear) / 365 * Math.PI / 180);
  
  // Hour angle
  const timeOffset = date.getTimezoneOffset();
  const localTime = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
  const solarTime = localTime + (4 * lng - timeOffset) / 60;
  const hourAngle = 15 * (solarTime - 12);
  
  // Solar elevation angle
  const elevation = Math.asin(
    Math.sin(declination * Math.PI / 180) * Math.sin(lat * Math.PI / 180) +
    Math.cos(declination * Math.PI / 180) * Math.cos(lat * Math.PI / 180) * Math.cos(hourAngle * Math.PI / 180)
  ) * 180 / Math.PI;
  
  const isDayTime = elevation > -6; // Civil twilight
  const dayProgress = Math.max(0, Math.min(1, (elevation + 6) / 72)); // Normalize to 0-1
  
  return {
    isDayTime,
    sunAngle: elevation,
    dayProgress
  };
};

export const getGlobalDayNightMap = (date: Date = new Date()): { [key: string]: boolean } => {
  const dayNightMap: { [key: string]: boolean } = {};
  
  // Sample major cities around the world
  const cities = [
    { name: 'newyork', lat: 40.7128, lng: -74.0060 },
    { name: 'london', lat: 51.5074, lng: -0.1278 },
    { name: 'tokyo', lat: 35.6762, lng: 139.6503 },
    { name: 'sydney', lat: -33.8688, lng: 151.2093 },
    { name: 'dubai', lat: 25.2048, lng: 55.2708 },
    { name: 'mumbai', lat: 19.0760, lng: 72.8777 },
    { name: 'moscow', lat: 55.7558, lng: 37.6176 },
    { name: 'cairo', lat: 30.0444, lng: 31.2357 },
    { name: 'beijing', lat: 39.9042, lng: 116.4074 },
    { name: 'losangeles', lat: 34.0522, lng: -118.2437 }
  ];
  
  cities.forEach(city => {
    const sunPos = calculateSunPosition(city.lat, city.lng, date);
    dayNightMap[city.name] = sunPos.isDayTime;
  });
  
  return dayNightMap;
};