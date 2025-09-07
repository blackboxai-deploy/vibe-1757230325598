export interface Timezone {
  name: string;
  offset: string;
  city: string;
  country: string;
  abbreviation: string;
}

export const popularTimezones: Timezone[] = [
  { name: "America/New_York", offset: "-5", city: "New York", country: "USA", abbreviation: "EST" },
  { name: "America/Los_Angeles", offset: "-8", city: "Los Angeles", country: "USA", abbreviation: "PST" },
  { name: "Europe/London", offset: "+0", city: "London", country: "UK", abbreviation: "GMT" },
  { name: "Europe/Paris", offset: "+1", city: "Paris", country: "France", abbreviation: "CET" },
  { name: "Asia/Tokyo", offset: "+9", city: "Tokyo", country: "Japan", abbreviation: "JST" },
  { name: "Asia/Shanghai", offset: "+8", city: "Shanghai", country: "China", abbreviation: "CST" },
  { name: "Asia/Dubai", offset: "+4", city: "Dubai", country: "UAE", abbreviation: "GST" },
  { name: "Australia/Sydney", offset: "+11", city: "Sydney", country: "Australia", abbreviation: "AEDT" },
  { name: "Asia/Kolkata", offset: "+5:30", city: "Mumbai", country: "India", abbreviation: "IST" },
  { name: "America/Sao_Paulo", offset: "-3", city: "São Paulo", country: "Brazil", abbreviation: "BRT" }
];

export const getTimeInTimezone = (timezone: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(new Date());
};

export const getDateInTimezone = (timezone: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(new Date());
};

export const formatTimezoneOffset = (offset: string): string => {
  const sign = offset.startsWith('-') ? '-' : '+';
  const hours = offset.replace(/[+-]/, '');
  return `UTC${sign}${hours}`;
};