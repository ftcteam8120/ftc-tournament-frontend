import React, { Component } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

declare const GOOGLE_API_KEY: string;

interface Props {
  lat: number;
  lng: number;
  marker?: boolean;
}

class LocationMap extends Component<Props> {
  render() {
    let { lat, lng, marker } = this.props;
    if (marker === undefined) marker = true;
    return (
      <GoogleMap defaultZoom={9} defaultCenter={{ lat, lng }}>
        {marker && (
          <Marker position={{ lat, lng }} />
        )}
      </GoogleMap>
    );
  }
}

export default compose<{}, Props>(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`,
    loadingElement: <div style={{ maxHeight: `300px`, width: `100%` }} />,
    containerElement: <div style={{ maxHeight: `300px`, width: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(LocationMap);