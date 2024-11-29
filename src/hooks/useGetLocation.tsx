import axios from "axios";

export const useGetLocation = async (latitude: number, longitude: number) => {
  const googleResponse = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
  );
  return googleResponse.data;
};
