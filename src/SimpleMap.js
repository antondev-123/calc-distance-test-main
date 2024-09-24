import React, { Component } from "react";

import AirportMarker from "./AirportMarker";

import GoogleMap from "google-map-react";
import mapStyles from "./constants/mapStyles";

const SimpleMap = (props) => {
  const createMapOptions = () => {
    return {
      styles: mapStyles,
    };
  };

  const markers = props.airports.map((e, index) => {
    return (
      <AirportMarker
        key={index}
        lat={e?.lat}
        lng={e?.lng}
        text={e?.iata_code || e?.icao_code}
      />
    );
  });

  return (
    <div className="SimpleMap">
      <GoogleMap
        onGoogleApiLoaded={({ map, maps }) => {
          window.map = map;
          window.maps = maps;
        }}
        yesIWantToUseGoogleMapApiInternals={true}
        bootstrapURLKeys={{
          language: "en",
        }}
        center={props.center}
        zoom={props.zoom}
        options={(maps) => createMapOptions(maps)}
      >
        {markers}
      </GoogleMap>
    </div>
  );
};

export default SimpleMap;
