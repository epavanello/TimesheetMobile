export const twoDigit = (n: number) => (n > 9 ? "" + n : "0" + n);

export const getTime = (index: number, start: number, stepCents: number, breakStart: number, breakEnd: number) => {
  const time = start * 100 + index * stepCents;
  let hours = Math.floor(time / 100);
  if (hours >= breakStart) {
    hours += breakEnd - breakStart;
  }
  const minutes = ((time % 100) / 100) * 60;
  return `${twoDigit(hours)}:${twoDigit(minutes)}`;
};

export const getHours = (index: number, stepCents: number, start = 0) => {
  const time = start * 100 + index * stepCents;
  return Math.floor(time / 100);
};

export const getMinutes = (index: number, stepCents: number, start = 0) => {
  const time = start * 100 + index * stepCents;
  return ((time % 100) / 100) * 60;
};
