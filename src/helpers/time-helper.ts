const addZeroIfNeed = (value: number): string => {
  const digitsLength = value.toString().length;

  return digitsLength === 1 ? `0${value}` : value.toString();
};

export const formatTime = (time: number, {withSeconds}: {withSeconds: boolean} = {withSeconds: true}): string => {
  const date = new Date(time * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getSeconds();

  if (withSeconds) {
    return `${hh}:${addZeroIfNeed(mm)}:${addZeroIfNeed(ss)}`;
  }

  return `${hh}:${addZeroIfNeed(mm)}`;
};

export const formatLocaleTime = (time: string): string => {
  const date = new Date(time);
  const options = {month: 'long', day: 'numeric', year: 'numeric'};

  return date.toLocaleDateString('en-GB', options);
}