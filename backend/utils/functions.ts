export function getDaysOfWeek(current) {
  const week = [];
  current.setDate(current.getDate() - current.getDay() + 1);
  for (let i = 0; i < 7; i++) {
    week.push(new Date(current).getDate());
    current.setDate(current.getDate() + 1);
  }
  return week;
}

const getDate = (string) =>
  +new Date(0, 0, 0, string.split(":")[0], string.split(":")[1]);

export const getTime = async (start, end) => {
  let different = getDate(end) - getDate(start);
  let differentRes, hours, minutes;
  if (different > 0) {
    differentRes = different;
    hours = Math.floor((differentRes % 86400000) / 3600000);
    minutes = Math.round(((differentRes % 86400000) % 3600000) / 60000);
  } else {
    differentRes = Math.abs(getDate(start) - getDate(end));
    hours = Math.floor(24 - (differentRes % 86400000) / 3600000);
    minutes = Math.round(60 - ((differentRes % 86400000) % 3600000) / 60000);
  }

  return `${hours}:${minutes}`;
};

export const sumTime = async (prev, next) => {
  const splitPrev = prev.split(":");
  const splitNext = next.split(":");
  let hours = parseInt(splitPrev[0]) + parseInt(splitNext[0]);
  let minutes = parseInt(splitPrev[1]) + parseInt(splitNext[1]);
  hours = Math.floor(hours + minutes / 60);
  minutes = Math.floor(minutes % 60);

  return `${hours}:${minutes}`;
};

export const averageTime = async (time, n) => {
  const splitTime = time.split(":");
  let allTime = parseInt(splitTime[0]) * 60 + parseInt(splitTime[1]);
  let average = allTime / n;
  let hours = Math.floor(average / 60);
  let minutes = Math.floor(average - 60 * hours);

  return `${hours}:${minutes}`;
};
