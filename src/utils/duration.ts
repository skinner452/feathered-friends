export const formatDuration = (durationSeconds: number): string => {
  const days = Math.floor(durationSeconds / (24 * 3600));
  const hours = Math.floor((durationSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((durationSeconds % 3600) / 60);
  const seconds = durationSeconds % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} days`);
  if (hours > 0) parts.push(`${hours} hours`);
  if (minutes > 0) parts.push(`${minutes} minutes`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds} seconds`);

  return parts.join(', ');
}