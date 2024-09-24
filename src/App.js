import React, { Fragment, useEffect, useState } from "react";

import SimpleMap from "./SimpleMap";
import {
  Autocomplete,
  Button,
  Toolbar,
  TextField,
  SvgIcon,
  InputAdornment,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { distance, center, point, points } from "@turf/turf";

import "./App.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  gpsIcon: {
    position: "absolute",
  },
  input: {
    "& > label": {
      paddingLeft: "1.5em !important",
    },
    "& > div > input": {
      paddingLeft: "1.4em !important",
    },
  },
}));

function App() {
  const [data, setData] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [newStart, setNewStart] = useState(null);
  const [newEnd, setNewEnd] = useState(null);
  const [dist, setDist] = useState("");
  const [middle, setMiddle] = useState([37.1, -95.7]);
  const [zoom, setZoom] = useState(4);
  const [polylineEl, setPolylineEl] = useState("");

  const classes = useStyles();
  const options = { units: "miles" };

  useEffect(() => {
    let active = true;

    (async () => {
      var config = {
        method: "get",
        url: "https://airlabs.co/api/v9/airports?country_code=US&api_key=c6a72525-9436-41f9-9081-6c9e05fe73b3"
      };

      axios(config)
        .then(function (response) {
          console.log('resopnse', response);
          if (active) {
            setData([...response.data.response]);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    })();

    return () => {
      active = false;
    };
  }, []);

  const drawFlightPath = (start, end) => {
    if (polylineEl) {
      polylineEl.setMap(null);
    }

    let flightPath = new window.maps.Polyline({
      path: [
        { lat: start.lat, lng: start.lng },
        { lat: end.lat, lng: end.lng },
      ],
      geodesic: true,
      strokeColor: "yellow",
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });

    flightPath.setMap(window.map);
    setPolylineEl(flightPath);
  };

  const scaleZoom = (airportDistance) => {
    if (1500 < airportDistance) {
      return 4;
    } else if (800 < airportDistance) {
      return 5;
    } else if (100 < airportDistance) {
      return 6;
    } else if (airportDistance < 100) {
      return 7;
    } else {
      return 4;
    }
  };

  const calculateDistance = () => {
    setNewStart(start);
    setNewEnd(end);
    var from = point([start.lat, start.lng]);
    var to = point([end.lat, end.lng]);
    var locations = points([
      [start.lat, start.lng],
      [end.lat, end.lng],
    ]);
    let airportDistance = distance(from, to, options),
      newCenter = center(locations),
      zoom = scaleZoom(airportDistance);

    drawFlightPath(start, end);
    setDist(
      Math.round((airportDistance + Number.EPSILON) * 100) / 100 + " miles"
    );
    setMiddle(newCenter.geometry.coordinates);
    setZoom(zoom);
  };

  return (
    <div className="App">
      <h1>Sekou Cox Test Result</h1>      
      <Toolbar
        sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'center', justifyContent: 'center'}}
      >
        <Autocomplete
          id="start-airport"
          value={start}
          options={data}
          sx={{ width: 300, mr: {xs:0, sm:2}, mb:{xs:2, sm:0} }}
          getOptionLabel={(option) => (option.name + " - " + option.icao_code)}
          renderInput={(params) => (
            <div>
              <TextField
                {...params}
                className={classes.input}
                placeholder="From"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.gpsIcon}>
                        <SvgIcon style={{ paddingTop: 6 }}>
                          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                        </SvgIcon>
                      </div>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          )}
          onChange={(event, newValue) => {
            setStart(newValue);
          }}
        />
        <Autocomplete
          id="end-airport"
          value={end}
          options={data}
          sx={{ width: 300, mr: {xs:0, sm:2}, mb:{xs:2, sm:0} }}
          getOptionLabel={(option) => (option.name + " - " + option.icao_code)}
          renderInput={(params) => (
            <div>
              <TextField
                {...params}
                className={classes.input}
                placeholder="To"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.gpsIcon}>
                        <SvgIcon style={{ paddingTop: 6 }}>
                          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                        </SvgIcon>
                      </div>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          )}
          onChange={(event, newValue) => {
            setEnd(newValue);
          }}
        />
        <Button
          variant="contained"
          disabled={start == null || end == null}
          onClick={() => calculateDistance()}
          sx={{mr: {xs:0, sm:2}, mb:{xs:2, sm:0}}}
        >
          Calculate
        </Button>
        <div>
          <h1>{dist}</h1>
        </div>
      </Toolbar>
      <div className="mapWrapper">
        <SimpleMap center={middle} zoom={zoom} airports={[newStart, newEnd]} />
      </div>
    </div>
  );
}

export default App;
