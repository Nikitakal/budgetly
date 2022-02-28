// Passing undefined as the first argument so the formatter defaults to the user's location
export const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: "usd",
  style: "currency",
  // Dont need fractal numbers
  minimumFractionDigits: 0,
});
