export const API_KEY = "AIzaSyDzOm5CRPCXjHZjupdrTjdVPrDFHnSPV7Q";

export const value_converter = (value) => {
  if (value >= 10000000) {
    return Math.floor(value / 10000000) + "M";
  } else if(value >= 1000) {
    return Math.floor(value / 10000000) + "K";
  } else {
    return value;
  }
};
