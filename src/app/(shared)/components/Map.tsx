"use client"
import React, { useState, useCallback, useEffect } from 'react';
import Map, { Marker, ViewState, MapMouseEvent } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Coordinates {
  longitude: number;
  latitude: number;
}

interface Location {
  longitude: number;
  latitude: number;
  locationType: string;
  name: string;
}

interface MapProps {
  onRightClick: (coords: Coordinates, event: React.MouseEvent) => void;
  locations: Location[];
}

const MapComponent: React.FC<MapProps> = ({ onRightClick, locations }) => {
  const [viewState, setViewState] = useState<ViewState>({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  });

  useEffect(() => {
    // Log environment variable in the browser console
    console.log("Mapbox Token (Client):", process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);
  }, []);

  const handleContextMenu = useCallback((event: MapMouseEvent) => {
    event.preventDefault();
    const { lng, lat } = event.lngLat;

    const reactMouseEvent = event.originalEvent as unknown as React.MouseEvent;

    onRightClick({ longitude: lng, latitude: lat }, reactMouseEvent);
  }, [onRightClick]);


  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  console.log('MAPBOX_TOKEN: ', MAPBOX_TOKEN);

  return (
    <Map
      {...viewState}
      style={{ width: '100vw', height: '100vh' }}
      onMove={evt => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/light-v10" /* Use the light grey style */
      mapboxAccessToken={MAPBOX_TOKEN}
      onContextMenu={handleContextMenu}
    >
      {locations.map((location, index) => (
        <Marker
          key={index}
          longitude={location.longitude}
          latitude={location.latitude}
        />
      ))}
    </Map>
  );
};

export default MapComponent;
