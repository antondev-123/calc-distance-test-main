import React from "react";
import { blue } from "@mui/material/colors";
import { SvgIcon } from "@mui/material";
const AirportMarker = (props) => {
  const MARKER_SIZE = 20;
  const markerStyle = {
    position: "absolute",
    width: MARKER_SIZE,
    height: MARKER_SIZE,
    left: -MARKER_SIZE / 2,
    top: -MARKER_SIZE / 2,
    color: blue[500],
  };
  return (
    <div style={markerStyle}>
      <SvgIcon {...props} color={blue[500]}>
        <path d="M22 16v-2l-8.5-5V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9L2 14v2l8.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-5.5L22 16z"></path>
      </SvgIcon>
      {props.text}
    </div>
  );
};

export default AirportMarker;
