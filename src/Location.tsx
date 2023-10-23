import React from 'react';
import axios from 'axios';

const Location = () => {

  const [error, setError] = React.useState("");
  const [lat, setLat] = React.useState<number | null>();
  const [long, setLong] = React.useState<number | null>();
  const [locationDetails, setLocationDetails] = React.useState(null);
  const [country, setCountry] = React.useState("");

  //Get Location's Lat and Long
  const geolocationAPI = navigator.geolocation;
  const getUserCoordinates = () => {
    if (!geolocationAPI) {
      setError('Geolocation API is not available in your browser!')
    } else {
      geolocationAPI.getCurrentPosition((position) => {
        const { coords } = position;
        setLat(coords.latitude);
        setLong(coords.longitude);
      }, (error) => {
        setError('Something went wrong getting your position!')
      })
    }
  };

  //Get Location Details from Lat and Long
  const getLocationDetails = async () => {
    const res = await axios.get(`https://geocode.maps.co/reverse?lat=${lat}&lon=${long}`)
    if(res.status === 200){
      setLocationDetails(res?.data);
      //@ts-ignore
      setCountry(locationDetails?.address?.country)
    }
  };
  // console.log(locationDetails);
  
  React.useEffect(() => {
    getUserCoordinates();
    getLocationDetails();
  }, [lat, long, country]);
  

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "4rem", color: "#000" }}>
      <p>Your coordinates are: {lat} and {long}, {country}</p>
    </div>
  )
}

export default Location
