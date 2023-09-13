export const timeSince = (date: string) => {
  const baseDate = new Date(date);

  const seconds = Math.floor(
    (new Date().getTime() - baseDate.getTime()) / 1000
  );

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) === 1
      ? Math.floor(interval) + ' año'
      : Math.floor(interval) + ' años';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? Math.floor(interval) + ' mes'
      : Math.floor(interval) + ' meses';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? Math.floor(interval) + ' día'
      : Math.floor(interval) + ' días';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? Math.floor(interval) + ' hora'
      : Math.floor(interval) + ' horas';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? Math.floor(interval) + ' minuto'
      : Math.floor(interval) + ' minutos';
  }

  return Math.floor(interval) === 1
    ? Math.floor(interval) + ' segundo'
    : Math.floor(interval) + ' segundos';
};
