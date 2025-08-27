export function generateShortName(name: string): string {
  return `${name}${Math.floor(Math.random() * 99999) + 1}`;
}

export function generateShortId(): number {
  return Math.floor(1000 + Math.random() * 9000);
}

export function getDayFromDate(dateString: string): string {
  const date = new Date(dateString);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
}
