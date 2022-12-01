export const handleTemp = (temps) => {
  const fahrenheit = Math.round(temps);
  const celsius = Math.round((fahrenheit - 32) * (5 / 9));
  return { fahrenheit: fahrenheit, celsius: celsius };
};

export const handleSpeed = (speed) => {
  const mph = Math.round(speed);
  const kph = Math.round(mph * 1.60934);
  return { mph: mph, kph: kph };
};
