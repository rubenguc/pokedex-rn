// decimeters to meters
export const dmToM = (decimeter: number) => {
  return (decimeter * 0.1).toFixed(2);
};

// hectogram to kilogram
export const hgToKg = (hectogram: number) => {
  return (hectogram * 0.1).toFixed(2);
};

export const getStatPercent = (stat: number, max: number) => {
  return (stat * 100) / max;
};
